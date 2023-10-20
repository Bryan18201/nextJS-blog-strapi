export const formatPrice = (price: number) => {
    return price.toLocaleString("en", { maximumFractionDigits: 0 });
  };