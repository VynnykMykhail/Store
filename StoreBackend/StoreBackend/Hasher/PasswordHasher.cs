using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Org.BouncyCastle.Utilities;
using System.Security.Cryptography;

namespace StoreBackend.Hasher
{
    public class PasswordHasher
    {
        private const int saltSize = 16;
        public static string HashPassword(string password)
        {
            byte[] salt = RandomNumberGenerator.GetBytes(saltSize);
            byte[] hash = KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 100000,
                numBytesRequested: 32
            );

            return $"{Convert.ToBase64String(salt)}:{Convert.ToBase64String(hash)}";
        }

        public static bool ComparePasswords(string password, string hashedPassword)
        {
            string[] storedPassword=hashedPassword.Split(':');
            byte[] hash=Convert.FromBase64String(storedPassword[1]);
            byte[] salt= Convert.FromBase64String(storedPassword[0]);

            byte[] inputHash = KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 100000,
                numBytesRequested: 32
            );

            return CryptographicOperations.FixedTimeEquals( inputHash, hash );
        }
    }
}
