using Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace Api.Config;

public class EfCoreConfig : DbContext
{
    public DbSet<User> Users => Set<User>();

    public EfCoreConfig(DbContextOptions options) : base(options)
    {
    }
}