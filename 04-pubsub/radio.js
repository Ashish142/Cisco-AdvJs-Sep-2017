var radio = (function(){
	var radios = {};

	function radio(event_name){
		radios[event_name] = radios[event_name] || new Radio(event_name);
		return radios[event_name];
	}

	function Radio(event_name){
		this.__event_name__ = event_name;
	}

	Radio.prototype.subscribe = function(){
		this.__event_subscriptions__ = this.__event_subscriptions__ || [];
		Array.prototype.forEach.call(arguments, function(subscription){
			this.__event_subscriptions__.push(subscription);
		}.bind(this));
		return this;
		
	}

	Radio.prototype.broadcast = function(){
		var args = arguments;
		var subscriptions = this.__event_subscriptions__ || [];
		subscriptions.forEach(function(subscription){
			if (typeof subscription === 'function'){
				subscription.apply(null, args)
			}
			if (Array.isArray(subscription)){
				var fn = subscription[0],
					context = subscription[1];
				fn.apply(context, args);
			}
		}.bind(this));
		return this;
	}

	Radio.prototype.unsubscribe = function(){
		var subscriptions = this.__event_subscriptions__ || [];
		Array.prototype.forEach.call(arguments, function(subscriptionFn){
			let index = subscriptions.indexOf(subscriptionFn);
			if (index !== -1)
				subscriptions.splice(index, 1);
		}.bind(this));
		return this;
	}
	return radio;
})();