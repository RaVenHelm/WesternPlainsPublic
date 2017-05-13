import $ from 'jquery';
import Quill from 'quill';

$(() => {
  const $form = $('#create-announcement');
  const $text = $('#announcement-text');

  const quill = new Quill('#editor', {
    theme: 'snow',
  });

  $('.ui .form')
    .form({
      fields: {
        'Category': 'empty',
      },
    });

  $form.submit(() => {
    $text.val(JSON.stringify(quill.getContents()));

    return true;
  });
});
