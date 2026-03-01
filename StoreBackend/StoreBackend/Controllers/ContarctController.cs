using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nethereum.Web3;
using System.Numerics;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/controllers")]
    public class ContractController : ControllerBase
    {
        private readonly Web3 _web3;
        private readonly IConfiguration _cfg;

        public ContractController(Web3 web3, IConfiguration cfg)
        {
            _web3 = web3;
            _cfg = cfg;
        }



        [HttpGet("contractInfo")]
        [AllowAnonymous]
        public async Task<IActionResult> Info()
        {
            var contractAddress = _cfg["Blockchain:ContractAddress"];
            if (string.IsNullOrWhiteSpace(contractAddress))
                return BadRequest("Blockchain:ContractAddress is missing in appsettings.json");

            var handler = _web3.Eth.GetContractHandler(contractAddress);

            return Ok(new
            {
                contractAddress
            });
        }
    }
}
