const assert = require('assert');
const { Navigator } = require('../index');

const testData1 = [
  {
    name: 'Ekb',
    petrolPrice: 50.00,
    paths: {
      Chelyabinsk: 200,
      Tumen: 350,
    }
  },
  {
    name: 'Perm',
    petrolPrice: 46.00,
    paths: {
      Ekb: 300,
      Chelyabinsk: 500,
      Tumen: 650,
    },
  },
  {
    name: 'Chelyabinsk',
    petrolPrice: 42.45,
    paths: {
      Ekb: 400,
      Perm: 700,
      Tumen: 748,
    },
  },
  {
    name: 'Tumen',
    petrolPrice: 60.45,
    paths: {
      Ekb: 9,
      Perm: 780,
      Chelyabinsk: 130,
    },
  }
];

describe('Navigator.buildPath', () => {

  it('Корректно расчитывает путь (1)', () => {
    const nav = new Navigator(testData1);
    assert.deepEqual(
      nav.buildPath('Ekb', 'Perm', 0.06),
      {
        distance: 900,
        sum: 2382.9,
      },
    );
  });

});