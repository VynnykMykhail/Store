namespace StoreBackend.Models
{
    public class ImageModel { 
        public int Id { get; set; }
        public string Name { get; set; }
        public byte[] Data { get; set; }


        public ImageModel(string name, byte[] data)
        {
            Name = name;
            Data = data;
        }
    }

}
