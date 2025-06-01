export enum StatusCode {
  Ok = 200,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  InternalServerError = 500,
}

export enum ControlTypeEnum {
  Text,
  Select,
  Date,
  DateRange,
  CheckBox,
  Radio,
  TextArea,
}
