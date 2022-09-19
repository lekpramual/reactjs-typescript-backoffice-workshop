export function numberWithPad(num: any, size: number) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return `INV-${num}`;
}