interface NumberResultSub {
  num: string;
  name: string;
}

export interface NumberResult {
  status: boolean;
  message: string;
  data: NumberResultSub[];
}

export interface numberData {
  num: string;
  name: string;
}
