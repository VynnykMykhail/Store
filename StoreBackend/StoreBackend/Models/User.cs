namespace StoreBackend.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string Role { get; set; }

        public string? PhoneNumber {  get; set; }
        public User(string name, string email, string password, string role, string? phoneNumber)
        {
            Name = name;
            Email = email;
            Password = password;
            Role = role;
            PhoneNumber = phoneNumber;
        }


    }
}
