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
    [Authorize(Roles = "Admin,SuperAdmin")]
    public async Task<IActionResult> Users()
    {
        try
        {
            var users = await _context.Users.Select(u => new {u.Id, u.Name,u.Email,u.Role}).ToListAsync();
            return Ok(users);
        }
        catch (Exception ex)
        {
            return BadRequest();
        }
    }

    [HttpGet("user/{id}")]
    [Authorize(Roles = "Admin,SuperAdmin")]
    public async Task<IActionResult> User(int id)
    {
        try
        {
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
                role=user.Role,
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
                name = user.Name,
                email = user.Email,
                phoneNumber=user.PhoneNumber

            };
            return Ok(newUser);
        }
        catch (Exception ex)
        {
            return BadRequest();
        }
    }

    [HttpGet("ownNumber")]
    [Authorize]
    public async Task<IActionResult> GetOwnNumber()
    {
        try
        {
            var id = HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("id"))?.Value;
            int cId = int.Parse(id);
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == cId);
            return Ok(user?.PhoneNumber);
        }
        catch
        {
            return BadRequest();
        }
    }


    [HttpPut("updateProfile")]
    [Authorize]
    public async Task<IActionResult> UpdateProfile([FromBody] UserPut newUser)
    {
        try
        {
            if (newUser.Name.Length < 4)
            {
                return BadRequest("Слишком короткое имя");
            }
            else if (!newUser.Name.Any(char.IsLetter))
            {
                return BadRequest("Имя должно содержать буквы");
            }
            else if (!newUser.Email.Contains("@gmail.com"))
            {
                return BadRequest("Неправильный тип почты");
            }
            else if (newUser.Email.Length < 11)
            {
                return BadRequest("Слишком короткая почта");
            }
            else if (newUser.Password!=null)
            {
                if (newUser.Password.Length < 6)
                {
                    return BadRequest("Слишком короткий пароль");
                }
                else if (!newUser.Password.Any(char.IsLetter))
                {
                    return BadRequest("Пароль должен содержать буквы");
                }
            }
            else if (newUser.PhoneNumber != null)
            {
                if(newUser.PhoneNumber.Length < 13|| newUser.PhoneNumber.Length > 13 || newUser.PhoneNumber[0]!='+'||!newUser.PhoneNumber.Substring(1).All(char.IsDigit))
                {
                    return BadRequest("Неправильный номер телефона");
                }
            }
            var id = HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("id"))?.Value;
            int cId = int.Parse(id);
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == cId);
            user.Name=newUser.Name.Trim();
            user.Email=newUser.Email.Trim();
            if (newUser.Password != null)
            {
                var password = PasswordHasher.HashPassword(newUser.Password.Trim());
                user.Password = password;
            }
            if (newUser.PhoneNumber != null)
            {
                user.PhoneNumber = newUser.PhoneNumber;
            }
            _context.Update(user);
            await _context.SaveChangesAsync();
            return Ok();
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
                else if (!user.Name.Any(char.IsLetter))
                {
                    return BadRequest("Имя должно содержать буквы");
                }
                else if (!user.Email.Contains("@gmail.com")) {
                    return BadRequest("Неправильный тип почты");
                }
                else if (user.Email.Length < 11)
                {
                    return BadRequest("Слишком короткая почта");
                }
                else if (user.Password.Length < 6)
                {
                    return BadRequest("Слишком короткий пароль");
                }
                else if (!user.Password.Any(char.IsLetter))
                {
                    return BadRequest("Пароль должен содержать буквы");
                }
                var password = PasswordHasher.HashPassword(user.Password.Trim());
                User newUser = new User(user.Name.Trim(), user.Email.Trim(), password, "User",null);
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
                    return Ok(new { Token = token, Admin = existingUser.Role });
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

    [HttpPut("userRole/{id:int}/{role}")]
    [Authorize(Roles ="Admin,SuperAdmin")]
    public async Task<IActionResult> UpdateUser(int id, string role)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
        if (user == null)
        {
            return BadRequest("Пользователь не найден");
        }
        if (user.Role == "SuperAdmin") {
            return BadRequest();
        }
        var userRole=HttpContext.User.Claims.FirstOrDefault(c => c.Type==ClaimTypes.Role)?.Value;
        if (role == "Admin")
        {
            if (userRole == "Admin")
            {
                return Unauthorized();
            }
        }
        else if (role != "User")
        {
            return BadRequest();
        }
        user.Role = role;
        _context.Update(user);
        await _context.SaveChangesAsync();
        return Ok();
    }

    public string GenerateToken(User user)
    {
        var claims = new[]
        {
            new Claim("id", user.Id.ToString(),ClaimValueTypes.Integer),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role),
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