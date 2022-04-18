/** Класс навигатора */
class Navigator {
    /**
     * Создает экземпляр навигатора
     * @param {*} cities
     */
    constructor(cities) {
        cities.forEach((city) => {
            if (!this.isCity(city)) {
                throw new Error('Передан не город!');
            }
        });
        this.cities = cities;
    }

    /**
     * Ищет кратчайший путь от точки А до точки B
     * @param {string} pointA
     * @param {string} pointB
     * @param {number} consumtion
     */
    buildPath(pointA, pointB, consumtion) {
        if (typeof pointA !== 'string' || typeof pointB !== 'string') {
            throw new Error('Передано неверное название города!');
        }
        if (typeof consumtion !== 'number') {
            throw new Error('Передан не верный расход!');
        }
        const startCity = this.cities.find((city) => city.name === pointA);
        const finishCity = this.cities.find((city) => city.name === pointB);
        if (startCity === undefined || finishCity === undefined) {
            throw new Error('Не удалось найти город в базе!');
        }
        const result = [];

        const findAllPaths = (currentCity, currentDistance, currentPrice) => {
            if (currentCity === finishCity.name) {
                result.push({
                    distance: currentDistance,
                    sum: currentPrice
                });
                return;
            }
            const tempCity = this.cities.find((city) => city.name === currentCity);
            if (tempCity.isVisited === true) {
                return;
            }
            tempCity.isVisited = true;
            for (const city in tempCity.paths) {
                const tempDistance = currentDistance + tempCity.paths[city];
                const tempPrice = currentPrice + (tempCity.paths[city] * consumtion * tempCity.petrolPrice);
                findAllPaths(city, tempDistance, tempPrice);
            }
        }

        findAllPaths(startCity.name, 0, 0);
        if (result.length <= 0) {
            throw new Error('Пути не существует!');
        }
        return result.sort((a, b) => a.distance - b.distance)[0];
    }

    isCity(city) {
        return typeof (city === 'object') &&
            (city.hasOwnProperty('name') && typeof city.name === 'string') &&
            (city.hasOwnProperty('petrolPrice') && typeof city.petrolPrice === 'number') &&
            (city.hasOwnProperty('paths') && typeof city.paths === 'object');
    }
}

module.exports = {Navigator};
