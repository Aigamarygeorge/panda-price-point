
export const formatPrice = (
  price: number, 
  currency: string = 'USD',
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(price);
};

export const calculateSavings = (price: number, comparePrice: number): number => {
  return comparePrice - price;
};

export const calculateSavingsPercentage = (price: number, comparePrice: number): number => {
  return ((comparePrice - price) / comparePrice) * 100;
};

export const findLowestPrice = (prices: { price: number }[]): number => {
  if (prices.length === 0) return 0;
  return Math.min(...prices.map(p => p.price));
};

export const findHighestPrice = (prices: { price: number }[]): number => {
  if (prices.length === 0) return 0;
  return Math.max(...prices.map(p => p.price));
};
