interface DepartmentDetail {
  dept_id: string;
  dept_name: string;
  dept_status: string;
  CCID: string;
}

export interface DepartmentResult {
  result: string;
  message: string;
  data: DepartmentDetail[];
}

export interface DepartmentSearch {
  id: string;
}
