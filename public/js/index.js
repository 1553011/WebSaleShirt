

$(document).ready(function () {
   
    $(document).ready(function () {
      // your code here
      $('.popup').click(function () {

        $('#img-modal').attr('src', $(this).parent().parent().find('img').attr('src'));
        $('.modal-title').text($(this).parent().parent().find('h5').text());
      });
      $('.btn-link').click(function () {
        window.location='/design?image='+$(this).parent().parent().find('img').attr('src');
      });
    });
});