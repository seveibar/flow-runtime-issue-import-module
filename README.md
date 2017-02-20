# flow-runtime-issue-import-module
Repository to demonstrate a flow-runtime issue with importing types

This is a:

 - [X] Bug Report
 - [ ] Feature Request
 - [ ] Question
 - [ ] Other

Which concerns:

 - [ ] flow-runtime
 - [X] babel-plugin-flow-runtime
 - [ ] flow-runtime-validatosr
 - [ ] flow-runtime-mobx
 - [ ] flow-config-parser
 - [ ] The documentation website

---

### What is the current behaviour?
<!--
  If this is a bug report or question, please include example code wherever possible.
  If your code is private and you can't share it, please create a sanitized version
  which reproduces the issue. You may find the online demo useful for this:
  https://codemix.github.io/flow-runtime/#/try

  NOTE: It is **extremely** difficult to fix bugs without examples!
-->

Importing types from `node_modules` causes `SyntaxError`.

[See example repository](https://github.com/seveibar/flow-runtime-issue-import-module).

```bash
yarn install
yarn build
yarn start
```

---

**Setup**

Given a `node_module` with type exports,

```javascript
// @flow
export type Animal = {
  name: string,
  hasLegs: bool
};
```

An a source file...

```javascript
// @flow
import type { Animal } from 'animals';

const c:any = {
  name: 'Dog',
  hasLegs: 'yes', // this is not the right type (should be bool)
}

console.log((c:Animal).id);
```

Results in invalid export,

```
export type Animal = {
^^^^^^
SyntaxError: Unexpected token export
    at Object.exports.runInThisContext (vm.js:73:16)
    at Module._compile (module.js:543:28)
    at Object.Module._extensions..js (module.js:580:10)
    at Module.load (module.js:488:32)
    at tryModuleLoad (module.js:447:12)
    at Function.Module._load (module.js:439:3)
    at Module.require (module.js:498:17)
    at require (internal/module.js:20:19)
    at Object.<anonymous> (/home/seve/workspace/flow-runtime-issue/dist/index.js:3:16)
    at Module._compile (module.js:571:32)
```

---

### What is the expected behaviour?
<!--
  Please describe what you'd expect to happen under these circumstances.
  If you are describing a bug in the babel plugin, please indicate the output
  you'd expect it to produce.
-->

Remove types from imported `node_modules`.

---

### Which package versions are you using?
<!--
  If this is a bug, which version(s) of the affected package(s) are you using?
  If you're describing a bug specific to an environment, like a certain browser
  or node version, please include that information here too.
-->

```javascript
"dependencies": {
    "animals": "file:animals",
    "babel-cli": "^6.23.0",
    "babel-core": "^6.23.1",
    "babel-plugin-flow-runtime": "^0.5.0",
    "babel-plugin-transform-es2015-modules-commonjs": "^6.23.0",
    "babel-plugin-transform-flow-strip-types": "^6.22.0",
    "babel-preset-stage-1": "^6.22.0"
  }
```

The babel configuration is as follows,
```javascript
"babel": {
    "presets": [
      "stage-1"
    ],
    "plugins": [
      [ "transform-flow-strip-types" ],
      [ "flow-runtime" ],
      ["transform-es2015-modules-commonjs"]
    ]
  }
```

---

A workaround is to use the preferred method of type imports with the `flow-typed` directory. (i didn't personally test this)
