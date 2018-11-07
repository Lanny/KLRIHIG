inlets = 1;
outlets = 3;

setinletassist(0,"chord");
setoutletassist(0,"notes");
setoutletassist(1,"q");
setoutletassist(1,"nnotes");

function anything() {
	var chord = arrayfromargs(messagename,arguments)[0];
	var chordParts = chord.split('?');
	var noteParts = chordParts[0].split('/');
	
	outlet(2, noteParts.length);
	outlet(1, parseInt(chordParts[1]));
	
	noteParts.forEach(function(note, i) {
		parts = note.split('-').map(function(x) { return parseInt(x); });
		parts.unshift(i);
		outlet(0, parts);
	});
}