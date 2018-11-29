/*

simple 2d dial

arguments: fgred fggreen fgblue bgred bggreen bgblue dialred dialgreen dialblue

*/

sketch.default2d();
sketch.glortho(1, 0, 1, 0, -1,100.);

var val = 0;
var vbrgb = [1.,1.,1.,1.];
var vfrgb = [0.5,0.5,0.5,1.];
var vrgb2 = [0.7,0.7,0.7,1.];
var last_x = 0;
var last_y = 0;

var notes;
reset();

// process arguments
if (jsarguments.length>1)
	vfrgb[0] = jsarguments[1]/255.;
if (jsarguments.length>2)
	vfrgb[1] = jsarguments[2]/255.;
if (jsarguments.length>3)
	vfrgb[2] = jsarguments[3]/255.;
if (jsarguments.length>4)
	vbrgb[0] = jsarguments[4]/255.;
if (jsarguments.length>5)
	vbrgb[1] = jsarguments[5]/255.;
if (jsarguments.length>6)
	vbrgb[2] = jsarguments[6]/255.;
if (jsarguments.length>7)
	vrgb2[0] = jsarguments[7]/255.;
if (jsarguments.length>8)
	vrgb2[1] = jsarguments[8]/255.;
if (jsarguments.length>9)
	vrgb2[2] = jsarguments[9]/255.;

draw();

function draw()
{
	var baseNote = 60,
		nNotes = 15,
		barHeight = 1 / nNotes,
		tDomain = 7000,
		n = Date.now();
		
	//post('draw start @ ' + n);
	//post();
	
	with (sketch) {
		glclearcolor(vbrgb[0],vbrgb[1],vbrgb[2],vbrgb[3]);
		glclear();
		
		glcolor(vfrgb);		
		for (var i=baseNote; i<baseNote+nNotes; i++) {
			var noteTop = (i - baseNote) * barHeight,
				noteHist = notes[i],
				minTime = 0,
				drawnTime = n,
				k = 0;
			

	
			if (noteHist.length > 0) {
				post(JSON.stringify(noteHist));
				post();
			}
			while (k < noteHist.length && drawnTime > minTime) {
				var note = noteHist[k],
					nStart = note[1]
					nEnd = (note[0] === null) ? n : note[0],
					noteBox = [
						(n - nEnd) / tDomain, 
						noteTop,
						(n - nStart) / tDomain, 
						noteTop + barHeight
					]; 
				
				gllinewidth(1);
				moveto(noteBox[0], noteBox[1]);
				lineto(noteBox[2], noteBox[1]);
				lineto(noteBox[2], noteBox[3]);
				lineto(noteBox[0], noteBox[3]);
				lineto(noteBox[0], noteBox[1]);
				
        		k++;
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
	draw();
	refresh();
	post('Suup wit it.');
	post();
}

function bang() {
	draw();
	refresh();
}

function midinote(pitch, vel) {
	if (vel === 0) {
		post('wax off');
		post();
		notes[pitch][notes[pitch].length - 1][0] = Date.now();
	} else {
		post('wax on');
		post();
		notes[pitch].push([null, Date.now()]);
	}
	
	post();
}

function msg_float(v)
{
	val = Math.min(Math.max(0,v),1);
	notifyclients();
	bang();
}

function set(v)
{
	val = Math.min(Math.max(0,v),1);
	notifyclients();
	draw();
	refresh();
}

function fsaa(v)
{
	sketch.fsaa = v;
	bang();
}

function frgb(r,g,b)
{
	vfrgb[0] = r/255.;
	vfrgb[1] = g/255.;
	vfrgb[2] = b/255.;
	draw();
	refresh();
}

function rgb2(r,g,b)
{
	vrgb2[0] = r/255.;
	vrgb2[1] = g/255.;
	vrgb2[2] = b/255.;
	draw();
	refresh();
}

function brgb(r,g,b)
{
	vbrgb[0] = r/255.;
	vbrgb[1] = g/255.;
	vbrgb[2] = b/255.;
	draw();
	refresh();
}

function setvalueof(v)
{
	msg_float(v);
}

function getvalueof()
{
	return val;
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
	draw();
	refresh();
}
onresize.local = 1; //private
