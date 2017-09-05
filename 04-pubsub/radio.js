var radio = (function(){
	var radios = {};

	function radio(event_name){
		radios[event_name] = radios[event_name] || new Radio(event_name);
		return radios[event_name];
	}

	function Radio(event_name){
		this.__event_name__ = event_name;
	}

	Radio.prototype.subscribe = function(subscriptionFn){
		this.__event_subscriptions__ = this.__event_subscriptions__ || [];
		this.__event_subscriptions__.push(subscriptionFn);
		return this;
		
	}

	Radio.prototype.broadcast = function(data){
		var subscriptions = this.__event_subscriptions__ || [];
		subscriptions.forEach(function(subscription){
			subscription(data);
		});
		return this;
	}

	Radio.prototype.unsubscribe = function(subscriptionFn){
		var subscriptions = this.__event_subscriptions__ || [];
		let index = subscriptions.indexOf(subscriptionFn);
		if (index !== -1)
			subscriptions.splice(index, 1);
		return this;
	}
	return radio;
})();