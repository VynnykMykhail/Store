using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using StoreBackend.Models;

namespace StoreBackend_Db;

public class Db : DbContext
{
    public DbSet<User> Users { get; set; }

    public DbSet<Product> Products { get; set; }

    public DbSet<PurchaseHistory> ProductPurchaseHistory { get; set; }

    public DbSet<ProductRating> ProductsRatings { get; set; }

    public DbSet<BlockedUser> BlockedUsers { get; set; }

    public DbSet<ImageModel> Images { get; set; }

    public DbSet<LocationModel> Locations { get; set; }

    public DbSet<Order> Orders { get; set; }

    public DbSet<Category> ProductCategory { get; set; }

    public Db(DbContextOptions<Db> options) : base(options)
    {

    }


}
