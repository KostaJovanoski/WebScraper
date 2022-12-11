using Api.Dto;

namespace Api.Entities;

public class User
{
    public int? UserId { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Email { get; set; }
    public DateTime? BirthDate { get; set; }
    public string? Password { get; set; }
    public DateTime? CreatedAt { get; set; } = DateTime.Now;

    public User()
    {
    }

    public User(UserDto dto)
    {
        FirstName = dto.FirstName;
        LastName = dto.LastName;
        Email = dto.Email;
        BirthDate = dto.BirthDate;
        Password = dto.Password;
        CreatedAt = dto.CreatedAt;
    }
}