/*
Eg:
const defs = {
	prop: {
		type: "string", default: "NS", required: true
	}
};
*/
export function configParser(config={}, defaults={}) {
	const result = {};
	for(const name in defaults) {
		const defProp = defaults[name];
		const actualProp = config[name];
		
		const defType = defProp.type;
		const actualType = typeof actualProp;
		
		const isRequired = defProp.required;
		const isProvided = name in config;
		
		if(typeof defType === "undefined") {throw new Error("type property on default is missing");}
		
		if(isRequired && !isProvided) {throw new Error("Config property '"+name+"' is required but not provided.");}
		
		if(isProvided && defType !== null && actualType !== defType) {throw new Error("Config property '"+name+"' must be of type '"+defType+"' but is of type '"+actualType+"'.");}
				
		result[name] = (isProvided) ? actualProp : defProp.default;
	}
	
	const mismatch = [];
	for(const name in config) {
		if(!(name in defaults)) {mismatch.push(name);}
	}
	if(mismatch.length > 0) {console.warn("The following config property was / properties were provided for which no defaults exist: "+mismatch.toString());}
	
	return result;
}

//https://vuejs.org/v2/style-guide/#Private-property-names-essential
export function isValidPrivateProperty(prop) {
	return (prop[0] === "$") && (prop[1] === "_") && (prop.substring(2).indexOf("_") > -1);
}

export function componentOptionsWriter(component, componentOptions) {
	for(const name in componentOptions) {
		if(name in component) {
			throw new Error("Tried to write property on component that already exists: "+name);
		}
		
		if(!isValidPrivateProperty(name)) {
			throw new Error("Private property names should be in the form of: $_namespace_propertyName. This is important especially for plugins in order to avoid name collisions. See also https://vuejs.org/v2/style-guide/#Private-property-names-essential");
		}

		component[name] = componentOptions[name];
	}
}

export function renameComponent(component, name) {
	if(typeof name !== "string") {
		throw new Error("'name' parameter must be of type string. Got: "+typeof name);
	}
	
	if(typeof component !== "object" || !("name" in component)) {
		throw new Error("'component' parameter must be an object with the property name.");
	}
	
	component.name = name;
}

export function registerVuexModule(vuex, namespace, vuexModule) {
	if(typeof namespace !== "string") {
		throw new Error("namespace parameter must be of type string.");
	}	
	
	if(typeof vuexModule !== "object") {
		throw new Error("module parameter must be of type object.");
	}
	
	const haveAtLeastOne = ["state", "getters", "mutations", "actions", "modules"];
	let hasHowMany = 0;
	haveAtLeastOne.forEach((prop)=>{
		if(vuexModule.hasOwnProperty(prop)) {hasHowMany++}
	});
	
	if(hasHowMany === 0) {
		throw new Error("Vuex module is of unexpected structure. Expected to see at least one of: "+haveAtLeastOne.toString(","));
	}
	
	if(typeof vuex === "undefined" || typeof vuex.dispatch === "undefined") {
		throw new Error(`Plugin ${namespace} requires vuex instance as config parameter: Vue.use(${namespace}, {vuex: instanceOfVuex}).`);
	}		
	
	vuex.registerModule(namespace, vuexModule);
}

export function ensureVersion(Vue, minVersion) {
	if(!("version" in Vue)) {
		throw new Error("The version property is missing on the Vue instance.");
	}
	
	if(Vue.version.replace(/[0-9\.]/g, "").length > 0) {
		throw new Error("Vue version is not in a dot-separated format. Got: "+Vue.version);
	}
		
	if((""+minVersion).replace(/[0-9\.]/g, "").length > 0) {
		throw new Error("The required version is not in a dot-separated format. Got: "+Vue.version);
	}
	
	const vueVersion = Vue.version.split(".").map((subver)=>parseInt(subver));
	const reqVersion = minVersion.split(".").map((subver)=>parseInt(subver));
	
	//Below loop can return before recognising invalid number.
	reqVersion.forEach((subver)=>{
		if(typeof subver !== "number" || isNaN(subver)) {
			throw new Error("The required version is not in the format x, x.y or x.y.z. Got: "+minVersion);
		}
	});
	
	if(reqVersion.length > 3 || reqVersion.length < 1) {
		throw new Error("The required version is not in the format x, x.y or x.y.z. Got: "+minVersion);
	}
	
	for(let i=0, ii=reqVersion.length; i<ii; i++) {
		const actual = vueVersion[i];
		const expected = reqVersion[i];
		
		if(actual === expected) {
			continue;
		}
		
		return (actual < expected) ? false : true;
	}
	return true;
}

export const cats4Vue = {
	configParser, 
	isValidPrivateProperty, 
	componentOptionsWriter, 
	renameComponent, 
	registerVuexModule,
	ensureVersion
};

export default cats4Vue;