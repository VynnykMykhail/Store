namespace StoreBackend.Models
{
    public class BlockedUser
    {
        public int Id { get; set; }
        public int? UserId { get; set; }

        public string? PhoneNumber {  get; set; }

        public BlockedUser(int? userId, string? phoneNumber)
        {
            UserId = userId;
            PhoneNumber = phoneNumber;
        }
    }
}
