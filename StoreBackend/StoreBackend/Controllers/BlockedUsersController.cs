using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoreBackend.Models;
using StoreBackend_Db;


[ApiController]
[Route("api/controllers")]
public class BlockedUsersController : Controller
{
    private readonly Db _context;

    public BlockedUsersController(Db context)
    {
        _context = context;
    }

    [HttpGet("blockedUser/{id}")]
    [Authorize]
    public async Task<IActionResult> IsBlocked(int id)
    {
        try
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            if (user == null)
            {
                return NotFound("Пользователь не найден");
            }
            var blockedUser = await _context.BlockedUsers.FirstOrDefaultAsync(u => u.UserId == id);
            if (blockedUser == null)
            {
                return Ok(false);
            }
            return Ok(true);
        }
        catch (Exception ex)
        {
            return BadRequest();
        }
    }

    [HttpGet("blockedCheck")]
    [Authorize]
    public async Task<IActionResult> IsUserBlocked()
    {
        try
        {
            var id = HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("id"))?.Value;
            int cId = int.Parse(id);
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == cId);
            if (user == null)
            {
                return NotFound("Пользователь не найден");
            }
            var blockedUser = await _context.BlockedUsers.FirstOrDefaultAsync(u => u.UserId == cId);
            if (blockedUser == null)
            {
                return Ok(false);
            }
            return Ok(true);
        }
        catch (Exception ex)
        {  
            return BadRequest();
        }
    }

    [HttpPost("blockUser/{id}")]
    [Authorize]
    public async Task<IActionResult> BlockedUser(int id)
    {
        try
        {
            var admin = HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("is_admin"))?.Value;
            if (bool.Parse(admin) == false)
            {
                return Unauthorized();
            }
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            if (user == null)
            {
                return BadRequest("Пользователь не найден");
            }
            var blockedUser = await _context.BlockedUsers.FirstOrDefaultAsync(u => u.UserId == id);
            if (blockedUser != null)
            {
                return BadRequest("Пользователь уже заблокирован");
            }
            BlockedUser blockRecord = new BlockedUser(id);
            await _context.BlockedUsers.AddAsync(blockRecord);
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest();
        }
    }

    [HttpDelete("unblockUser/{id}")]
    [Authorize]
    public async Task<IActionResult> UnblockUser(int id)
    {
        try
        {
            var admin = HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("is_admin"))?.Value;
            if (bool.Parse(admin) == false)
            {
                return Unauthorized();
            }
            var blockedUser = await _context.BlockedUsers.FirstOrDefaultAsync(u => u.UserId == id);
            if (blockedUser == null)
            {
                return BadRequest("Пользователь не заблокирован");
            }
            _context.Remove(blockedUser);
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception ex) {
            return BadRequest();
        }
    }
}
