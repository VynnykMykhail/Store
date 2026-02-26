using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using StoreBackend.Models;

namespace StoreBackend_Db;

public class Db : DbContext
{
    public DbSet<User> Users4 { get; set; }

    public DbSet<Product> Products { get; set; }

    public Db()
    {
        // Database.EnsureDeleted();
        // Database.EnsureCreated();
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(@"Server=DESKTOP-G97LGMO\SQLEXPRESS;Database=StoreDB;Trusted_Connection=True;Encrypt=False;");
    }

}
