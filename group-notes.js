var openNotes = {};
var v = [];
var queue = [];
var windowLength = 50;
var windowOpen = false;

var openChord;

inlets = 2;

setinletassist(0,"pitch");
setinletassist(1,"velocity");
setoutletassist(0,"chord");

function msg_int(f) {
	v[inlet] = f;
	
	if (inlet == 0) {
		acceptNote();
	}
}

function acceptNote() {
	if (v[1] === 0) {
		// Got a note-off
		var chord = openNotes[v[0]];
		if (chord === undefined) {
			post('Got a off note for ' + v[0] + ' when none was expected');
			post();
			return;
		}
		chord.d[v[0]] = Date.now() - chord.s;
		
		if (--chord.o < 1)
			rectifyQueue();
		
		openNotes[v[0]] = undefined;
		
		return;
	}
	
	if (!windowOpen) {
		var n = Date.now();
		
		windowOpen = true;
		openChord = {
			s: n,
			q: null,
			p: [],
			v: [],
			d: {},
			o: 0
		};
		
		if (queue.length) {
			queue[queue.length - 1].q = n - queue[queue.length - 1].s;
			rectifyQueue();
		}
		
		queue.push(openChord);
		
		;(new Task(closeWindow, this)).schedule(windowLength);
	}
	
	openChord.p.push(v[0]);
	openChord.v.push(v[1]);
	openChord.o++;
	
	openNotes[v[0]] = openChord;
}

function rectifyQueue() {
	while (queue.length && queue[0].o < 1 && !!queue[0].q) {
		var c = queue.shift();
		var notes = [];
		for (var i=0; i<c.p.length; i++) {
			notes.push([c.p[i], c.v[i], c.d[c.p[i]]].join('-'));
		}
		
		var cstr = notes.join('/') + '?' + c.q;
		outlet(0, cstr);		
	}
}

function closeWindow() {
	windowOpen = false;
}