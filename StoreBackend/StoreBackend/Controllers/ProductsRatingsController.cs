using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoreBackend.Models;
using StoreBackend_Db;
using System.Security.Cryptography;

[ApiController]
[Route("api/controllers")]
public class ProductsRatingsController : Controller
{
    private readonly Db _context;

    public ProductsRatingsController(Db context)
    {
        _context = context;
    }

    [HttpGet("productRatings/{id}")]

    public async Task<IActionResult> ProductRatings(int id)
    {
        try
        {
            var ratings = await _context.ProductsRatings.Where(r => r.ProductId == id).ToListAsync();
            if (ratings == null)
            {
                return NotFound();
            }
            return Ok(ratings);
        }
        catch (Exception ex)
        {
            return BadRequest();
        }
    }


    [HttpGet("userRatings/{id}")]

    public async Task<IActionResult> UserRatings(int id)
    {
        try
        {
            var ratings = await _context.ProductsRatings.Where(r => r.UserId == id).ToListAsync();
            if (ratings == null)
            {
                return NotFound();
            }
            return Ok(ratings);
        }
        catch (Exception ex)
        {
            return BadRequest();
        }
    }

    [HttpGet("userProductRate/{id}")]
    [Authorize]
    public async Task<IActionResult> UserProductRate(int id)
    {
        try
        {
            var uId = HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("id"))?.Value;
            int cId = int.Parse(uId);
            var rating = await _context.ProductsRatings.FirstOrDefaultAsync(r => r.UserId == cId && r.ProductId == id);
            if (rating == null)
            {
                return Ok(0);
            }
            else
            {
                return Ok(rating.Rate);
            }
        }
        catch (Exception ex)
        {
            return BadRequest();
        }
    }


    [HttpPost("productRating")]
    [Authorize]
    public async Task<IActionResult> ProductRatings([FromBody] ProductRatingPut rating)
    {
        try
        {
            if (rating.Rate < 1 || rating.Rate > 5)
            {
                return BadRequest();
            }
            var id = HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("id"))?.Value;
            int cId = int.Parse(id);
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == cId);
            if (user == null)
            {
                return BadRequest("Пользователя не существует");
            }
            var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == rating.ProductId);
            if (product == null)
            {
                return BadRequest("Продукт не существует");
            }
            var history = await _context.ProductPurchaseHistory.FirstOrDefaultAsync(h => h.UserId == cId || h.PhoneNumber==user.PhoneNumber && h.ProductId == rating.ProductId);
            if (history == null)
            {
                return BadRequest("Нельзя оценить продукт который не приобрели");
            }
            short rate = (short)rating.Rate;
            var ratings = await _context.ProductsRatings.FirstOrDefaultAsync(r => r.UserId == cId && r.ProductId == rating.ProductId);
            if (ratings != null)
            {
                product.TotalRating -= (int)ratings.Rate;
                ratings.Rate = rate;
                product.TotalRating += (int)ratings.Rate;
            }
            else
            {
                ProductRating newProduct = new ProductRating(rating.ProductId, cId, rating.Rate);
                product.RatingCount += 1;
                product.TotalRating += rate;
                await _context.ProductsRatings.AddAsync(newProduct);
            }
            product.Rating = product.TotalRating / product.RatingCount;
            _context.Update(product);
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest();
        }
    }


    [HttpDelete("productRating/{id}")]
    [Authorize(Roles = "Admin,SuperAdmin")]
    public async Task<IActionResult> ResetProductRating(int id)
    {
        try
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
            if (product == null)
            {
                return BadRequest("Продукт не найден");
            }
            var ratings = await _context.ProductsRatings.Where(r => r.ProductId == id).ToListAsync();
            if (ratings == null)
            {
                return NotFound();
            }
            product.Rating = 0;
            product.TotalRating = 0;
            product.RatingCount = 0;
            _context.Update(product);
            _context.ProductsRatings.RemoveRange(ratings);
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception ex) {
            return BadRequest();
        }
    }

}
