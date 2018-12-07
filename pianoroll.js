outlets = 2;
sketch.default2d();
sketch.glortho(0, 1, 1, 0, -1,100.);

var NOW = 0;
var TDOMAIN = 7000;
var _LAST_BANG = Date.now();
var _MOUSE_DOWN = 0;

var SEL_START;
var SEL_END;

var notes;
reset();
draw(NOW);

function _advanceNow() {
	var n = Date.now(),
		dt = n - _LAST_BANG;
	NOW += dt;
	_LAST_BANG = n;
	
	return NOW;
}

function draw(n)
{
	var baseNote = 30,
		nNotes = 60,
		barHeight = 1 / nNotes;
	
	with (sketch) {
		glclearcolor(1, 1, 1, 1);
		glclear();
		
		if (SEL_START) {
			gllinewidth(2);
			glcolor([0.5,0.5,0.5,1.]);	
			moveto(time2world(SEL_START), 0);
			lineto(time2world(SEL_START), 1);
			
			if (SEL_END) {
				moveto(time2world(SEL_END), 0);
				lineto(time2world(SEL_END), 1);
				
				var z = -.1;
				glcolor([1,1,0,.5]);	
				quad(time2world(SEL_END), 0, z, time2world(SEL_END), 1, z, time2world(SEL_START), 1, z, time2world(SEL_START), 0, z);
				//rectangle(time2world(SEL_END), 0, time2world(SEL_START), 1);
			}
		}
		
		glcolor([0.5,0.5,0.5,1.]);		
		for (var i=baseNote; i<baseNote+nNotes; i++) {
			var noteTop = (i - baseNote) * barHeight,
				noteHist = notes[i],
				minTime = n - TDOMAIN,
				k = noteHist.length - 1;

			while (k >= 0) {				
				var note = noteHist[k],
					nStart = note[1],
					nEnd = (note[0] === null) ? n : note[0],
					noteBox = [
						time2world(nEnd), 
						noteTop + (barHeight * .3),
						time2world(nStart), 
						noteTop + barHeight
					];
					
				if (nEnd < minTime) {
					break;
				}
				
				gllinewidth(1);
				moveto(noteBox[0], noteBox[1]);
				lineto(noteBox[2], noteBox[1]);
				lineto(noteBox[2], noteBox[3]);
				lineto(noteBox[0], noteBox[3]);
				lineto(noteBox[0], noteBox[1]);
				
        		k--;
			}
		}
	}
}

function reset() {
	notes = new Array(127);
	for (var i=0; i<127; i++) {
		notes[i] = []; 
	}
	
	SEL_START = null;
	SEL_END = null;
	NOW = 0;
	_LAST_BANG = Date.now();

}

function test() {
	reset();
	var n = NOW;
	notes[69] = [
		[
			n - 1000,
			n - 2000
		],
		[
			n - 5000,
			n - 7000
		]
	];
	
	notes[71] = [
		[
			n - 3000,
			n - 4500
		]
	];
	draw(n);
	refresh();
	post('Suup wit it.');
	post();
}

function bang() {
	draw(_advanceNow());
	refresh();
}

function midinote(pitch, vel) {
	var lastNote = notes[pitch].length && notes[pitch][notes[pitch].length - 1],
		n = _advanceNow();
	
	if (vel === 0) {
		if (lastNote[0] !== null) {
			return;
		}
		lastNote[0] = n;
	} else {
		if (lastNote && lastNote[0] === null) {
			//notes[pitch].pop();
			lastNote[0] = n - 1;
		}
		notes[pitch].push([null, n, vel]);
	}
}

function outputSelection() {
	if (!(SEL_START && SEL_END)) {
		post('Invalid selection.');
		post();
		return;
	}
	
	var events = [];
	for (var i=0; i<127; i++) {
		var noteHist = notes[i];
		for (var k=0; k<noteHist.length; k++) {
			var note = noteHist[k];
			if (note[1] < SEL_START || note[1] > SEL_END)
				continue;
				
			events.push([i, note[2], note[1]]);
			events.push([i, 0, note[0]]); 
		}
	}
	
	events.sort(function(a,b) { return a[2] - b[2]; });
	var base = events[0][2];
	events = events.map(function(e) { return [e[0], e[1], e[2] - base]; })
	
	for (var i=0; i<events.length; i++) {
		outlet(0, events[i]);
	}
}

function screen2time(x) {
	var width = box.rect[2] - box.rect[0];
	return NOW - (x / width) * TDOMAIN;
}
screen2time.local = 1;

function time2world(t) {
	return (NOW - t) / TDOMAIN;
}
time2world.local = 1;

function onclick(x,y,but,cmd,shift,capslock,option,ctrl) {
	_MOUSE_DOWN = Date.now();
	
	if (!(SEL_START || SEL_END) || (SEL_START && SEL_END)) {
		SEL_START = screen2time(x);
		SEL_END = null;
	} else {
	 	SEL_END = screen2time(x);
	}
	
	draw(NOW);
	refresh();
}
onclick.local = 1; //private. could be left public to permit "synthetic" events

function ondrag(x,y,but,cmd,shift,capslock,option,ctrl)
{
	if (Date.now() - _MOUSE_DOWN < 100) {
		return;
	}
	SEL_END = screen2time(x);
	draw(NOW);
	refresh();
}
ondrag.local = 1; //private. could be left public to permit "synthetic" events

function forcesize(w,h)
{
	if (w!=h) {
		h = w;
		box.size(w,h);
	}
}
forcesize.local = 1; //private

function onresize(w,h)
{
	forcesize(w,h);
	draw(Date.now());
	refresh();
}
onresize.local = 1; //private
