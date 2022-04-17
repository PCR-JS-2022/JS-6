/** Класс навигатора */
class Navigator {
    /**
     * Создает экземпляр навигатора
     * @param {*} cities 
     */
    constructor(cities) {
      if (!Array.isArray(cities)) {
        throw new TypeError("cities must be an array");
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
          || !pointA
          || typeof pointB !== 'string' 
          || !pointB
          || typeof consumtion !== 'number'
          || consumtion <= 0
      ) 
      {
        throw new Error('Invalid arguments given');
      }

      let city1Exists = this.cities.some(city => city.name === pointA);
      let city2Exists = this.cities.some(city => city.name === pointB);

      if (!city1Exists || !city2Exists) {
        throw new Error(`Unknown city was provided`);
      }
  
      if (pointA === pointB) {
        return {
          distance: 0, sum: 0
        };
      }
  
      const distanceAndSum = this.#dijkstra(pointA, pointB, consumtion);
      return distanceAndSum;
    }
  
    #dijkstra = (startCityName, finishCityName, consumtion) => {
    
    let startCity;
    const distances = {};
    this.cities.forEach(c => {
        const city = {
            ...c,
            visited: c.name === startCityName,
            distance: c.name === startCityName ? 0 : Number.MAX_VALUE,
            sum : 0
        };

        if (city.visited) {
            startCity = city;
        }
        
        distances[c.name] = city;

      });

      this.#visitCitiesRecursivly(startCity, distances, consumtion);
      if (distances[finishCityName].distance === Number.MAX_VALUE) {
          throw new Error(`There is no path between ${startCityName} and ${finishCityName}`);
      }
  
      const { distance, sum } = distances[finishCityName];
      return { distance, sum };
    }
  
    #visitCitiesRecursivly = (currentCity, distances, consumtion) => {

        const paths = Object.entries(currentCity.paths);
        for (const [cityName, distance] of paths) {

            const distanceToCity = currentCity.distance + distance;
            if (distanceToCity < distances[cityName].distance) {
                distances[cityName].distance = distanceToCity;
                distances[cityName].sum = currentCity.sum + distance * consumtion *  currentCity.petrolPrice; 
            }

            if (distances[cityName].visited) continue;

            distances[cityName].visited = true;
            this.#visitCitiesRecursivly(distances[cityName], distances, consumtion);
        }

    }
  }
  
  module.exports = { Navigator };
  