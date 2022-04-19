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
                const currentSum = sum + consumtion * tempCity.petrolPrice * tempCity.paths[currentCityName];
                findAllPaths(currentCityName, currentDistance, currentSum);
            }
        }

        findAllPaths(startCity.name, 0, 0)

        if (result.length === 0)
            throw new Error("Нет пути из города A в город B");
        return result.sort((a, b) => a.distance - b.distance)[0];
    }
}

module.exports = { Navigator };
