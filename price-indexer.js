function index(price, existingIndex) {
  const {
    "product-type": productType,
    "options": options,
    "base-price": basePrice
  } = price;

  let newTerms = [`product-type:${productType}`];

  for (const [property, values] of Object.entries(options).sort()) {
    newTerms = newTerms.flatMap(term => values.map(value => [`${term},${property}:${value}`]));
  }

  const newEntries = Object.fromEntries(newTerms.map(term => [term, basePrice]));

  return {
    ...existingIndex,
    ...newEntries
  };
}

export {
  index
}