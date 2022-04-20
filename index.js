const { 
  validateCities, 
  validateCity, 
  validateConsumition 
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
    validateCity(pointA)
    validateCity(pointB)
    validateConsumition(consumtion)

    if (pointA == pointB) {
      return 0, 0
    }

    let cities = this.cities.map((city) => ({...city, visited: false}))

    let isFind = false
    let start = cities.find((city) => city.name == pointA)
  }
}


module.exports = { Navigator };