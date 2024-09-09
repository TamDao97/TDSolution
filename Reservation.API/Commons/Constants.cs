namespace Reservation.API.Commons
{
    public class Constants
    {
    }

    public class AppSettings
    {
        public Jwt Jwt { get; set; }
    }

    public class Jwt
    {
        public string Key { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }
    }
}
