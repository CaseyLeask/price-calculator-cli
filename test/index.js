import assert from 'assert'
import { readFileSync } from 'fs'

import { calculateTotal } from '../index.js'

describe('Calculate prices', function() {
  describe('with base-prices.json', function() {
    const prices = JSON.parse(readFileSync("base-prices.json"));

    describe('with cart-4560.json', function() {
      const cart = JSON.parse(readFileSync("cart-4560.json"));

      it('should return 4560', function() {
        assert.equal(calculateTotal(cart, prices), 4560);
      });
    });
  });
});
