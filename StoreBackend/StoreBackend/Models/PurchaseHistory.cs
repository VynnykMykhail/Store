namespace StoreBackend.Models
{
    public class PurchaseHistory
    {
        public int Id { get; set; }

        public int ProductId { get; set; }

        public int? UserId { get; set; }

        public string OrderId { get; set; }

        public string Address { get; set; }

        public DateTime Date { get; set; }

        public int Count { get; set; }
        public int Payment {  get; set; }

        public string Location { get; set; }

        public string? PhoneNumber { get; set; }

        public string? UserEmail { get; set; }


        public PurchaseHistory( int productId, int? userId, string orderId, string address, DateTime date, int count, int payment, string location, string? phoneNumber, string? userEmail)
        {
            ProductId = productId;
            UserId = userId;
            Address = address;
            Date = date;
            Count = count;
            Payment = payment;
            Location = location;
            PhoneNumber = phoneNumber;
            UserEmail = userEmail;
            OrderId = orderId;
        }
    }
}
