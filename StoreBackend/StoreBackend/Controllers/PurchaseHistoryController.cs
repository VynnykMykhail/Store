using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoreBackend.Models;
using StoreBackend_Db;

[ApiController]
[Route("api/controllers")]
public class PurchaseHistoryController : Controller
{
    private readonly Db _context;

    public PurchaseHistoryController(Db context)
    {
        _context = context;
    }

    [HttpGet("PurchaseHistory")]

    public async Task<IActionResult> History()
    {
        var history = await _context.ProductsPurchaseHistory.ToListAsync();
        return Ok(history);
    }

    [HttpGet("ProductHistory/{id}")]

    public async Task<IActionResult> ProductHistory(int id)
    {
        var history = await _context.ProductsPurchaseHistory.Where(h=>h.ProductId==id).ToListAsync();
        return Ok(history);
    }

    [HttpGet("UserHistory/{id}")]

    public async Task<IActionResult> UserHistory(int id)
    {
        var history = await _context.ProductsPurchaseHistory.Where(h => h.UserId == id).ToListAsync();
        return Ok(history);
    }
}

