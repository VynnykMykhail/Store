using Microsoft.AspNetCore.Authorization;
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
    [Authorize]
    public async Task<IActionResult> History()
    {
        try
        {
            var history = await _context.ProductsPurchaseHistory.ToListAsync();
            return Ok(history);
        }
        catch (Exception ex)
        {
            return BadRequest();
        }
    }

    [HttpGet("ProductHistory/{id}")]
    [Authorize]
    public async Task<IActionResult> ProductHistory(int id)
    {
        try
        {
            var history = await _context.ProductsPurchaseHistory.Where(h => h.ProductId == id).ToListAsync();
            return Ok(history);
        }
        catch (Exception ex)
        {
            return BadRequest();
        }
    }

    [HttpGet("UserHistory/{id}")]
    [Authorize]
    public async Task<IActionResult> UserHistory(int id)
    {
        try
        {
            var history = await _context.ProductsPurchaseHistory.Where(h => h.UserId == id).ToListAsync();
            return Ok(history);
        }
        catch (Exception ex)
        {
            return BadRequest();
        }
    }

    [HttpPost("PurchaseHistory")]
    [Authorize]
    public async Task<IActionResult> AddHistory([FromBody] PurchaseHistoryPut history)
    {
        try
        {
            var id = HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("id"))?.Value;
            int cId = int.Parse(id);
            var user = await _context.Users.FirstAsync(u => u.Id == cId);
            if (user == null)
            {
                return BadRequest();
            }
            List<PurchaseHistorySimple> list = history.PurchaseHistory;
            foreach (PurchaseHistorySimple item in list)
            {
                PurchaseHistory newHistory = new PurchaseHistory(item.ProductId, cId, history.Address, DateTime.Now, item.Count, item.Payment);
                await _context.ProductsPurchaseHistory.AddAsync(newHistory);
            }
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return BadRequest();
        }
    }
}

