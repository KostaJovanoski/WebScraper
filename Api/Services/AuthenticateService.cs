using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Api.Config;
using Api.Contracts;
using Api.Dto;
using Api.Entities;
using Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;

namespace Api.Services;

public class AuthenticateService : IAuthenticateService
{
    // We will cache generated tokens so we can invalidate them on logout
    public static List<string> INVALIDATED_TOKENS = new() { };
    private static int MAX_TOKEN_COUNT = 200;

    private IConfiguration _configuration;
    private ICryptoService _cryptoService;
    private EfCoreConfig _dbContext;

    public AuthenticateService(IConfiguration configuration, EfCoreConfig context, ICryptoService cryptoService)
    {
        _configuration = configuration;
        _cryptoService = cryptoService;
        _dbContext = context;
    }

    /// <summary>
    /// Sign in user
    /// </summary>
    /// <param name="loginDto"></param>
    /// <returns></returns>
    public LoginResponseModel? SignInUser(LoginDto loginDto)
    {
        if (!ValidateUserLoginInfo(loginDto))
        {
            return null;
        }

        try
        {
            string? hashedPass = _cryptoService.EncryptHash(loginDto.Password);
            var validUser =
                _dbContext?.Users?.SingleOrDefault(u => u.Email == loginDto.Email && u.Password == hashedPass);
            if (validUser != null)
            {
                var jwtToken = GenerateJWTToken(validUser);
                if (jwtToken != null)
                {
                    return new LoginResponseModel
                    {
                        User = validUser,
                        Token = jwtToken
                    };
                }
            }
        }
        catch (Exception)
        {
            return null;
        }

        return null;
    }

    /// <summary>
    /// Validate login data
    /// </summary>
    /// <param name="loginDto"></param>
    /// <returns></returns>
    public bool ValidateUserLoginInfo(LoginDto loginDto)
    {
        return !String.IsNullOrEmpty(loginDto.Email) && loginDto.Password is { Length: >= 5 };
    }

    /// <summary>
    /// Generate JWT token
    /// </summary>
    /// <param name="user"></param>
    public string? GenerateJWTToken(User? user)
    {
        if (user == null)
        {
            return null;
        }

        try
        {
            SymmetricSecurityKey securityKey = new(Encoding.ASCII.GetBytes(_configuration["Authentication:Secret"]));
            SigningCredentials signingCredentials = new(securityKey, SecurityAlgorithms.HmacSha256);

            var claimsForToken = new List<Claim>();
            claimsForToken.Add(new Claim("sub", user.UserId.ToString() ?? String.Empty));
            claimsForToken.Add(new Claim("given_name", user.FirstName ?? String.Empty));
            claimsForToken.Add(new Claim("family_name", user.LastName ?? String.Empty));
            claimsForToken.Add(new Claim("email", user.Email ?? String.Empty));
            claimsForToken.Add(new Claim("birthDate", user.BirthDate.ToString() ?? String.Empty));

            double expiryTime = Convert.ToDouble(_configuration["Authentication:TokenExpiryInHours"]);
            var jwtSecurityToken = new JwtSecurityToken(
                _configuration["Authentication:Issuer"],
                _configuration["Authentication:Audience"],
                claimsForToken,
                DateTime.UtcNow,
                DateTime.UtcNow.AddHours(expiryTime),
                signingCredentials
            );

            var jwtToken = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);

            return jwtToken;
        }
        catch (Exception e)
        {
            return null;
        }
    }

    /// <summary>
    /// Store token so we can invalidate it later
    /// </summary>
    /// <param name="token"></param>
    public bool SignOut(string? token)
    {
        if (token == null)
        {
            return false;
        }

        INVALIDATED_TOKENS.Add(token);
        if (INVALIDATED_TOKENS.Count() >= MAX_TOKEN_COUNT)
        {
            INVALIDATED_TOKENS = INVALIDATED_TOKENS.GetRange(100, INVALIDATED_TOKENS.Count());
        }

        return true;
    }
}