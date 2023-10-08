"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/upload",{

/***/ "./components/upload/upload.module.tsx":
/*!*********************************************!*\
  !*** ./components/upload/upload.module.tsx ***!
  \*********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _upload_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./upload.module.css */ \"./components/upload/upload.module.css\");\n/* harmony import */ var _upload_module_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_upload_module_css__WEBPACK_IMPORTED_MODULE_2__);\n// import React, { useState } from 'react'\n// import styles from './upload.module.css'\n// const Upload = (props: any) => {\n//   return (\n//     <>\n//       <div className={`${styles.mainContainer} ${styles.mainContainer}`}>\n//         hello from upload\n//       </div>\n//     </>\n//   )\n// }\n// export default Upload\n// Upload.tsx\n// upload.module.tsx\n\nvar _s = $RefreshSig$();\n\n\nconst Upload = ()=>{\n    _s();\n    const [file, setFile] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [textFields, setTextFields] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({\n        field1: \"\",\n        field2: \"\",\n        field3: \"\"\n    });\n    const handleFileChange = (event)=>{\n        var _event_target_files;\n        const selectedFile = (_event_target_files = event.target.files) === null || _event_target_files === void 0 ? void 0 : _event_target_files[0];\n        if (selectedFile) {\n            setFile(selectedFile);\n        }\n    };\n    const handleTextChange = (event)=>{\n        const { name , value  } = event.target;\n        setTextFields((prevFields)=>({\n                ...prevFields,\n                [name]: value\n            }));\n    };\n    const handleSubmit = async (event)=>{\n        event.preventDefault();\n        // Create a FormData object to append the file and text fields\n        const formData = new FormData();\n        formData.append(\"image\", file);\n        formData.append(\"school\", textFields.field1);\n        formData.append(\"student\", textFields.field2);\n        formData.append(\"subject\", textFields.field3);\n        try {\n            const response = await fetch(\"/api/drawings\", {\n                method: \"POST\",\n                body: formData\n            });\n            if (response.ok) {\n                console.log(\"POST request successful\");\n            // Handle success, e.g., show a success message\n            } else {\n                console.error(\"POST request failed\");\n            // Handle failure, e.g., show an error message\n            }\n        } catch (error) {\n            console.error(\"Error during POST request:\", error);\n        // Handle error, e.g., show an error message\n        }\n        // Perform your POST request here using fetch or a library like Axios\n        // Include file and textFields in the request payload\n        console.log(\"File:\", file);\n        console.log(\"Text Fields:\", textFields);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: (_upload_module_css__WEBPACK_IMPORTED_MODULE_2___default().uploadContainer),\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n            onSubmit: handleSubmit,\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: (_upload_module_css__WEBPACK_IMPORTED_MODULE_2___default().dashedRectangle)\n                }, void 0, false, {\n                    fileName: \"/Users/jggoyaljayati/ASU-Projects/OppurtunityHackathon/Caffeine-Compilers--FromSketchestoSmiles-AColoringBookthatGivesBack/dummy-project/components/upload/upload.module.tsx\",\n                    lineNumber: 87,\n                    columnNumber: 7\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: (_upload_module_css__WEBPACK_IMPORTED_MODULE_2___default().formGroup),\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                            className: (_upload_module_css__WEBPACK_IMPORTED_MODULE_2___default().label),\n                            children: \"File Upload:\"\n                        }, void 0, false, {\n                            fileName: \"/Users/jggoyaljayati/ASU-Projects/OppurtunityHackathon/Caffeine-Compilers--FromSketchestoSmiles-AColoringBookthatGivesBack/dummy-project/components/upload/upload.module.tsx\",\n                            lineNumber: 89,\n                            columnNumber: 11\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                            type: \"file\",\n                            accept: \".pdf, .jpeg, .jpg, .png\",\n                            onChange: handleFileChange\n                        }, void 0, false, {\n                            fileName: \"/Users/jggoyaljayati/ASU-Projects/OppurtunityHackathon/Caffeine-Compilers--FromSketchestoSmiles-AColoringBookthatGivesBack/dummy-project/components/upload/upload.module.tsx\",\n                            lineNumber: 90,\n                            columnNumber: 11\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/jggoyaljayati/ASU-Projects/OppurtunityHackathon/Caffeine-Compilers--FromSketchestoSmiles-AColoringBookthatGivesBack/dummy-project/components/upload/upload.module.tsx\",\n                    lineNumber: 88,\n                    columnNumber: 9\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: (_upload_module_css__WEBPACK_IMPORTED_MODULE_2___default().formGroup),\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                            className: (_upload_module_css__WEBPACK_IMPORTED_MODULE_2___default().label),\n                            children: \"School Name:\"\n                        }, void 0, false, {\n                            fileName: \"/Users/jggoyaljayati/ASU-Projects/OppurtunityHackathon/Caffeine-Compilers--FromSketchestoSmiles-AColoringBookthatGivesBack/dummy-project/components/upload/upload.module.tsx\",\n                            lineNumber: 98,\n                            columnNumber: 11\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                            type: \"text\",\n                            name: \"field1\",\n                            value: textFields.field1,\n                            onChange: handleTextChange,\n                            className: (_upload_module_css__WEBPACK_IMPORTED_MODULE_2___default().input)\n                        }, void 0, false, {\n                            fileName: \"/Users/jggoyaljayati/ASU-Projects/OppurtunityHackathon/Caffeine-Compilers--FromSketchestoSmiles-AColoringBookthatGivesBack/dummy-project/components/upload/upload.module.tsx\",\n                            lineNumber: 99,\n                            columnNumber: 11\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/jggoyaljayati/ASU-Projects/OppurtunityHackathon/Caffeine-Compilers--FromSketchestoSmiles-AColoringBookthatGivesBack/dummy-project/components/upload/upload.module.tsx\",\n                    lineNumber: 97,\n                    columnNumber: 9\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: (_upload_module_css__WEBPACK_IMPORTED_MODULE_2___default().formGroup),\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                            className: (_upload_module_css__WEBPACK_IMPORTED_MODULE_2___default().label),\n                            children: \"Student Name:\"\n                        }, void 0, false, {\n                            fileName: \"/Users/jggoyaljayati/ASU-Projects/OppurtunityHackathon/Caffeine-Compilers--FromSketchestoSmiles-AColoringBookthatGivesBack/dummy-project/components/upload/upload.module.tsx\",\n                            lineNumber: 109,\n                            columnNumber: 11\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                            type: \"text\",\n                            name: \"field2\",\n                            value: textFields.field2,\n                            onChange: handleTextChange,\n                            className: (_upload_module_css__WEBPACK_IMPORTED_MODULE_2___default().input)\n                        }, void 0, false, {\n                            fileName: \"/Users/jggoyaljayati/ASU-Projects/OppurtunityHackathon/Caffeine-Compilers--FromSketchestoSmiles-AColoringBookthatGivesBack/dummy-project/components/upload/upload.module.tsx\",\n                            lineNumber: 110,\n                            columnNumber: 11\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/jggoyaljayati/ASU-Projects/OppurtunityHackathon/Caffeine-Compilers--FromSketchestoSmiles-AColoringBookthatGivesBack/dummy-project/components/upload/upload.module.tsx\",\n                    lineNumber: 108,\n                    columnNumber: 9\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: (_upload_module_css__WEBPACK_IMPORTED_MODULE_2___default().formGroup),\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                            className: (_upload_module_css__WEBPACK_IMPORTED_MODULE_2___default().label),\n                            children: \"Art subject:\"\n                        }, void 0, false, {\n                            fileName: \"/Users/jggoyaljayati/ASU-Projects/OppurtunityHackathon/Caffeine-Compilers--FromSketchestoSmiles-AColoringBookthatGivesBack/dummy-project/components/upload/upload.module.tsx\",\n                            lineNumber: 120,\n                            columnNumber: 11\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                            type: \"text\",\n                            name: \"field3\",\n                            value: textFields.field3,\n                            onChange: handleTextChange,\n                            className: (_upload_module_css__WEBPACK_IMPORTED_MODULE_2___default().input)\n                        }, void 0, false, {\n                            fileName: \"/Users/jggoyaljayati/ASU-Projects/OppurtunityHackathon/Caffeine-Compilers--FromSketchestoSmiles-AColoringBookthatGivesBack/dummy-project/components/upload/upload.module.tsx\",\n                            lineNumber: 121,\n                            columnNumber: 11\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/jggoyaljayati/ASU-Projects/OppurtunityHackathon/Caffeine-Compilers--FromSketchestoSmiles-AColoringBookthatGivesBack/dummy-project/components/upload/upload.module.tsx\",\n                    lineNumber: 119,\n                    columnNumber: 9\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                    type: \"submit\",\n                    className: (_upload_module_css__WEBPACK_IMPORTED_MODULE_2___default().button),\n                    children: \"Submit\"\n                }, void 0, false, {\n                    fileName: \"/Users/jggoyaljayati/ASU-Projects/OppurtunityHackathon/Caffeine-Compilers--FromSketchestoSmiles-AColoringBookthatGivesBack/dummy-project/components/upload/upload.module.tsx\",\n                    lineNumber: 131,\n                    columnNumber: 9\n                }, undefined)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/jggoyaljayati/ASU-Projects/OppurtunityHackathon/Caffeine-Compilers--FromSketchestoSmiles-AColoringBookthatGivesBack/dummy-project/components/upload/upload.module.tsx\",\n            lineNumber: 86,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"/Users/jggoyaljayati/ASU-Projects/OppurtunityHackathon/Caffeine-Compilers--FromSketchestoSmiles-AColoringBookthatGivesBack/dummy-project/components/upload/upload.module.tsx\",\n        lineNumber: 85,\n        columnNumber: 5\n    }, undefined);\n};\n_s(Upload, \"/WQrXuOEShneDq5n/3z9qiZCXSQ=\");\n_c = Upload;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Upload);\nvar _c;\n$RefreshReg$(_c, \"Upload\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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M0IsOERBQUMrQjtvQkFBSUMsV0FBV2hDLHFFQUFnQjs7c0NBQzlCLDhEQUFDc0M7NEJBQU1OLFdBQVdoQyxpRUFBWTtzQ0FBRTs7Ozs7O3NDQUNoQyw4REFBQ3VDOzRCQUNDQyxNQUFLOzRCQUNMekIsTUFBSzs0QkFDTEMsT0FBT1osV0FBV0csTUFBTTs0QkFDeEJtQyxVQUFVNUI7NEJBQ1ZrQixXQUFXaEMsaUVBQVk7Ozs7Ozs7Ozs7Ozs4QkFJM0IsOERBQUMrQjtvQkFBSUMsV0FBV2hDLHFFQUFnQjs7c0NBQzlCLDhEQUFDc0M7NEJBQU1OLFdBQVdoQyxpRUFBWTtzQ0FBRTs7Ozs7O3NDQUNoQyw4REFBQ3VDOzRCQUNDQyxNQUFLOzRCQUNMekIsTUFBSzs0QkFDTEMsT0FBT1osV0FBV0ksTUFBTTs0QkFDeEJrQyxVQUFVNUI7NEJBQ1ZrQixXQUFXaEMsaUVBQVk7Ozs7Ozs7Ozs7Ozs4QkFLM0IsOERBQUMyQztvQkFBT0gsTUFBSztvQkFBU1IsV0FBV2hDLGtFQUFhOzhCQUFFOzs7Ozs7Ozs7Ozs7Ozs7OztBQU14RDtHQWhITUM7S0FBQUE7QUFrSE4sK0RBQWVBLE1BQU1BLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy91cGxvYWQvdXBsb2FkLm1vZHVsZS50c3g/M2I3YiJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCdcbi8vIGltcG9ydCBzdHlsZXMgZnJvbSAnLi91cGxvYWQubW9kdWxlLmNzcydcblxuXG4vLyBjb25zdCBVcGxvYWQgPSAocHJvcHM6IGFueSkgPT4ge1xuXG5cbi8vICAgcmV0dXJuIChcbi8vICAgICA8PlxuLy8gICAgICAgPGRpdiBjbGFzc05hbWU9e2Ake3N0eWxlcy5tYWluQ29udGFpbmVyfSAke3N0eWxlcy5tYWluQ29udGFpbmVyfWB9PlxuLy8gICAgICAgICBoZWxsbyBmcm9tIHVwbG9hZFxuLy8gICAgICAgPC9kaXY+XG5cbi8vICAgICA8Lz5cbi8vICAgKVxuLy8gfVxuXG4vLyBleHBvcnQgZGVmYXVsdCBVcGxvYWRcbi8vIFVwbG9hZC50c3hcbi8vIHVwbG9hZC5tb2R1bGUudHN4XG5cbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlcyBmcm9tICcuL3VwbG9hZC5tb2R1bGUuY3NzJztcblxuY29uc3QgVXBsb2FkOiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgY29uc3QgW2ZpbGUsIHNldEZpbGVdID0gdXNlU3RhdGU8RmlsZSB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbdGV4dEZpZWxkcywgc2V0VGV4dEZpZWxkc10gPSB1c2VTdGF0ZSh7XG4gICAgZmllbGQxOiAnJyxcbiAgICBmaWVsZDI6ICcnLFxuICAgIGZpZWxkMzogJydcbiAgICAvLyBBZGQgbW9yZSBmaWVsZHMgYXMgbmVlZGVkXG4gIH0pO1xuXG4gIGNvbnN0IGhhbmRsZUZpbGVDaGFuZ2UgPSAoZXZlbnQ6IFJlYWN0LkNoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiB7XG4gICAgY29uc3Qgc2VsZWN0ZWRGaWxlID0gZXZlbnQudGFyZ2V0LmZpbGVzPy5bMF07XG4gICAgaWYgKHNlbGVjdGVkRmlsZSkge1xuICAgICAgc2V0RmlsZShzZWxlY3RlZEZpbGUpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVUZXh0Q2hhbmdlID0gKGV2ZW50OiBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4ge1xuICAgIGNvbnN0IHsgbmFtZSwgdmFsdWUgfSA9IGV2ZW50LnRhcmdldDtcbiAgICBzZXRUZXh0RmllbGRzKChwcmV2RmllbGRzKSA9PiAoe1xuICAgICAgLi4ucHJldkZpZWxkcyxcbiAgICAgIFtuYW1lXTogdmFsdWUsXG4gICAgfSkpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVN1Ym1pdCA9IGFzeW5jIChldmVudDogUmVhY3QuRm9ybUV2ZW50PEhUTUxGb3JtRWxlbWVudD4pID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgLy8gQ3JlYXRlIGEgRm9ybURhdGEgb2JqZWN0IHRvIGFwcGVuZCB0aGUgZmlsZSBhbmQgdGV4dCBmaWVsZHNcbiAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgZm9ybURhdGEuYXBwZW5kKCdpbWFnZScsIGZpbGUgYXMgQmxvYik7XG4gIGZvcm1EYXRhLmFwcGVuZCgnc2Nob29sJywgdGV4dEZpZWxkcy5maWVsZDEpO1xuICBmb3JtRGF0YS5hcHBlbmQoJ3N0dWRlbnQnLCB0ZXh0RmllbGRzLmZpZWxkMik7XG4gIGZvcm1EYXRhLmFwcGVuZCgnc3ViamVjdCcsIHRleHRGaWVsZHMuZmllbGQzKTtcblxuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9hcGkvZHJhd2luZ3MnLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGJvZHk6IGZvcm1EYXRhLFxuICAgIH0pO1xuXG4gICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICBjb25zb2xlLmxvZygnUE9TVCByZXF1ZXN0IHN1Y2Nlc3NmdWwnKTtcbiAgICAgIC8vIEhhbmRsZSBzdWNjZXNzLCBlLmcuLCBzaG93IGEgc3VjY2VzcyBtZXNzYWdlXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1BPU1QgcmVxdWVzdCBmYWlsZWQnKTtcbiAgICAgIC8vIEhhbmRsZSBmYWlsdXJlLCBlLmcuLCBzaG93IGFuIGVycm9yIG1lc3NhZ2VcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJyb3IgZHVyaW5nIFBPU1QgcmVxdWVzdDonLCBlcnJvcik7XG4gICAgLy8gSGFuZGxlIGVycm9yLCBlLmcuLCBzaG93IGFuIGVycm9yIG1lc3NhZ2VcbiAgfVxuXG4gICAgLy8gUGVyZm9ybSB5b3VyIFBPU1QgcmVxdWVzdCBoZXJlIHVzaW5nIGZldGNoIG9yIGEgbGlicmFyeSBsaWtlIEF4aW9zXG4gICAgLy8gSW5jbHVkZSBmaWxlIGFuZCB0ZXh0RmllbGRzIGluIHRoZSByZXF1ZXN0IHBheWxvYWRcblxuICAgIGNvbnNvbGUubG9nKCdGaWxlOicsIGZpbGUpO1xuICAgIGNvbnNvbGUubG9nKCdUZXh0IEZpZWxkczonLCB0ZXh0RmllbGRzKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMudXBsb2FkQ29udGFpbmVyfT5cbiAgICAgIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVTdWJtaXR9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5kYXNoZWRSZWN0YW5nbGV9PjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmZvcm1Hcm91cH0+XG4gICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT17c3R5bGVzLmxhYmVsfT5GaWxlIFVwbG9hZDo8L2xhYmVsPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgdHlwZT1cImZpbGVcIlxuICAgICAgICAgICAgYWNjZXB0PVwiLnBkZiwgLmpwZWcsIC5qcGcsIC5wbmdcIlxuICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUZpbGVDaGFuZ2V9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5mb3JtR3JvdXB9PlxuICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9e3N0eWxlcy5sYWJlbH0+U2Nob29sIE5hbWU6PC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIG5hbWU9XCJmaWVsZDFcIlxuICAgICAgICAgICAgdmFsdWU9e3RleHRGaWVsZHMuZmllbGQxfVxuICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZVRleHRDaGFuZ2V9XG4gICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5pbnB1dH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmZvcm1Hcm91cH0+XG4gICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT17c3R5bGVzLmxhYmVsfT5TdHVkZW50IE5hbWU6PC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIG5hbWU9XCJmaWVsZDJcIlxuICAgICAgICAgICAgdmFsdWU9e3RleHRGaWVsZHMuZmllbGQyfVxuICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZVRleHRDaGFuZ2V9XG4gICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5pbnB1dH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmZvcm1Hcm91cH0+XG4gICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT17c3R5bGVzLmxhYmVsfT5BcnQgc3ViamVjdDo8L2xhYmVsPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgbmFtZT1cImZpZWxkM1wiXG4gICAgICAgICAgICB2YWx1ZT17dGV4dEZpZWxkcy5maWVsZDN9XG4gICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlVGV4dENoYW5nZX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLmlucHV0fVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7LyogQWRkIG1vcmUgdGV4dCBmaWVsZHMgYXMgbmVlZGVkICovfVxuXG4gICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzTmFtZT17c3R5bGVzLmJ1dHRvbn0+XG4gICAgICAgICAgU3VibWl0XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9mb3JtPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVXBsb2FkO1xuIl0sIm5hbWVzIjpbInVzZVN0YXRlIiwic3R5bGVzIiwiVXBsb2FkIiwiZmlsZSIsInNldEZpbGUiLCJ0ZXh0RmllbGRzIiwic2V0VGV4dEZpZWxkcyIsImZpZWxkMSIsImZpZWxkMiIsImZpZWxkMyIsImhhbmRsZUZpbGVDaGFuZ2UiLCJldmVudCIsInNlbGVjdGVkRmlsZSIsInRhcmdldCIsImZpbGVzIiwiaGFuZGxlVGV4dENoYW5nZSIsIm5hbWUiLCJ2YWx1ZSIsInByZXZGaWVsZHMiLCJoYW5kbGVTdWJtaXQiLCJwcmV2ZW50RGVmYXVsdCIsImZvcm1EYXRhIiwiRm9ybURhdGEiLCJhcHBlbmQiLCJyZXNwb25zZSIsImZldGNoIiwibWV0aG9kIiwiYm9keSIsIm9rIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwiZGl2IiwiY2xhc3NOYW1lIiwidXBsb2FkQ29udGFpbmVyIiwiZm9ybSIsIm9uU3VibWl0IiwiZGFzaGVkUmVjdGFuZ2xlIiwiZm9ybUdyb3VwIiwibGFiZWwiLCJpbnB1dCIsInR5cGUiLCJhY2NlcHQiLCJvbkNoYW5nZSIsImJ1dHRvbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./components/upload/upload.module.tsx\n"));

/***/ })

});