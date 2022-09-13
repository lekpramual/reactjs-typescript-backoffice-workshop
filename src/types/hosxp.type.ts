interface HosxpDetail {
  loginname: string;
  kskloginname: string;
  ksklogintime: string;
}

export interface HosxpResult {
  status: boolean;
  message: string;
  data: HosxpDetail[];
}

export interface HosxpSearch {
  keyword: string;
}

export interface HosxpDelete {
  loginname: string;
  kskloginname: string;
  ksklogintime: string;
}
