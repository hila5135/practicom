using Amazon.Runtime;
using Amazon;
using Amazon.S3;
using AudioLectures.Core;
using AudioLectures.Core.Repositories;
using AudioLectures.Core.Services;
using AudioLectures.Data;
using AudioLectures.Data.Repositories;
using AudioLectures.Service;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Security.Claims;
using System.Text;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// הרשמות לשירותים
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.WriteIndented = true;
    });

builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 100_000_000; // 100MB
});

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Description = "Enter your Bearer token",
        Type = SecuritySchemeType.Http
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
    options.OperationFilter<FileUploadOperationFilter>();
});

builder.Services.AddCors(options => 
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

builder.Services.AddScoped<ILessonService, LessonService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ILecturerService, LecturerService>();
builder.Services.AddScoped<ILessonRepository, LessonRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ILecturerRepository, LecturerRepository>();
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<IS3Service, S3Service>();

//builder.Services.AddSingleton<IAmazonS3>(sp =>
//{
//    var config = sp.GetRequiredService<IConfiguration>();
//    var awsAccessKeyId = config["AWS:AccessKeyId"];
//    var awsSecretAccessKey = config["AWS:SecretAccessKey"];
//    var region = RegionEndpoint.USEast1;
//    var credentials = new BasicAWSCredentials(awsAccessKeyId, awsSecretAccessKey);
//    return new AmazonS3Client(credentials, region);
//});
builder.Services.AddSingleton<IAmazonS3>(sp =>
{
    var config = sp.GetRequiredService<IConfiguration>();

    var awsAccessKeyId = config["AWS:AccessKey"];
    var awsSecretAccessKey = config["AWS:SecretKey"];
    var awsRegion = config["AWS:Region"];

    if (string.IsNullOrWhiteSpace(awsAccessKeyId) || string.IsNullOrWhiteSpace(awsSecretAccessKey) || string.IsNullOrWhiteSpace(awsRegion))
    {
        throw new InvalidOperationException("Missing AWS configuration values! Please check AccessKey, SecretKey, or Region in appsettings.json or environment variables.");
    }

    var credentials = new BasicAWSCredentials(awsAccessKeyId, awsSecretAccessKey);
    var regionEndpoint = RegionEndpoint.GetBySystemName(awsRegion);

    return new AmazonS3Client(credentials, regionEndpoint);
});

builder.Services.AddAutoMapper(typeof(MappingProfile));
var jwtKey = builder.Configuration["Jwt:Key"];
if (string.IsNullOrEmpty(jwtKey))
{
    throw new InvalidOperationException("JWT Key is missing! Check appsettings.json or environment variables.");
}


builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        //IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
        RoleClaimType = ClaimTypes.Role
    };
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
    options.AddPolicy("EditorOrAdmin", policy => policy.RequireRole("Editor", "Admin"));
    options.AddPolicy("ViewerOnly", policy => policy.RequireRole("Viewer"));
});

// !!!!! הוספת ה-DbContext חייבת להיות לפני builder.Build()
builder.Services.AddDbContext<DataContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))
    )
);

var app = builder.Build();

// קונפיגורציה ל-Middleware
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.Use(async (context, next) =>
{
    await next();

    if (context.Response.StatusCode == StatusCodes.Status403Forbidden)
    {
        context.Response.ContentType = "application/json";
        await context.Response.WriteAsync("{\"error\": \"You do not have permission to perform this action!\"}");
    }
    else if (context.Response.StatusCode == StatusCodes.Status401Unauthorized)
    {
        context.Response.ContentType = "application/json";
        await context.Response.WriteAsync("{\"error\": \"You must be logged in to access this resource!\"}");
    }
});

app.UseCors("AllowAll");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapGet("/", () => "Welcome to Audio Lectures API!");

app.Run();

