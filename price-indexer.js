function index(price) {
  const {
    "product-type": productType,
    "options": options,
    "base-price": basePrice
  } = price;

  let newTerms = [`product-type:${productType}`];

  for (const [property, values] of Object.entries(options).sort()) {
    newTerms = newTerms.flatMap(term => values.map(value => [`${term},${property}:${value}`]));
  }

  return Object.fromEntries(newTerms.map(term => [term, basePrice]));
}

export {
  index
}