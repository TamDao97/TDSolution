using System.ComponentModel;

namespace Reservation.API.DataContext.Enums
{
    public enum ImageType
    {
        [Description("Nhỏ")]
        SMALL = 1,

        [Description("Trung bình")]
        MIDDLE = 2,

        [Description("Lớn")]
        LARGE = 3,

        [Description("Khác")]
        ORTHER = 4,
    }

    public enum ReservationStatusEnums
    {
        [Description("Chờ xếp bàn")]
        ChoXepBan = 1,

        [Description("Đã xếp bàn")]
        DaXepBan = 2,

        [Description("Đã nhận bàn")]
        DaNhanBan = 3,

        [Description("Quá giờ/ Không đến")]
        QuaGioOrKhongDen = 4,

        [Description("Đã hủy")]
        DaHuy = 5,
    }

    public enum GenderEnums
    {
        [Description("Nam")]
        Male,
        [Description("Nữ")]
        FeMale1
    }
}
