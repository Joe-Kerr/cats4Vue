# CATs for Vue - Common Authoring Tools for Vue

Set of common helper functions used for authoring plugins (etc.) for Vue.

*It is intended for internal use. Should the need arise please yell at me and I will update the docs.*

## Install

**1)** 
```
npm install cats4vue
```
**2)**
```javascsript
import {cats4Vue} from "./where_you_put_it/src/index.js";
```


## Overview

### configParser

Type checks config parameters against defaults, fills in default values and checks for missing required options. 


### isValidPrivateProperty

Checks if a property (stuffed on the Vue instance) is properly namespaced. See also https://vuejs.org/v2/style-guide/#Private-property-names-essential


### isValidRootProperty

Checks if a custom property on the raw Vue component is a reserved Vue keyword.


### componentOptionsWriter

Writes properties on a given component, checks for proper namespacing and duplicate names.


### renameComponent

Overrides the name of a component. Might implement some naming convention checks in the future.


### registerVuexModule

Does what it says plus some validation and checking.


### ensureVersion

Checks whether the required version (1, 1.2 or 1.2.3) matches or is greater than the Vue version - otherwise throws.