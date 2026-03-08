using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoreBackend.Models;
using StoreBackend_Db;
using System.Security.Cryptography;

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
    [Authorize(Roles = "Admin,SuperAdmin")]
    public async Task<IActionResult> History()
    {
        try
        {
            var history = await _context.ProductPurchaseHistory.ToListAsync();
            return Ok(history);
        }
        catch (Exception ex)
        {
            return BadRequest();
        }
    }

    [HttpGet("ProductHistory/{id}")]
    [Authorize(Roles = "Admin,SuperAdmin")]
    public async Task<IActionResult> ProductHistory(int id)
    {
        try
        {
            var history = await _context.ProductPurchaseHistory.Where(h => h.ProductId == id).ToListAsync();
            return Ok(history);
        }
        catch (Exception ex)
        {
            return BadRequest();
        }
    }

    [HttpGet("UserHistory/{id}")]
    [Authorize(Roles = "Admin,SuperAdmin")]
    public async Task<IActionResult> UserHistory(int id)
    {
        try
        {
            var user = await _context.Users.FirstAsync(u => u.Id == id);
            var history = await _context.ProductPurchaseHistory.Where(h => h.UserId == id ||h.PhoneNumber==user.PhoneNumber).ToListAsync();
            return Ok(history);
        }
        catch (Exception ex)
        {
            return BadRequest();
        }
    }

    [HttpGet("phoneHistory/{number}")]
    [Authorize(Roles = "Admin,SuperAdmin")]
    public async Task<IActionResult> PhoneHistory(string number)
    {
        try
        {
            var history = await _context.ProductPurchaseHistory.Where(h => h.PhoneNumber == number).ToListAsync();
            return Ok(history);
        }
        catch (Exception ex)
        {
            return BadRequest();
        }
    }

    [HttpGet("myOrders")]
    [Authorize]

    public async Task<IActionResult> MyOrders()
    {
        try
        {
            var id = HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("id"))?.Value;
            int cId = int.Parse(id);
            var user = await _context.Users.FirstAsync(u => u.Id == cId);
            var history = await _context.ProductPurchaseHistory.Where(h => h.UserId == cId||h.PhoneNumber == user.PhoneNumber).ToListAsync();
            var order = await _context.Orders.Where(o => o.UserId == cId||o.PhoneNumber==user.PhoneNumber).ToListAsync();
            var response = new {history, order};
            return Ok(response);
        }
        catch (Exception ex)
        {
            return BadRequest();
        }
    }

    [HttpPost("PurchaseHistory")]
    [AllowAnonymous]
    public async Task<IActionResult> AddHistory([FromBody] PurchaseHistoryPut history)
    {
        try
        {
            if (history.PurchaseHistory.Count == 0)
            {
                return BadRequest("Нет товаров");
            }
            int total = 0;
            foreach (var item in history.PurchaseHistory)
            {
                total += item.Payment;
            }
            var date = DateTime.Now;
            Guid newGuid = Guid.NewGuid();
            if (User.Identity.IsAuthenticated)
            {
                
                var id = HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("id"))?.Value;
                int cId = int.Parse(id);
                var user = await _context.Users.FirstAsync(u => u.Id == cId);
                if (user == null)
                {
                    return BadRequest();
                }
                if (history.UsingNumber == true)
                {
                    if (history.PhoneNumber != null)
                    {
                        if (history.PhoneNumber.Length < 13 || history.PhoneNumber.Length > 13 || history.PhoneNumber[0] != '+' || !history.PhoneNumber.Substring(1).All(char.IsDigit))
                        {
                            return BadRequest("Неправильный номер телефона");
                        }
                    }
                    else { return BadRequest("Неправильный номер телефона"); }
                    
                }
                List<PurchaseHistorySimple> list = history.PurchaseHistory;
                if (history.UsingNumber)
                {
                    var order = new Order(newGuid.ToString(), null, history.PhoneNumber, history.Address, history.Location, date,total, "Оформлен");
                    await _context.Orders.AddAsync(order);
                }
                else
                {
                    var order = new Order(newGuid.ToString(), cId, null, history.Address, history.Location, date,total, "Оформлен");
                    await _context.Orders.AddAsync(order);
                }
                foreach (PurchaseHistorySimple item in list)
                {
                    if (history.UsingNumber)
                    {

                        PurchaseHistory newHistory = new PurchaseHistory(item.ProductId, null, newGuid.ToString(), history.Address, date, item.Count, item.Payment, history.Location, history.PhoneNumber, null);

                        await _context.ProductPurchaseHistory.AddAsync(newHistory);
                    }
                    else
                    {
                        PurchaseHistory newHistory = new PurchaseHistory(item.ProductId, cId, newGuid.ToString(), history.Address, date, item.Count, item.Payment, history.Location, null, user.Email);
                        await _context.ProductPurchaseHistory.AddAsync(newHistory);
                    }

                }
                await _context.SaveChangesAsync();
                return Ok();
            }
            else
            {
                if (history.UsingNumber == true)
                {
                    if (history.PhoneNumber != null)
                    {
                        if (history.PhoneNumber.Length < 13 || history.PhoneNumber.Length > 13 || history.PhoneNumber[0] != '+' || !history.PhoneNumber.Substring(1).All(char.IsDigit))
                        {
                            Console.WriteLine(history.PhoneNumber.Substring(1));
                            return BadRequest("Неправильный номер телефона");
                        }
                    }
                    else { return BadRequest("Неправильный номер телефона"); }

                }
                List<PurchaseHistorySimple> list = history.PurchaseHistory;
                var order = new Order(newGuid.ToString(), null, history.PhoneNumber, history.Address, history.Location, date, total, "Оформлен");
                await _context.Orders.AddAsync(order);
                foreach (PurchaseHistorySimple item in list)
                {
                    
                    PurchaseHistory newHistory = new PurchaseHistory(item.ProductId, null,newGuid.ToString() ,history.Address, DateTime.Now, item.Count, item.Payment, history.Location, history.PhoneNumber, null);
                    
                    await _context.ProductPurchaseHistory.AddAsync(newHistory);
                }
             
                await _context.SaveChangesAsync();
                return Ok();
            }
            
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return BadRequest();
        }
    }
}

