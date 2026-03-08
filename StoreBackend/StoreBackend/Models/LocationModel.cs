namespace StoreBackend.Models
{
    public class LocationModel
    {
        public int Id { get; set; }
        public string Location { get; set; }

        public string ShortName { get; set; }

        public LocationModel(string location, string shortName)
        {
            Location = location;
            ShortName = shortName;
        }
    }
}
