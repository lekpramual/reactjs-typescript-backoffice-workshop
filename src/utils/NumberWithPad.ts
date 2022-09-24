export function NumberWithPad(num: any, size: number) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return `INV6509${num}`;
}
