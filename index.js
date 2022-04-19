/** Класс навигатора */
class Navigator {
  /**
   * Создает экземпляр навигатора
   * @param {*} cities 
   */
  constructor(cities) {
    if(!Array.isArray(cities)){
      throw new Error('Некорректные данные');
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
    if(typeof pointA !== 'string' 
      || typeof pointB !== 'string'
      || typeof consumtion !== 'number') {
        throw new Error('Некорректные данные');
      }

    let result = null;

    const findBestPath = (currentCity, visitedCities = [], distance = 0, currSum = 0) => {
      currentCity = this.cities.find(e => e.name === currentCity);

      if(currentCity){
        let sortedCities = Object.entries(currentCity.paths).sort(([, aDist], [, bDist]) => aDist - bDist).reduce((p, [key, value]) => {
          p[key] = value;
          return p;
        } , {});

        visitedCities.push(currentCity.name);

        for(const city in sortedCities){
          if(visitedCities.includes(city)) continue;

          const dist = sortedCities[city];
          const sum = currentCity.petrolPrice * dist;
          const finalDistSum = findBestPath(city, visitedCities, distance + dist, currSum + sum);

          if(typeof finalDistSum === 'object'){
            if(!result || result.distance > finalDistSum.distance){
              result = {
                distance: finalDistSum.distance,
                sum: finalDistSum.currSum * consumtion
              }
            }

            break;
          }
        }
      }

      if(currentCity?.name === pointB) return { distance, currSum };
      return;
    }

    findBestPath(pointA);

    if(!result){
      throw new Error("Путь не существует")
    }
  }
}

module.exports = { Navigator };
