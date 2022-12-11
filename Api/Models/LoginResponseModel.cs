using Api.Entities;

namespace Api.Models;

public class LoginResponseModel
{
    public User? User { get; set; }
    public string? Token { get; set; }
}