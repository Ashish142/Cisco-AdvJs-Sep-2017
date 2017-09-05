
var isPrime = (function (){
	var cache = {};

	function process(n){
		console.log('processing ', n);
		for(var i = 2; i <= (n/2); i++)
			if (n % i === 0){
				return false;
			}
		return true;
	}
	
	return function(n){
		if (typeof cache[n] !== 'undefined')
			return cache[n];
		console.log('processing ', n);
		cache[n] = process(n);
		return cache[n];
	}
})();


var isOddOrEven = (function (){
	var cache = {};

	function process(n){
		console.log('processing ', n);
		return n % 2 === 0 ? 'even' : 'odd';
	}

	return function(n){
		if (typeof cache[n] !== 'undefined')
			return cache[n];
		cache[n] = process(n);
		return cache[n];
	}
})();

function memoize(processFn){
	var cache = {};
	return function(){
		var key = JSON.stringify(arguments)
		if (typeof cache[key] === 'undefined')
			cache[key] = processFn.apply(this, arguments);
		return cache[key];
	}
}

var isPrime = memoize(function (n){
	for(var i = 2; i <= (n/2); i++)
		if (n % i === 0){
			return false;
		}
	return true;
});
