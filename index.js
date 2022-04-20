function isCities(city) {
  if (!Array.isArray(city)) {
    throw new Error("Некорректные данные");
  }
  city.forEach(el => isCity(el));
}

function isCity(city) {
  if (typeof city.name !== "string" || typeof city.petrolPrice !== "number"
    || typeof city.paths !== "object") {
    throw new Error('Некорректные данные');
  }
}

function isStr(str) {
  if (typeof str !== "string") {
    throw new Error('Некорректные данные');
  }
}

function isNum(num) {
  if (typeof num !== "number" || num < 0) {
    throw new Error("Некорректные данные");
  }
}

function isPoint(cities, point) {
  if (!cities.some(city => city.name === point)) {
    throw new Error('Некорректные данные');
  }
}


/** Класс навигатора */
class Navigator {
  /**
   * Создает экземпляр навигатора
   * @param {*} cities 
   */
  constructor(cities) {
    isCities(cities);
    this.cities = cities;
  }

  /**
   * Ищет кратчайший путь от точки А до точки B
   * @param {string} pointA 
   * @param {string} pointB 
   * @param {number} consumtion
   */
  buildPath(pointA, pointB, consumtion) {
    isStr(pointA);
    isStr(pointB);
    isNum(consumtion);
    isPoint(this.cities, pointA);
    isPoint(this.cities, pointB);
    if (pointA === pointB || this.cities.length <= 1) {
      return {
        distance: 0,
        sum: 0
      };
    }
    let graph = {};
    this.cities.forEach(el => {
      graph[el.name] = el.paths;
    });
    let way = { pointA };
    let price = 0;
    let shortWay = [];
    let dist = shortPath(graph, pointA, pointB);
    for (let key in way) {
      shortWay.push(way[key]);
    }
    for (let i = 0; i < shortWay.length - 1; i++) {
      this.cities.forEach(city => {
        if (city.name === shortWay[i]) {
          price += consumtion * city.paths[shortWay[i + 1]] * city.petrolPrice;
        }
      })
    }
    return {
      distance: dist,
      sum: price
    };

    function shortPath(graph, start, end) {
      let costs = {}; // кратчайшие пути
      let processed = [start]; // проверенные города
      let neighbors = {}; // соседние города

      Object.keys(graph).forEach(node => {
        if (node !== start) {
          let value = graph[start][node];
          costs[node] = value || Infinity;
        }
      })

      let node = findNodeLowersCost(costs, processed);
      way[start] = node;
      while (node) {
        let cost = costs[node];
        neighbors = graph[node];
        Object.keys(neighbors).forEach(neighbor => {
          let newCost = cost + neighbors[neighbor];
          if (newCost < costs[neighbor]) {
            way[node] = neighbor;
            costs[neighbor] = newCost;
          }
        });
        processed.push(node);
        node = findNodeLowersCost(costs, processed);
      }
      if (!isFinite(costs[end])) {
        throw new Error('отсутствует путь из точки А в точку В');
      }

      return costs[end];
    }

    function findNodeLowersCost(costs, processed) {
      let lowestCost = Infinity;
      let lowestNode;
      Object.keys(costs).forEach(node => {
        let cost = costs[node];
        if (cost < lowestCost && !processed.includes(node)) {
          lowestCost = cost;
          lowestNode = node;
        }
      })
      return lowestNode;
    }
  }
}

module.exports = { Navigator };
