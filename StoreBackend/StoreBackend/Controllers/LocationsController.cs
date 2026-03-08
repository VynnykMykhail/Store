using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoreBackend.Models;
using StoreBackend_Db;

[ApiController]
[Route("api/controllers")]
public class LocationsController : Controller
{
    private readonly Db _context;

    public LocationsController(Db context)
    {
        _context = context;
    }

    [HttpGet("locations")]
    [AllowAnonymous]

    public async Task<IActionResult> GetLocations()
    {
        try
        {
            var locations = await _context.Locations.ToListAsync();
            return Ok(locations);
        }
        catch (Exception ex)
        {
            return BadRequest();
        }
    }

    [HttpPost("location")]
    [Authorize(Roles = "Admin,SuperAdmin")]
    public async Task<IActionResult> AddLocation([FromBody] LocationModel location)
    {
        try
        {
            await _context.AddAsync(location);
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest();
        }
    }
}
