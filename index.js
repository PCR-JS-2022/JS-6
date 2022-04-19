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
    if (!(typeof pointA === "string" &&
      typeof pointB === "string" &&
      typeof consumtion === "number")){
      throw new Error("Переданы некорректные данные.");
    }
    const start = this.cities.find(city => city.name === pointA);
    const finish = this.cities.find(city => city.name === pointB);
    const citiesClone = this.cities.slice(0);
    let allResults = [];
    for (const neighbor in start.paths) {
      if (neighbor === finish.name) {
        const distance = start.paths[neighbor];
        const sum = distance * start.petrolPrice * consumtion;
        return {distance, sum};
      }
    }
    const findAllResults = (currCity, distance, sum) => {
      if (currCity.name === finish.name) {
        allResults.push({distance, sum});
        findAllResults(start, 0, 0);
        return;
      }
      if (currCity.visited) {
        return;
      }
      if (currCity.name !== start.name){
       currCity.visited = true; 
      }
      
      for (let neighbor in currCity.paths) {
        if (currCity.name === start.name) {
          distance = 0;
        }
        if (neighbor !== start.name){        
          const currDistance = distance + currCity.paths[neighbor];
          const currSum = sum + currCity.paths[neighbor] * consumtion * currCity.petrolPrice;
          const nextCity = citiesClone.find(city => city.name === neighbor);
          findAllResults(nextCity, currDistance, currSum);
        }
      }
    };
    findAllResults(start, 0, 0);
    if (allResults.length !== 0) {
      return allResults.sort((a, b) => a.distance - b.distance)[0];
    }
    throw new Error("Возможных путей нет.");
  }
}

module.exports = { Navigator };
