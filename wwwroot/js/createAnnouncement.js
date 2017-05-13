webpackJsonp([4],{

/***/ 1:
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),

/***/ 125:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_quill__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_quill___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_quill__);



__WEBPACK_IMPORTED_MODULE_0_jquery___default()(function () {
  var $form = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#create-announcement');
  var $text = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#announcement-text');

  var quill = new __WEBPACK_IMPORTED_MODULE_1_quill___default.a('#editor', {
    theme: 'snow'
  });

  __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.ui .form').form({
    fields: {
      'Category': 'empty'
    }
  });

  $form.submit(function () {
    $text.val(JSON.stringify(quill.getContents()));

    return true;
  });
});

/***/ })

},[125]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJqUXVlcnlcIj8wY2I4KioiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NyZWF0ZUFubm91bmNlbWVudC5qcyJdLCJuYW1lcyI6WyIkIiwiJGZvcm0iLCIkdGV4dCIsInF1aWxsIiwidGhlbWUiLCJmb3JtIiwiZmllbGRzIiwic3VibWl0IiwidmFsIiwiSlNPTiIsInN0cmluZ2lmeSIsImdldENvbnRlbnRzIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdCOzs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTs7QUFFQSw4Q0FBQUEsQ0FBRSxZQUFNO0FBQ04sTUFBTUMsUUFBUSw4Q0FBQUQsQ0FBRSxzQkFBRixDQUFkO0FBQ0EsTUFBTUUsUUFBUSw4Q0FBQUYsQ0FBRSxvQkFBRixDQUFkOztBQUVBLE1BQU1HLFFBQVEsSUFBSSw2Q0FBSixDQUFVLFNBQVYsRUFBcUI7QUFDakNDLFdBQU87QUFEMEIsR0FBckIsQ0FBZDs7QUFJQUosRUFBQSw4Q0FBQUEsQ0FBRSxXQUFGLEVBQ0dLLElBREgsQ0FDUTtBQUNKQyxZQUFRO0FBQ04sa0JBQVk7QUFETjtBQURKLEdBRFI7O0FBT0FMLFFBQU1NLE1BQU4sQ0FBYSxZQUFNO0FBQ2pCTCxVQUFNTSxHQUFOLENBQVVDLEtBQUtDLFNBQUwsQ0FBZVAsTUFBTVEsV0FBTixFQUFmLENBQVY7O0FBRUEsV0FBTyxJQUFQO0FBQ0QsR0FKRDtBQUtELENBcEJELEUiLCJmaWxlIjoiY3JlYXRlQW5ub3VuY2VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBqUXVlcnk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJqUXVlcnlcIlxuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiAzIDQgNSIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XHJcbmltcG9ydCBRdWlsbCBmcm9tICdxdWlsbCc7XHJcblxyXG4kKCgpID0+IHtcclxuICBjb25zdCAkZm9ybSA9ICQoJyNjcmVhdGUtYW5ub3VuY2VtZW50Jyk7XHJcbiAgY29uc3QgJHRleHQgPSAkKCcjYW5ub3VuY2VtZW50LXRleHQnKTtcclxuXHJcbiAgY29uc3QgcXVpbGwgPSBuZXcgUXVpbGwoJyNlZGl0b3InLCB7XHJcbiAgICB0aGVtZTogJ3Nub3cnLFxyXG4gIH0pO1xyXG5cclxuICAkKCcudWkgLmZvcm0nKVxyXG4gICAgLmZvcm0oe1xyXG4gICAgICBmaWVsZHM6IHtcclxuICAgICAgICAnQ2F0ZWdvcnknOiAnZW1wdHknLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICRmb3JtLnN1Ym1pdCgoKSA9PiB7XHJcbiAgICAkdGV4dC52YWwoSlNPTi5zdHJpbmdpZnkocXVpbGwuZ2V0Q29udGVudHMoKSkpO1xyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0pO1xyXG59KTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NyZWF0ZUFubm91bmNlbWVudC5qcyJdLCJzb3VyY2VSb290IjoiIn0=