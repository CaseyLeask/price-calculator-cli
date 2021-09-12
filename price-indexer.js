function index(price, existingIndex) {
  const {
    "product-type": productType,
    "options": _options,
    "base-price": basePrice
  } = price;

  return {
    ...existingIndex,
    [`product-type:${productType}`]: basePrice
  };
}

export {
  index
}