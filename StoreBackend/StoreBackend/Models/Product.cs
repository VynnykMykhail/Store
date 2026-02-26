namespace StoreBackend.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public int Price {  get; set; }

        public double Rating { get; set; }

        public int TotalRating { get; set; }

        public int RatingCount { get; set; }

        public bool IsAvaible { get; set; }

        public string ImageURL {  get; set; }

        public Product(string name, string description, int price, double rating, int totalRating, int ratingCount, bool isAvaible, string imageURL)
        {
            Name = name;
            Description = description;
            Price = price;
            Rating = rating;
            TotalRating = totalRating;
            RatingCount = ratingCount;
            IsAvaible = isAvaible;
            ImageURL = imageURL;
        }

        public override string ToString()
        {
            return $"";
        }

    }
}
