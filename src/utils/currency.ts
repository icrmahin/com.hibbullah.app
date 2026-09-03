import { config } from "../constants/config";

export const formatCurrency = (value: number): string =>
  `${config.currencySymbol}${value.toLocaleString("en-KE", { maximumFractionDigits: 2 })}`;

export const calculateDiscount = (
  price: number,
  discountPercent: number,
): number => Number((price * (discountPercent / 100)).toFixed(2));

export const getSalePrice = (price: number, discountPercent: number): number =>
  Number((price - calculateDiscount(price, discountPercent)).toFixed(2));
