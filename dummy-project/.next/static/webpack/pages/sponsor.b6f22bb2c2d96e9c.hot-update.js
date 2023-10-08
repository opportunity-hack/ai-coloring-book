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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _sponsor_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sponsor.module.css */ \"./components/Sponsor/sponsor.module.css\");\n/* harmony import */ var _sponsor_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_sponsor_module_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _bookTemplate_bookTemplate_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../bookTemplate/bookTemplate.module */ \"./components/bookTemplate/bookTemplate.module.tsx\");\n\nvar _s = $RefreshSig$();\n\n\n\nconst Sponsor = ()=>{\n    _s();\n    const [books, setBooks] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [selectedBooks, setSelectedBooks] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const getResponse = ()=>{\n        return {\n            ok: 1,\n            count: 2,\n            next: null,\n            previous: null,\n            results: [\n                {\n                    id: 1,\n                    name: \"book-1\",\n                    about: \"htis book is about something\",\n                    url: null,\n                    is_published: null,\n                    created_on: \"2023-10-08T01:31:31.196001Z\",\n                    modified_on: \"2023-10-08T01:31:31.196077Z\",\n                    sponsors: [\n                        2,\n                        3\n                    ],\n                    nonprofits: [\n                        2\n                    ],\n                    drawings: []\n                },\n                {\n                    id: 2,\n                    name: \"book-2\",\n                    about: \"htis book is about something\",\n                    url: \"https://opp-hack-asu.s3.amazonaws.com/pdf_uploads/book-2.pdf\",\n                    is_published: null,\n                    created_on: \"2023-10-08T04:14:14.632453Z\",\n                    modified_on: \"2023-10-08T04:14:14.632487Z\",\n                    sponsors: [\n                        2,\n                        3\n                    ],\n                    nonprofits: [\n                        2\n                    ],\n                    drawings: [\n                        1,\n                        2,\n                        3,\n                        4\n                    ]\n                }\n            ]\n        };\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const fetchData = async ()=>{\n            try {\n                // const response = await fetch(\"api/books\"); // Replace with your API endpoint\n                const response = getResponse();\n                if (response.ok) {\n                    // const data = await response.json();\n                    // setBooks(data.results); // Assuming your response structure has a \"sponsors\" array\n                    setBooks(response.results);\n                } else {\n                    console.error(\"Failed to fetch sponsors\");\n                }\n            } catch (error) {\n                console.error(\"Error during sponsor fetch:\", error);\n            }\n        };\n        fetchData();\n    }, []);\n    const handleSelect = (bookId)=>{\n        // Toggle the selected state of the sponsor\n        setSelectedBooks((prevSelected)=>prevSelected.includes(bookId) ? prevSelected.filter((id)=>id !== bookId) : [\n                ...prevSelected,\n                bookId\n            ]);\n    };\n    const handleCheckout = async ()=>{\n        // Make the update call for selected sponsors\n        try {\n            const response = await fetch(\"https://api.example.com/updateSponsors\", {\n                method: \"PUT\",\n                headers: {\n                    \"Content-Type\": \"application/json\"\n                },\n                body: JSON.stringify({\n                    selectedBooks\n                })\n            });\n            if (response.ok) {\n                console.log(\"Selected sponsors updated successfully\");\n            } else {\n                console.error(\"Failed to update selected sponsors\");\n            }\n        } catch (error) {\n            console.error(\"Error during sponsor update:\", error);\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            books.map((book)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                            onClick: ()=>handleSelect(book.id),\n                            children: selectedBooks.includes(book.id) ? \"Deselect\" : \"Select\"\n                        }, void 0, false, {\n                            fileName: \"/Users/jggoyaljayati/ASU-Projects/OppurtunityHackathon/Caffeine-Compilers--FromSketchestoSmiles-AColoringBookthatGivesBack/dummy-project/components/Sponsor/sponsor.module.tsx\",\n                            lineNumber: 95,\n                            columnNumber: 6\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_bookTemplate_bookTemplate_module__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                            name: \"\",\n                            description: book.about\n                        }, void 0, false, {\n                            fileName: \"/Users/jggoyaljayati/ASU-Projects/OppurtunityHackathon/Caffeine-Compilers--FromSketchestoSmiles-AColoringBookthatGivesBack/dummy-project/components/Sponsor/sponsor.module.tsx\",\n                            lineNumber: 100,\n                            columnNumber: 6\n                        }, undefined)\n                    ]\n                }, book.id, true, {\n                    fileName: \"/Users/jggoyaljayati/ASU-Projects/OppurtunityHackathon/Caffeine-Compilers--FromSketchestoSmiles-AColoringBookthatGivesBack/dummy-project/components/Sponsor/sponsor.module.tsx\",\n                    lineNumber: 94,\n                    columnNumber: 5\n                }, undefined)),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                className: (_sponsor_module_css__WEBPACK_IMPORTED_MODULE_3___default().button),\n                onClick: handleCheckout,\n                children: \"Checkout\"\n            }, void 0, false, {\n                fileName: \"/Users/jggoyaljayati/ASU-Projects/OppurtunityHackathon/Caffeine-Compilers--FromSketchestoSmiles-AColoringBookthatGivesBack/dummy-project/components/Sponsor/sponsor.module.tsx\",\n                lineNumber: 104,\n                columnNumber: 4\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/jggoyaljayati/ASU-Projects/OppurtunityHackathon/Caffeine-Compilers--FromSketchestoSmiles-AColoringBookthatGivesBack/dummy-project/components/Sponsor/sponsor.module.tsx\",\n        lineNumber: 92,\n        columnNumber: 3\n    }, undefined);\n};\n_s(Sponsor, \"Schdwozl8w6Hgc1L8t2rcuBUaKM=\");\n_c = Sponsor;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Sponsor);\nvar _c;\n$RefreshReg$(_c, \"Sponsor\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL1Nwb25zb3Ivc3BvbnNvci5tb2R1bGUudHN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBbUQ7QUFDVDtBQUNxQjtBQUMvRCxNQUFNSyxVQUFVLElBQU07O0lBQ3JCLE1BQU0sQ0FBQ0MsT0FBT0MsU0FBUyxHQUFHTiwrQ0FBUUEsQ0FBQyxFQUFFO0lBQ3JDLE1BQU0sQ0FBQ08sZUFBZUMsaUJBQWlCLEdBQUdSLCtDQUFRQSxDQUFDLEVBQUU7SUFDckQsTUFBTVMsY0FBYyxJQUFNO1FBQ3pCLE9BQU87WUFDTkMsSUFBSTtZQUNKQyxPQUFPO1lBQ1BDLE1BQU0sSUFBSTtZQUNWQyxVQUFVLElBQUk7WUFDZEMsU0FBUztnQkFDUjtvQkFDQ0MsSUFBSTtvQkFDSkMsTUFBTTtvQkFDTkMsT0FBTztvQkFDUEMsS0FBSyxJQUFJO29CQUNUQyxjQUFjLElBQUk7b0JBQ2xCQyxZQUFZO29CQUNaQyxhQUFhO29CQUNiQyxVQUFVO3dCQUFDO3dCQUFHO3FCQUFFO29CQUNoQkMsWUFBWTt3QkFBQztxQkFBRTtvQkFDZkMsVUFBVSxFQUFFO2dCQUNiO2dCQUNBO29CQUNDVCxJQUFJO29CQUNKQyxNQUFNO29CQUNOQyxPQUFPO29CQUNQQyxLQUFLO29CQUNMQyxjQUFjLElBQUk7b0JBQ2xCQyxZQUFZO29CQUNaQyxhQUFhO29CQUNiQyxVQUFVO3dCQUFDO3dCQUFHO3FCQUFFO29CQUNoQkMsWUFBWTt3QkFBQztxQkFBRTtvQkFDZkMsVUFBVTt3QkFBQzt3QkFBRzt3QkFBRzt3QkFBRztxQkFBRTtnQkFDdkI7YUFDQTtRQUNGO0lBQ0Q7SUFDQXZCLGdEQUFTQSxDQUFDLElBQU07UUFDZixNQUFNd0IsWUFBWSxVQUFZO1lBQzdCLElBQUk7Z0JBQ0gsK0VBQStFO2dCQUMvRSxNQUFNQyxXQUFXakI7Z0JBQ2pCLElBQUlpQixTQUFTaEIsRUFBRSxFQUFFO29CQUNoQixzQ0FBc0M7b0JBQ3RDLHFGQUFxRjtvQkFDckZKLFNBQVNvQixTQUFTWixPQUFPO2dCQUMxQixPQUFPO29CQUNOYSxRQUFRQyxLQUFLLENBQUM7Z0JBQ2YsQ0FBQztZQUNGLEVBQUUsT0FBT0EsT0FBTztnQkFDZkQsUUFBUUMsS0FBSyxDQUFDLCtCQUErQkE7WUFDOUM7UUFDRDtRQUVBSDtJQUNELEdBQUcsRUFBRTtJQUVMLE1BQU1JLGVBQWUsQ0FBQ0MsU0FBVztRQUNoQywyQ0FBMkM7UUFDM0N0QixpQkFBaUIsQ0FBQ3VCLGVBQ2pCQSxhQUFhQyxRQUFRLENBQUNGLFVBQ25CQyxhQUFhRSxNQUFNLENBQUMsQ0FBQ2xCLEtBQU9BLE9BQU9lLFVBQ25DO21CQUFJQztnQkFBY0Q7YUFBTztJQUU5QjtJQUVBLE1BQU1JLGlCQUFpQixVQUFZO1FBQ2xDLDZDQUE2QztRQUM3QyxJQUFJO1lBQ0gsTUFBTVIsV0FBVyxNQUFNUyxNQUFNLDBDQUEwQztnQkFDdEVDLFFBQVE7Z0JBQ1JDLFNBQVM7b0JBQ1IsZ0JBQWdCO2dCQUNqQjtnQkFDQUMsTUFBTUMsS0FBS0MsU0FBUyxDQUFDO29CQUFFakM7Z0JBQWM7WUFDdEM7WUFFQSxJQUFJbUIsU0FBU2hCLEVBQUUsRUFBRTtnQkFDaEJpQixRQUFRYyxHQUFHLENBQUM7WUFDYixPQUFPO2dCQUNOZCxRQUFRQyxLQUFLLENBQUM7WUFDZixDQUFDO1FBQ0YsRUFBRSxPQUFPQSxPQUFPO1lBQ2ZELFFBQVFDLEtBQUssQ0FBQyxnQ0FBZ0NBO1FBQy9DO0lBQ0Q7SUFFQSxxQkFDQyw4REFBQ2M7O1lBQ0NyQyxNQUFNc0MsR0FBRyxDQUFDLENBQUNDLHFCQUNYLDhEQUFDRjs7c0NBQ0EsOERBQUNHOzRCQUFPQyxTQUFTLElBQU1qQixhQUFhZSxLQUFLN0IsRUFBRTtzQ0FDekNSLGNBQWN5QixRQUFRLENBQUNZLEtBQUs3QixFQUFFLElBQUksYUFBYSxRQUFROzs7Ozs7c0NBSXpELDhEQUFDWix5RUFBWUE7NEJBQUNhLE1BQUs7NEJBQUcrQixhQUFhSCxLQUFLM0IsS0FBSzs7Ozs7OzttQkFOcEMyQixLQUFLN0IsRUFBRTs7Ozs7MEJBVWxCLDhEQUFDOEI7Z0JBQU9HLFdBQVc5QyxtRUFBYTtnQkFBRTRDLFNBQVNaOzBCQUFnQjs7Ozs7Ozs7Ozs7O0FBSzlEO0dBekdNOUI7S0FBQUE7QUEyR04sK0RBQWVBLE9BQU9BLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9TcG9uc29yL3Nwb25zb3IubW9kdWxlLnRzeD81YTFjIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgc3R5bGVzIGZyb20gXCIuL3Nwb25zb3IubW9kdWxlLmNzc1wiO1xuaW1wb3J0IEJvb2tUZW1wbGF0ZSBmcm9tIFwiLi4vYm9va1RlbXBsYXRlL2Jvb2tUZW1wbGF0ZS5tb2R1bGVcIjtcbmNvbnN0IFNwb25zb3IgPSAoKSA9PiB7XG5cdGNvbnN0IFtib29rcywgc2V0Qm9va3NdID0gdXNlU3RhdGUoW10pO1xuXHRjb25zdCBbc2VsZWN0ZWRCb29rcywgc2V0U2VsZWN0ZWRCb29rc10gPSB1c2VTdGF0ZShbXSk7XG5cdGNvbnN0IGdldFJlc3BvbnNlID0gKCkgPT4ge1xuXHRcdHJldHVybiB7XG5cdFx0XHRvazogMSxcblx0XHRcdGNvdW50OiAyLFxuXHRcdFx0bmV4dDogbnVsbCxcblx0XHRcdHByZXZpb3VzOiBudWxsLFxuXHRcdFx0cmVzdWx0czogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWQ6IDEsXG5cdFx0XHRcdFx0bmFtZTogXCJib29rLTFcIixcblx0XHRcdFx0XHRhYm91dDogXCJodGlzIGJvb2sgaXMgYWJvdXQgc29tZXRoaW5nXCIsXG5cdFx0XHRcdFx0dXJsOiBudWxsLFxuXHRcdFx0XHRcdGlzX3B1Ymxpc2hlZDogbnVsbCxcblx0XHRcdFx0XHRjcmVhdGVkX29uOiBcIjIwMjMtMTAtMDhUMDE6MzE6MzEuMTk2MDAxWlwiLFxuXHRcdFx0XHRcdG1vZGlmaWVkX29uOiBcIjIwMjMtMTAtMDhUMDE6MzE6MzEuMTk2MDc3WlwiLFxuXHRcdFx0XHRcdHNwb25zb3JzOiBbMiwgM10sXG5cdFx0XHRcdFx0bm9ucHJvZml0czogWzJdLFxuXHRcdFx0XHRcdGRyYXdpbmdzOiBbXSxcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlkOiAyLFxuXHRcdFx0XHRcdG5hbWU6IFwiYm9vay0yXCIsXG5cdFx0XHRcdFx0YWJvdXQ6IFwiaHRpcyBib29rIGlzIGFib3V0IHNvbWV0aGluZ1wiLFxuXHRcdFx0XHRcdHVybDogXCJodHRwczovL29wcC1oYWNrLWFzdS5zMy5hbWF6b25hd3MuY29tL3BkZl91cGxvYWRzL2Jvb2stMi5wZGZcIixcblx0XHRcdFx0XHRpc19wdWJsaXNoZWQ6IG51bGwsXG5cdFx0XHRcdFx0Y3JlYXRlZF9vbjogXCIyMDIzLTEwLTA4VDA0OjE0OjE0LjYzMjQ1M1pcIixcblx0XHRcdFx0XHRtb2RpZmllZF9vbjogXCIyMDIzLTEwLTA4VDA0OjE0OjE0LjYzMjQ4N1pcIixcblx0XHRcdFx0XHRzcG9uc29yczogWzIsIDNdLFxuXHRcdFx0XHRcdG5vbnByb2ZpdHM6IFsyXSxcblx0XHRcdFx0XHRkcmF3aW5nczogWzEsIDIsIDMsIDRdLFxuXHRcdFx0XHR9LFxuXHRcdFx0XSxcblx0XHR9O1xuXHR9O1xuXHR1c2VFZmZlY3QoKCkgPT4ge1xuXHRcdGNvbnN0IGZldGNoRGF0YSA9IGFzeW5jICgpID0+IHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdC8vIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCJhcGkvYm9va3NcIik7IC8vIFJlcGxhY2Ugd2l0aCB5b3VyIEFQSSBlbmRwb2ludFxuXHRcdFx0XHRjb25zdCByZXNwb25zZSA9IGdldFJlc3BvbnNlKCk7XG5cdFx0XHRcdGlmIChyZXNwb25zZS5vaykge1xuXHRcdFx0XHRcdC8vIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cdFx0XHRcdFx0Ly8gc2V0Qm9va3MoZGF0YS5yZXN1bHRzKTsgLy8gQXNzdW1pbmcgeW91ciByZXNwb25zZSBzdHJ1Y3R1cmUgaGFzIGEgXCJzcG9uc29yc1wiIGFycmF5XG5cdFx0XHRcdFx0c2V0Qm9va3MocmVzcG9uc2UucmVzdWx0cyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBmZXRjaCBzcG9uc29yc1wiKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihcIkVycm9yIGR1cmluZyBzcG9uc29yIGZldGNoOlwiLCBlcnJvcik7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdGZldGNoRGF0YSgpO1xuXHR9LCBbXSk7XG5cblx0Y29uc3QgaGFuZGxlU2VsZWN0ID0gKGJvb2tJZCkgPT4ge1xuXHRcdC8vIFRvZ2dsZSB0aGUgc2VsZWN0ZWQgc3RhdGUgb2YgdGhlIHNwb25zb3Jcblx0XHRzZXRTZWxlY3RlZEJvb2tzKChwcmV2U2VsZWN0ZWQpID0+XG5cdFx0XHRwcmV2U2VsZWN0ZWQuaW5jbHVkZXMoYm9va0lkKVxuXHRcdFx0XHQ/IHByZXZTZWxlY3RlZC5maWx0ZXIoKGlkKSA9PiBpZCAhPT0gYm9va0lkKVxuXHRcdFx0XHQ6IFsuLi5wcmV2U2VsZWN0ZWQsIGJvb2tJZF1cblx0XHQpO1xuXHR9O1xuXG5cdGNvbnN0IGhhbmRsZUNoZWNrb3V0ID0gYXN5bmMgKCkgPT4ge1xuXHRcdC8vIE1ha2UgdGhlIHVwZGF0ZSBjYWxsIGZvciBzZWxlY3RlZCBzcG9uc29yc1xuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiaHR0cHM6Ly9hcGkuZXhhbXBsZS5jb20vdXBkYXRlU3BvbnNvcnNcIiwge1xuXHRcdFx0XHRtZXRob2Q6IFwiUFVUXCIsXG5cdFx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0XHRcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcblx0XHRcdFx0fSxcblx0XHRcdFx0Ym9keTogSlNPTi5zdHJpbmdpZnkoeyBzZWxlY3RlZEJvb2tzIH0pLFxuXHRcdFx0fSk7XG5cblx0XHRcdGlmIChyZXNwb25zZS5vaykge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcIlNlbGVjdGVkIHNwb25zb3JzIHVwZGF0ZWQgc3VjY2Vzc2Z1bGx5XCIpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihcIkZhaWxlZCB0byB1cGRhdGUgc2VsZWN0ZWQgc3BvbnNvcnNcIik7XG5cdFx0XHR9XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoXCJFcnJvciBkdXJpbmcgc3BvbnNvciB1cGRhdGU6XCIsIGVycm9yKTtcblx0XHR9XG5cdH07XG5cblx0cmV0dXJuIChcblx0XHQ8ZGl2PlxuXHRcdFx0e2Jvb2tzLm1hcCgoYm9vaykgPT4gKFxuXHRcdFx0XHQ8ZGl2IGtleT17Ym9vay5pZH0+XG5cdFx0XHRcdFx0PGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBoYW5kbGVTZWxlY3QoYm9vay5pZCl9PlxuXHRcdFx0XHRcdFx0e3NlbGVjdGVkQm9va3MuaW5jbHVkZXMoYm9vay5pZCkgPyBcIkRlc2VsZWN0XCIgOiBcIlNlbGVjdFwifVxuXHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHRcdHsvKiB7Ym9vay5uYW1lfSBcbiAgICAgICAgICAgICAgICAgICAgICAgIHtib29rLmFib3V0fSAqL31cblx0XHRcdFx0XHQ8Qm9va1RlbXBsYXRlIG5hbWU9XCJcIiBkZXNjcmlwdGlvbj17Ym9vay5hYm91dH0vPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdCkpfVxuXG5cdFx0XHQ8YnV0dG9uIGNsYXNzTmFtZT17c3R5bGVzLmJ1dHRvbn0gb25DbGljaz17aGFuZGxlQ2hlY2tvdXR9PlxuXHRcdFx0XHRDaGVja291dFxuXHRcdFx0PC9idXR0b24+XG5cdFx0PC9kaXY+XG5cdCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTcG9uc29yO1xuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJzdHlsZXMiLCJCb29rVGVtcGxhdGUiLCJTcG9uc29yIiwiYm9va3MiLCJzZXRCb29rcyIsInNlbGVjdGVkQm9va3MiLCJzZXRTZWxlY3RlZEJvb2tzIiwiZ2V0UmVzcG9uc2UiLCJvayIsImNvdW50IiwibmV4dCIsInByZXZpb3VzIiwicmVzdWx0cyIsImlkIiwibmFtZSIsImFib3V0IiwidXJsIiwiaXNfcHVibGlzaGVkIiwiY3JlYXRlZF9vbiIsIm1vZGlmaWVkX29uIiwic3BvbnNvcnMiLCJub25wcm9maXRzIiwiZHJhd2luZ3MiLCJmZXRjaERhdGEiLCJyZXNwb25zZSIsImNvbnNvbGUiLCJlcnJvciIsImhhbmRsZVNlbGVjdCIsImJvb2tJZCIsInByZXZTZWxlY3RlZCIsImluY2x1ZGVzIiwiZmlsdGVyIiwiaGFuZGxlQ2hlY2tvdXQiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImxvZyIsImRpdiIsIm1hcCIsImJvb2siLCJidXR0b24iLCJvbkNsaWNrIiwiZGVzY3JpcHRpb24iLCJjbGFzc05hbWUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./components/Sponsor/sponsor.module.tsx\n"));

/***/ })

});