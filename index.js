/** Класс навигатора */
class Navigator {
  /**
   * Создает экземпляр навигатора
   * @param {*} cities 
   */
  constructor(cities) {
    if (!Array.isArray(cities)) {
      throw new Error("Города не массив");
    }
    this.cities = cities;
  }

  /**
   * Ищет кратчайший путь от точки А до точки B
   * @param {string} pointA 
   * @param {string} pointB 
   * @param {number} consumption
   */
  buildPath(pointA, pointB, consumption) {
    
    const prices = this.cities.map(city => ({ ...city, price: undefined }));
    const roads = prices.map(city => ({ ...city, road: undefined }));
    const start = roads.find(city => city.name === pointA);
    const end = roads.find(city => city.name === pointB);
    start.road = 0;
    start.price = 0;
    
    
    const dijkstra = (cityA, roads) => {
      ///cityB === cityC.name
      for (const cityB in cityA.paths) {
        const cityC = roads.find(city => city.name === cityB)
        if (cityB in cityA.paths && (!cityC.road || cityC.road > (cityA.paths[cityB] + cityA.road))) {
          cityC.road = cityA.paths[cityB] + cityA.road;
          cityC.price = cityA.price + consumption * cityA.petrolPrice * cityA.paths[cityB];
          
          dijkstra(cityC, roads);
        }
      }
    }
    dijkstra(start, roads);
    if (!end.road){
      throw new Error('Дороги из пункта А в пункт Б не существет!');
    }
    return { distance: end.road, sum: end.price };
  }
}

module.exports = { Navigator };
