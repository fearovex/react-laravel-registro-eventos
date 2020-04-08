$(document).ready(function(){

  var total = $('.slider img').length, // get the number of slides
    rand = Math.floor( Math.random() * total ); 

  $('.carrousel').slick({
      arrows: true,
      autoplay: true,
      autoplaySpeed: 4000,
      fade: true,
      pauseOnHover: false,
  });

  $('.carrousel').slick('slickGoTo', rand);


  setTimeout(start, 500);

  var i = 5;
  var num = document.getElementById('btnBanner');

  
  function start() {
    setInterval(increase, 1000);
  }
  
  function increase() {
      if (i > 0) {
        i--
        num.innerText = "";
        num.innerText = "Estableciendo conexión a internet en " + i;
      }
      else if(i == 0){
        num.innerText = "";
        num.innerText = "Procesando...";
        var button = document.getElementById('btnBanner');
        setInterval(function(){
            button.click();
        },5000);
      }
  }

  

  // form.addEventListener('submit', function(){
  //   return false;
  // })

  // var times = 100;   //Here put the number of times you want to auto submit
  // (function submit(){
  //   if(times == 0) return;
  //   form.submit();
  //   times--;
  //   setTimeout(submit, 1000);   //Each second
  // })(); 

  

});