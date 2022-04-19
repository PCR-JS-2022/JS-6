/** Класс навигатора */
class Navigator {
    /**
     * Создает экземпляр навигатора
     * @param {*} cities 
     */
    constructor(cities) {
        this.cities = cities;
        this.cities.visited = false;
    }

    /**
     * Ищет кратчайший путь от точки А до точки B
     * @param {string} pointA 
     * @param {string} pointB 
     * @param {number} consumtion
     */
    buildPath(pointA, pointB, consumtion) {
        if (
            !pointA
            || !pointB
            || !consumtion
            || typeof pointB !== 'string'
            || typeof pointA !== 'string'
            || typeof consumtion !== 'number'
            || !this.cities.length
            || consumtion <= 0
        ) {
            throw new Error('Invalid arguments');
        }

        //кратчайшие пути
        const costs = {};
        //узлы которые проверили
        const processed = [];
        //соседние вершины рассматриваемого узла
        let neighbors = {};
        //строим зависимости -- из какого города в какой можно попасть
        const graph = {};
        //объект вида {distance, sum}
        let objectPathAndSum = {};

        for (let city of this.cities) {
            for (let path in city.paths) {
                objectPathAndSum[path] = {
                    distance: city.paths[path],
                    sum: consumtion * city.paths[path] * this.cities.find(item => item.name === city.name).petrolPrice
                }
            }
            graph[city.name] = objectPathAndSum;
            objectPathAndSum = {};
        }

        Object.keys(graph).forEach(node => {
            if (node !== pointA) {
                let distance = graph[pointA][node] ? graph[pointA][node].distance : Number.POSITIVE_INFINITY;
                let sum = graph[pointA][node] ? graph[pointA][node].sum : 0;
                costs[node] = { distance, sum };
            }
        });
        let node = this.findNodeLowestCost(costs, processed);
        while (node) {
            const cost = costs[node].distance;
            const petrol = costs[node].sum;
            neighbors = graph[node];
            Object.keys(neighbors).forEach(neighbor => {
                let newCost = cost + neighbors[neighbor].distance;
                let newPetrol = petrol + neighbors[neighbor].sum;
                if (costs[neighbor] && newCost < costs[neighbor].distance) {
                    costs[neighbor] = { distance: newCost, sum: newPetrol };
                }
            });
            processed.push(node);
            node = this.findNodeLowestCost(costs, processed);
        }

        if (costs[pointB]) {
            if (costs[pointB].distance === Number.POSITIVE_INFINITY || costs[pointB].sum <= 0) {
                throw new Error('нет пути из города А в город Б');
            } else {
                return costs[pointB];
            }
        } else {
            throw new Error('нет пути из города А в город Б');
        }
    }

    findNodeLowestCost(costs, processed) {
        let lowestCost = Number.POSITIVE_INFINITY;
        let lowestNode;
        Object.keys(costs).forEach(node => {
            let cost = costs[node].distance;
            if (cost < lowestCost && !processed.includes(node)) {
                lowestCost = cost;
                lowestNode = node;
            }
        });

        return lowestNode;
    }
}

module.exports = { Navigator };
