using Microsoft.AspNetCore.Mvc;
using StoreBackend.Models;
using StoreBackend_Db;

[ApiController]
[Route("api/controllers")]
public class UsersController : Controller
{
    private readonly Db _context;

    public UsersController(Db context)
    {
        _context = context;
    }

    [HttpGet("users")]
    public async Task<ActionResult<List<User>>> Users()
    {
        var users = _context.Users4.ToList();
        Console.WriteLine(users);
        users.ForEach(u => Console.WriteLine(u));
        return Ok(users);
    }
}