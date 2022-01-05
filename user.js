
//function to capitalise 1 leter of title Names
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  //array for contactname create loop 
  let liContactNames = ["Name:", "Nickname:", "Email:", "adress:", "Geolocation:"];
  
  const wrapperForAuthors = document.getElementById('about-author-wrapper'); //const for Fetch output
  //----------------------------------------------------------------------------FETCH JSON BLA BLA BLA--------------------------------------------------------------
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const userId = urlParams.get('user_id');

  
  fetch('https://jsonplaceholder.typicode.com/users/'+userId)
    .then(response => response.json())
    .then((user) => {

  
          let authorAvatar = document.createElement("div");
              authorAvatar.classList.add("author-avatar");
  

            let avatarWrap = document.createElement("div");
                avatarWrap.classList.add("avatar-wrap");

            let avatarImg = document.createElement("img");
                avatarImg.setAttribute("src", `images/avatar-${userId}.png`);
                avatarImg.setAttribute("alt", "No Avatar source - sorry");
  
          let authorContacts = document.createElement("div");
              authorContacts.classList.add("author-contacts");
              
            let contactNames = document.createElement('div');
                contactNames.classList.add("contact-names");

                let contactNamesUl = document.createElement("ul");

                    for (i=0; i<liContactNames.length; i++) {
                        let contactNamesLi = document.createElement("li");
                            contactNamesLi.textContent = liContactNames[i];
                            contactNamesUl.append(contactNamesLi);
                    }

            let contactValues = document.createElement('div');
                contactValues.classList.add("contact-values");
                
                let contactValuesUl = document.createElement("ul");

                    let contactValuesLiName = document.createElement('li');
                        contactValuesLiName.textContent = user.name;
                    let contactValuesLiNick = document.createElement('li');
                        contactValuesLiNick.textContent = user.username;
                    let contactValuesLiEmail = document.createElement('li');
                        contactValuesLiEmail.textContent = user.email;
                    let contactValuesLiAdress = document.createElement('li');
                        contactValuesLiAdress.textContent = `${user.address.street}, ${user.address.city}`;
                    let contactValuesLiGeolocation = document.createElement('li');
                        contactValuesLiGeolocation.textContent = `lat:${user.address.geo.lat}, lng:${user.address.geo.lng}`;

            let aboutAuthor = document.createElement('div');
                aboutAuthor.classList.add("about-author");
            
                let aboutAuthorH2 = document.createElement('h2');
                    aboutAuthorH2.textContent = `About ${user.name}`;

                let aboutAuthorP = document.createElement('p');
                    aboutAuthorP.textContent = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti autem minus expedita veritatis reprehenderit omnis at provident architecto itaque error nemo ullam voluptates dignissimos, sunt ex dicta perferendis. Omnis, ipsa!';
                

            wrapperForAuthors.append(authorAvatar);
                authorAvatar.append(avatarWrap);
                    avatarWrap.append(avatarImg);
            wrapperForAuthors.append(authorContacts);
                authorContacts.append(contactNames);
                    contactNames.append(contactNamesUl);
                authorContacts.append(contactValues);
                    contactValues.append(contactValuesUl);
                    contactValuesUl.append(contactValuesLiName, contactValuesLiNick, contactValuesLiEmail,  contactValuesLiAdress, contactValuesLiGeolocation);
            wrapperForAuthors.append(aboutAuthor);
                aboutAuthor.append(aboutAuthorH2);
                aboutAuthor.append(aboutAuthorP);
    })

    const wrapperForAuthorsContent = document.getElementById('content'); //const for Fetch output

    fetch('https://jsonplaceholder.typicode.com/posts/?userId='+userId)
        .then(response => response.json())
        .then((posts) => {
        posts.map((post) => {
            
        let articleWrapper = document.createElement("div");
            articleWrapper.classList.add("article-wrapper");

            let articleContent = document.createElement("div");
                articleContent.classList.add("article-content");

                let articleHeader = document.createElement("h1");
                    articleHeader.classList.add("article-header");

                let articleHeaderA = document.createElement('a');
                    articleHeaderA.classList.add("title-anc");
                    articleHeaderA.setAttribute("href", "article.html?post_id=" + post.id); //ALL MAGIC with send info about page ID
                    articleHeaderA.textContent = capitalizeFirstLetter(post.title);

                let articleMaintext = document.createElement('p');
                    articleMaintext.classList.add("article-maintext");
                    articleMaintext.textContent = capitalizeFirstLetter(post.body+post.body+post.body+post.body+post.body);  

            let aboutArticle = document.createElement("div");
                aboutArticle.classList.add("about-article");

                let readTitle = document.createElement('div');
                    readTitle.classList.add("read-title");

                    let readTitleA = document.createElement('a');
                        readTitleA.textContent = 'Read this title';
                        readTitleA.setAttribute("href", "article.html?post_id=" + post.id);


        wrapperForAuthorsContent.append(articleWrapper);
            articleWrapper.append(articleContent);
            articleContent.append(articleHeader);
                articleHeader.append(articleHeaderA);
                articleContent.append(articleMaintext);
            articleWrapper.append(aboutArticle);
            articleWrapper.append(readTitle);
                readTitle.append(readTitleA);

                    
        })

    })

// FETCH galeries

const wrapperForGalleries = document.getElementsByClassName("galeries-bar-container")[0];

fetch('https://jsonplaceholder.typicode.com/albums?userId=' + userId)
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
                  ainside.setAttribute("href","galery.html?albumId="+ album.id);

                  let ainsideImg = document.createElement("img");
                      ainsideImg.setAttribute('src', "https://picsum.photos/250/220?random="+ album.id)


      wrapperForGalleries.append(galery);
          galery.append(galeryNameH4);
              galeryNameH4.append(galeryNameA);
          galery.append(galeryP);
            galeryP.append(galeryAuthorNameA);
          galery.append(ainside);
            ainside.append(ainsideImg);

    })
  })
        