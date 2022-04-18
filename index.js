class Navigator {
	/**
	 * @param {*} cities
	 */
	constructor(cities) {
		if (!Array.isArray(cities)) {
			throw new Error("Невалидные входные данные!");
		}
		this.cities = cities;
	}

	/**
	 * @param {string} pointA
	 * @param {string} pointB
	 * @param {number} consumption
	 */
	buildPath(pointA, pointB, consumption) {
		if (!(typeof pointA === 'string' && typeof pointB === 'string' && pointA && pointB && typeof consumption === 'number')) {
			throw new Error("Невалидные входные данные!");
		}

		let bestOrder = [];
		let bestLength = Number.MAX_VALUE;
		let bestCost = Number.MAX_VALUE;
		const start = this.cities.find(city => city.name === pointA);
		const finish = this.cities.find(city => city.name === pointB);

		const isVisitedPoint = (currentOrder, currentIndex, nextCity) => {
			let index = currentOrder.indexOf(nextCity);
			return (!(index === -1 || index >= currentIndex))
		}

		const makePermutations = (currentLength, currentCost, currentIndex, currentCity, currentOrder) => {
			if (currentLength > bestLength) {
				return;
			}

			if (currentOrder[currentIndex - 1] === finish) {
				bestOrder = Array.from(currentOrder);
				bestLength = currentLength;
				bestCost = currentCost;
				return;
			}

			for (const nextCityName in currentCity.paths) {
				const nextCity = this.cities.filter(x => x.name === nextCityName)[0];
				if (isVisitedPoint(currentOrder, currentIndex, nextCity))
					continue;
				let distance = currentCity.paths[nextCityName];
				let cost = distance * consumption * currentCity.petrolPrice;
				currentOrder[currentIndex] = nextCity;
				makePermutations(currentLength + distance, currentCost + cost, currentIndex + 1, nextCity, currentOrder);
			}
		}

		makePermutations(0, 0, 1, start, [start]);

		if (bestOrder.length === 0)
			throw new Error("The path does not exist");

		return { distance: bestLength, sum: bestCost, d: bestOrder };
	}
}

module.exports = { Navigator };
