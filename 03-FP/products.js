/*
sort
filter
groupBy
*/

var products = [
	{id : 6, name : 'Pen', cost : 60, units : 50, category : 'stationary'},
	{id : 3, name : 'Pencil', cost : 20, units : 30, category : 'stationary'},
	{id : 9, name : 'Len', cost : 70, units : 80, category : 'grocery'},
	{id : 5, name : 'Ten', cost : 50, units : 60, category : 'utility'},
	{id : 7, name : 'Den', cost : 90, units : 40, category : 'stationary'},
];

function describe(title, fn){
	console.group(title);
	fn();
	console.groupEnd();
}

describe('Default List', function(){
	console.table(products);
});

describe('Sorting', function(){
	describe('Default Sort [ products by id ]', function(){
		function sortProductsById(){
			for(var i=0; i < products.length-1; i++)
				for(var j=i+1; j < products.length; j++)
					if (products[i].id > products[j].id){
						var temp = products[i];
						products[i] = products[j];
						products[j] = temp;
					}
		}
		sortProductsById();
		console.table(products);
	});

	function sort(list, comparer){
		if (!comparer) return;

		var comparerFn = function(){ return 0; };
		
		if (typeof comparer === 'function')
			comparerFn = comparer;

		if (typeof comparer === 'string')
			comparerFn = function(item1, item2){
				if (item1[comparer] < item2[comparer]) return -1;
				if (item1[comparer] > item2[comparer]) return 1;
				return 0;
			}

		for(var i=0; i < list.length-1; i++)
			for(var j=i+1; j < list.length; j++)
				if (comparerFn(list[i], list[j]) > 0){
					var temp = list[i];
					list[i] = list[j];
					list[j] = temp;
				}
	}
	describe('Any list by any attribute', function(){
		/*function sortByAttribute(list, attrName){
			for(var i=0; i < list.length-1; i++)
				for(var j=i+1; j < list.length; j++)
					if (list[i][attrName] > list[j][attrName]){
						var temp = list[i];
						list[i] = list[j];
						list[j] = temp;
					}
		}*/
		describe('products by cost', function(){
			//sortByAttribute(products, 'cost');
			sort(products, 'cost');
			console.table(products);
		});
		describe('products by units', function(){
			//sortByAttribute(products, 'units');
			sort(products, 'units');
			console.table(products);
		});
	});

	describe('Any list by any comparer', function(){
		/*function sortByComparer(list, comparer){
			for(var i=0; i < list.length-1; i++)
				for(var j=i+1; j < list.length; j++)
					if (comparer(list[i], list[j]) > 0){
						var temp = list[i];
						list[i] = list[j];
						list[j] = temp;
					}
		}*/
		describe('Products by value [cost * units]', function(){
			var productComparerByValue = function(p1, p2){
				var p1Value = p1.cost * p1.units,
					p2Value = p2.cost * p2.units;
				if (p1Value < p2Value) return -1;
				if (p1Value > p2Value) return 1;
				return 0;
			};
			//sortByComparer(products, productComparerByValue);
			sort(products, productComparerByValue);
			console.table(products);
		})
	})
});

describe('Filtering', function(){
	describe('Default filter [ all stationary products ]', function(){
		function filterStationaryProducts(){
			var stationaryProducts = [];
			for(var index=0; index < products.length; index++)
				if (products[index].category === 'stationary')
					stationaryProducts.push(products[index]);
			return stationaryProducts;
		}
		var stationaryProducts = filterStationaryProducts();
		console.table(stationaryProducts);
	});

	describe('Any list by any criteria', function(){
		function filter(list, criteriaFn){
			var result = [];
			for(var index=0; index < list.length; index++)
				if (criteriaFn(list[index]))
					result.push(list[index]);
			return result;
		}
		function negate(criteriaFn){
			return function(){
				return !criteriaFn.apply(this, arguments);
			}
		}
		describe('Products by cost', function(){
			var costlyProductCriteria = function(product){
				return product.cost > 50;
			};
			/*var affordableProductCritera = function(product){
				//return product.cost <= 50;
				return !costlyProductCriteria(product);
			}*/
			var affordableProductCritera = negate(costlyProductCriteria);

			describe('All costly products [cost > 50]', function(){
				var costlyProducts = filter(products, costlyProductCriteria);
				console.table(costlyProducts);
			});
			describe("All affordable products [cost <= 50]", function(){
				var affordableProducts = filter(products, affordableProductCritera);
				console.table(affordableProducts);
			});
		});

		describe('Products by units', function(){
			var understockedProductCriteria = function(product){
				return product.units <= 40;
			};
			/*var overstockedProductCriteria = function(product){
				return !understockedProductCriteria(product);
			};*/
			var overstockedProductCriteria = negate(understockedProductCriteria);

			describe('All understocked products [units <= 40 ]', function(){
				var understockedProducts = filter(products, understockedProductCriteria);
				console.table(understockedProducts);
			});
			describe('All overstocked products [!understocked]', function(){
				var overstockedProducts = filter(products, overstockedProductCriteria);
				console.table(overstockedProducts);
			});
		});
	});
});

describe('GroupBy', function(){
	function groupBy(list, keySelector){
		var result = {};
		for(var index=0; index < list.length; index++){
			var key = keySelector(list[index]);
			if (typeof result[key] === 'undefined')
				result[key] = [];
			result[key].push(list[index]);
		}
		return result;
	}
	function describeGroup(groupedObj){
		for(var key in groupedObj){
			describe('Key - [' + key + ']', function(){
				console.table(groupedObj[key]);
			});
		}
	}
	describe('Products by category', function(){
		var categoryKeySelector = function(product){
			return product.category;
		};
		var productsByCategory = groupBy(products, categoryKeySelector);
		describeGroup(productsByCategory);
	});
	describe('Products by cost', function(){
		var costKeySelector = function(product){
			return product.cost > 50 ? 'costly' : 'affordable';
		};
		var productsByCost = groupBy(products, costKeySelector);
		describeGroup(productsByCost);
	});
});