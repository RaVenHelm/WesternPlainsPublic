/* global GET_ALL_ANNOUNCEMENTS */
/* eslint no-console: "warn" */
import $ from 'jquery';
import moment from 'moment';
import _ from 'lodash';
import Quill from 'quill';

$(() => {
  const $announcements = $('#announcements-list');
  const $applyFilter = $('#filter-button');
  const $reset = $('#reset-button');
  const $dateTo = $('#date-to');
  const $dateFrom = $('#date-from');
  const $categories = $('#categories');

  let announcements = [];
  let categories = [];
  let initialAnnouncements = [];
  let filters = [];

  $.getJSON(GET_ALL_ANNOUNCEMENTS)
    .done(({ data }) => {
      announcements = data;
      initialAnnouncements = [...announcements];
      loadCategories();
      displayFromData();
    })
    .fail(() => {
      $announcements.append('<li>Error loading announcements!</li>');
    });

  $applyFilter.click(applyFilters);
  $reset.click(() => {
    announcements = [...initialAnnouncements];
    loadCategories();
    displayFromData();
  });

  function loadCategories() {
    categories = _.uniq(announcements.map(announcement => announcement.category));
    categories.unshift('None');
    $categories.html('');
    categories.forEach((value, index) => {
      const $option = $('<option>');
      $option.val(index.toString());
      $option.text(value);
      $categories.append($option);
    });
  }

  function applyFilters() {
    applyCategory(parseInt($categories.val()));
    applyDates($dateTo.val(), $dateFrom.val());

    filters.forEach(filter => announcements = announcements.filter(filter));
    $announcements.html('');
    displayFromData();
    loadCategories();
    announcements = [...initialAnnouncements];
    filters = [];

    function applyCategory(categoryNumber) {
      if (categoryNumber === 0)
        return;

      const category = $(`#categories option[value='${categoryNumber}']`).text();
      filters.push(announcement => {
        return announcement.category === category;
      });
    }

    function applyDates(to, from) {
      if (to === '' || from === '')
        return;

      const toDate = moment(to);
      const fromDate = moment(from);

      if (fromDate.isBefore(toDate))
        return;

      filters.push(announcement => {
        return moment(announcement.timeStamp).isBetween(toDate, fromDate, null, '[]');
      });
    }
  }

  function displayFromData() {
    $announcements.html('');
    announcements.forEach((item, index) => {
      const { text, timeStamp, user, category } = item;
      const $li = $('<li>', {
        'class': 'announcement-item',
      });
      const $heading = $('<h3>', {
        html: new Date(timeStamp).toLocaleString(),
      });
      const $category = $('<em>', {
        html: category,
      });
      const $user = $('<p>', {
        html: user.fullName.toString(),
      });
      let output = '';
      let isJson = true;
      try {
        output = JSON.parse(text);
      } catch (err) {
        isJson = false;
        output = text;
      }
      const editorTag = `editor_${index}`;
      const $editor = $('<div>', {
        id: editorTag,
      });

      $li.append($heading, $category, $user, $editor);
      $announcements.append($li);

      const quill = new Quill(`#${editorTag}`, {
        theme: 'snow',
        modules: {
          toolbar: false,
        },
        readOnly: true,
      });

      if (isJson) {
        quill.setContents(output);
      } else {
        quill.setText(output);
      }
    });
  }
});
