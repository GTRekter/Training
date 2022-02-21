using Microsoft.AspNetCore.Mvc;

namespace DotNetAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class HealthController : ControllerBase
{
    [HttpGet(Name = "HealthCheck")]
    public object Get()
    {
        return new { Status = "healthy" };
    }
}
