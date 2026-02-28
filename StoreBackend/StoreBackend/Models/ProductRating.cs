namespace StoreBackend.Models
{
    public class ProductRating
    {
        public int Id { get; set; }

        public int ProductId { get; set; }

        public int UserId { get; set; }

        public short Rate { get; set; }

        public ProductRating(int productId, int userId, short rate)
        {
            ProductId = productId;
            UserId = userId;
            Rate = rate;
        }
    }
}
