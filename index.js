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
    if (typeof pointA !== 'string' || !pointA || typeof pointB !== 'string' || !pointB)
      throw new Error('Неверно задан путь')

    if (typeof consumtion !== 'number' || !pointB)
      throw new Error('Топливо расходуется неверно')

    const tempCities = this.cities.map(city => ({ ...city, visited: false }))
    let result = {
      distance: Number.MAX_VALUE
    }

    const getAllPaths = (currentCity, distance, sum) => {


      if (currentCity.visited || currentCity.name === pointB) {
        if (currentCity.name === pointB && result.distance > distance) {
          result = { distance, sum }
        }
        return
      }

      currentCity.visited = true

      for (const town in currentCity.paths) {
        const nextCity = tempCities.find(c => c.name === town)
        const currentDistance = distance + currentCity.paths[town]
        const currentPrice = sum + currentCity.paths[town] * currentCity.petrolPrice

        getAllPaths(nextCity, currentDistance, currentPrice)
      }
    }
    getAllPaths(tempCities.find(city => city.name === pointA), 0, 0)

    if (result == { distance: Number.MAX_VALUE }) {
      throw new Error('Пути из A в B нет')
    }
    result = {
      distance: result.distance,
      sum: result.sum * consumtion
    }
    return result
  }
}
module.exports = { Navigator };