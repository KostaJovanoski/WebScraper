using Api.Contracts;
using Api.Dto;
using Api.Entities;
using Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;
[Authorize]
public class UsersController : BaseController
{
    private readonly IUserService _userService;
    private readonly IAuthenticateService _authenticateService;

    public UsersController(IUserService userService, IAuthenticateService authenticateService)
    {
        _userService = userService;
        _authenticateService = authenticateService;
    }
    [AllowAnonymous]
    [HttpPost(Name = "CreateUser")]
    public IActionResult CreateUser(UserDto dto)
    {
        if (dto.Password != dto.ConfirmPassword)
        {
            return BadRequest("Passwords don't match");
        }

        User? user = _userService.CreateUser(dto);
        if (user == null)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "User can't be created at the moment");
        }

        return Ok(user);
    }

    /// <summary>
    /// Sign in user
    /// </summary>
    /// <param name="loginDto"></param>
    /// <returns></returns>
    [AllowAnonymous]
    [HttpPost("authenticate", Name = "SignInUser")]
    public IActionResult Authenticate(LoginDto loginDto)
    {
        LoginResponseModel? user = _authenticateService.SignInUser(loginDto);
        if (user != null)
        {
            return Ok(user);
        }
        return StatusCode(StatusCodes.Status400BadRequest, "Invalid Username or Password");

    }
    /// <summary>
    /// Sign out user
    /// </summary>
    /// <returns></returns>
    [HttpPost("logout", Name = "SignOutUser")]
    public IActionResult LogOut()
    {
        bool success = _authenticateService.SignOut(GetToken());
        if (success)
        {
            return Ok(new
            {
                Status = StatusCodes.Status200OK,
                Message = "Sign out successful."
            });
        }
        return StatusCode(StatusCodes.Status205ResetContent);
    }
}