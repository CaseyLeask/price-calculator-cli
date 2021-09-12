import assert from 'assert'

import { index } from '../price.js'

describe('Index price', function() {
  describe('without any options', function() {
    const price = {
      "product-type": "leggings",
      "options": {},
      "base-price": 5000
    };

    it('should index name under product-type', function() {
      const expected = { 'product-type:leggings': 5000 };
      const actual = index(price);

      assert.deepEqual(actual, expected);
    });
  });

  describe('with one option and one value', function() {
    const price = {
      "product-type": "sticker",
      "options": {
        "size": ["xl"]
      },
      "base-price": 1417
    };

    it('should index name under product-type and options', function() {
      const expected = { 'product-type:sticker,size:xl': 1417 };
      const actual = index(price);

      assert.deepEqual(actual, expected);
    });

  });

  describe('with one option and two values', function() {
    const price = {
      "product-type": "sticker",
      "options": {
        "size": ["large", "xl"]
      },
      "base-price": 1417
    };

    it('should index name under product-type and options', function() {
      const expected = {
        'product-type:sticker,size:xl': 1417,
        'product-type:sticker,size:large': 1417
      };
      const actual = index(price);

      assert.deepEqual(actual, expected);
    });

  });

  describe('with two sorted options', function() {
    const price = {
      "product-type": "hoodie",
      "options": {
        "colour": ["dark"],
        "size": ["xl", "2xl", "3xl"]
      },
      "base-price": 4368
    };

    it('should index name under product-type and options', function() {
      const expected = {
        'product-type:hoodie,colour:dark,size:xl': 4368,
        'product-type:hoodie,colour:dark,size:2xl': 4368,
        'product-type:hoodie,colour:dark,size:3xl': 4368
      };
      const actual = index(price);

      assert.deepEqual(actual, expected);
    });

  });

  describe('with two unsorted options', function() {
    const price = {
      "product-type": "hoodie",
      "options": {
        "size": ["large"],
        "colour": ["white"]
      },
      "base-price": 3848
    };

    it('should index name under product-type and options', function() {
      const expected = {
        'product-type:hoodie,colour:white,size:large': 3848
      };
      const actual = index(price);

      assert.deepEqual(actual, expected);
    });

  });
});