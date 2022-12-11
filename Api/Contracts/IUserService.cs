using Api.Config;
using Api.Dto;
using Api.Entities;

namespace Api.Contracts;

public interface IUserService
{

    public User? CreateUser(UserDto dto);
}