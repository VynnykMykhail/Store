using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoreBackend_Db;
using StoreBackend.Models;

namespace StoreBackend.Controllers
{
    [ApiController]
    public class ImageGet: Controller
    {
        private readonly Db _context;

        public ImageGet(Db context)
        {
            _context = context;
        }


        [HttpGet("img/{name}")]
        [AllowAnonymous]

        public async Task<IActionResult> GetImage(string name)
        {
            try
            {
                var image = await _context.Images.FirstOrDefaultAsync(x => x.Name == name);
                if (image == null)
                {
                    return NotFound();
                }
                var type = image.Name.Split('.');
                return File(image.Data, $"image/{type[1]}");
            }
            catch (Exception ex)
            {
                return BadRequest();
            }

        }
    }
}
