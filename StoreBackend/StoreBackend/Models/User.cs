namespace StoreBackend.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Address { get; set; }
        public string Name { get; set; }

        public User(string address, string name)
        {
            Address = address;
            Name = name;
        }

        public override string ToString()
        {
            return $"Id: {Id}, Address: {Address}, name: {Name}";
        }

    }
}
