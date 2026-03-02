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
    [Authorize]
    public async Task<IActionResult> Users()
    {
        try
        {
            var admin = HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("is_admin"))?.Value;
            if (bool.Parse(admin) == false)
            {
                return Unauthorized();
            }
            var users = await _context.Users.Select(u => new {u.Id, u.Name,u.Email,u.IsAdmin}).ToListAsync();
            return Ok(users);
        }
        catch (Exception ex)
        {
            return BadRequest();
        }
    }

    [HttpGet("user/{id}")]
    [Authorize]
    public async Task<IActionResult> User(int id)
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
            var newUser = new
            {
                id = user.Id,
                name = user.Name,
                email = user.Email,
                isAdmin=user.IsAdmin,
            };
            return Ok(newUser);
        }
        catch (Exception ex)
        {
            return BadRequest();
        }
    }

    [HttpGet("userExists/{id}")]
    [AllowAnonymous]
    public async Task<IActionResult> UserExists(int id)
    {
        try
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            if (user == null)
            {
                return BadRequest("Пользователь не найден");
            }
            return Ok(true);
        }
        catch (Exception ex)
        {
            return BadRequest("Пользователь не найден");
        }
    }

    [HttpGet("profile")]
    [Authorize]
    public async Task<IActionResult> Profile()
    {
        try
        {
            var id = HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("id"))?.Value;
            int cId = int.Parse(id);
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == cId);
            if (user == null)
            {
                return BadRequest("Пользователь не найден");
            }
            var newUser = new
            {
                id = user.Id,
                name = user.Name
            };
            return Ok(newUser);
        }
        catch (Exception ex)
        {
            return BadRequest();
        }
    }

    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<IActionResult> Register([FromBody]  UserRegister user)
    {
        try
        {
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);
            if (existingUser != null)
            {
                return BadRequest("Такой пользователь уже зарегистрирован");
            }
            else
            {
                if (user.Name.Length < 4)
                {
                    return BadRequest("Слишком короткое имя");
                }
                if (!user.Email.Contains("@gmail.com")) {
                    return BadRequest("Неправильный тип почты");
                }
                if (user.Password.Length < 6)
                {
                    return BadRequest("Слишком короткий пароль");
                }
                var password = PasswordHasher.HashPassword(user.Password);
                User newUser = new User(user.Name, user.Email, password, false);
                bool check = PasswordHasher.ComparePasswords("1234", password);
                await _context.Users.AddAsync(newUser);
                await _context.SaveChangesAsync();
                existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);
                var token = GenerateToken(existingUser);
                return Ok(new { Token = token, Admin = false });
            }
        }
        catch (Exception ex)
        {
            return BadRequest();
        }
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login([FromBody] UserLogin user)
    {
        try
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
                if (check)
                {
                    var token = GenerateToken(existingUser);
                    Console.WriteLine(token);
                    return Ok(new { Token = token, Admin = existingUser.IsAdmin });
                }
                else
                {
                    return BadRequest("Неправильная почта или пароль");
                }

            }
        }
        catch (Exception ex)
        {
            return BadRequest();
        }
    }


    //Базовая реализация Jwt токена, в основном для проверки Id и является ли пользователь админом. Токен не обновляется, проверку истечения срока выключил
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