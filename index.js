/** Класс навигатора */
class Navigator {
  /**
   * Создает экземпляр навигатора
   * @param {*} cities
   */
  constructor(cities) {
    this.cities = cities;
  }

  /**
   * Ищет кратчайший путь от точки А до точки B
   * @param {string} pointA
   * @param {string} pointB
   * @param {number} consumtion
   */
  buildPath(pointA, pointB, consumtion) {
    if (typeof pointA !== "string"){
      throw new Error("Неверное значение первого города");
    }

    if (typeof pointB !== "string"){
      throw new Error("Неверное значение второго города");
    }
      
    if (typeof consumtion !== "number"){
      throw new Error("Неверное значение расхода");
    }
      
    let result = null;

    const findPaths = (visited) => {
      const cityName = visited.cities[visited.cities.length - 1];

      if (cityName === pointB) {
        if (!result || result.distance > visited.distance) {
          result = {
            distance: visited.distance,
            sum: visited.sum,
          };
        }
        return;
      }
      const currentCity = this.cities.find((city) => city.name === cityName);

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
