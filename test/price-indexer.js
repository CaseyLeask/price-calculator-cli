import assert from 'assert'

import { index } from '../price-indexer.js'

describe('Index price', function() {
  describe('with an empty index', function() {
    const existingIndex = {};

    describe('without any options', function() {
      const price = {
        "product-type": "leggings",
        "options": {},
        "base-price": 5000
      };

      it('should index name under product-type', function() {
        const expected = { 'product-type:leggings': 5000 };
        const actual = index(price, existingIndex);

        assert.deepEqual(actual, expected);
      });
    });
  });
});