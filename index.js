/** Класс навигатора */
class Navigator {
  /**
   * Создает экземпляр навигатора
   * @param {*} cities 
   */
  constructor(cities) {
    if (!Array.isArray(cities)
      || cities.every(c => typeof c !== 'object')
      || cities.every(c => typeof c.paths !== 'object')) {
      throw new TypeError("Некорректный ввод Navigator");
    }

    this.cities = cities
    this.ways = []
  }

  inputCheck(pointA, pointB, consumtion) {
    if (typeof pointA !== 'string' || !pointA
      || typeof pointB !== 'string' || !pointB
      || typeof consumtion !== 'number' || !pointB) {
      throw new Error('Некорректный ввод buildPath')
    }

    if (this.cities.every(city => city.name !== pointA)
      || this.cities.every(city => city.name !== pointB)) {
      throw new Error('Нет конечных городов')
    }
    
    if (Object.keys(cities.find(c => c.name === pointA).paths).length == 0) {
      throw new Error('Нет путей из города')
    }
  }

  possibleWay(currentCity, distance, sum, pointB) {
    if (currentCity.name === pointB) {
      this.ways.push({ distance, sum })
    }

    return currentCity.visiteeed
    || Object.keys(currentCity.paths).length == 0
    || currentCity.name === pointB
  }

  findMinDistance(waysToCity) {
    if (!waysToCity.length) {
      throw new Error('Такого пути не существует')
    }
    waysToCity.sort((a, b) => a.distance - b.distance)
    return waysToCity.shift()
  }



  /**
   * Ищет кратчайший путь от точки А до точки B
   * @param {string} pointA 
   * @param {string} pointB 
   * @param {number} consumtion
   */
  buildPath(pointA, pointB, consumtion) {
    this.inputCheck(pointA, pointB, consumtion)

    this.ways = []
    cities.forEach((city) => {
      city.visiteeed = false
    })


    const findAllWays = (currentCity, lenght, cost) => {
      if (this.possibleWay(currentCity, lenght, cost, pointB)) {
        return
      }

      currentCity.visiteeed = true
      Object.keys(currentCity.paths).forEach((nextCity) => {
        findAllWays(
          cities.find(c => c.name === nextCity),
          lenght + currentCity.paths[nextCity],
          cost + currentCity.paths[nextCity] * consumtion * currentCity.petrolPrice
        )
      })
    }

    findAllWays(
      cities.find(c => c.name === pointA),
      0,
      0
    )

    return this.findMinDistance(this.ways)
  }
}

module.exports = { Navigator };
