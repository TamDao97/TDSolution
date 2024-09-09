using System.ComponentModel;

namespace TD.Lib.Common
{
    public enum StatusCode
    {
        [Description("Ok")]
        Ok = 200,

        [Description("BadRequest")]
        BadRequest = 400,

        [Description("Unauthorized")]
        Unauthorized = 401,

        [Description("Forbidden")]
        Forbidden = 403,

        [Description("NotFound")]
        NotFound = 404,

        [Description("Method Not Allowed")]
        MethodNotAllowed = 405,

        [Description("Internal Server Error")]
        InternalServerError = 500
    };

    public class Response<T> where T : new()
    {
        public StatusCode Status { get; set; }
        public string Message { get; set; }
        public T Data { get; set; }

        /// <summary>
        /// Response success
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="data"></param>
        /// <param name="message"></param>
        /// <returns></returns>
        public static Response<T> Success(T data, string message)
        {
            return new Response<T>
            {
                Status = StatusCode.Ok,
                Message = message,
                Data = data
            };
        }

        /// <summary>
        /// if has orther error then set 500 for status
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="data"></param>
        /// <param name="status"></param>
        /// <param name="message"></param>
        /// <returns></returns>
        public static Response<T> Error(StatusCode status, string message, T data = default)
        {
            return new Response<T>
            {
                Status = status,
                Message = message,
                Data = data
            };
        }
    }

    public class Response
    {
        public StatusCode Status { get; set; }
        public string Message { get; set; }

        /// <summary>
        /// Response success
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="data"></param>
        /// <param name="message"></param>
        /// <returns></returns>
        public static Response Success(string message)
        {
            return new Response
            {
                Status = StatusCode.Ok,
                Message = message
            };
        }

        /// <summary>
        /// if has orther error then set 500 for status
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="data"></param>
        /// <param name="status"></param>
        /// <param name="message"></param>
        /// <returns></returns>
        public static Response Error(StatusCode status, string message)
        {
            return new Response
            {
                Status = status,
                Message = message
            };
        }
    }
}
