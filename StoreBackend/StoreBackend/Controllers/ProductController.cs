using Microsoft.AspNetCore.Mvc;
using StoreBackend.Models;
using StoreBackend_Db;

[ApiController]
[Route("api/controllers")]
public class ProductsController : Controller
{
    private readonly Db _context;

    public ProductsController(Db context)
    {
        _context = context;
    }

    [HttpGet("products")]
    public async Task<ActionResult<List<Product>>> Products()
    {
        var products = _context.Products.ToList();
        products.ForEach(u => Console.WriteLine(u));
        return Ok(products);
    }

    [HttpGet("product/{id}")]
    public async Task<ActionResult<List<Product>>> Product(int id)
    {
        var product = _context.Products.First(u => u.Id == id);
        Console.WriteLine(product);
        return Ok(product);
    }
}