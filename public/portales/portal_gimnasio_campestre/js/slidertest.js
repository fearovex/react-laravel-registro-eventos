$(document).ready(function(){
  $(window).on('load',function(){
    // $('#myModal').modal('show');
    $('#myModal').modal({
			backdrop: 'static'
    });
    
    var myModal = $('#myModal');
        clearTimeout(myModal.data('hideInterval'));
        myModal.data('hideInterval', setTimeout(function(){
            myModal.modal('hide');
        }, 10000));
  });
		
});