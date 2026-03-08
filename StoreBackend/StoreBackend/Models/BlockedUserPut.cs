namespace StoreBackend.Models
{
    public class BlockedUserPut
    {
        public int? UserId { get; set; }

        public string? PhoneNumber { get; set; }

        public BlockedUserPut(int? userId, string? phoneNumber)
        {
            UserId = userId;
            PhoneNumber = phoneNumber;
        }
    }
}
