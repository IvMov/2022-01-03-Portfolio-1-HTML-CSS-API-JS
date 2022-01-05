const wrappForGalleries = document.getElementsByClassName("galeries-bar-container")[0];

fetch('https://jsonplaceholder.typicode.com/albums')
  .then(response => response.json())
  .then(albums => {
    albums.map((album) => {

      let galery = document.createElement('div');
          galery.classList.add("galery");

          let galeryNameH4 = document.createElement('h4');


          let galeryNameA = document.createElement('a');
              galeryNameA.classList.add("galeryName");
              galeryNameA.setAttribute("href", "galery.html?albumId="+ album.id);
              galeryNameA.textContent = album.title;

          let galeryP = document.createElement('p');
              galeryP.textContent = "Author: ";

              let galeryAuthorNameA = document.createElement('a');
              galeryAuthorNameA.classList.add("authorName");
              galeryAuthorNameA.setAttribute("href", "user.html?user_id="+ album.userId);

              fetch('https://jsonplaceholder.typicode.com/users?id='+ album.userId)
                    .then(response => response.json())
                    .then(userName => {
                      galeryAuthorNameA.textContent = userName[0].name;
                    });

              let ainside = document.createElement("a");
                  ainside.classList.add("ainside");
                  ainside.setAttribute("href", "galery.html?albumId="+ album.id);

                  let ainsideImg = document.createElement("img");
                      ainsideImg.setAttribute('src', "https://picsum.photos/370/170?random="+ album.id)


      wrappForGalleries.append(galery);
          galery.append(galeryNameH4);
              galeryNameH4.append(galeryNameA);
          galery.append(galeryP);
            galeryP.append(galeryAuthorNameA);
          galery.append(ainside);
            ainside.append(ainsideImg);

    })
  })

 
