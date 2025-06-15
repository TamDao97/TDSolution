namespace Reservation.API.Commons
{
    public static class ErrorMess
    {
        /// <summary>
        /// Field is duplicated
        /// </summary>
        public static Func<string, string> Duplicated = (string field) => string.Format("{0} đã tồn tại trên hệ thống!", field);

        /// <summary>
        /// Mật khẩu xác nhận không chính xác
        /// </summary>

        public static string PasswordMismatch = string.Format("Mật khẩu xác nhận không chính xác!");
    }
}
