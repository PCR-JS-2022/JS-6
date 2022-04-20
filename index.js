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
        if (!(typeof pointA === "string" &&
                typeof pointB === "string" &&
                typeof consumtion === "number")) {
            throw new Error("Переданы невалидные данные");
        }

        const a = this.cities.map(city => ({...city, Visited: false }));
        const startCity = this.cities.find(city => city.name === pointA);
        const finishCity = this.cities.find(city => city.name === pointB);
        let result = [];

        const findAllWays = (cityName, distance, sum) => {
            const currentCity = a.find((c) => c.name === cityName);

            if (cityName === finishCity.name) {
                result.push({ distance, sum })
                return;
            }

            if (currentCity.Visited)
                return;

            currentCity.Visited = true;

            for (const currCity in currentCity.paths) {
                const currentDistance = distance + currentCity.paths[currCity];
                const currentSum = sum + currentCity.paths[currCity] * currentCity.petrolPrice * consumtion;
                findAllWays(currCity, currentDistance, currentSum);
            }
        }

        findAllWays(startCity.name, 0, 0)

        if (result.length !== 0) {
            return result.sort((a, b) => a.distance - b.distance)[0];
        }
        throw new Error("Пути не существует");
    }
}

module.exports = { Navigator };