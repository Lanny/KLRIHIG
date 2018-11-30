sketch.default2d();
sketch.glortho(0, 1, 1, 0, -1,100.);

var val = 0;
var last_x = 0;
var last_y = 0;

var notes;
reset();
draw(Date.now());

function draw(n)
{
	var baseNote = 30,
		nNotes = 60,
		barHeight = 1 / nNotes,
		tDomain = 7000;
		
	//post('draw start @ ' + n);
	//post();
	
	with (sketch) {
		glclearcolor(1, 1, 1, 1);
		glclear();
		
		glcolor([0.5,0.5,0.5,1.]);		
		for (var i=baseNote; i<baseNote+nNotes; i++) {
			var noteTop = (i - baseNote) * barHeight,
				noteHist = notes[i],
				minTime = n - tDomain,
				k = noteHist.length - 1;				
			var z = 1;

			while (k > 0) {				
				var note = noteHist[k],
					nStart = note[1],
					nEnd = (note[0] === null) ? n : note[0],
					noteBox = [
						(n - nEnd) / tDomain, 
						noteTop + (barHeight * .3),
						(n - nStart) / tDomain, 
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
}

function test() {
	reset();
	var n = Date.now();
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
	draw(Date.now());
	refresh();
	post('Suup wit it.');
	post();
}

function bang() {
	draw(Date.now());
	refresh();
}

function midinote(pitch, vel) {
	var lastNote = notes[pitch].length && notes[pitch][notes[pitch].length - 1];
	
	if (vel === 0) {
		lastNote[0] = Date.now();
	} else {
		if (lastNote && lastNote[0] === null) {
			notes[pitch].pop();
		}
		notes[pitch].push([null, Date.now()]);
	}
}

// all mouse events are of the form: 
// onevent <x>, <y>, <button down>, <cmd(PC ctrl)>, <shift>, <capslock>, <option>, <ctrl(PC rbutton)>
// if you don't care about the additonal modifiers args, you can simply leave them out.
// one potentially confusing thing is that mouse events are in absolute screen coordinates, 
// with (0,0) as left top, and (width,height) as right, bottom, while drawing 
// coordinates are in relative world coordinates, with (0,0) as the center, +1 top, -1 bottom,
// and x coordinates using a uniform scale based on the y coordinates. to convert between screen 
// and world coordinates, use sketch.screentoworld(x,y) and sketch.worldtoscreen(x,y,z).

function onclick(x,y,but,cmd,shift,capslock,option,ctrl)
{
	// cache mouse position for tracking delta movements
	last_x = x;
	last_y = y;
}
onclick.local = 1; //private. could be left public to permit "synthetic" events

function ondrag(x,y,but,cmd,shift,capslock,option,ctrl)
{
	var f,dy;
	
	// calculate delta movements
	dy = y - last_y;
	if (shift) { 
		// fine tune if shift key is down
		f = val - dy*0.001; 
	} else {
		f = val - dy*0.01;
	}
	msg_float(f); //set new value with clipping + refresh
	// cache mouse position for tracking delta movements
	last_x = x;
	last_y = y;
}
ondrag.local = 1; //private. could be left public to permit "synthetic" events

function ondblclick(x,y,but,cmd,shift,capslock,option,ctrl)
{
	last_x = x;
	last_y = y;
	msg_float(0); // reset dial?
}
ondblclick.local = 1; //private. could be left public to permit "synthetic" events


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
