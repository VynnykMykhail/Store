using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoreBackend.Models;
using StoreBackend_Db;

[ApiController]
[Route("api/controllers")]
public class CategoryController: Controller
{
    private readonly Db _context;

    public CategoryController(Db context)
    {
        _context = context;
    }

    [HttpGet("categories")]
    [AllowAnonymous]

    public async Task<IActionResult> GetCategories()
    {
        try
        {
            var categories = await _context.ProductCategory.ToListAsync();
            return Ok(categories);
        }
        catch (Exception ex)
        {
            return BadRequest();
        }
    }

    [HttpPost("category/{name}")]
    [Authorize(Roles ="Admin,SuperAdmin")]
    public async Task<IActionResult> AddCategory(string name)
    {
        try
        {
            var category=new Category (name);
            await _context.AddAsync(category);
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest();
        }
    }
}
