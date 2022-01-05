const wrappMain = document.querySelector('main');

const arrayOfFilters = ["all", "filter1","filter2","filter3","filter5", "filter6", "whereIsFilter4"];


function randomCommentNumber(x) {
    return Math.floor((Math.random()*(x+1)));
    
  }

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const albumId = urlParams.get('albumId');

//run all but not a images
function runMainPartOfPage() {
    let aboutGalery = document.createElement('div');
            aboutGalery.classList.add("about-galery");

            let aboutH1 = document.createElement('h1');

                let aboutA = document.createElement('a');

                    fetch('https://jsonplaceholder.typicode.com/albums/'+ albumId)
                        .then(response => response.json())
                        .then(album => {
                                aboutH1.textContent = " gallery name: " + album.title;
                                aboutA.setAttribute("href", "user.html?user_id="+album.userId);

                            fetch('https://jsonplaceholder.typicode.com/users?id='+ album.userId)
                                .then(response => response.json())
                                .then(user => {
                                    aboutA.textContent = user[0].name;
                                    aboutH1.prepend(aboutA);
                        });
                    });

    let galeryWrap = document.createElement('div');
        galeryWrap.classList.add('gallery');

        let controlsUl = document.createElement("ul");
            controlsUl.classList.add("controls");

            for(let i = 0; i<arrayOfFilters.length; i++) {
                let controlsLi = document.createElement("li");
                    controlsLi.classList.add("buttons");
                    controlsLi.setAttribute("data-filter", arrayOfFilters[i]);
                    controlsLi.textContent = arrayOfFilters[i];

                    if(i===0) {
                        controlsLi.classList.add('active');
                    }
                    controlsUl.append(controlsLi);
            }

            let imageContainer = document.createElement("div");
                imageContainer.classList.add("image-container");

    wrappMain.append(aboutGalery);
        aboutGalery.append(aboutH1);
    wrappMain.append(galeryWrap);
        galeryWrap.append(controlsUl);  
        galeryWrap.append(imageContainer); 
    
}

runMainPartOfPage();


//fetch for images
let forFetchWrapper
fetch('https://jsonplaceholder.typicode.com/photos?albumId='+ albumId)
  .then(response => response.json())
  .then(images => {

    let wrapForImages = document.querySelector('.image-container');

    images.map((image) => {
        let imageA = document.createElement("a");
            imageA.classList.add("image");
            // imageA.setAttribute("href", "https://picsum.photos/1000/1000?random="+ image.id); // FOR random images
            imageA.setAttribute("href", image.url);
            imageA.classList.add(arrayOfFilters[randomCommentNumber(arrayOfFilters.length)]);

            let imageImg = document.createElement("img");
                // imageImg.setAttribute('src', "https://picsum.photos/200/200?random="+ image.id); //FOR random images
                imageImg.setAttribute('src', image.thumbnailUrl);
                
                wrapForImages.append(imageA);
                imageA.append(imageImg);

    })
  })
