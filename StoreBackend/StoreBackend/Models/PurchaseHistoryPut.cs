namespace StoreBackend.Models
{
    public class PurchaseHistoryPut
    {
        public string Address { get; set;}

        public List<PurchaseHistorySimple> PurchaseHistory { get; set; }

        public PurchaseHistoryPut(string address, List<PurchaseHistorySimple> purchaseHistory)
        {
            Address = address;
            PurchaseHistory = purchaseHistory;
        }
    }
}
