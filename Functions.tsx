export function priceToText(num: number){
  const dollars = Math.floor(num);
  const cents = Math.floor(num*100 - dollars*100);
  return '$'+dollars+'.'+(cents<10 ? '0' + cents : cents);
}

export function getPriceTotal(items){
  let sum = 0;
  for (let i = 0; i < items.length; i++) {
    sum += items[i].count*(Math.floor(items[i].price * 100) / 100);
  }
  return sum;
}