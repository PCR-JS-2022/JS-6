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
    const graph = {};
    this.cities.forEach(city => {
      let availableCities = {};
      for(let c in city.paths) {
        availableCities[c] = city.paths[c];
      }
      graph[city.name] = availableCities;
    })

    function findWay(graph, point) {
      let result = {};
      result[point] = [];
      result[point].dist = 0;
      
      while(true) {
        let parent = null;
        let nearest = null;
        let dist = Infinity;
        
        for(let n in result) {
          if(!result[n])
            continue
          let nDist = result[n].dist;
          let adj = graph[n];
          for(var a in adj) {
            if(result[a])
              continue;
            let d = adj[a] + nDist;
            if(d < dist) {
              parent = result[n];
              nearest = a;
              dist = d;
            }
          }
        }

        if(dist === Infinity) {
            break;
        }
        
        result[nearest] = parent.concat(nearest);
        result[nearest].dist = dist;
      }
      
      return result;
    }
    let way = findWay(graph, pointA)[pointB];
    const distance = way.dist;
    const citiesOnTheWay = [];
    for(let i in way) {
      if(i !== "dist")
      citiesOnTheWay.push(way[i]);
    }
    let objPointA = this.cities.filter(i => i.name === pointA)[0];
    let sum = objPointA.petrolPrice * objPointA.paths[citiesOnTheWay[0]] * consumtion;
    citiesOnTheWay.forEach((city, index) => {
      if(index < citiesOnTheWay.length - 1) {
        let objCity = this.cities.filter(i => i.name === city)[0];
        sum += consumtion * objCity.petrolPrice * objCity.paths[citiesOnTheWay[index + 1]];
      }
    })
    return { distance, sum } ;
   }
}

module.exports = { Navigator };

