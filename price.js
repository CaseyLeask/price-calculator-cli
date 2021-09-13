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

function options(product) {
  const {
    "product-type": productType,
    "options": options
  } = product;

  return {
    [productType]: Object.keys(options)
  };
}

function find(product, indexedOptions) {
  const {
    "product-type": productType,
    "options": options
  } = product;

  const indexedProductOptions = indexedOptions[productType];

  const filteredSearchOptions = Object.entries(options)
                                      .filter(([key, _]) => indexedProductOptions.includes(key))
                                      .sort();

  let newTerm = `product-type:${productType}`;

  for (const [property, value] of filteredSearchOptions) {
    newTerm = `${newTerm},${property}:${value}`;
  }

  return newTerm;
}

function calculate(product) {
  const {
    'artist-markup': artistMarkup,
    quantity,
    'base-price': basePrice
  } = product;

  return (basePrice + Math.floor(basePrice * artistMarkup / 100.0)) * quantity;
}

export {
  index,
  options,
  find,
  calculate
}