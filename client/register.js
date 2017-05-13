import $ from 'jquery';

$(() => {
  const $form = $('.ui .form');
  $form.form({
    fields: {
      'FirstName': 'empty',
      'LastName': 'empty',
      'Email': 'email',
      'Username': ['empty'],
      'Password': ['minLength[8]', 'empty'],
      'PasswordConfirmation': ['match[Password]', 'empty'],
      'Role': ['exactCount[1]'],
    },
  });
});
