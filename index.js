/** Класс навигатора */
class Navigator {
  /**
   * Создает экземпляр навигатора
   * @param {*} cities
   */
  constructor(cities) {
    if (!Array.isArray(cities)
      || cities.some(city => typeof city.name !== 'string'
        || city.name === ''
        || typeof city.petrolPrice !== 'number'
        || typeof city.paths !== 'object'
        || Object.values(city.paths).some(distance => typeof distance !== 'number')
      )
      || cities.map(city => city.name).filter((v, i, a) => a.indexOf(v) === i).length < cities.length) {
      throw new Error();
    }
    this.cities = cities;
  }

  /**
   * Ищет кратчайший путь от точки А до точки B
   * @param {string} pointA
   * @param {string} pointB
   * @param {number} consumtion
   */
  buildPath(pointA, pointB, consumtion) {
    if (typeof pointA !== 'string'
      || pointA === ''
      || typeof pointB !== 'string'
      || pointB === ''
      || this.cities.every(city => pointA !== city.name)
      || this.cities.every(city => pointB !== city.name)
      || typeof consumtion !== 'number'
    ) {
      throw new Error();
    }
    let result = null;

    const findPaths = visited => {
      const cityName = visited.cities[visited.cities.length - 1];

      if (cityName === pointB) {
        if (!result || result.distance > visited.distance) {
          result = {
            distance: visited.distance,
            sum: visited.sum,
          }
        }
        return;
      }
      const currentCity = this.cities.find(city => city.name === cityName);

      Object.entries(currentCity.paths).forEach(([nextCityName, distance]) => {
        if (visited.cities.includes(nextCityName)) {
          return;
        }

        findPaths({
          cities: [...visited.cities, nextCityName],
          distance: visited.distance + distance,
          sum: visited.sum + currentCity.petrolPrice * distance * consumtion,
        });
      });
    };

    findPaths({
      cities: [pointA],
      distance: 0,
      sum: 0,
    });
    if (!result) {
      throw new Error();
    }
    return result;
  }
}

module.exports = { Navigator };
