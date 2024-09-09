namespace TD.Lib.Helper
{
    public class Utils
    {
        public static string HashPassword(string password)
        {
            // Sử dụng Bcrypt để mã hóa mật khẩu
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        public static bool VerifyPassword(string hashedPassword, string providedPassword)
        {
            // Xác thực mật khẩu đã mã hóa với mật khẩu do người dùng cung cấp
            return BCrypt.Net.BCrypt.Verify(providedPassword, hashedPassword);
        }
    }
}
