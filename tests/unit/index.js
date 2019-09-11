const assert = require("assert");
const {configParser, isValidPrivateProperty, isValidRootProperty, componentOptionsWriter, registerVuexModule, renameComponent, ensureVersion} = require("../../src/index.js");
const defaultExport = require("../../src/index.js").default;

suite("index.js");

test("expected exports provided", ()=>{
	const expected = ["configParser", "isValidPrivateProperty", "isValidRootProperty", "componentOptionsWriter", "registerVuexModule", "renameComponent", "ensureVersion", "cats4Vue", "default"];	
	assert.deepEqual(Object.keys(require("../../src/index.js")).sort(), expected.sort());
	
	const {cats4Vue} = require("../../src/index.js");
	const defaultExport = require("../../src/index.js").default;
	
	expected.splice(expected.indexOf("default"), 1);
	expected.splice(expected.indexOf("cats4Vue"), 1);
	assert.deepEqual(Object.keys(defaultExport).sort(), expected);
	assert.deepEqual(cats4Vue, defaultExport)
});


test("configParser fills defaults if not provided", ()=>{
	const defaults = {a: {type: "number", default: 1}, b: {type: "number", default: 2}};
	const config = {a: 11};
	
	assert.deepEqual(configParser(config, defaults), {a: 11, b: 2});
});

test("configParser drops config properties not on defaults", ()=>{
	const backup = console.warn;
	console.warn = ()=>{};
	
	const result = configParser({a: 1, b: 2}, {a: {type: "number"}});
	console.warn = backup;
	assert.deepEqual(result, {a: 1});
});

test("configParser logs warning if config properties not on defaults", ()=>{
	let callCount = 0;
	const backup = console.warn;
	console.warn = ()=>{callCount++};
	
	configParser({a: 1, b: 2}, {a: {type: "number"}});
	console.warn = backup;
	
	assert.equal(callCount, 1);
});

test("configParser does not type check if default type null", ()=>{
	assert.doesNotThrow(()=>{
		configParser({a: "notNull"}, {a: {type: null}});
	});
});

test("configParser throws if type property missing on default", ()=>{
	assert.throws(()=>{ configParser({a:1}, {a: {anythingBut: "type"}}); }, {message: /type property on default/});
});

test("configParser throws if a required prop is not provided", () => {
	assert.throws(()=>{ configParser({notTest: "whatever"}, {test: {required: true, type: "string"}}) }, {message: /is required but not provided/});
});

test("configParser throws if non-null type mismatches default type", ()=>{
	["123", [123], ()=>123, {"123":123}, false].forEach((illegalVal)=>{
		assert.throws(()=>{ configParser({test: illegalVal}, {test: {type: "number"}}) }, {message: /must be of type/});
	});
});


test("isValidPrivateProperty checks for $_*_* and returns true or false", ()=>{
	assert.equal(isValidPrivateProperty("$_namespace_property"), true);
	assert.equal(isValidPrivateProperty("$_namespace_property_whatever"), true);
	assert.equal(isValidPrivateProperty("missingPrefix"), false);
	assert.equal(isValidPrivateProperty("_missingDollar"), false);
	assert.equal(isValidPrivateProperty("$missingFirstUnderscore"), false);
	assert.equal(isValidPrivateProperty("$missingFirstUnderscore_still"), false);
	assert.equal(isValidPrivateProperty("$_notNamespacedOrPropertied"), false);
});


test("isValidRootProperty returns bool for in/valid property", ()=>{
	assert.equal(isValidRootProperty("data"), false);
	assert.equal(isValidRootProperty(["bollocks"]), false);
	assert.equal(isValidRootProperty("$data"), true);
});

test("isValidRootProperty throws instead of returns for invalid property if option is set", ()=>{
	assert.throws(()=>{ isValidRootProperty("data", true); }, /is a reserved Vue property/);
	assert.doesNotThrow(()=>{ isValidRootProperty("data", false); });
});

test("isValidRootProperty throws instead of returns if property is not a string if option is set", ()=>{
	assert.throws(()=>{ isValidRootProperty(["bollocks"], true); }, /non-string property/);
	assert.throws(()=>{ isValidRootProperty({"string":"bollocks"}, true); }, /non-string property/);
	assert.throws(()=>{ isValidRootProperty(()=>"bollocks", true); }, /non-string property/);
	assert.throws(()=>{ isValidRootProperty(123, true); }, /non-string property/);
	assert.throws(()=>{ isValidRootProperty(false, true); }, /non-string property/);
	assert.throws(()=>{ isValidRootProperty(undefined, true); }, /non-string property/);
});


test("componentOptionsWriter writes options to component", ()=>{
	const component = {name: "test"};
	const options = {$_a_b: 1, $_b_c: 2};
	componentOptionsWriter(component, options)
	assert.deepEqual(component, {name: "test", $_a_b: 1, $_b_c: 2});
});

test("componentOptionsWriter throws if option name not in form $_*_*", ()=>{
	assert.throws(()=>{ componentOptionsWriter({}, {illegalName: "val"}) }, {message: /\$_namespace_propertyName/});
});

test("componentOptionsWriter throws if duplicate option name encountered", ()=>{
	assert.throws(()=>{ componentOptionsWriter({existing: true}, {existing: false}) }, {message: /that already exists/});
});


test("renameComponent sets name on component", ()=>{
	const comp = {name: "oldName"};
	renameComponent(comp, "test");
	assert.equal(comp.name, "test");
});

test("renameComponent throws if name not a string", ()=>{
	const message = /must be of type string/;
	assert.throws(()=>{renameComponent({name:"old"}, 123);}, {message});
	assert.throws(()=>{renameComponent({name:"old"}, ["123"]);}, {message});
	assert.throws(()=>{renameComponent({name:"old"}, {name: "123"});}, {message});
	assert.throws(()=>{renameComponent({name:"old"}, ()=>"123");}, {message});

});

test("renameComponent throws if component does not have property name", ()=>{
	const message = /with the property name/;
	assert.throws(()=>{renameComponent(123, "test");}, {message});
	assert.throws(()=>{renameComponent("component", "test");}, {message});
	assert.throws(()=>{renameComponent(["name"], "test");}, {message});
	assert.throws(()=>{renameComponent(()=>{return {name: "abc"}}, "test");}, {message});	
	assert.throws(()=>{renameComponent({notName: "nope"}, "test")}, {message});
});


test("registerVuexModule registers module with namespace", ()=>{
	let ns, mod;
	let called = 0;
	const vuex = {dispatch: ()=>{}, registerModule: (n,m)=>{ns=n; mod=m; called++;}}
	const module = {state: {}, getters: {}}
	
	registerVuexModule(vuex, "NS", module);
	assert.equal(called, 1);
	assert.equal(ns, "NS");
	assert.deepEqual(mod, module);
});

test("registerVuexModule throws if namespace not a string", ()=>{
	assert.throws(()=>{ registerVuexModule(null, 123, null); }, {message: /namespace/});
	assert.throws(()=>{ registerVuexModule(null, ()=>123, null); }, {message: /namespace/});
	assert.throws(()=>{ registerVuexModule(null, [123], null); }, {message: /namespace/});
	assert.throws(()=>{ registerVuexModule(null, false, null); }, {message: /namespace/});
	assert.throws(()=>{ registerVuexModule(null, {"123": 123}, null); }, {message: /namespace/});
});

test("registerVuexModule throws if module not an object", ()=>{
	assert.throws(()=>{ registerVuexModule(null, "abc", "123"); }, {message: /module parameter/});
	assert.throws(()=>{ registerVuexModule(null, "abc", 123); }, {message: /module parameter/});
	assert.throws(()=>{ registerVuexModule(null, "abc", ()=>123); }, {message: /module parameter/});
	assert.throws(()=>{ registerVuexModule(null, "abc", false); }, {message: /module parameter/});
});

test("registerVuexModule throws if module doesn't contain any vuex store properties", ()=>{
	assert.throws(()=>{ registerVuexModule(null, "abc", {gettres: {getTypo(){}}}); }, {message: /of unexpected structure/});
});

test("registerVuexModule throws if vuex not a store instance", ()=>{
	assert.throws(()=>{ registerVuexModule({}, "abc", {getters: {}}); }, {message: /requires vuex instance/});
	assert.throws(()=>{ registerVuexModule({vuex: {notDispatch: {}}}, "abc", {getters: {}}); }, {message: /requires vuex instance/});
});


test("ensureVersion returns false if Vue version is smaller than required version", ()=>{
	assert.equal(ensureVersion({version: "1.23.4"}, "2.23.4"), false);
	assert.equal(ensureVersion({version: "1.23.4"}, "1.33.4"), false);
	assert.equal(ensureVersion({version: "1.23.4"}, "1.24.4"), false);
	assert.equal(ensureVersion({version: "1.23.4"}, "1.23.5"), false);
});

test("ensureVersion returns true if Vue version is greater than or equal to required version", ()=>{
	assert.equal(ensureVersion({version: "1.23.4"}, "1.23.4"), true);
	assert.equal(ensureVersion({version: "2.23.4"}, "1.23.4"), true);
	assert.equal(ensureVersion({version: "1.33.4"}, "1.23.4"), true);
	assert.equal(ensureVersion({version: "1.24.4"}, "1.23.4"), true);
	assert.equal(ensureVersion({version: "1.23.5"}, "1.23.4"), true);
});

test("ensureVersion allows required version to be only in x or x.z format", ()=>{
	assert.equal(ensureVersion({version: "2.23.4"}, "2"), true);
	assert.equal(ensureVersion({version: "1.23.4"}, "1.1"), true);
	
	assert.equal(ensureVersion({version: "1.23.4"}, "2"), false);
	assert.equal(ensureVersion({version: "1.2.4"}, "1.3"), false);
});

test("ensureVersion throws if version property not on Vue", ()=>{
	assert.throws(()=>{ensureVersion({notVersion: "2.12"}, "2.13")}, {message: /version property is missing/});
});

test("ensureVersion throws if required version format not in x, x.y or x.y.z", ()=>{
	assert.throws(()=>{ensureVersion({version: "1.23.4"}, "2.")}, {message: /required version is not in the format x/});
	assert.throws(()=>{ensureVersion({version: "1.23.4"}, "2.3.4.5")}, {message: /required version is not in the format x/});
});

test("ensureVersion throws if Vue version contains anything but numbers and dots", ()=>{
	assert.throws(()=>{ ensureVersion({version: "2,6"}, "2") }, {message: /Vue version is not in a dot-separated format/});
	assert.throws(()=>{ ensureVersion({version: "2.o"}, "2") }, {message: /Vue version is not in a dot-separated format/});
});

test("ensureVersion throws if required version contains anything but numbers and dots", ()=>{
	assert.throws(()=>{ ensureVersion({version: "2.6"}, "2,6") }, {message: /required version is not in a dot-separated format/});
	assert.throws(()=>{ ensureVersion({version: "2.6"}, "2.o") }, {message: /required version is not in a dot-separated format/});	
});

test("ensureVersion throws if Vue version is too low if option is set", ()=>{
	assert.throws(()=>{ ensureVersion({version: "2.6"}, "2.7", {throwInsteadOfReturn: true}) }, {message: /do not have the required Vue version of/});
});