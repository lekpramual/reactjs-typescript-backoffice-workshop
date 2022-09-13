interface carResultSub {
  blacklistid: number;
  licenseplate: any;
  comment: string;
}

export interface carResult {
  status: boolean;
  message: string;
  data: carResultSub[];
}
