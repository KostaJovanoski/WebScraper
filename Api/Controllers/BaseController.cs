using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class BaseController : ControllerBase
{
    public BaseController()
    {
    }

    internal string GetToken() => HttpContext.Request.Headers["Authorization"];
}