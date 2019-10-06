/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function main() {\n    const formcontainer = document.getElementById(\"form-container\");\n    const resultcontainer = document.getElementById(\"result-container\");\n    const table = document.getElementById(\"table\");\n    const form = document.getElementById(\"form\");\n    const timeinput = document.getElementById(\"timeinput\");\n    const timeelem = document.getElementById(\"time\");\n    const startelem = document.getElementById(\"start\");\n    const endelem = document.getElementById(\"end\");\n    const elapsedtimeelem = document.getElementById(\"elapsedtime\");\n    const remaininigtimeelem = document.getElementById(\"remainingtime\");\n    const canvas = document.getElementById(\"canvas\");\n    resultcontainer.style.display = \"\";\n    const size = canvas.width = canvas.height = Math.min(document.body.clientWidth, window.innerHeight - table.clientHeight - 20);\n    const ctx = canvas.getContext(\"2d\");\n    canvas.width *= window.devicePixelRatio;\n    canvas.height *= window.devicePixelRatio;\n    canvas.style.width = String(canvas.width / window.devicePixelRatio) + \"px\";\n    canvas.style.height = String(canvas.height / window.devicePixelRatio) + \"px\";\n    resultcontainer.style.display = \"none\";\n    let time = 0;\n    let starttime = 0;\n    form.addEventListener(\"submit\", () => {\n        const date = new Date();\n        starttime = +date;\n        const matched = timeinput.value.match(/^(\\d+):(\\d+)$/);\n        if (matched) {\n            const endtime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), Number(matched[1]), Number(matched[2]));\n            console.log(endtime);\n            time = (+endtime - starttime) / 1000;\n        }\n        else {\n            time = Number(timeinput.value) * 60;\n        }\n        formcontainer.style.display = \"none\";\n        resultcontainer.style.display = \"\";\n        timeelem.textContent = Math.floor(time / 60) + \" min \";\n        startelem.textContent = formatTime(date);\n        endelem.textContent = formatTime(new Date(+date + time * 1000));\n        setInterval(update);\n    });\n    function update() {\n        const now = Date.now();\n        const elapsed = Math.min((now - starttime) / 1000, time);\n        const reamaining = time - elapsed;\n        elapsedtimeelem.textContent = Math.floor(elapsed / 60) + \" min \" + Math.floor(elapsed % 60) + \" sec\";\n        remaininigtimeelem.textContent = Math.floor(reamaining / 60) + \" min \" + Math.floor(reamaining % 60) + \" sec\";\n        draw(ctx, size, time, elapsed);\n    }\n}\nfunction draw(ctx, size, time, elapsed) {\n    const ratio = 1 - elapsed / time;\n    const remaining = time - elapsed;\n    const outerradius = size * 0.4;\n    const innerradius = size * 0.3;\n    ctx.clearRect(0, 0, size, size);\n    ctx.save();\n    ctx.translate(size / 2, size / 2);\n    ctx.fillStyle = \"#ccc\";\n    drawarc(2 * Math.PI - Math.PI / 2);\n    ctx.fillStyle = \"#349eeb\";\n    drawarc(-Math.PI / 2 + Math.PI * 2 * ratio);\n    ctx.font = \"20px sans-serif\";\n    ctx.textAlign = \"center\";\n    ctx.textBaseline = \"top\";\n    ctx.fillText(Math.floor(remaining / 60) + \" min \" + Math.floor(remaining % 60) + \" sec\", 0, -20);\n    ctx.font = \"30px sans-serif\";\n    ctx.fillText(Math.floor(ratio * 100) + \"%\", 0, 0);\n    ctx.restore();\n    function drawarc(theta) {\n        ctx.beginPath();\n        ctx.arc(0, 0, outerradius, -Math.PI / 2, theta);\n        ctx.lineTo(outerradius * Math.cos(theta), outerradius * Math.sin(theta));\n        ctx.lineTo(innerradius * Math.cos(theta), innerradius * Math.sin(theta));\n        ctx.arc(0, 0, innerradius, theta, -Math.PI / 2, true);\n        ctx.fill();\n    }\n}\nfunction formatTime(date) {\n    return date.getHours().toString().padStart(2, \"0\") + \":\" + date.getMinutes().toString().padStart(2, \"0\") + \":\" + date.getSeconds().toString().padStart(2, \"0\");\n}\nwindow.addEventListener(\"load\", main);\n\n\n//# sourceURL=webpack:///./index.ts?");

/***/ })

/******/ });