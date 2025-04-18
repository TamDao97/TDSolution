export enum StatusCode {
  Ok = 200,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  InternalServerError = 500,
}

export enum ToastStatus {
  Success,
  Warning,
  Error,
}

export enum ControlTypeEnum {
  Text,
  Select,
  Date,
  CheckBox,
  Radio,
  TextArea,
}
