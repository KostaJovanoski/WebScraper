namespace Api.Dto;

public record UserDto
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Email { get; set; }
    public DateTime? BirthDate { get; set; }
    public string? Password { get; set; }
    public string? ConfirmPassword { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
}