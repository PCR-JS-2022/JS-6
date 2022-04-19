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
        if (typeof pointA !== 'string')
            throw new Error("Первый город указан неверно");
        if (typeof pointB !== 'string')
            throw new Error("Второй город указан неверно");
        if (typeof consumtion !== 'number')
            throw new Error("Расход указан неверно");

        const startCity = this.cities.find((city) => city.name === pointA);
        const finishCity = this.cities.find((city) => city.name === pointB);
        const tempCities = this.cities.map(city => ({ ...city, Visited: false }))
        const result = [];

        const findAllPaths = (cityName, distance, sum) => {
            const tempCity = tempCities.find((c) => c.name === cityName);

            if (cityName === finishCity.name) {
                result.push({ distance, sum })
                return;
            }

            if (tempCity.Visited) {
                return;
            }
            tempCity.Visited = true;

            for (const currentCityName in tempCity.paths) {
                const currentDistance = distance + tempCity.paths[currentCityName]
                const currentSum = sum + tempCity.paths[currentCityName] * tempCity.petrolPrice * consumtion;
                findAllPaths(currentCityName, currentDistance, currentSum);
            }
        }

        findAllPaths(startCity.name, 0, 0)

        if (result.length === 0)
            throw new Error("Нет пути из города A в город B");
        return result.sort((a, b) => a.distance - b.distance)[0];
    }
}

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
  console.log(nav.buildPath("Chelyabinsk", "Tumen", 0.06));

module.exports = { Navigator };
