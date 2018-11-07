inlets = 1;
outlets = 2;

setinletassist(0,"chord");
setoutletassist(0,"parts");
setoutletassist(1,"max_duration");

function unpack(chord) {
	var maxDur = 0;
	
	chord.split('/').forEach(function(note) {
		parts = note.split('-').map(function(x) { return parseInt(x); });
		maxDur = Math.max(maxDur, parts[1]);
		outlet(0, parts);
	});
	
	outlet(1, maxDur);
}