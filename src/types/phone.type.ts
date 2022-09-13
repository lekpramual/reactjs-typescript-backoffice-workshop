interface PhoneDetail {
  date: string;
  src: string;
  src_name: string;
  dst: string;
  dst_name: string;
  duration: string;
  disposition: string;
  dstchannel: string;
}

export interface PhoneResult {
  code: number;
  message: string;
  data: PhoneDetail[];
}

export interface PhoneSearch {
  keyword: string;
  type: number;
  disposition: string;
  dstchannel: string;
  start: Date;
  end: Date;
}
