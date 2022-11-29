// Success Page
export const LOGIN_FETCHING = "LOGIN_FETCHING";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";

// Register Page
export const REGISTER_FETCHING = "REGISTER_FETCHING";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

// Stock Page
export const STOCK_FETCHING = "STOCK_FETCHING";
export const STOCK_SUCCESS = "STOCK_SUCCESS";
export const STOCK_FAILED = "STOCK_FAILED";
export const STOCK_CLEAR = "STOCK_CLEAR";

// Stock Edit Page
export const STOCK_EDIT_FETCHING = "STOCK_EDIT_FETCHING";
export const STOCK_EDIT_SUCCESS = "STOCK_EDIT_SUCCESS";
export const STOCK_EDIT_FAILED = "STOCK_EDIT_FAILED";

export const apiUrl = "http://comcenter.reh.go.th:4203/api/v1";
export const apiPhoneUrl = "http://192.168.144.1/phone/server/apis";
export const apiUrlHis = "http://webapp3.intranet:8088";
export const apiUrlBackOffice = "http://webapp3.intranet:8089";
// export const apiUrlBackOfficeV1 = "http://localhost:4200";
export const apiUrlBackOfficeV1 = "http://api.reh.go.th:8090";
export const imageUrl = "http://localhost:8085";
export const secretKey = "96Udcddbo9y[";
export const secretAuth = "pramual:96Udcddbo9y[";

export const authen = `${process.env.APP_USER}:${process.env.PUBLIC_URL}`;

export const YES = "YES";
export const NO = "NO";
export const OK = "ok";
export const NOK = "nok";
export const TOKEN = "TOKEN";

export const LOGIN_STATUS = "LOGIN_STATUS";
export const LOGIN_TOKENS = "LOGIN_TOKENS";

export const LOGIN_STATUS_V2 = "LOGIN_STATUS_V2";
export const LOGIN_TOKENS_V2 = "LOGIN_TOKENS_V2";

export const server = {
  LOGIN_URL: `authen/login`,
  HOSXP_URL: `${apiUrlHis}/his`,
  SERVICE_URL: `${apiUrlBackOffice}/service`,
  BACKOFFICE_URL_V1: `${apiUrlBackOfficeV1}/reh/api/v1`,
  BACKOFFICE_URL_File: `${apiUrlBackOfficeV1}/files`,
  LOGIN_PASSED: `yes`,
};

// Error Code
export const E_PICKER_CANCELLED = "E_PICKER_CANCELLED";
export const E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR =
  "E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR";
export const E_PERMISSION_MISSING = "E_PERMISSION_MISSING";
export const E_PICKER_NO_CAMERA_PERMISSION = "E_PICKER_NO_CAMERA_PERMISSION";
export const E_USER_CANCELLED = "E_USER_CANCELLED";
export const E_UNKNOWN = "E_UNKNOWN";
export const E_DEVELOPER_ERROR = "E_DEVELOPER_ERROR";
export const TIMEOUT_NETWORK = "ECONNABORTED"; // request service timeout
export const NOT_CONNECT_NETWORK = "NOT_CONNECT_NETWORK";

//////////////// Localization Begin ////////////////
export const NETWORK_CONNECTION_MESSAGE =
  "Cannot connect to server, Please try again.";
export const NETWORK_TIMEOUT_MESSAGE =
  "A network timeout has occurred, Please try again.";
export const UPLOAD_PHOTO_FAIL_MESSAGE =
  "An error has occurred. The photo was unable to upload.";
