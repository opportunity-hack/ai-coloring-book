"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/sponsor",{

/***/ "./components/Sponsor/sponsor.module.tsx":
/*!***********************************************!*\
  !*** ./components/Sponsor/sponsor.module.tsx ***!
  \***********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n\nvar _s = $RefreshSig$();\nconst Sponsor = ()=>{\n    _s();\n    const [sponsors, setSponsors] = useState([]);\n    useEffect(()=>{\n        const fetchData = async ()=>{\n            try {\n                const response = await fetch(\"https://api.example.com/sponsors\"); // Replace with your API endpoint\n                if (response.ok) {\n                    const data = await response.json();\n                    setSponsors(data.sponsors); // Assuming your response structure has a \"sponsors\" array\n                } else {\n                    console.error(\"Failed to fetch sponsors\");\n                }\n            } catch (error) {\n                console.error(\"Error during sponsor fetch:\", error);\n            }\n        };\n        fetchData();\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {}, void 0, false, {\n        fileName: \"/Users/jggoyaljayati/ASU-Projects/OppurtunityHackathon/Caffeine-Compilers--FromSketchestoSmiles-AColoringBookthatGivesBack/dummy-project/components/Sponsor/sponsor.module.tsx\",\n        lineNumber: 23,\n        columnNumber: 9\n    }, undefined);\n};\n_s(Sponsor, \"bXE0gO2B7N4mytm3We7J2yrKv98=\");\n_c = Sponsor;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Sponsor);\nvar _c;\n$RefreshReg$(_c, \"Sponsor\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL1Nwb25zb3Ivc3BvbnNvci5tb2R1bGUudHN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsTUFBTUEsVUFBVSxJQUFNOztJQUNsQixNQUFNLENBQUNDLFVBQVVDLFlBQVksR0FBR0MsU0FBUyxFQUFFO0lBRTdDQyxVQUFVLElBQU07UUFDZixNQUFNQyxZQUFZLFVBQVk7WUFDN0IsSUFBSTtnQkFDSCxNQUFNQyxXQUFXLE1BQU1DLE1BQU0scUNBQXFDLGlDQUFpQztnQkFDbkcsSUFBSUQsU0FBU0UsRUFBRSxFQUFFO29CQUNoQixNQUFNQyxPQUFPLE1BQU1ILFNBQVNJLElBQUk7b0JBQ2hDUixZQUFZTyxLQUFLUixRQUFRLEdBQUcsMERBQTBEO2dCQUN2RixPQUFPO29CQUNOVSxRQUFRQyxLQUFLLENBQUM7Z0JBQ2YsQ0FBQztZQUNGLEVBQUUsT0FBT0EsT0FBTztnQkFDZkQsUUFBUUMsS0FBSyxDQUFDLCtCQUErQkE7WUFDOUM7UUFDRDtRQUVBUDtJQUNELEdBQUcsRUFBRTtJQUNILHFCQUNJLDhEQUFDUTs7Ozs7QUFJVDtHQXpCTWI7S0FBQUE7QUEyQk4sK0RBQWVBLE9BQU9BLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9TcG9uc29yL3Nwb25zb3IubW9kdWxlLnRzeD81YTFjIl0sInNvdXJjZXNDb250ZW50IjpbIlxuY29uc3QgU3BvbnNvciA9ICgpID0+IHtcbiAgICBjb25zdCBbc3BvbnNvcnMsIHNldFNwb25zb3JzXSA9IHVzZVN0YXRlKFtdKTtcblxuXHRcdHVzZUVmZmVjdCgoKSA9PiB7XG5cdFx0XHRjb25zdCBmZXRjaERhdGEgPSBhc3luYyAoKSA9PiB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcImh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL3Nwb25zb3JzXCIpOyAvLyBSZXBsYWNlIHdpdGggeW91ciBBUEkgZW5kcG9pbnRcblx0XHRcdFx0XHRpZiAocmVzcG9uc2Uub2spIHtcblx0XHRcdFx0XHRcdGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cdFx0XHRcdFx0XHRzZXRTcG9uc29ycyhkYXRhLnNwb25zb3JzKTsgLy8gQXNzdW1pbmcgeW91ciByZXNwb25zZSBzdHJ1Y3R1cmUgaGFzIGEgXCJzcG9uc29yc1wiIGFycmF5XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gZmV0Y2ggc3BvbnNvcnNcIik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJFcnJvciBkdXJpbmcgc3BvbnNvciBmZXRjaDpcIiwgZXJyb3IpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0XHRmZXRjaERhdGEoKTtcblx0XHR9LCBbXSk7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIFxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBTcG9uc29yOyJdLCJuYW1lcyI6WyJTcG9uc29yIiwic3BvbnNvcnMiLCJzZXRTcG9uc29ycyIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwiZmV0Y2hEYXRhIiwicmVzcG9uc2UiLCJmZXRjaCIsIm9rIiwiZGF0YSIsImpzb24iLCJjb25zb2xlIiwiZXJyb3IiLCJkaXYiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./components/Sponsor/sponsor.module.tsx\n"));

/***/ })

});