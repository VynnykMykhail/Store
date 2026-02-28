using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using StoreBackend.Hasher;
using StoreBackend.Models;
using StoreBackend_Db;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

[ApiController]
[Route("api/controllers")]
public class UsersController : Controller
{
    private readonly IConfiguration config;
    private readonly Db _context;

    public UsersController(IConfiguration config,Db context)
    {
        this.config = config;
        _context = context;
    }

    [HttpGet("users")]
    public async Task<IActionResult> Users()
    {
        var users = await _context.Users.ToListAsync();
        Console.WriteLine(users);
        users.ForEach(u => Console.WriteLine(u));
        return Ok(users);
    }

    [HttpGet("user/{id}")]

    public async Task<IActionResult> User(int id)
    {
        var user = await _context.Users.FirstAsync(u => u.Id == id);
        if (user == null)
        {
            return BadRequest();
        }
        var newUser = new
        {
            id=user.Id,
            name=user.Name
        };
        return Ok(newUser);
    }

    [HttpGet("profile")]
    [Authorize]
    public async Task<IActionResult> Profile()
    {
        var id = HttpContext.User.Claims.FirstOrDefault(c=>c.Type.Equals("id"))?.Value;
        int cId = int.Parse(id);
        var user = await _context.Users.FirstAsync(u => u.Id == cId);
        if (user == null)
        {
            return BadRequest();
        }
        var newUser = new
        {
            id = user.Id,
            name = user.Name
        };
        return Ok(newUser);
    }

    [HttpPost("register")]

    public async Task<IActionResult> Register([FromBody]  UserRegister user)
    {
        var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);
        if (existingUser != null)
        {
            return BadRequest("Такой пользователь уже зарегистрирован");
        }
        else
        {
            var password = PasswordHasher.HashPassword(user.Password);
            User newUser = new User(user.Name, user.Email, password, true);
            bool check = PasswordHasher.ComparePasswords("1234",password);
            var token=GenerateToken(newUser);
            await _context.Users.AddAsync(newUser);
            await _context.SaveChangesAsync();
            return Ok(new {Token=token, Admin = true });
        }
    }

    [HttpPost("login")]

    public async Task<IActionResult> Login([FromBody] UserLogin user)
    {
        var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);
        if (existingUser == null)
        {
            return BadRequest("Неправильная почта или пароль");
        }
        else
        {
            bool check = PasswordHasher.ComparePasswords(user.Password, existingUser.Password);
            Console.WriteLine(check);
            if (check) {
                var token = GenerateToken(existingUser);
                Console.WriteLine(token);
                return Ok(new { Token = token, Admin=existingUser.IsAdmin});
            }
            else
            {
                return BadRequest("Неправильная почта или пароль");
            }
            
        }
    }

    public string GenerateToken(User user)
    {
        var claims = new[]
        {
            new Claim("id", user.Id.ToString(),ClaimValueTypes.Integer),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim("is_admin", user.IsAdmin.ToString(), ClaimValueTypes.Boolean),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        };

        var securityKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(config["Jwt:Key"]));

        var credentials = new SigningCredentials(
            securityKey, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: config["Jwt:Issuer"],
            audience: config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddMinutes(30),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }



}