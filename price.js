function index(product) {
  const {
    "product-type": productType,
    "options": options,
    "base-price": basePrice
  } = product;

  let newTerms = [`product-type:${productType}`];

  for (const [property, values] of Object.entries(options).sort()) {
    newTerms = newTerms.flatMap(term => values.map(value => [`${term},${property}:${value}`]));
  }

  return Object.fromEntries(newTerms.map(term => [term, basePrice]));
}

function find(product) {
  const {
    "product-type": productType,
    "options": options
  } = product;

  let newTerm = `product-type:${productType}`;

  for (const [property, value] of Object.entries(options).sort()) {
    newTerm = `${newTerm},${property}:${value}`;
  }

  return newTerm;
}

export {
  index,
  find
}