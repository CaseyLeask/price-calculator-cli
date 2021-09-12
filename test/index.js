import assert from 'assert'
import { readFileSync } from 'fs'

import { calculateTotal } from '../index.js'

describe('Calculate prices', function() {
  describe('with base-prices.json', function() {
    const prices = JSON.parse(readFileSync(new URL("./base-prices.json", import.meta.url)));

    describe('with cart-4560.json', function() {
      const cart = JSON.parse(readFileSync(new URL("./cart-4560.json", import.meta.url)));

      it.skip('should return 4560', function() {
        assert.equal(calculateTotal(cart, prices), 4560);
      });
    });

    describe('with cart-9363.json', function() {
      const cart = JSON.parse(readFileSync(new URL("./cart-9363.json", import.meta.url)));

      it.skip('should return 9363', function() {
        assert.equal(calculateTotal(cart, prices), 9363);
      });
    });

    describe('with cart-9500.json', function() {
      const cart = JSON.parse(readFileSync(new URL("./cart-9500.json", import.meta.url)));

      it.skip('should return 9500', function() {
        assert.equal(calculateTotal(cart, prices), 9500);
      });
    });

    describe('with cart-11356.json', function() {
      const cart = JSON.parse(readFileSync(new URL("./cart-11356.json", import.meta.url)));

      it.skip('should return 11356', function() {
        assert.equal(calculateTotal(cart, prices), 11356);
      });
    });

  });
});
