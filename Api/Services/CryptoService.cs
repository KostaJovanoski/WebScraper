using System.Security.Cryptography;
using System.Text;
using Api.Contracts;

namespace Api.Services;

public class CryptoService : ICryptoService
{
    public CryptoService()
    {
    }

    /// <summary>
    /// Encrypt string
    /// </summary>
    /// <param name="rawString"></param>
    /// <returns></returns>
    public string? EncryptHash(string? rawString)
    {
        if (rawString == null)
        {
            return null;
        }

        using HashAlgorithm hash256 = SHA256.Create();
        var hashedBytes = hash256.ComputeHash(Encoding.UTF8.GetBytes(rawString));
        var hashVal = BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
        return hashVal;
    }
}