webpackJsonp([5],{

/***/ 1:
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),

/***/ 123:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_quill__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_quill___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_quill__);
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* global GET_ALL_ANNOUNCEMENTS */
/* eslint no-console: "warn" */





__WEBPACK_IMPORTED_MODULE_0_jquery___default()(function () {
  var $announcements = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#announcements-list');
  var $applyFilter = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#filter-button');
  var $reset = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#reset-button');
  var $dateTo = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#date-to');
  var $dateFrom = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#date-from');
  var $categories = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#categories');

  var announcements = [];
  var categories = [];
  var initialAnnouncements = [];
  var filters = [];

  __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.getJSON("http:\\\\westernserver\\WesternPlainsApp/Announcement/GetAll").done(function (_ref) {
    var data = _ref.data;

    announcements = data;
    initialAnnouncements = [].concat(_toConsumableArray(announcements));
    loadCategories();
    displayFromData();
  }).fail(function () {
    $announcements.append('<li>Error loading announcements!</li>');
  });

  $applyFilter.click(applyFilters);
  $reset.click(function () {
    announcements = [].concat(_toConsumableArray(initialAnnouncements));
    loadCategories();
    displayFromData();
  });

  function loadCategories() {
    categories = __WEBPACK_IMPORTED_MODULE_2_lodash___default.a.uniq(announcements.map(function (announcement) {
      return announcement.category;
    }));
    categories.unshift('None');
    $categories.html('');
    categories.forEach(function (value, index) {
      var $option = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('<option>');
      $option.val(index.toString());
      $option.text(value);
      $categories.append($option);
    });
  }

  function applyFilters() {
    applyCategory(parseInt($categories.val()));
    applyDates($dateTo.val(), $dateFrom.val());

    filters.forEach(function (filter) {
      return announcements = announcements.filter(filter);
    });
    $announcements.html('');
    displayFromData();
    loadCategories();
    announcements = [].concat(_toConsumableArray(initialAnnouncements));
    filters = [];

    function applyCategory(categoryNumber) {
      if (categoryNumber === 0) return;

      var category = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#categories option[value=\'' + categoryNumber + '\']').text();
      filters.push(function (announcement) {
        return announcement.category === category;
      });
    }

    function applyDates(to, from) {
      if (to === '' || from === '') return;

      var toDate = __WEBPACK_IMPORTED_MODULE_1_moment___default()(to);
      var fromDate = __WEBPACK_IMPORTED_MODULE_1_moment___default()(from);

      if (fromDate.isBefore(toDate)) return;

      filters.push(function (announcement) {
        return __WEBPACK_IMPORTED_MODULE_1_moment___default()(announcement.timeStamp).isBetween(toDate, fromDate, null, '[]');
      });
    }
  }

  function displayFromData() {
    $announcements.html('');
    announcements.forEach(function (item, index) {
      var text = item.text,
          timeStamp = item.timeStamp,
          user = item.user,
          category = item.category;

      var $li = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('<li>', {
        'class': 'announcement-item'
      });
      var $heading = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('<h3>', {
        html: new Date(timeStamp).toLocaleString()
      });
      var $category = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('<em>', {
        html: category
      });
      var $user = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('<p>', {
        html: user.fullName.toString()
      });
      var output = '';
      var isJson = true;
      try {
        output = JSON.parse(text);
      } catch (err) {
        isJson = false;
        output = text;
      }
      var editorTag = 'editor_' + index;
      var $editor = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('<div>', {
        id: editorTag
      });

      $li.append($heading, $category, $user, $editor);
      $announcements.append($li);

      var quill = new __WEBPACK_IMPORTED_MODULE_3_quill___default.a('#' + editorTag, {
        theme: 'snow',
        modules: {
          toolbar: false
        },
        readOnly: true
      });

      if (isJson) {
        quill.setContents(output);
      } else {
        quill.setText(output);
      }
    });
  }
});

/***/ })

},[123]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJqUXVlcnlcIj8wY2I4KioqIiwid2VicGFjazovLy8uL2NsaWVudC9hbm5vdW5jZW1lbnRzLmpzIl0sIm5hbWVzIjpbIiQiLCIkYW5ub3VuY2VtZW50cyIsIiRhcHBseUZpbHRlciIsIiRyZXNldCIsIiRkYXRlVG8iLCIkZGF0ZUZyb20iLCIkY2F0ZWdvcmllcyIsImFubm91bmNlbWVudHMiLCJjYXRlZ29yaWVzIiwiaW5pdGlhbEFubm91bmNlbWVudHMiLCJmaWx0ZXJzIiwiZ2V0SlNPTiIsImRvbmUiLCJkYXRhIiwibG9hZENhdGVnb3JpZXMiLCJkaXNwbGF5RnJvbURhdGEiLCJmYWlsIiwiYXBwZW5kIiwiY2xpY2siLCJhcHBseUZpbHRlcnMiLCJfIiwidW5pcSIsIm1hcCIsImFubm91bmNlbWVudCIsImNhdGVnb3J5IiwidW5zaGlmdCIsImh0bWwiLCJmb3JFYWNoIiwidmFsdWUiLCJpbmRleCIsIiRvcHRpb24iLCJ2YWwiLCJ0b1N0cmluZyIsInRleHQiLCJhcHBseUNhdGVnb3J5IiwicGFyc2VJbnQiLCJhcHBseURhdGVzIiwiZmlsdGVyIiwiY2F0ZWdvcnlOdW1iZXIiLCJwdXNoIiwidG8iLCJmcm9tIiwidG9EYXRlIiwibW9tZW50IiwiZnJvbURhdGUiLCJpc0JlZm9yZSIsInRpbWVTdGFtcCIsImlzQmV0d2VlbiIsIml0ZW0iLCJ1c2VyIiwiJGxpIiwiJGhlYWRpbmciLCJEYXRlIiwidG9Mb2NhbGVTdHJpbmciLCIkY2F0ZWdvcnkiLCIkdXNlciIsImZ1bGxOYW1lIiwib3V0cHV0IiwiaXNKc29uIiwiSlNPTiIsInBhcnNlIiwiZXJyIiwiZWRpdG9yVGFnIiwiJGVkaXRvciIsImlkIiwicXVpbGwiLCJ0aGVtZSIsIm1vZHVsZXMiLCJ0b29sYmFyIiwicmVhZE9ubHkiLCJzZXRDb250ZW50cyIsInNldFRleHQiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsOENBQUFBLENBQUUsWUFBTTtBQUNOLE1BQU1DLGlCQUFpQiw4Q0FBQUQsQ0FBRSxxQkFBRixDQUF2QjtBQUNBLE1BQU1FLGVBQWUsOENBQUFGLENBQUUsZ0JBQUYsQ0FBckI7QUFDQSxNQUFNRyxTQUFTLDhDQUFBSCxDQUFFLGVBQUYsQ0FBZjtBQUNBLE1BQU1JLFVBQVUsOENBQUFKLENBQUUsVUFBRixDQUFoQjtBQUNBLE1BQU1LLFlBQVksOENBQUFMLENBQUUsWUFBRixDQUFsQjtBQUNBLE1BQU1NLGNBQWMsOENBQUFOLENBQUUsYUFBRixDQUFwQjs7QUFFQSxNQUFJTyxnQkFBZ0IsRUFBcEI7QUFDQSxNQUFJQyxhQUFhLEVBQWpCO0FBQ0EsTUFBSUMsdUJBQXVCLEVBQTNCO0FBQ0EsTUFBSUMsVUFBVSxFQUFkOztBQUVBVixFQUFBLDhDQUFBQSxDQUFFVyxPQUFGLENBQVUsOERBQVYsRUFDR0MsSUFESCxDQUNRLGdCQUFjO0FBQUEsUUFBWEMsSUFBVyxRQUFYQSxJQUFXOztBQUNsQk4sb0JBQWdCTSxJQUFoQjtBQUNBSix3REFBMkJGLGFBQTNCO0FBQ0FPO0FBQ0FDO0FBQ0QsR0FOSCxFQU9HQyxJQVBILENBT1EsWUFBTTtBQUNWZixtQkFBZWdCLE1BQWYsQ0FBc0IsdUNBQXRCO0FBQ0QsR0FUSDs7QUFXQWYsZUFBYWdCLEtBQWIsQ0FBbUJDLFlBQW5CO0FBQ0FoQixTQUFPZSxLQUFQLENBQWEsWUFBTTtBQUNqQlgsaURBQW9CRSxvQkFBcEI7QUFDQUs7QUFDQUM7QUFDRCxHQUpEOztBQU1BLFdBQVNELGNBQVQsR0FBMEI7QUFDeEJOLGlCQUFhLDhDQUFBWSxDQUFFQyxJQUFGLENBQU9kLGNBQWNlLEdBQWQsQ0FBa0I7QUFBQSxhQUFnQkMsYUFBYUMsUUFBN0I7QUFBQSxLQUFsQixDQUFQLENBQWI7QUFDQWhCLGVBQVdpQixPQUFYLENBQW1CLE1BQW5CO0FBQ0FuQixnQkFBWW9CLElBQVosQ0FBaUIsRUFBakI7QUFDQWxCLGVBQVdtQixPQUFYLENBQW1CLFVBQUNDLEtBQUQsRUFBUUMsS0FBUixFQUFrQjtBQUNuQyxVQUFNQyxVQUFVLDhDQUFBOUIsQ0FBRSxVQUFGLENBQWhCO0FBQ0E4QixjQUFRQyxHQUFSLENBQVlGLE1BQU1HLFFBQU4sRUFBWjtBQUNBRixjQUFRRyxJQUFSLENBQWFMLEtBQWI7QUFDQXRCLGtCQUFZVyxNQUFaLENBQW1CYSxPQUFuQjtBQUNELEtBTEQ7QUFNRDs7QUFFRCxXQUFTWCxZQUFULEdBQXdCO0FBQ3RCZSxrQkFBY0MsU0FBUzdCLFlBQVl5QixHQUFaLEVBQVQsQ0FBZDtBQUNBSyxlQUFXaEMsUUFBUTJCLEdBQVIsRUFBWCxFQUEwQjFCLFVBQVUwQixHQUFWLEVBQTFCOztBQUVBckIsWUFBUWlCLE9BQVIsQ0FBZ0I7QUFBQSxhQUFVcEIsZ0JBQWdCQSxjQUFjOEIsTUFBZCxDQUFxQkEsTUFBckIsQ0FBMUI7QUFBQSxLQUFoQjtBQUNBcEMsbUJBQWV5QixJQUFmLENBQW9CLEVBQXBCO0FBQ0FYO0FBQ0FEO0FBQ0FQLGlEQUFvQkUsb0JBQXBCO0FBQ0FDLGNBQVUsRUFBVjs7QUFFQSxhQUFTd0IsYUFBVCxDQUF1QkksY0FBdkIsRUFBdUM7QUFDckMsVUFBSUEsbUJBQW1CLENBQXZCLEVBQ0U7O0FBRUYsVUFBTWQsV0FBVyw4Q0FBQXhCLGlDQUErQnNDLGNBQS9CLFVBQW1ETCxJQUFuRCxFQUFqQjtBQUNBdkIsY0FBUTZCLElBQVIsQ0FBYSx3QkFBZ0I7QUFDM0IsZUFBT2hCLGFBQWFDLFFBQWIsS0FBMEJBLFFBQWpDO0FBQ0QsT0FGRDtBQUdEOztBQUVELGFBQVNZLFVBQVQsQ0FBb0JJLEVBQXBCLEVBQXdCQyxJQUF4QixFQUE4QjtBQUM1QixVQUFJRCxPQUFPLEVBQVAsSUFBYUMsU0FBUyxFQUExQixFQUNFOztBQUVGLFVBQU1DLFNBQVMsOENBQUFDLENBQU9ILEVBQVAsQ0FBZjtBQUNBLFVBQU1JLFdBQVcsOENBQUFELENBQU9GLElBQVAsQ0FBakI7O0FBRUEsVUFBSUcsU0FBU0MsUUFBVCxDQUFrQkgsTUFBbEIsQ0FBSixFQUNFOztBQUVGaEMsY0FBUTZCLElBQVIsQ0FBYSx3QkFBZ0I7QUFDM0IsZUFBTyw4Q0FBQUksQ0FBT3BCLGFBQWF1QixTQUFwQixFQUErQkMsU0FBL0IsQ0FBeUNMLE1BQXpDLEVBQWlERSxRQUFqRCxFQUEyRCxJQUEzRCxFQUFpRSxJQUFqRSxDQUFQO0FBQ0QsT0FGRDtBQUdEO0FBQ0Y7O0FBRUQsV0FBUzdCLGVBQVQsR0FBMkI7QUFDekJkLG1CQUFleUIsSUFBZixDQUFvQixFQUFwQjtBQUNBbkIsa0JBQWNvQixPQUFkLENBQXNCLFVBQUNxQixJQUFELEVBQU9uQixLQUFQLEVBQWlCO0FBQUEsVUFDN0JJLElBRDZCLEdBQ09lLElBRFAsQ0FDN0JmLElBRDZCO0FBQUEsVUFDdkJhLFNBRHVCLEdBQ09FLElBRFAsQ0FDdkJGLFNBRHVCO0FBQUEsVUFDWkcsSUFEWSxHQUNPRCxJQURQLENBQ1pDLElBRFk7QUFBQSxVQUNOekIsUUFETSxHQUNPd0IsSUFEUCxDQUNOeEIsUUFETTs7QUFFckMsVUFBTTBCLE1BQU0sOENBQUFsRCxDQUFFLE1BQUYsRUFBVTtBQUNwQixpQkFBUztBQURXLE9BQVYsQ0FBWjtBQUdBLFVBQU1tRCxXQUFXLDhDQUFBbkQsQ0FBRSxNQUFGLEVBQVU7QUFDekIwQixjQUFNLElBQUkwQixJQUFKLENBQVNOLFNBQVQsRUFBb0JPLGNBQXBCO0FBRG1CLE9BQVYsQ0FBakI7QUFHQSxVQUFNQyxZQUFZLDhDQUFBdEQsQ0FBRSxNQUFGLEVBQVU7QUFDMUIwQixjQUFNRjtBQURvQixPQUFWLENBQWxCO0FBR0EsVUFBTStCLFFBQVEsOENBQUF2RCxDQUFFLEtBQUYsRUFBUztBQUNyQjBCLGNBQU11QixLQUFLTyxRQUFMLENBQWN4QixRQUFkO0FBRGUsT0FBVCxDQUFkO0FBR0EsVUFBSXlCLFNBQVMsRUFBYjtBQUNBLFVBQUlDLFNBQVMsSUFBYjtBQUNBLFVBQUk7QUFDRkQsaUJBQVNFLEtBQUtDLEtBQUwsQ0FBVzNCLElBQVgsQ0FBVDtBQUNELE9BRkQsQ0FFRSxPQUFPNEIsR0FBUCxFQUFZO0FBQ1pILGlCQUFTLEtBQVQ7QUFDQUQsaUJBQVN4QixJQUFUO0FBQ0Q7QUFDRCxVQUFNNkIsd0JBQXNCakMsS0FBNUI7QUFDQSxVQUFNa0MsVUFBVSw4Q0FBQS9ELENBQUUsT0FBRixFQUFXO0FBQ3pCZ0UsWUFBSUY7QUFEcUIsT0FBWCxDQUFoQjs7QUFJQVosVUFBSWpDLE1BQUosQ0FBV2tDLFFBQVgsRUFBcUJHLFNBQXJCLEVBQWdDQyxLQUFoQyxFQUF1Q1EsT0FBdkM7QUFDQTlELHFCQUFlZ0IsTUFBZixDQUFzQmlDLEdBQXRCOztBQUVBLFVBQU1lLFFBQVEsSUFBSSw2Q0FBSixPQUFjSCxTQUFkLEVBQTJCO0FBQ3ZDSSxlQUFPLE1BRGdDO0FBRXZDQyxpQkFBUztBQUNQQyxtQkFBUztBQURGLFNBRjhCO0FBS3ZDQyxrQkFBVTtBQUw2QixPQUEzQixDQUFkOztBQVFBLFVBQUlYLE1BQUosRUFBWTtBQUNWTyxjQUFNSyxXQUFOLENBQWtCYixNQUFsQjtBQUNELE9BRkQsTUFFTztBQUNMUSxjQUFNTSxPQUFOLENBQWNkLE1BQWQ7QUFDRDtBQUNGLEtBM0NEO0FBNENEO0FBQ0YsQ0EvSEQsRSIsImZpbGUiOiJhbm5vdW5jZW1lbnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBqUXVlcnk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJqUXVlcnlcIlxuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiAzIDQgNSIsIi8qIGdsb2JhbCBHRVRfQUxMX0FOTk9VTkNFTUVOVFMgKi9cclxuLyogZXNsaW50IG5vLWNvbnNvbGU6IFwid2FyblwiICovXHJcbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XHJcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IFF1aWxsIGZyb20gJ3F1aWxsJztcclxuXHJcbiQoKCkgPT4ge1xyXG4gIGNvbnN0ICRhbm5vdW5jZW1lbnRzID0gJCgnI2Fubm91bmNlbWVudHMtbGlzdCcpO1xyXG4gIGNvbnN0ICRhcHBseUZpbHRlciA9ICQoJyNmaWx0ZXItYnV0dG9uJyk7XHJcbiAgY29uc3QgJHJlc2V0ID0gJCgnI3Jlc2V0LWJ1dHRvbicpO1xyXG4gIGNvbnN0ICRkYXRlVG8gPSAkKCcjZGF0ZS10bycpO1xyXG4gIGNvbnN0ICRkYXRlRnJvbSA9ICQoJyNkYXRlLWZyb20nKTtcclxuICBjb25zdCAkY2F0ZWdvcmllcyA9ICQoJyNjYXRlZ29yaWVzJyk7XHJcblxyXG4gIGxldCBhbm5vdW5jZW1lbnRzID0gW107XHJcbiAgbGV0IGNhdGVnb3JpZXMgPSBbXTtcclxuICBsZXQgaW5pdGlhbEFubm91bmNlbWVudHMgPSBbXTtcclxuICBsZXQgZmlsdGVycyA9IFtdO1xyXG5cclxuICAkLmdldEpTT04oR0VUX0FMTF9BTk5PVU5DRU1FTlRTKVxyXG4gICAgLmRvbmUoKHsgZGF0YSB9KSA9PiB7XHJcbiAgICAgIGFubm91bmNlbWVudHMgPSBkYXRhO1xyXG4gICAgICBpbml0aWFsQW5ub3VuY2VtZW50cyA9IFsuLi5hbm5vdW5jZW1lbnRzXTtcclxuICAgICAgbG9hZENhdGVnb3JpZXMoKTtcclxuICAgICAgZGlzcGxheUZyb21EYXRhKCk7XHJcbiAgICB9KVxyXG4gICAgLmZhaWwoKCkgPT4ge1xyXG4gICAgICAkYW5ub3VuY2VtZW50cy5hcHBlbmQoJzxsaT5FcnJvciBsb2FkaW5nIGFubm91bmNlbWVudHMhPC9saT4nKTtcclxuICAgIH0pO1xyXG5cclxuICAkYXBwbHlGaWx0ZXIuY2xpY2soYXBwbHlGaWx0ZXJzKTtcclxuICAkcmVzZXQuY2xpY2soKCkgPT4ge1xyXG4gICAgYW5ub3VuY2VtZW50cyA9IFsuLi5pbml0aWFsQW5ub3VuY2VtZW50c107XHJcbiAgICBsb2FkQ2F0ZWdvcmllcygpO1xyXG4gICAgZGlzcGxheUZyb21EYXRhKCk7XHJcbiAgfSk7XHJcblxyXG4gIGZ1bmN0aW9uIGxvYWRDYXRlZ29yaWVzKCkge1xyXG4gICAgY2F0ZWdvcmllcyA9IF8udW5pcShhbm5vdW5jZW1lbnRzLm1hcChhbm5vdW5jZW1lbnQgPT4gYW5ub3VuY2VtZW50LmNhdGVnb3J5KSk7XHJcbiAgICBjYXRlZ29yaWVzLnVuc2hpZnQoJ05vbmUnKTtcclxuICAgICRjYXRlZ29yaWVzLmh0bWwoJycpO1xyXG4gICAgY2F0ZWdvcmllcy5mb3JFYWNoKCh2YWx1ZSwgaW5kZXgpID0+IHtcclxuICAgICAgY29uc3QgJG9wdGlvbiA9ICQoJzxvcHRpb24+Jyk7XHJcbiAgICAgICRvcHRpb24udmFsKGluZGV4LnRvU3RyaW5nKCkpO1xyXG4gICAgICAkb3B0aW9uLnRleHQodmFsdWUpO1xyXG4gICAgICAkY2F0ZWdvcmllcy5hcHBlbmQoJG9wdGlvbik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGFwcGx5RmlsdGVycygpIHtcclxuICAgIGFwcGx5Q2F0ZWdvcnkocGFyc2VJbnQoJGNhdGVnb3JpZXMudmFsKCkpKTtcclxuICAgIGFwcGx5RGF0ZXMoJGRhdGVUby52YWwoKSwgJGRhdGVGcm9tLnZhbCgpKTtcclxuXHJcbiAgICBmaWx0ZXJzLmZvckVhY2goZmlsdGVyID0+IGFubm91bmNlbWVudHMgPSBhbm5vdW5jZW1lbnRzLmZpbHRlcihmaWx0ZXIpKTtcclxuICAgICRhbm5vdW5jZW1lbnRzLmh0bWwoJycpO1xyXG4gICAgZGlzcGxheUZyb21EYXRhKCk7XHJcbiAgICBsb2FkQ2F0ZWdvcmllcygpO1xyXG4gICAgYW5ub3VuY2VtZW50cyA9IFsuLi5pbml0aWFsQW5ub3VuY2VtZW50c107XHJcbiAgICBmaWx0ZXJzID0gW107XHJcblxyXG4gICAgZnVuY3Rpb24gYXBwbHlDYXRlZ29yeShjYXRlZ29yeU51bWJlcikge1xyXG4gICAgICBpZiAoY2F0ZWdvcnlOdW1iZXIgPT09IDApXHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgY29uc3QgY2F0ZWdvcnkgPSAkKGAjY2F0ZWdvcmllcyBvcHRpb25bdmFsdWU9JyR7Y2F0ZWdvcnlOdW1iZXJ9J11gKS50ZXh0KCk7XHJcbiAgICAgIGZpbHRlcnMucHVzaChhbm5vdW5jZW1lbnQgPT4ge1xyXG4gICAgICAgIHJldHVybiBhbm5vdW5jZW1lbnQuY2F0ZWdvcnkgPT09IGNhdGVnb3J5O1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhcHBseURhdGVzKHRvLCBmcm9tKSB7XHJcbiAgICAgIGlmICh0byA9PT0gJycgfHwgZnJvbSA9PT0gJycpXHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgY29uc3QgdG9EYXRlID0gbW9tZW50KHRvKTtcclxuICAgICAgY29uc3QgZnJvbURhdGUgPSBtb21lbnQoZnJvbSk7XHJcblxyXG4gICAgICBpZiAoZnJvbURhdGUuaXNCZWZvcmUodG9EYXRlKSlcclxuICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICBmaWx0ZXJzLnB1c2goYW5ub3VuY2VtZW50ID0+IHtcclxuICAgICAgICByZXR1cm4gbW9tZW50KGFubm91bmNlbWVudC50aW1lU3RhbXApLmlzQmV0d2Vlbih0b0RhdGUsIGZyb21EYXRlLCBudWxsLCAnW10nKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBkaXNwbGF5RnJvbURhdGEoKSB7XHJcbiAgICAkYW5ub3VuY2VtZW50cy5odG1sKCcnKTtcclxuICAgIGFubm91bmNlbWVudHMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgY29uc3QgeyB0ZXh0LCB0aW1lU3RhbXAsIHVzZXIsIGNhdGVnb3J5IH0gPSBpdGVtO1xyXG4gICAgICBjb25zdCAkbGkgPSAkKCc8bGk+Jywge1xyXG4gICAgICAgICdjbGFzcyc6ICdhbm5vdW5jZW1lbnQtaXRlbScsXHJcbiAgICAgIH0pO1xyXG4gICAgICBjb25zdCAkaGVhZGluZyA9ICQoJzxoMz4nLCB7XHJcbiAgICAgICAgaHRtbDogbmV3IERhdGUodGltZVN0YW1wKS50b0xvY2FsZVN0cmluZygpLFxyXG4gICAgICB9KTtcclxuICAgICAgY29uc3QgJGNhdGVnb3J5ID0gJCgnPGVtPicsIHtcclxuICAgICAgICBodG1sOiBjYXRlZ29yeSxcclxuICAgICAgfSk7XHJcbiAgICAgIGNvbnN0ICR1c2VyID0gJCgnPHA+Jywge1xyXG4gICAgICAgIGh0bWw6IHVzZXIuZnVsbE5hbWUudG9TdHJpbmcoKSxcclxuICAgICAgfSk7XHJcbiAgICAgIGxldCBvdXRwdXQgPSAnJztcclxuICAgICAgbGV0IGlzSnNvbiA9IHRydWU7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgb3V0cHV0ID0gSlNPTi5wYXJzZSh0ZXh0KTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgaXNKc29uID0gZmFsc2U7XHJcbiAgICAgICAgb3V0cHV0ID0gdGV4dDtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBlZGl0b3JUYWcgPSBgZWRpdG9yXyR7aW5kZXh9YDtcclxuICAgICAgY29uc3QgJGVkaXRvciA9ICQoJzxkaXY+Jywge1xyXG4gICAgICAgIGlkOiBlZGl0b3JUYWcsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgJGxpLmFwcGVuZCgkaGVhZGluZywgJGNhdGVnb3J5LCAkdXNlciwgJGVkaXRvcik7XHJcbiAgICAgICRhbm5vdW5jZW1lbnRzLmFwcGVuZCgkbGkpO1xyXG5cclxuICAgICAgY29uc3QgcXVpbGwgPSBuZXcgUXVpbGwoYCMke2VkaXRvclRhZ31gLCB7XHJcbiAgICAgICAgdGhlbWU6ICdzbm93JyxcclxuICAgICAgICBtb2R1bGVzOiB7XHJcbiAgICAgICAgICB0b29sYmFyOiBmYWxzZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlYWRPbmx5OiB0cnVlLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmIChpc0pzb24pIHtcclxuICAgICAgICBxdWlsbC5zZXRDb250ZW50cyhvdXRwdXQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHF1aWxsLnNldFRleHQob3V0cHV0KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59KTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2Fubm91bmNlbWVudHMuanMiXSwic291cmNlUm9vdCI6IiJ9