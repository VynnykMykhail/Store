using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
    [AllowAnonymous]
    public async Task<IActionResult> Products()
    {
        var products = await _context.Products.ToListAsync();
        return Ok(products);
    }

    [HttpGet("product/{id}")]
    [AllowAnonymous]
    public async Task<IActionResult> Product(int id)
    {
        var product = await _context.Products.FirstAsync(p => p.Id == id);
        if (product == null)
        {
            return BadRequest();
        }
        return Ok(product);
    }

    [HttpPost("product")]
    
    public async Task<IActionResult> AddProduct([FromBody] Product product)
    {
        try
        {
            Product newProduct = product;
            Console.WriteLine(product);
            await _context.Products.AddAsync(newProduct);
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception error)
        {
            return BadRequest();
        }
    }

    [HttpPut("product/{id}")]
    public async Task<IActionResult> UpdateProduct(int id, [FromBody] Product product)
    {
        try
        {
            product.Id = id;
            _context.Update(product);
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception error)
        {
            return BadRequest();
        }
    }

    [HttpDelete("product/{id}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        try
        {
            var product = await _context.Products.FirstAsync(p => p.Id == id);
            if (product == null)
            {
                return BadRequest();
            }
            _context.Remove(product);
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception error)
        {
            return BadRequest();
        }
    }
}