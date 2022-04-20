/** Класс навигатора */
class Navigator {
  /**
   * Создает экземпляр навигатора
   * @param {*} cities 
   */
  constructor(cities) {
    if (!Array.isArray(cities) || cities.every(city => typeof city !== 'object')) {
      throw new TypeError()
    };

    this.cities = cities;
  }

  /**
   * Ищет кратчайший путь от точки А до точки B
   * @param {string} pointA 
   * @param {string} pointB 
   * @param {number} consumtion
   */
  buildPath(pointA, pointB, consumtion) {
    if (typeof pointA !== 'string' || typeof pointB !== 'string' || typeof consumtion !== 'number') {
      throw new TypeError()
    }

    let startVertex = this.cities.find(city => city.name === pointA);
    let finishVertex = this.cities.find(city => city.name === pointB);
    let visited = {};
    let result = [];

    const findPath = (activeVertex, pathLength, tempCost) => {
      if (!visited.hasOwnProperty(activeVertex.name)) {
        if (activeVertex === finishVertex) {
          result.push({ distance: pathLength, sum: tempCost });
          return;
        }

        visited[activeVertex.name] = 1;

        for (let path in activeVertex.paths) {
          let nextVertex = this.cities.find(c => c.name === path);
          let distance = activeVertex.paths[path];
          let cost = distance * consumtion * activeVertex.petrolPrice;
          findPath(nextVertex, pathLength + distance, tempCost + cost);
        }
      }
    }

    findPath(startVertex, 0, 0);

    if (result.length === 0) {
      throw new Error("There is no path between cities");
    }

    return result.sort((first, second) => first.distance - second.distance)[0];
  }
}

module.exports = { Navigator };