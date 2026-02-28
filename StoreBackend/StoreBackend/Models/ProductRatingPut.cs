namespace StoreBackend.Models
{
    public class ProductRatingPut
    {
        public int ProductId { get; set; }

        public short Rate { get; set; }

        public ProductRatingPut(int productId, short rate)
        {
            ProductId = productId;
            Rate = rate;
        }
    }
}
