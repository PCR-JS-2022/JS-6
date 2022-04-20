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

  it('Корректно расчитывает путь (2)', () => {
    const nav = new Navigator(testData1);
    assert.deepEqual(
      nav.buildPath('Ekb', 'Chelyabinsk', 0.06),
      {
        distance: 200,
        sum: 600,
      },
    );
  });

  it('Корректно расчитывает путь (3)', () => {
    const nav = new Navigator(testData1);
    assert.deepEqual(
      nav.buildPath('Ekb', 'Tumen', 0.06),
      {
        distance: 350,
        sum: 1050,
      },
    );
  });

  it('Корректно расчитывает путь (4)', () => {
    const nav = new Navigator(testData1);
    assert.deepEqual(
      nav.buildPath('Perm', 'Ekb', 0.06),
      {
        distance: 300,
        sum: 828,
      },
    );
  });

  it('Корректно расчитывает путь (5)', () => {
    const nav = new Navigator(testData1);
    assert.deepEqual(
      nav.buildPath('Perm', 'Chelyabinsk', 0.06),
      {
        distance: 500,
        sum: 1380,
      },
    );
  });

  it('Корректно расчитывает путь (6)', () => {
    const nav = new Navigator(testData1);
    assert.deepEqual(
      nav.buildPath('Perm', 'Tumen', 0.06),
      {
        distance: 650,
        sum: 1794,
      },
    );
  });

  it('Корректно расчитывает путь (7)', () => {
    const nav = new Navigator(testData1);
    assert.deepEqual(
      nav.buildPath('Chelyabinsk', 'Ekb', 0.06),
      {
        distance: 400,
        sum: 1018.8,
      },
    );
  });

  it('Корректно расчитывает путь (8)', () => {
    const nav = new Navigator(testData1);
    assert.deepEqual(
      nav.buildPath('Chelyabinsk', 'Perm', 0.06),
      {
        distance: 700,
        sum: 1782.9,
      },
    );
  });

  it('Корректно расчитывает путь (9)', () => {
    const nav = new Navigator(testData1);
    assert.deepEqual(
      nav.buildPath('Chelyabinsk', 'Tumen', 0.06),
      {
        distance: 748,
        sum: 1905.156,
      },
    );
  });

  it('Корректно расчитывает путь (10)', () => {
    const nav = new Navigator(testData1);
    assert.deepEqual(
      nav.buildPath('Tumen', 'Ekb', 0.06),
      {
        distance: 9,
        sum: 32.643,
      },
    );
  });

  it('Корректно расчитывает путь (11)', () => {
    const nav = new Navigator(testData1);
    assert.deepEqual(
      nav.buildPath('Tumen', 'Perm', 0.06),
      {
        distance: 780,
        sum: 2829.06,
      },
    );
  });

  it('Корректно расчитывает путь (11)', () => {
    const nav = new Navigator(testData1);
    assert.deepEqual(
      nav.buildPath('Tumen', 'Chelyabinsk', 0.06),
      {
        distance: 130,
        sum: 471.51,
      },
    );
  });


});