/** Класс навигатора */
class Navigator {
    /**
     * Создает экземпляр навигатора
     * @param {*} cities
     */
    constructor(cities) {
        if (!Array.isArray(cities)) {
            throw new Error();
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
        if (!isValidArguments) throw new Error();
        let dijkstraResult = dijkstra(this.cities, pointA);
        if (dijkstraResult[0][pointB] === Infinity) throw new Error();
        let distance = dijkstraResult[0][pointB];
        let paths = dijkstraResult[1];
        let path = findShortestPath(pointA, pointB, paths, this.cities);
        let sum = 0;
        for (let i=0; i < path.length - 1; i++) {
            sum += path[i].petrolPrice * path[i].paths[path[i+1].name] * consumtion;
        }
        return {distance, sum};
    }
}

function findShortestPath(startCity, finishCity, previous, cities) {
    let path = [];
    let currentCity = finishCity;
    while(currentCity !== startCity) {
        let city = cities[cities.findIndex(city => city.name === currentCity)];
        path.unshift(city);
        currentCity = previous[currentCity];
    }
    path.unshift(cities[cities.findIndex(city => city.name === startCity)]);
    return path;
}

function findNearestCities(distances, visited) {
    let minDistance = Infinity;
    let nearestCity = null;
    Object.keys(distances).forEach(city => {
        if (!visited[city] && distances[city] < minDistance) {
            minDistance = distances[city];
            nearestCity = city;
        }
    });
    return nearestCity;
}

function dijkstra(graph, startCity) {
    let [visited, distances, previous] = [{}, {}, {}]
    let cities = graph.map(city => city.name);

    cities.forEach(city => {
        distances[city] = Infinity;
        previous[city] = null;
    });
    distances[startCity] = 0;

    function handleCity(city) {
        let activeVertexDistance = distances[city];
        let neighbours = graph[graph.findIndex(point => point.name === city)].paths;

        Object.keys(neighbours).forEach(neighbourVertex => {
            let currentNeighbourDistance = distances[neighbourVertex];
            let newNeighbourDistance = activeVertexDistance + neighbours[neighbourVertex];
            if (newNeighbourDistance < currentNeighbourDistance) {
                distances[neighbourVertex] = newNeighbourDistance;
                previous[neighbourVertex] = city;
            }
        });
        visited[city] = 1;
    }

    let activeCity = findNearestCities(distances, visited);

    while (activeCity) {
        handleCity(activeCity);
        activeCity = findNearestCities(distances, visited);
    }

    return [distances, previous];
}

function isValidArguments(pointA, pointB, consumtion) {
    return typeof pointA === 'string' || pointA || typeof pointB === 'string' || pointB
        || typeof consumtion === 'number' || consumtion > 0
}

module.exports = {Navigator};