using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using StoreBackend.Models;

namespace StoreBackend_Db;

public class Db : DbContext
{
    public DbSet<User> Users { get; set; }

    public DbSet<Product> Products { get; set; }

    public DbSet<PurchaseHistory> ProductsPurchaseHistory { get; set; }

    public Db(DbContextOptions<Db> options) : base(options)
    {

    }


}
