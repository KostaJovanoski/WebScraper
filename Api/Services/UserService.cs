using System.Security.Cryptography;
using System.Text;
using Api.Config;
using Api.Contracts;
using Api.Dto;
using Api.Entities;

namespace Api.Services;

public class UserService : IUserService
{
    private readonly EfCoreConfig _dbContext;
    private readonly ICryptoService _cryptoService;

    public UserService(EfCoreConfig dbContext, ICryptoService cryptoService)
    {
        _dbContext = dbContext;
        _cryptoService = cryptoService;
    }

    public User? CreateUser(UserDto dto)
    {
        try
        {
            var user = new User(dto);
            var hashedPass = _cryptoService.EncryptHash(dto.Password);
            user.Password = hashedPass;
            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();
            return user;
        }
        catch (Exception ex)
        {
            return null;
        }
    }
}