namespace Reservation.API.Attributes
{
    [AttributeUsage(AttributeTargets.Class)]
    public class TDModuleAttribute : Attribute
    {
        public string Description { get; }
        public int Order { get; }

        public TDModuleAttribute(string description, int order)
        {
            Description = description;
            Order = order;
        }
    }
}
