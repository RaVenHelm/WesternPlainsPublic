/* global REPORT_USER_ACTIONS */
/* eslint no-console: "warn" */
import $ from 'jquery';

$(() => {
  const $users = $('#users');
  const $reportsTable = $('#report-table tbody');

  let userActions = [];

  const updateTable = (items) => {
    $reportsTable.html('');

    items.forEach(({ firstName, lastName, actionName, timestamp }) => {
      const tr = $('<tr>');
      tr.append(`<td>${firstName} ${lastName}</td>`);

      const action = actionName.replace('_', ' ');
      tr.append(`<td>${action}</td>`);

      const dateTime = new Date(timestamp);
      tr.append(`<td>${dateTime.toLocaleString()}</td>`);

      $reportsTable.append(tr);
    });
  };

  $.getJSON(REPORT_USER_ACTIONS)
    .done(({ data }) => {
      userActions = data;
    });

  $users.change(() => {
    const id = parseInt($('#users option:selected').val());

    const items = userActions.filter(({ userID }) => userID === id);
    updateTable(items);
  });
});
