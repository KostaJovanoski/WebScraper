namespace Api.Contracts;

public interface ICryptoService
{
    string? EncryptHash(string? rawString);
}