




// When the user scrolls down 200px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    document.getElementById("backToTopBtn").style.display = "block";
  } else {
    document.getElementById("backToTopBtn").style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}



//FOR Burger menu JQuery
$('document').ready(function () {
  var trigger = $('#hamburger'),
    navTrigger = $('nav'),
      isClosed = false;
      console.log('a1')
      trigger.addClass('is-closed');

  trigger.click(function () {
    burgerTime();
  });

  function burgerTime() {
    if (isClosed == true) {
      console.log('a2')
      trigger.removeClass('is-open');
      trigger.addClass('is-closed');
      navTrigger.removeClass('show-menu');
      isClosed = false;
    } else {
      trigger.removeClass('is-closed');
      trigger.addClass('is-open');
      navTrigger.addClass('show-menu');
      isClosed = true;
    }
  }
  
});


//for gellery JQuery

