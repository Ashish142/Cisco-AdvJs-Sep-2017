/*
sort
filter
groupBy
*/

var products = [
	{id : 6, name : 'Pen', cost : 60, units : 50, category : 'stationary'},
	{id : 3, name : 'Pencil', cost : 20, units : 30, category : 'stationary'},
	{id : 9, name : 'Len', cost : 70, units : 80, category : 'grocery'},
	{id : 5, name : 'Ten', cost : 50, units : 60, category : 'grocery'},
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

		}
		sortProductsById();
		console.table(products);
	});

	/*describe('Any list by any attribute', function(){
		describe('products by cost', function(){
			//sort();
			console.table(products);
		});
		describe('products by units', function(){
			//sort();
			console.table(products);
		});
	});*/
});

/*describe('Filtering', function(){
	describe('Default filter [ all stationary products ]', function(){
		//filter()
		console.table(products);
	});

	describe('Any list by any criteria', function(){
		describe('All costly products [cost > 50]', function(){
			//filter();
			console.table(products);
		});
	});
});*/