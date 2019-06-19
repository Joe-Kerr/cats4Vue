//https://vuejs.org/v2/style-guide/#Full-word-component-names-strongly-recommended
//I don't think using a natural language processing approach would be feasible here. 
// Hence a heuristic check for use in a dev env warning or so might be of some help.
export const isValidNameWithFullWordsHeuristic = function(name, dist=3) {
	let iLastUpperCase = 0;
	let i;
	for(i=0, ii=name.length; i<ii; i++) {
		const isUpperCase = name[i].toUpperCase() === name[i];
		if(!isUpperCase) {
			continue;
		}
		
		if(i - iLastUpperCase <= dist) {
			return false;
		}
		iLastUpperCase = i;
	}
	
	if(i - iLastUpperCase <= dist) {
		return false;
	}	
	return true;
}


export const isValidPascalCase = function isValidPascalCase(val, minUpperCaseChars=2) {
	if(val[0].toUpperCase() !== val[0]) {
		return false;
	}
	
	if(minUpperCaseChars === 1) {
		return true;
	}
	
	let nUpperCases = 1;
	for(let i=1, ii=val.length; i<ii; i++) {
		if(val[i].toUpperCase() === val[i]) {
			nUpperCases++;
		}
	}
	
	return (nUpperCases >= minUpperCaseChars);
}

export const isValidCamelCase = function isValidCamelCase(val, minUpperCaseChars=1) {
	if(val[0].toUpperCase() === val[0]) {
		return false;
	}
	
	if(minUpperCaseChars === 0) {
		return true;
	}
	
	let nUpperCases = 1;
	for(let i=1, ii=val.length; i<ii; i++) {
		if(val[i].toUpperCase() === val[i]) {
			nUpperCases++;
		}
	}
	
	return (nUpperCases >= minUpperCaseChars);
}

export const isValidKebabCase = function isValidKebabCase(val, minKebabs=1, noUpperCase=true) {
	let nKebabs = 0;
	for(let i=0, ii=val.length; i<ii; i++) {
		if(noUpperCase && val[i].toUpperCase() === val[i]) {
			return false;
		}
		
		if(val[i] === "-") {
			nKebabs++;
		}
	}
	return (nKebabs >= minKebabs);
}