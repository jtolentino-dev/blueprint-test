using EmployeeAPI.Context.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EmployeeAPI.Context
{
    public class EmployeeContext : DbContext
    {
        public DbSet<DbChangeLog> DbChangeLogs { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<EmployeeType> EmployeeTypes { get; set; }

        public EmployeeContext(DbContextOptions<EmployeeContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            ConfigureModel(builder.Entity<DbChangeLog>());
            ConfigureModel(builder.Entity<EmployeeType>());
            ConfigureModel(builder.Entity<Employee>());
        }

        private static void ConfigureModel(EntityTypeBuilder<DbChangeLog> dbChangeLogBuilder)
        {
            dbChangeLogBuilder
                .Property(p => p.Changed)
                .ValueGeneratedOnAdd()
                .HasDefaultValueSql("GETDATE()");
        }

        private static void ConfigureModel(EntityTypeBuilder<EmployeeType> employeeTypeBuilder)
        {
            employeeTypeBuilder
                .Property(p => p.Created)
                .ValueGeneratedOnAdd()
                .HasDefaultValueSql("GETDATE()");

            employeeTypeBuilder
                .Property(p => p.LastModified)
                .ValueGeneratedOnAddOrUpdate()
                .IsConcurrencyToken()
                .HasDefaultValueSql("GETDATE()");
        }

        private static void ConfigureModel(EntityTypeBuilder<Employee> employeeBuilder)
        {
            employeeBuilder
                .Property(p => p.Created)
                .ValueGeneratedOnAddOrUpdate()
                .IsConcurrencyToken()
                .HasDefaultValueSql("GETDATE()");

            employeeBuilder
                .Property(p => p.LastModified)
                .ValueGeneratedOnAddOrUpdate()
                .IsConcurrencyToken()
                .HasDefaultValueSql("GETDATE()");
        }
    }
}
