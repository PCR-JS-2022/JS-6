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
                const currentSum = currentCity.petrolPrice * consumtion * currentCity.paths[currCity] + sum;
                findAllWays(currCity, currentDistance, currentSum);
            }
        }

        findAllWays(startCity.name, 0, 0)

        return result.sort((a, b) => a.distance - b.distance)[0];
    }
}

const cities = [{
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

module.exports = { Navigator };