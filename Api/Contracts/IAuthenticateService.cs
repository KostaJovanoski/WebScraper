using Api.Dto;
using Api.Entities;
using Api.Models;

namespace Api.Contracts;

public interface IAuthenticateService
{
    public LoginResponseModel? SignInUser(LoginDto loginDto);
    public bool ValidateUserLoginInfo(LoginDto loginDto);
    public string? GenerateJWTToken(User? user);
    public bool SignOut(string? Token);
}