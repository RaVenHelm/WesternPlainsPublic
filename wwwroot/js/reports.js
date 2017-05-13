webpackJsonp([1],{

/***/ 1:
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),

/***/ 128:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* global REPORT_USER_ACTIONS */
/* eslint no-console: "warn" */


__WEBPACK_IMPORTED_MODULE_0_jquery___default()(function () {
  var $users = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#users');
  var $reportsTable = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#report-table tbody');

  var userActions = [];

  var updateTable = function updateTable(items) {
    $reportsTable.html('');

    items.forEach(function (_ref) {
      var firstName = _ref.firstName,
          lastName = _ref.lastName,
          actionName = _ref.actionName,
          timestamp = _ref.timestamp;

      var tr = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('<tr>');
      tr.append('<td>' + firstName + ' ' + lastName + '</td>');

      var action = actionName.replace('_', ' ');
      tr.append('<td>' + action + '</td>');

      var dateTime = new Date(timestamp);
      tr.append('<td>' + dateTime.toLocaleString() + '</td>');

      $reportsTable.append(tr);
    });
  };

  __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.getJSON("http:\\\\westernserver\\WesternPlainsApp/Report/UserActions").done(function (_ref2) {
    var data = _ref2.data;

    userActions = data;
  });

  $users.change(function () {
    var id = parseInt(__WEBPACK_IMPORTED_MODULE_0_jquery___default()('#users option:selected').val());

    var items = userActions.filter(function (_ref3) {
      var userID = _ref3.userID;
      return userID === id;
    });
    updateTable(items);
  });
});

/***/ })

},[128]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJqUXVlcnlcIiIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcmVwb3J0cy5qcyJdLCJuYW1lcyI6WyIkIiwiJHVzZXJzIiwiJHJlcG9ydHNUYWJsZSIsInVzZXJBY3Rpb25zIiwidXBkYXRlVGFibGUiLCJpdGVtcyIsImh0bWwiLCJmb3JFYWNoIiwiZmlyc3ROYW1lIiwibGFzdE5hbWUiLCJhY3Rpb25OYW1lIiwidGltZXN0YW1wIiwidHIiLCJhcHBlbmQiLCJhY3Rpb24iLCJyZXBsYWNlIiwiZGF0ZVRpbWUiLCJEYXRlIiwidG9Mb2NhbGVTdHJpbmciLCJnZXRKU09OIiwiZG9uZSIsImRhdGEiLCJjaGFuZ2UiLCJpZCIsInBhcnNlSW50IiwidmFsIiwiZmlsdGVyIiwidXNlcklEIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdCOzs7Ozs7Ozs7QUNBQTtBQUFBO0FBQUE7QUFDQTtBQUNBOztBQUVBLDhDQUFBQSxDQUFFLFlBQU07QUFDTixNQUFNQyxTQUFTLDhDQUFBRCxDQUFFLFFBQUYsQ0FBZjtBQUNBLE1BQU1FLGdCQUFnQiw4Q0FBQUYsQ0FBRSxxQkFBRixDQUF0Qjs7QUFFQSxNQUFJRyxjQUFjLEVBQWxCOztBQUVBLE1BQU1DLGNBQWMsU0FBZEEsV0FBYyxDQUFDQyxLQUFELEVBQVc7QUFDN0JILGtCQUFjSSxJQUFkLENBQW1CLEVBQW5COztBQUVBRCxVQUFNRSxPQUFOLENBQWMsZ0JBQW9EO0FBQUEsVUFBakRDLFNBQWlELFFBQWpEQSxTQUFpRDtBQUFBLFVBQXRDQyxRQUFzQyxRQUF0Q0EsUUFBc0M7QUFBQSxVQUE1QkMsVUFBNEIsUUFBNUJBLFVBQTRCO0FBQUEsVUFBaEJDLFNBQWdCLFFBQWhCQSxTQUFnQjs7QUFDaEUsVUFBTUMsS0FBSyw4Q0FBQVosQ0FBRSxNQUFGLENBQVg7QUFDQVksU0FBR0MsTUFBSCxVQUFpQkwsU0FBakIsU0FBOEJDLFFBQTlCOztBQUVBLFVBQU1LLFNBQVNKLFdBQVdLLE9BQVgsQ0FBbUIsR0FBbkIsRUFBd0IsR0FBeEIsQ0FBZjtBQUNBSCxTQUFHQyxNQUFILFVBQWlCQyxNQUFqQjs7QUFFQSxVQUFNRSxXQUFXLElBQUlDLElBQUosQ0FBU04sU0FBVCxDQUFqQjtBQUNBQyxTQUFHQyxNQUFILFVBQWlCRyxTQUFTRSxjQUFULEVBQWpCOztBQUVBaEIsb0JBQWNXLE1BQWQsQ0FBcUJELEVBQXJCO0FBQ0QsS0FYRDtBQVlELEdBZkQ7O0FBaUJBWixFQUFBLDhDQUFBQSxDQUFFbUIsT0FBRixDQUFVLDZEQUFWLEVBQ0dDLElBREgsQ0FDUSxpQkFBYztBQUFBLFFBQVhDLElBQVcsU0FBWEEsSUFBVzs7QUFDbEJsQixrQkFBY2tCLElBQWQ7QUFDRCxHQUhIOztBQUtBcEIsU0FBT3FCLE1BQVAsQ0FBYyxZQUFNO0FBQ2xCLFFBQU1DLEtBQUtDLFNBQVMsOENBQUF4QixDQUFFLHdCQUFGLEVBQTRCeUIsR0FBNUIsRUFBVCxDQUFYOztBQUVBLFFBQU1wQixRQUFRRixZQUFZdUIsTUFBWixDQUFtQjtBQUFBLFVBQUdDLE1BQUgsU0FBR0EsTUFBSDtBQUFBLGFBQWdCQSxXQUFXSixFQUEzQjtBQUFBLEtBQW5CLENBQWQ7QUFDQW5CLGdCQUFZQyxLQUFaO0FBQ0QsR0FMRDtBQU1ELENBbENELEUiLCJmaWxlIjoicmVwb3J0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0galF1ZXJ5O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwialF1ZXJ5XCJcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIgMyA0IDUiLCIvKiBnbG9iYWwgUkVQT1JUX1VTRVJfQUNUSU9OUyAqL1xyXG4vKiBlc2xpbnQgbm8tY29uc29sZTogXCJ3YXJuXCIgKi9cclxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcclxuXHJcbiQoKCkgPT4ge1xyXG4gIGNvbnN0ICR1c2VycyA9ICQoJyN1c2VycycpO1xyXG4gIGNvbnN0ICRyZXBvcnRzVGFibGUgPSAkKCcjcmVwb3J0LXRhYmxlIHRib2R5Jyk7XHJcblxyXG4gIGxldCB1c2VyQWN0aW9ucyA9IFtdO1xyXG5cclxuICBjb25zdCB1cGRhdGVUYWJsZSA9IChpdGVtcykgPT4ge1xyXG4gICAgJHJlcG9ydHNUYWJsZS5odG1sKCcnKTtcclxuXHJcbiAgICBpdGVtcy5mb3JFYWNoKCh7IGZpcnN0TmFtZSwgbGFzdE5hbWUsIGFjdGlvbk5hbWUsIHRpbWVzdGFtcCB9KSA9PiB7XHJcbiAgICAgIGNvbnN0IHRyID0gJCgnPHRyPicpO1xyXG4gICAgICB0ci5hcHBlbmQoYDx0ZD4ke2ZpcnN0TmFtZX0gJHtsYXN0TmFtZX08L3RkPmApO1xyXG5cclxuICAgICAgY29uc3QgYWN0aW9uID0gYWN0aW9uTmFtZS5yZXBsYWNlKCdfJywgJyAnKTtcclxuICAgICAgdHIuYXBwZW5kKGA8dGQ+JHthY3Rpb259PC90ZD5gKTtcclxuXHJcbiAgICAgIGNvbnN0IGRhdGVUaW1lID0gbmV3IERhdGUodGltZXN0YW1wKTtcclxuICAgICAgdHIuYXBwZW5kKGA8dGQ+JHtkYXRlVGltZS50b0xvY2FsZVN0cmluZygpfTwvdGQ+YCk7XHJcblxyXG4gICAgICAkcmVwb3J0c1RhYmxlLmFwcGVuZCh0cik7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICAkLmdldEpTT04oUkVQT1JUX1VTRVJfQUNUSU9OUylcclxuICAgIC5kb25lKCh7IGRhdGEgfSkgPT4ge1xyXG4gICAgICB1c2VyQWN0aW9ucyA9IGRhdGE7XHJcbiAgICB9KTtcclxuXHJcbiAgJHVzZXJzLmNoYW5nZSgoKSA9PiB7XHJcbiAgICBjb25zdCBpZCA9IHBhcnNlSW50KCQoJyN1c2VycyBvcHRpb246c2VsZWN0ZWQnKS52YWwoKSk7XHJcblxyXG4gICAgY29uc3QgaXRlbXMgPSB1c2VyQWN0aW9ucy5maWx0ZXIoKHsgdXNlcklEIH0pID0+IHVzZXJJRCA9PT0gaWQpO1xyXG4gICAgdXBkYXRlVGFibGUoaXRlbXMpO1xyXG4gIH0pO1xyXG59KTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3JlcG9ydHMuanMiXSwic291cmNlUm9vdCI6IiJ9