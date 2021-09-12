import { readFileSync } from 'fs'

function cli(args) {

  if (args.length != 2) {
    console.log('Please provide only two command-line arguments:');
    console.log('A JSON file representing a cart, and');
    console.log('A JSON file representing a list of base prices.');
    process.exit(1);
  }

  // FIXME:
  // You need not test that the input files conform with their schemas or handle errors that arise if they don't conform or if they don't go with each other (e.g. if there is no base price for a product type in the cart).
  // We'd all want those tests in a production application, but in this exercise they tend to take time without adding interest.
  const cart = JSON.parse(readFileSync(args[0]));
  const basePrices = JSON.parse(readFileSync(args[1]));

  console.log("cart:", cart);
  console.log("basePrices:", basePrices);
}

export {
  cli
}