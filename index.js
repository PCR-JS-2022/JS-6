/** Класс навигатора */
class Navigator {
	/**
	 * Создает экземпляр навигатора
	 * @param {*} cities
	 */
	constructor(cities) {
		if (!Array.isArray(cities))
			throw new Error('Некорректный массив городов')

		this.cities = cities
	}

	/**
	 * Ищет кратчайший путь от точки А до точки B
	 * @param {string} pointA
	 * @param {string} pointB
	 * @param {number} consumtion
	 */
	buildPath(pointA, pointB, consumtion) {
		if (typeof pointA !== 'string' || !pointA)
			throw new Error('Некорректное название пункта A')

		if (typeof pointB !== 'string' || !pointB)
			throw new Error('Некорректное название пункта B')

		if (typeof consumtion !== 'number' || !pointB)
			throw new Error('Некорректный расход топлива')

		const tempCities = this.cities.map(city => ({...city, visited: false}))
		const start = tempCities.find(city => city.name === pointA)
		const finish = tempCities.find(city => city.name === pointB)
		const result = []

		const getAllPaths = (currentCity, distance, sum) => {
			if (currentCity.name === finish.name) {
				result.push({distance, sum})
				return
			}

			if (currentCity.visited) {
				return
			}

			currentCity.visited = true

			for (const city in currentCity.paths) {
				const currentDistance = distance + currentCity.paths[city]
				const currentPrice = sum + currentCity.paths[city] * consumtion * currentCity.petrolPrice
				const nextCity = tempCities.find(c => c.name === city)

				getAllPaths(nextCity, currentDistance, currentPrice)
			}
		}

		getAllPaths(start, 0, 0)

		if (!result.length)
			throw new Error('Пути из пункта A в пункт B не существует')

		return result.sort((a, b) => a.distance - b.distance)[0]
	}
}

module.exports = {Navigator};
