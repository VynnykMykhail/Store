using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Utilities.Collections;
using StoreBackend.Models;
using StoreBackend_Db;
using System.Security.Cryptography;


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
    [Authorize(Roles = "Admin,SuperAdmin")]
    public async Task<IActionResult> IsUserBlocked(int id)
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

    [HttpGet("blockedNumber/{number}")]
    [Authorize(Roles = "Admin,SuperAdmin")]
    public async Task<IActionResult> IsNumberBlocked(string number)
    {
        try
        {
            if (number.Length < 13 || number.Length > 13 || number[0] != '+' || !number.Substring(1).All(char.IsDigit))
            {
                return BadRequest("Неправильный номер телефона");
            }
            var blockedUser = await _context.BlockedUsers.FirstOrDefaultAsync(u => u.PhoneNumber == number);
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

    [HttpGet("blockedNumberCheck/{number}")]
    [AllowAnonymous]
    public async Task<IActionResult> IsMyNumberBlocked(string number)
    {
        try
        {
            if (number.Length < 13 || number.Length > 13 || number[0] != '+' || !number.Substring(1).All(char.IsDigit))
            {
                return BadRequest("Неправильный номер телефона");
            }
            var blockedUser = await _context.BlockedUsers.FirstOrDefaultAsync(u => u.PhoneNumber == number);
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

    [HttpPost("blockUser")]
    [Authorize(Roles = "Admin,SuperAdmin")]
    public async Task<IActionResult> BlockedUser([FromBody] BlockedUserPut block)
    {
        try
        {
            if (block.UserId != null)
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == block.UserId);
                if (user == null)
                {
                    return BadRequest("Пользователь не найден");
                }
                var blockedUser = await _context.BlockedUsers.FirstOrDefaultAsync(u => u.UserId == block.UserId);
                if (blockedUser != null)
                {
                    return BadRequest("Пользователь уже заблокирован");
                }
                BlockedUser blockRecord = new BlockedUser(block.UserId, null);
                await _context.BlockedUsers.AddAsync(blockRecord);
                await _context.SaveChangesAsync();
                return Ok();
            }
            else if (block.PhoneNumber != null)
            {
                if (block.PhoneNumber.Length < 13 || block.PhoneNumber.Length > 13 || block.PhoneNumber[0] != '+' || !block.PhoneNumber.Substring(1).All(char.IsDigit))
                {
                    return BadRequest("Неправильный номер телефона");
                }
                var blockedUser = await _context.BlockedUsers.FirstOrDefaultAsync(u => u.PhoneNumber == block.PhoneNumber);
                if (blockedUser != null)
                {
                    return BadRequest("Пользователь уже заблокирован");
                }
                BlockedUser blockRecord = new BlockedUser(null, block.PhoneNumber);
                await _context.BlockedUsers.AddAsync(blockRecord);
                await _context.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
            
        }
        catch (Exception ex)
        {
            return BadRequest();
        }
    }

    [HttpDelete("unblockUser/{id}")]
    [Authorize(Roles = "Admin,SuperAdmin")]
    public async Task<IActionResult> UnblockUser(int id)
    {
        try
        {
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


    [HttpDelete("unblockNumber/{number}")]
    [Authorize(Roles = "Admin,SuperAdmin")]
    public async Task<IActionResult> UnblockNumber(string number)
    {
        try
        {
            var blockedUser = await _context.BlockedUsers.FirstOrDefaultAsync(u => u.PhoneNumber == number);
            if (blockedUser == null)
            {
                return BadRequest("Пользователь не заблокирован");
            }
            _context.Remove(blockedUser);
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest();
        }
    }
}
