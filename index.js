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
    const indexCities = [];
    this.cities.forEach(city => {
      indexCities.push(city.name);
    });
    
    const table = [];
    this.cities.forEach(city => {
      let d = [];
      for(let c in city.paths) {
        d[indexCities.indexOf(c)] = city.paths[c];
      }
      table[indexCities.indexOf(city.name)] = d;
    })
    
    const indexStart = indexCities.indexOf(pointA); 
    const indexEnd = indexCities.indexOf(pointB); 
    const cityA = this.cities.find(i => i.name === pointA);
    
    function Dijkstra(matrix, start = 0) {
      const rows = matrix.length; 
      const cols = matrix[0].length;
      const distance = new Array(rows).fill(Infinity);
      const cities = [];
      const km = [];
      distance[start] = 0;
      for(let i = 0; i < rows; i++) {
        if(distance[i] < Infinity) {
          for(let j = 0; j < cols; j++) {
            if(matrix[i][j] + distance[i] < distance[j]) {
              if(j === indexEnd) {
                cities.push(i);
                km.push(distance[i], matrix[i][j])
              }
              distance[j] = matrix[i][j] + distance[i];
            }
        }
      }
     }
      return [cities, distance, km];
    }
    const distance = Dijkstra(table, indexStart)[1][indexEnd];
    const city = Dijkstra(table, indexStart)[0];
    const km = Dijkstra(table, indexStart)[2];

    let sum = cityA.petrolPrice * km[0] * consumtion; 
    for(let i = 0; i < city.length; i++) {
      sum += this.cities[city[i]].petrolPrice * km[i + 1] * consumtion;
    }
    
    return {
      distance,
      sum
    }
  }
}

module.exports = { Navigator };

const cities = [
  {
    name: "Yekaterinburg",
    petrolPrice: 50.0,
    paths: {
      Chelyabinsk: 200,
      Tumen: 350,
    },
  },
  {
    name: "Perm",
    petrolPrice: 46.0,
    paths: {
      Yekaterinburg: 300,
      Chelyabinsk: 500,
      Tumen: 650,
    },
  },
  {
    name: "Chelyabinsk",
    petrolPrice: 42.45,
    paths: {
      Yekaterinburg: 400,
      Perm: 700,
      Tumen: 748,
    },
  },
  {
    name: "Tumen",
    petrolPrice: 60.45,
    paths: {
      Yekaterinburg: 9,
      Perm: 780,
      Chelyabinsk: 130,
    },
  },
];

const nav = new Navigator(cities);
console.log(nav.buildPath("Yekaterinburg", "Perm", 0.06));