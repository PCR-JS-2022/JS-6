const { 
  validateCities, 
  validateCity, 
  validateConsumition,
  validateWay
} = require("./validate");


/** Класс навигатора */
class Navigator {
  /**
   * Создает экземпляр навигатора
   * @param {*} cities 
   */
  constructor(cities) {
    validateCities(cities)
		this.cities = cities
  }

  /**
   * Ищет кратчайший путь от точки А до точки B
   * @param {string} pointA 
   * @param {string} pointB 
   * @param {number} consumtion
   */
  buildPath(pointA, pointB, consumtion) {
    validateCity(pointA, this.cities)
    validateCity(pointB, this.cities)
    validateConsumition(consumtion)

    let start= this.cities.find(city => city.name == pointA)
    let visited = []
    let way = []

    const findWay = (currentCity, distance, sum) => {
      if (visited.indexOf(currentCity.name) == -1) {
        if (currentCity.name == pointB) {
          way.push({distance, sum})
          return
        }
        visited.push(currentCity.name)
        for (let path in currentCity.paths) {
          let nextCity = this.cities.find(city => city.name == path)
          let nextDistance = currentCity.paths[path]
          let priceFuel = nextDistance * consumtion * currentCity.petrolPrice
          findWay(nextCity, distance + nextDistance, sum + priceFuel)
        }
      }
    }
    
    findWay(start, 0, 0);
    validateWay(way)
    return way.sort((first, second) => first.distance - second.distance)[0]
  }
}


module.exports = { Navigator };