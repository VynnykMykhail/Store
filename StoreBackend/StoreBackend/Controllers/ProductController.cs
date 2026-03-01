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
        try
        {
            var products = await _context.Products.ToListAsync();
            return Ok(products);
        }
        catch (Exception ex)
        {
            return BadRequest();
        }
    }

    [HttpGet("product/{id}")]
    [AllowAnonymous]
    public async Task<IActionResult> Product(int id)
    {
        try
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
            if (product == null)
            {
                return BadRequest("Product not found");
            }
            return Ok(product);
        }
        catch (Exception ex)
        {
            return BadRequest();
        }
    }

    [HttpPost("product")]
    [Authorize]
    public async Task<IActionResult> AddProduct([FromBody] ProductPut product)
    {
        try
        {
            var admin = HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("is_admin"))?.Value;
            if (bool.Parse(admin) == false)
            {
                return Unauthorized();
            }
            Product newProduct = new Product(product.Name,product.Description,product.Price,0,0,0,product.IsAvaible,product.ImageURL);
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
    [Authorize]
    public async Task<IActionResult> UpdateProduct(int id, [FromBody] Product newProduct)
    {
        try
        {
            Console.WriteLine("2");
            var admin = HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("is_admin"))?.Value;
            if (bool.Parse(admin) == false)
            {
                return Unauthorized();
            }
            Console.WriteLine("1");
            var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
            if (product == null)
            {
                Console.WriteLine("Product not exists");
                return BadRequest();
            }
            product.Name = newProduct.Name;
            product.Description = newProduct.Description;
            product.Price = newProduct.Price;
            product.IsAvaible = newProduct.IsAvaible;
            product.ImageURL = newProduct.ImageURL;
            _context.Update(product);
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception error)
        {
            Console.WriteLine(error);
            return BadRequest();
        }
    }

    [HttpDelete("product/{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        try
        {
            var admin = HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("is_admin"))?.Value;
            if (bool.Parse(admin) == false)
            {
                return Unauthorized();
            }
            var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
            if (product == null)
            {
                return BadRequest("Продукт не найден");
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