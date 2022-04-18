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

		const start = this.cities.find(city => city.name === pointA);
		const finish = this.cities.find(city => city.name === pointB);
		const visited = new Set();
		const potentialSolutions = [];

		const makePermutations = (currentCity, currentLength, currentCost) => {
			if (visited.has(currentCity)) {
				return;
			}

			if (currentCity === finish) {
				potentialSolutions.push({ distance: currentLength, sum: currentCost });
				return;
			}

			visited.add(currentCity);
			for (const nextCityName in currentCity.paths) {
				const nextCity = this.cities.filter(x => x.name === nextCityName)[0];
				let distance = currentCity.paths[nextCityName];
				let cost = distance * consumption * currentCity.petrolPrice;
				makePermutations(nextCity, currentLength + distance, currentCost + cost);
			}
		}

		makePermutations(start, 0, 0);

		if (potentialSolutions.length === 0) {
			throw new Error("The path does not exist");
		}

		return potentialSolutions.sort((first, second) => first.distance - second.distance)[0];
	}
}

module.exports = { Navigator };
