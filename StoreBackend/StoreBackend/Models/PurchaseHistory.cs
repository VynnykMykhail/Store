namespace StoreBackend.Models
{
    public class PurchaseHistory
    {
        public int Id { get; set; }

        public int ProductId { get; set; }

        public int UserId { get; set; }

        public string Address { get; set; }

        public DateTime Date { get; set; }

        public int Payment {  get; set; }


        public PurchaseHistory( int productId, int userId, string address, DateTime date, int payment)
        {
            ProductId = productId;
            UserId = userId;
            Address = address;
            Date = date;
            Payment = payment;
        }
    }
}
