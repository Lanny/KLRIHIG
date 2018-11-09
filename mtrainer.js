var history = {0: []};

inlets = 1;
outlets = 2;

setinletassist(0,"operation");
setoutletassist(0,"value");

function clear() {
	history = {0: []};
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

function first() {	
	outlet(0, history[0]);
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
		//outlet(0,'NO_HISTORY');
		return;
	}
	
	var idx = ~~(Math.random() * history[k].length);
	outlet(0, history[k][idx]);
}