
export function priceToText(num: number){
  const dollars = Math.floor(num);
  const cents = Math.floor(num*100 - dollars*100);
  return '$'+dollars+'.'+(cents<10 ? '0' + cents : cents);
}