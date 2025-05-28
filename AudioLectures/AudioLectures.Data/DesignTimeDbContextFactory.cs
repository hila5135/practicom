using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace AudioLectures.Data
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<DataContext>
    {
        public DataContext CreateDbContext(string[] args)
        {
            // טוענים את הקובץ appsettings.json
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory()) // התיקיה הנוכחית (יכולה להיות פרויקט ה-Data)
                .AddJsonFile("appsettings.json")
                .Build();

    
            var connectionString = configuration.GetConnectionString("DefaultConnection");

            var optionsBuilder = new DbContextOptionsBuilder<DataContext>();
            optionsBuilder.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));

            return new DataContext(optionsBuilder.Options);
        }
    }
}
