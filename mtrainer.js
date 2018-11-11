var history = {0: []};
var ordTree = {};
var treeStale = true;

inlets = 1;
outlets = 2;

setinletassist(0,"operation");
setoutletassist(0,"value");
setoutletassist(1,"done");

function clear() {
	history = {0: []};
}

function add(k, v) {
	if (!(k in history)) {
		history[k] = [];
	}
	
	history[k].push(v);
	treeStale = true;
}

function showhist() {
	post(JSON.stringify(history));
}

function first() {	
	outlet(0, history[0]);
}

function predict(k) {
	k = '' + k;
	if (!(k in history)) {
		var ok = k;
		k = treeSearch(k);
		post('Got ' + ok + ' but had no history, using ' + k + ' instead.'); post();
	}
	
	var idx = ~~(Math.random() * history[k].length);
	outlet(0, history[k][idx]);
}

function getOrdTree() {
	if (!treeStale)
		return ordTree;
		
	ordTree = {_members: []};
	var node;

	Object.keys(history).forEach(function(key) {
		node = ordTree;
		
		key.split('|').forEach(function(chord) {
			node._members.push(key);
			
			if (!(chord in node))
				node[chord] = {_members: []};
			
			node = node[chord];
		})
		

		node._members.push(key);
	})
	
	treeStale = false;
	return ordTree;
}

function treeSearch(key) {
	var node = getOrdTree();
	var chords = key.split('|');
	var chord;
	
	while (chords.length && ((chord = chords.shift()) in node)) {
		node = node[chord];
	}
	
	var m = node._members;
	return m[~~(Math.random() * m.length)];	
}