import $ from 'jquery';

$(() => {
  $('.ui .form')
    .form({
      fields: {
        'Username': 'empty',
        'Password': 'empty',
      },
    });
});
