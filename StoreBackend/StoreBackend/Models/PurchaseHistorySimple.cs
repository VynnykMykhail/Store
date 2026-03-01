namespace StoreBackend.Models
{
    public class PurchaseHistorySimple
    {
        public int ProductId { get; set; }
        public int Count { get; set; }
        public int Payment { get; set; }

        public PurchaseHistorySimple(int productId, int count, int payment)
        {
            ProductId = productId;
            Count = count;
            Payment = payment;
        }
    }
}
