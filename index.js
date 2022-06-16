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
   * @param {number} consumtion - расход
   */
  buildPath(pointA, pointB, consumtion) {
    if (
      typeof pointA !== "string"  ||
      typeof pointB !== "string" ||
      typeof consumtion !== "number"
    ) {
      throw new Error("Неверный путь");
    }

    let citiesName = this.cities.map((city) => ({ ...city, Visited: false }));
    let result = [];

    let findAWays = (cityName, distance, sum) => {
      let nameCity = citiesName.find((c) => c.name === cityName);
      let cityEnd = this.cities.find((city) => city.name === pointB);

      if (cityName === cityEnd.name) {
        result.push({ distance, sum });
        return;
      }

      if (nameCity.Visited) {
        return;
      }
      nameCity.Visited = true;

      for (let currentNmaeOfCity in nameCity.paths) {
        let currentDistance = distance + nameCity.paths[currentNmaeOfCity];
        let currentSum =
          sum +
          nameCity.paths[currentNmaeOfCity] * nameCity.petrolPrice * consumtion;
        findAWays(currentNmaeOfCity, currentDistance, currentSum);
      }
    };

    let cityStart = this.cities.find((city) => city.name === pointA);
    findAWays(cityStart.name, 0, 0);

    if (result.length === 0) throw new Error("Нет пути из города A в город B");
    return result.sort((a, b) => a.distance - b.distance)[0];
  }
  
}

module.exports = { Navigator };
