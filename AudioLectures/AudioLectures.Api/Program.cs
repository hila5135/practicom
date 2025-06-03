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
using AudioLectures.Core.Models;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);
//builder.Services.AddControllers();

builder.Services.AddControllers()
    .AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.WriteIndented = true;
});





//builder.Services.AddDbContext<DataContext>();



//builder.Services.AddControllers();

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
var connStr = builder.Configuration.GetConnectionString("DefaultConnection");
Console.WriteLine($"*** Using connection string: {connStr}");

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

builder.Services.AddDbContext<DataContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))
    ));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<ILessonService, LessonService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ILecturerService, LecturerService>();
builder.Services.AddScoped<ILessonRepository, LessonRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ILecturerRepository, LecturerRepository>();
builder.Services.Configure<EmailSettings>(builder.Configuration.GetSection("EmailSettings"));
builder.Services.AddTransient<EmailService>();
builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 100_000_000;
});
builder.Services.AddSingleton<IAmazonS3>(sp =>
{
    var config = sp.GetRequiredService<IConfiguration>();
    var awsAccessKeyId = config["AWS:AccessKeyId"];
    var awsSecretAccessKey = config["AWS:SecretAccessKey"];
    var region = RegionEndpoint.USEast1; 

    var credentials = new BasicAWSCredentials(awsAccessKeyId, awsSecretAccessKey);
    return new AmazonS3Client(credentials, region);
});
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<IS3Service, S3Service>();

builder.Services.AddAutoMapper(typeof(MappingProfile));

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
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
        RoleClaimType = ClaimTypes.Role
    };
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
    options.AddPolicy("EditorOrAdmin", policy => policy.RequireRole("Editor", "Admin"));
    options.AddPolicy("ViewerOnly", policy => policy.RequireRole("Viewer"));
});


var app = builder.Build();


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
app.Use(async (context, next) =>
{
    Console.WriteLine($"Request Path: {context.Request.Path}");
    await next.Invoke();
});

app.MapGet("/", () => "Welcome to Audio Lectures API!");
app.Run();


//using Amazon;
//using Amazon.Runtime;
//using Amazon.S3;
//using AudioLectures.Core;
//using AudioLectures.Core.Models;
//using AudioLectures.Core.Repositories;
//using AudioLectures.Core.Services;
//using AudioLectures.Data;
//using AudioLectures.Data.Repositories;
//using AudioLectures.Service;
//using Microsoft.AspNetCore.Authentication.JwtBearer;
//using Microsoft.AspNetCore.Http.Features;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.IdentityModel.Tokens;
//using Microsoft.OpenApi.Models;
//using System.Security.Claims;
//using System.Text;
//using System.Text.Json.Serialization;

//var builder = WebApplication.CreateBuilder(args);

//// --------------------- Services ---------------------
//builder.Services.AddControllers()
//    .AddJsonOptions(options =>
//    {
//        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
//        options.JsonSerializerOptions.WriteIndented = true;
//    });

//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowAll", policy =>
//        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
//});

//builder.Services.Configure<FormOptions>(options =>
//{
//    options.MultipartBodyLengthLimit = 100_000_000; // 100MB
//});

//builder.Services.Configure<EmailSettings>(builder.Configuration.GetSection("EmailSettings"));
//builder.Services.AddTransient<EmailService>();

//builder.Services.AddDbContext<DataContext>(options =>
//    options.UseMySql(
//        builder.Configuration.GetConnectionString("DefaultConnection"),
//        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))
//    ));

//builder.Services.AddScoped<ILessonService, LessonService>();
//builder.Services.AddScoped<IUserService, UserService>();
//builder.Services.AddScoped<ILecturerService, LecturerService>();
//builder.Services.AddScoped<ILessonRepository, LessonRepository>();
//builder.Services.AddScoped<IUserRepository, UserRepository>();
//builder.Services.AddScoped<ILecturerRepository, LecturerRepository>();
//builder.Services.AddScoped<AuthService>();
//builder.Services.AddScoped<IS3Service, S3Service>();

//builder.Services.AddSingleton<IAmazonS3>(sp =>
//{
//    var config = sp.GetRequiredService<IConfiguration>();
//    var credentials = new BasicAWSCredentials(
//        config["AWS:AccessKeyId"],
//        config["AWS:SecretAccessKey"]);
//    var region = RegionEndpoint.USEast1; // ניתן לשנות לפי צורך
//    return new AmazonS3Client(credentials, region);
//});

//builder.Services.AddAutoMapper(typeof(MappingProfile));

//// --------------------- Auth ---------------------
//builder.Services.AddAuthentication(options =>
//{
//    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
//})
//.AddJwtBearer(options =>
//{
//    options.TokenValidationParameters = new TokenValidationParameters
//    {
//        ValidateIssuer = true,
//        ValidateAudience = true,
//        ValidateLifetime = true,
//        ValidateIssuerSigningKey = true,
//        ValidIssuer = builder.Configuration["Jwt:Issuer"],
//        ValidAudience = builder.Configuration["Jwt:Audience"],
//        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
//        RoleClaimType = ClaimTypes.Role
//    };
//});

//builder.Services.AddAuthorization(options =>
//{
//    options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
//    options.AddPolicy("EditorOrAdmin", policy => policy.RequireRole("Editor", "Admin"));
//    options.AddPolicy("ViewerOnly", policy => policy.RequireRole("Viewer"));
//});

//// --------------------- Swagger ---------------------
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen(options =>
//{
//    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
//    {
//        Scheme = "Bearer",
//        BearerFormat = "JWT",
//        In = ParameterLocation.Header,
//        Name = "Authorization",
//        Description = "Enter your Bearer token",
//        Type = SecuritySchemeType.Http
//    });

//    options.AddSecurityRequirement(new OpenApiSecurityRequirement
//    {
//        {
//            new OpenApiSecurityScheme
//            {
//                Reference = new OpenApiReference
//                {
//                    Type = ReferenceType.SecurityScheme,
//                    Id = "Bearer"
//                }
//            },
//            Array.Empty<string>()
//        }
//    });

//    options.OperationFilter<FileUploadOperationFilter>();
//});

//// --------------------- App ---------------------
//var app = builder.Build();

//app.UseSwagger();
//app.UseSwaggerUI();

//// שימי לב: אם יש לך SSL מ-render, לא צריך Redirection
//// app.UseHttpsRedirection();

//app.UseCors("AllowAll");

//app.UseAuthentication();
//app.UseAuthorization();

//// Middleware for custom error responses
//app.Use(async (context, next) =>
//{
//    await next();
//    if (context.Response.StatusCode == StatusCodes.Status403Forbidden)
//    {
//        context.Response.ContentType = "application/json";
//        await context.Response.WriteAsync("{\"error\": \"You do not have permission to perform this action!\"}");
//    }
//    else if (context.Response.StatusCode == StatusCodes.Status401Unauthorized)
//    {
//        context.Response.ContentType = "application/json";
//        await context.Response.WriteAsync("{\"error\": \"You must be logged in to access this resource!\"}");
//    }
//});

//// רישום ראוטים
//app.MapControllers();

//// דף ברירת מחדל
//app.MapMethods("/", new[] { "GET", "HEAD" }, () => Results.Text("Welcome to Audio Lectures API!"));

//// לוג

