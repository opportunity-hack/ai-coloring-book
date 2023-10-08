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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _sponsor_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sponsor.module.css */ \"./components/Sponsor/sponsor.module.css\");\n/* harmony import */ var _sponsor_module_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_sponsor_module_css__WEBPACK_IMPORTED_MODULE_2__);\n\nvar _s = $RefreshSig$();\n\n\nconst Sponsor = ()=>{\n    _s();\n    const [books, setBooks] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const fetchData = async ()=>{\n            try {\n                const response = await fetch(\"https://api.example.com/sponsors\"); // Replace with your API endpoint\n                if (response.ok) {\n                    const data = await response.json();\n                    setBooks(data.books); // Assuming your response structure has a \"sponsors\" array\n                } else {\n                    console.error(\"Failed to fetch sponsors\");\n                }\n            } catch (error) {\n                console.error(\"Error during sponsor fetch:\", error);\n            }\n        };\n        fetchData();\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n            type: \"submit\",\n            className: (_sponsor_module_css__WEBPACK_IMPORTED_MODULE_2___default().button),\n            children: \"Submit\"\n        }, void 0, false, {\n            fileName: \"/Users/jggoyaljayati/ASU-Projects/OppurtunityHackathon/Caffeine-Compilers--FromSketchestoSmiles-AColoringBookthatGivesBack/dummy-project/components/Sponsor/sponsor.module.tsx\",\n            lineNumber: 25,\n            columnNumber: 5\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"/Users/jggoyaljayati/ASU-Projects/OppurtunityHackathon/Caffeine-Compilers--FromSketchestoSmiles-AColoringBookthatGivesBack/dummy-project/components/Sponsor/sponsor.module.tsx\",\n        lineNumber: 24,\n        columnNumber: 4\n    }, undefined);\n};\n_s(Sponsor, \"ww1JAI05mMsgubm5EIyBKqdj5S0=\");\n_c = Sponsor;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Sponsor);\nvar _c;\n$RefreshReg$(_c, \"Sponsor\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL1Nwb25zb3Ivc3BvbnNvci5tb2R1bGUudHN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFtRDtBQUNUO0FBQzFDLE1BQU1JLFVBQVUsSUFBTTs7SUFDckIsTUFBTSxDQUFDQyxPQUFPQyxTQUFTLEdBQUdMLCtDQUFRQSxDQUFDLEVBQUU7SUFFckNDLGdEQUFTQSxDQUFDLElBQU07UUFDZixNQUFNSyxZQUFZLFVBQVk7WUFDN0IsSUFBSTtnQkFDSCxNQUFNQyxXQUFXLE1BQU1DLE1BQU0scUNBQXFDLGlDQUFpQztnQkFDbkcsSUFBSUQsU0FBU0UsRUFBRSxFQUFFO29CQUNoQixNQUFNQyxPQUFPLE1BQU1ILFNBQVNJLElBQUk7b0JBQ2hDTixTQUFTSyxLQUFLTixLQUFLLEdBQUcsMERBQTBEO2dCQUNqRixPQUFPO29CQUNOUSxRQUFRQyxLQUFLLENBQUM7Z0JBQ2YsQ0FBQztZQUNGLEVBQUUsT0FBT0EsT0FBTztnQkFDZkQsUUFBUUMsS0FBSyxDQUFDLCtCQUErQkE7WUFDOUM7UUFDRDtRQUVBUDtJQUNELEdBQUcsRUFBRTtJQUNGLHFCQUNELDhEQUFDUTtrQkFDQSw0RUFBQ0M7WUFBT0MsTUFBSztZQUFTQyxXQUFXZixtRUFBYTtzQkFBRTs7Ozs7Ozs7Ozs7QUFLcEQ7R0EzQk1DO0tBQUFBO0FBNkJOLCtEQUFlQSxPQUFPQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2NvbXBvbmVudHMvU3BvbnNvci9zcG9uc29yLm1vZHVsZS50c3g/NWExYyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHN0eWxlcyBmcm9tICcuL3Nwb25zb3IubW9kdWxlLmNzcyc7XG5jb25zdCBTcG9uc29yID0gKCkgPT4ge1xuXHRjb25zdCBbYm9va3MsIHNldEJvb2tzXSA9IHVzZVN0YXRlKFtdKTtcblxuXHR1c2VFZmZlY3QoKCkgPT4ge1xuXHRcdGNvbnN0IGZldGNoRGF0YSA9IGFzeW5jICgpID0+IHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCJodHRwczovL2FwaS5leGFtcGxlLmNvbS9zcG9uc29yc1wiKTsgLy8gUmVwbGFjZSB3aXRoIHlvdXIgQVBJIGVuZHBvaW50XG5cdFx0XHRcdGlmIChyZXNwb25zZS5vaykge1xuXHRcdFx0XHRcdGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cdFx0XHRcdFx0c2V0Qm9va3MoZGF0YS5ib29rcyk7IC8vIEFzc3VtaW5nIHlvdXIgcmVzcG9uc2Ugc3RydWN0dXJlIGhhcyBhIFwic3BvbnNvcnNcIiBhcnJheVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gZmV0Y2ggc3BvbnNvcnNcIik7XG5cdFx0XHRcdH1cblx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJFcnJvciBkdXJpbmcgc3BvbnNvciBmZXRjaDpcIiwgZXJyb3IpO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRmZXRjaERhdGEoKTtcblx0fSwgW10pO1xuICAgIHJldHVybiAoXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzc05hbWU9e3N0eWxlcy5idXR0b259PlxuXHRcdFx0XHRcdFN1Ym1pdFxuXHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTcG9uc29yO1xuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJzdHlsZXMiLCJTcG9uc29yIiwiYm9va3MiLCJzZXRCb29rcyIsImZldGNoRGF0YSIsInJlc3BvbnNlIiwiZmV0Y2giLCJvayIsImRhdGEiLCJqc29uIiwiY29uc29sZSIsImVycm9yIiwiZGl2IiwiYnV0dG9uIiwidHlwZSIsImNsYXNzTmFtZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./components/Sponsor/sponsor.module.tsx\n"));

/***/ })

});