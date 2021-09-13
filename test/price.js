import assert from 'assert'

import { index, find, calculate } from '../price.js'

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

describe('Find price', function() {
  describe('without indexed options', function() {
    const indexedOptions = { hoodie: [], sticker: [], leggings: [] };

    describe('without any options', function() {
      const price = {
        "product-type": "leggings",
        "options": {}
      };

      it('should index name under product-type', function() {
        const expected = 'product-type:leggings';
        const actual = find(price, indexedOptions);

        assert.deepEqual(actual, expected);
      });
    });

    describe('with one option and one value', function() {
      const price = {
        "product-type": "sticker",
        "options": {
          "size": "xl"
        }
      };

      it('should index name under product-type', function() {
        const expected = 'product-type:sticker';
        const actual = find(price, indexedOptions);

        assert.deepEqual(actual, expected);
      });
    });
  });

  describe('with indexed options', function() {
    const indexedOptions = { hoodie: [ 'colour', 'size' ], sticker: [ 'size' ], leggings: [] }

    describe('without any options', function() {
      const price = {
        "product-type": "leggings",
        "options": {}
      };

      it('should index name under product-type', function() {
        const expected = 'product-type:leggings';
        const actual = find(price, indexedOptions);

        assert.deepEqual(actual, expected);
      });
    });

    describe('with one option and one value', function() {
      const price = {
        "product-type": "sticker",
        "options": {
          "size": "xl"
        }
      };

      it('should index name under product-type and options', function() {
        const expected = 'product-type:sticker,size:xl';
        const actual = find(price, indexedOptions);

        assert.deepEqual(actual, expected);
      });
    });

    describe('with two sorted options', function() {
      const price = {
        "product-type": "hoodie",
        "options": {
          "colour": "dark",
          "size": "xl"
        }
      };

      it('should index name under product-type and options', function() {
        const expected = 'product-type:hoodie,colour:dark,size:xl';
        const actual = find(price, indexedOptions);

        assert.deepEqual(actual, expected);
      });

    });

    describe('with two unsorted options', function() {
      const price = {
        "product-type": "hoodie",
        "options": {
          "size": "large",
          "colour": "white"
        }
      };

      it('should index name under product-type and options', function() {
        const expected = 'product-type:hoodie,colour:white,size:large';
        const actual = find(price, indexedOptions);

        assert.deepEqual(actual, expected);
      });

    });

    describe('with extra options', function() {
      const price = {
        "product-type": "hoodie",
        "options": {
          "size": "xl",
          "colour": "dark",
          "print-location": "back"
        },
        "artist-markup": 30,
        "quantity": 2
      };

      it('should index name under product-type and options', function() {
        const expected = 'product-type:hoodie,colour:dark,size:xl';
        const actual = find(price, indexedOptions);

        assert.deepEqual(actual, expected);
      });
    });
  });
});

describe('Calculate price', function() {
  describe('with cart-4560', function() {
    const product = {
      "product-type": "hoodie",
      "options": {
        "size": "small",
        "colour": "white",
        "print-location": "front"
      },
      "artist-markup": 20,
      "quantity": 1,
      "base-price": 3800
    };

    it('should return price of 4560', function() {
      assert.equal(calculate(product), 4560);
    });
  });

  describe('with cart-9363', function() {
    const products = [
      {
        "product-type": "hoodie",
        "options": {
          "size": "small",
          "colour": "dark",
          "print-location": "front"
        },
        "artist-markup": 20,
        "quantity": 2,
        "base-price": 3800
      },
      {
        "product-type": "sticker",
        "options": {
          "size": "small"
        },
        "artist-markup": 10,
        "quantity": 1,
        "base-price": 221
      }
    ];

    it('should return price of 9363', function() {
      const actual = products.map(calculate).reduce((a, b) => a + b);
      assert.equal(actual, 9363);
    });
  });

  describe('with cart-9500', function() {
    const products = [
      {
        "product-type": "hoodie",
        "options": {
          "size": "small",
          "colour": "white",
          "print-location": "front"
        },
        "artist-markup": 20,
        "quantity": 1,
        "base-price": 3800
      },
      {
        "product-type": "hoodie",
        "options": {
          "size": "small",
          "colour": "dark",
          "print-location": "front"
        },
        "artist-markup": 30,
        "quantity": 1,
        "base-price": 3800
      }
    ];

    it('should return price of 9500', function() {
      const actual = products.map(calculate).reduce((a, b) => a + b);
      assert.equal(actual, 9500);
    });
  });

  describe('with cart-11356', function() {
    const product = {
      "product-type": "hoodie",
      "options": {
        "size": "xl",
        "colour": "dark",
        "print-location": "back"
      },
      "artist-markup": 30,
      "quantity": 2,
      "base-price": 4368
    };

    it('should return price of 11356', function() {
      assert.equal(calculate(product), 11356);
    });
  });
});
