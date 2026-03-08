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
    [Authorize(Roles = "Admin,SuperAdmin")]
    public async Task<IActionResult> AddProduct([FromBody] ProductPut product)
    {
        try
        {
            if (product.Description.Length > 700)
            {
                return BadRequest("Максимальная длина описания - 700 символов");
            }
            Product newProduct = new Product(product.Name,product.Description,product.Category,product.Price,0,0,0,product.IsAvaible,product.ImageURL);
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
    [Authorize(Roles = "Admin,SuperAdmin")]
    public async Task<IActionResult> UpdateProduct(int id, [FromBody] Product newProduct)
    {
        try
        {
            if (newProduct.Description.Length > 700)
            {
                return BadRequest("Максимальная длина описания - 700 символов");
            }
            var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
            if (product == null)
            {
                return BadRequest();
            }
            product.Name = newProduct.Name;
            product.Description = newProduct.Description;
            product.Price = newProduct.Price;
            product.IsAvaible = newProduct.IsAvaible;
            product.ImageURL = newProduct.ImageURL;
            product.Category=newProduct.Category;
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
    [Authorize(Roles = "Admin,SuperAdmin")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        try
        {
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