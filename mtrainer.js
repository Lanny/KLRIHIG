var history = {};

setinletassist(0,"operation");
setoutletassist(0,"value");

function clear() {
	history = {};
}

function add(k, v) {
	if (!(k in history)) {
		history[k] = [];
	}
	
	history[k].push(v);
}

function showhist() {
	post(JSON.stringify(history));
}

function most() {
	var ml = 0;
	var mk;
	for (var key in history) {
		if (history[key].length > ml) {
			mk = key;
			ml = history[key].length;
		}
	}
	
	outlet(0, mk);
}

function predict(k) {
//	var cumu = {};
//	for (var i=0; i<history.length; i++) {
//		var v = history[i];
//		if (!(v in cumu)) cumu[v] = 0;
//		cumu[v] += 1;
//	}
	k = '' + k;
	if (!(k in history)) {
		outlet(0,'NO_HISTORY');
		return;
	}
	
	var idx = ~~(Math.random() * history[k].length);
	outlet(0, history[k][idx]);
}