namespace StoreBackend.Models
{
    public class BlockedUser
    {
        public int Id { get; set; }
        public int UserId { get; set; }

        public BlockedUser(int userId)
        {
            UserId = userId;
        }
    }
}
