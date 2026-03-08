namespace StoreBackend.Models
{
    public class Order
    {
        public string Id { get; set; }

        public int? UserId { get; set; }

        public string? PhoneNumber { get; set; }

        public string Address { get; set; }

        public string Location { get; set; }

        public DateTime Date { get; set; }

        public int Amount { get; set; }

        public string Status { get; set; }


        public Order(string id, int? userId, string? phoneNumber, string address, string location, DateTime date, int amount, string status)
        {
            Id = id;
            UserId = userId;
            PhoneNumber = phoneNumber;
            Address = address;
            Location = location;
            Date = date;
            Amount = amount;
            Status = status;
        }
    }
}
