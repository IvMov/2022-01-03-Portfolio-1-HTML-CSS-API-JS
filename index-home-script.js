//----------------------------------------------------------------------------FETCH JSON BLA BLA BLA--------------------------------------------------------------
















































//show-hide comments
function addEventListenersForHideComments () {

    Array.from(document.getElementsByClassName('comments-block-wrapper')).map((el) =>{
        //cпрятать по умолчанию все комменты
        el.querySelector('.comments-wrapper').classList.add('show-hide-comments');
        //добавить ивентлистенер для хедеров коментов
        el.querySelector('.comments-header').addEventListener('click', ()=> {
            if(el.querySelector('.comments-header p span').textContent >= 1) {
        //добавить/снять класс скрывающий комменты
            el.querySelector('.comments-wrapper').classList.toggle('show-hide-comments');

                //добавить/снять надпись show/hide comments
                if(el.querySelector('.show-hide-comments-label').textContent == 'Show comments'){
                    console.log('change1');
                    el.querySelector('.show-hide-comments-label').textContent = 'Hide comments';
                } else {
                    console.log('change2');
                    el.querySelector('.show-hide-comments-label').textContent = 'Show comments';
                }

        } else {
            el.querySelector('.show-hide-comments-label').style.display = 'none';
        }
        });
    })    
}
addEventListenersForHideComments();

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

  // for music

  let mySong = document.getElementById("mySong");
  let play = document.getElementById("play");
  play.addEventListener('click', ()=>{
    if(mySong.paused) {
      mySong.play();
    } else {
      mySong.pause();
    }
    
  })

