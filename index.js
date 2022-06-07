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
     * @param {number} consumption
     */
    buildPath(pointA, pointB, consumption) {
        const points = this.cities.map((city) => {
            return {
                name: city.name,
                pathLength: city.name === pointA ? 0 : Number.POSITIVE_INFINITY,
                pathArray: [],
            };
        });
        const firstPoint = points.find((point) => point.name === pointA);
        firstPoint.pathArray = [firstPoint];

        const pointsToStartFrom = [firstPoint];

        while (pointsToStartFrom.length !== 0) {
            const startPoint = pointsToStartFrom.shift();
            const possiblePaths = this.cities.find(
                (city) => city.name === startPoint.name
            ).paths;
            const pointsToVisit = Object.keys(possiblePaths)
                .filter(
                    (cityName) =>
                        !startPoint.pathArray.some(
                            (visitedCityName) => visitedCityName === cityName
                        )
                )
                .map((cityName) =>
                    points.find((point) => point.name === cityName)
                );

            pointsToVisit.forEach((pointToVisit) => {
                const newPathLength =
                    possiblePaths[pointToVisit.name] + startPoint.pathLength;

                if (newPathLength < pointToVisit.pathLength) {
                    pointToVisit.pathLength = newPathLength;
                    pointToVisit.pathArray = [
                        ...startPoint.pathArray,
                        pointToVisit,
                    ];

                    if (pointToVisit.name !== pointB)
                        pointsToStartFrom.push(pointToVisit);
                }
            });
        }

        if (
            points.find((point) => point.name === pointB).pathLength ===
            Number.POSITIVE_INFINITY
        ) {
            throw Error("Нет пути между заданными городами");
        }

        const destinationPoint = points.find((point) => point.name === pointB);

        const resultDistance = destinationPoint.pathLength;

        const cityPathArray = destinationPoint.pathArray.map((point) =>
            this.cities.find((city) => city.name === point.name)
        );

        let resultPrice = 0;

        for (let i = 0; i < cityPathArray.length - 1; i++) {
            const currentCity = cityPathArray[i];
            const nextCityName = cityPathArray[i + 1].name;
            resultPrice +=
                currentCity.paths[nextCityName] *
                consumption *
                currentCity.petrolPrice;
        }

        return {
            distance: resultDistance,
            sum: resultPrice,
        };
    }
}

module.exports = { Navigator };
