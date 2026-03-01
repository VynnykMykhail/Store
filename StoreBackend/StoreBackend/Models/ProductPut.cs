namespace StoreBackend.Models
{
    public class ProductPut
    {
        public string Name { get; set; }
        public string Description { get; set; }

        public int Price { get; set; }

        public bool IsAvaible { get; set; }

        public string ImageURL { get; set; }

        public ProductPut(string name, string description, int price, bool isAvaible, string imageURL)
        {
            Name = name;
            Description = description;
            Price = price;
            IsAvaible = isAvaible;
            ImageURL = imageURL;
        }
    }
}
