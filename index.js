/** Класс навигатора */
class Navigator {
  /**
   * Создает экземпляр навигатора
   * @param {*} cities
   */
  constructor(cities) {
    if (!Array.isArray(cities))
      throw new Error("Incorrect cities representation");

    this.cities = cities;
    this.routes = new Map();
    cities.forEach((e) => {
      this.checkCity(e);
      const outRoutes = new Map();
      for (const [city, dist] of Object.entries(e.paths)) {
        this.checkPathValue(dist);
        outRoutes.set(city, dist * e.petrolPrice);
      }
      this.routes.set(e.name, outRoutes);
    });
  }

  checkCity(city) {
    if (city === undefined) throw new Error("Incorrect city");

    if (!city.name || !city.petrolPrice || !city.paths)
      throw new Error("Incorrect city fields");

    if (
      !typeof city.name == "string" ||
      !typeof city.petrolPrice == "number" ||
      !Number.isFinite(city.petrolPrice)
    )
      throw new Error("Incorrect city values");
  }

  checkPathValue(value) {
    if (!typeof value == "number" || !Number.isFinite(value))
      throw new Error("Incorrect path value");
  }

  updateRoutesCost(consumtion) {
    for (const route of this.routes.entries()) {
      for (const road of route[1].entries()) {
        route[1].set(road[0], road[1] * consumtion);
      }
    }
  }

  getRoadLength(start, finish) {
    const initial = this.cities.find((e) => e.name == start);
    for (const [city, dist] of Object.entries(initial.paths)) {
      if (city == finish) return dist;
    }
    return -1;
  }

  /**
   * Ищет кратчайший путь от точки А до точки B
   * @param {string} pointA
   * @param {string} pointB
   * @param {number} consumtion
   */
  buildPath(pointA, pointB, consumtion) {
    this.updateRoutesCost(consumtion);
    const visited = [];
    const weights = new Map();
    const restoredRoutes = new Map();
    this.cities.forEach((e) => {
      if (e.name == pointA) weights.set(e.name, 0);
      else weights.set(e.name, Infinity);
    });

    const queue = [];
    queue.push(pointA);
    restoredRoutes.set(pointA, null);

    while (queue.length > 0) {
      let current = queue.shift();
      const neighbors = this.routes.get(current);

      for (const neighbor of neighbors.entries()) {
        if (visited.includes(neighbor[0])) continue;
        const curDist = weights.get(neighbor[0]);
        const newDist = weights.get(current) + neighbor[1];
        if (newDist < curDist) {
          weights.set(neighbor[0], newDist);
          restoredRoutes.set(neighbor[0], current);
          queue.push(neighbor[0]);
        }
      }
      visited.push(current);
    }

    const result = { distance: 0, sum: weights.get(pointB) };
    let prev = pointB;
    let next = restoredRoutes.get(pointB);
    while (next != null) {
      result.distance += this.getRoadLength(next, prev);
      prev = next;
      next = restoredRoutes.get(prev);
    }

    if (result.sum == Infinity)
      throw new Error("Impossible to reach destination.");
    return result;
  }
}

module.exports = { Navigator };
/*
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
      Tumen: 748,
    },
  },
  {
    name: "Tumen",
    petrolPrice: 60.45,
    paths: {
      Yekaterinburg: 9,
      Chelyabinsk: 130,
    },
  },
];
*/
/*
const testData1 = [
  {
    name: "Ekb",
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
      Ekb: 300,
      Chelyabinsk: 500,
      Tumen: 650,
    },
  },
  {
    name: "Chelyabinsk",
    petrolPrice: 42.45,
    paths: {
      Ekb: 400,
      Perm: 700,
      Tumen: 748,
    },
  },
  {
    name: "Tumen",
    petrolPrice: 60.45,
    paths: {
      Ekb: 9,
      Perm: 780,
      Chelyabinsk: 130,
    },
  },
];
*/
//const nav = new Navigator(cities);
//const nav = new Navigator(testData1);
//nav.buildPath("Ekb", "Perm", 0.06);
//nav.getRoadLength("Yekaterinburg", "Perm");
//nav.getRoadLength("Yekaterinburg", "Chelyabinsk");
//nav.buildPath("Yekaterinburg", "Perm", 0.06);
//nav.buildPath("Perm", "Chelyabinsk",  0.06);

/*
{
  distance: 900,
  sum: 2382.9,
},
*/
