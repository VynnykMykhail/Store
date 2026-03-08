namespace StoreBackend.Models
{
    public class PurchaseHistoryPut
    {
        public string Address { get; set;}

        public string Location { get; set; }

        public bool UsingNumber { get; set;}
        public string? PhoneNumber { get; set; }
        public List<PurchaseHistorySimple> PurchaseHistory { get; set; }

        public PurchaseHistoryPut(string address,string location, bool usingNumber, string? phoneNumber, List<PurchaseHistorySimple> purchaseHistory)
        {
            Address = address;
            PurchaseHistory = purchaseHistory;
            Location = location;
            PhoneNumber = phoneNumber;
            UsingNumber = usingNumber;
        }
    }
}
