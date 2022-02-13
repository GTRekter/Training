using Microsoft.AspNetCore.Mvc;

namespace weather.Controllers;

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
