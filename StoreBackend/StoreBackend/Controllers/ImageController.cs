using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoreBackend_Db;
using StoreBackend.Models;

    [ApiController]
    [Route("api/controllers")]
    public class ImageController: Controller
    {

        private readonly Db _context;

        public ImageController(Db context)
        {
            _context = context;
        }

        

        [HttpGet("images")]
        [Authorize(Roles = "Admin,SuperAdmin")]
        public async Task<IActionResult> GetImages()
        {
            try
            {
                var images = await _context.Images.Select(i => new {id=i.Id, Url=i.Name}).ToListAsync();
                return Ok(images);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }

        }

        [HttpPost("img")]
        [Authorize(Roles ="Admin,SuperAdmin")]
        public async Task<IActionResult> AddImage(IFormFile image)
        {
            try
            {
                if (image == null || image.Length == 0)
                {
                    return BadRequest();
                }
                using (var ms = new MemoryStream())
                {
                    await image.CopyToAsync(ms);
                    var data=ms.ToArray();
                    var name = Guid.NewGuid().ToString() + Path.GetExtension(image.FileName);
                    var newImage = new ImageModel(name, data);
                    await _context.Images.AddAsync(newImage);
                    await _context.SaveChangesAsync();
                    return Ok();
                }
                
            }
            catch (Exception ex)
            {

                return BadRequest();
            }
        }

    }
