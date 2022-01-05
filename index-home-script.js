//show-hide comments Old function (didnt use now, but it works)
function addEventListenersForHideComments () {

    Array.from(document.getElementsByClassName('comments-block-wrapper')).map((el) =>{
        //cпрятать по умолчанию все комменты
        el.querySelector('.comments-wrapper').classList.add('show-hide-comments');
        //добавить ивентлистенер для хедеров коментов
        el.querySelector('.comments-header').addEventListener('click', ()=> {
            if(el.querySelector('.comments-header p span').textContent >= 1) {
        //добавить/снять класс скрывающий комменты
            el.querySelector('.comments-wrapper').classList.toggle('show-hide-comments');

                // добавить/снять надпись show/hide comments
                if(el.querySelector('.show-hide-comments-label').textContent == 'Show comments'){
                    el.querySelector('.show-hide-comments-label').textContent = 'Hide comments';
                } else {
                    el.querySelector('.show-hide-comments-label').textContent = 'Show comments';
                }

        } else {
            el.querySelector('.show-hide-comments-label').style.display = 'none';
        }
        });
    })    
}

//function to capitalise 1 leter of title Names
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
//function for random number of comments
function randomCommentNumber() {
  return Math.floor((Math.random()*6));
}

//create random array 1-100
function randomArray(arrayLength, randMax) {

  let randArray = [];
  let iLoop = 0;
  do {
    let randomNum = Math.floor((Math.random()*randMax))+1;
    if (!randArray.includes(randomNum)){
      randArray.push(randomNum);
      iLoop++;
    }     
  } while (iLoop<arrayLength);
  return randArray;
}
const wrapperForArticles = document.getElementById('content'); //const for Fetch output articles
const wrapperForGalleries = document.getElementsByClassName("galeries-bar-container")[0]; //const for Fetch output galeries
let numberOfPosts = document.getElementById("articleNum").value;

if( localStorage.length>=1) {
  document.getElementById(`articleNum`).value = localStorage.getItem('articleNumLocal');
  numberOfPosts = localStorage.getItem('articleNumLocal');
}

//----------------------------------------------------------------------------FETCH JSON Articles--------------------------------------------------------------

fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then((posts) => {
    let startPageArray=randomArray(numberOfPosts, posts.length); //IMPORTANT _ NUMBER of articles on page!
    for(let i = 0; i<startPageArray.length; i++) {
      let articleWrapper = document.createElement("div");
        articleWrapper.classList.add("article-wrapper");

        let articleContent = document.createElement("div");
            articleContent.classList.add("article-content");

          let articleHeader = document.createElement("h1");
              articleHeader.classList.add("article-header");

            let articleHeaderA = document.createElement('a');
                articleHeaderA.classList.add("title-anc");
                articleHeaderA.setAttribute("href", "article.html?post_id=" + posts[startPageArray[i]].id); //ALL MAGIC with send info about page ID
                articleHeaderA.textContent = capitalizeFirstLetter(posts[startPageArray[i]].title);

          let articleMaintext = document.createElement('p');
              articleMaintext.classList.add("article-maintext");
              articleMaintext.textContent = capitalizeFirstLetter(posts[startPageArray[i]].body+posts[startPageArray[i]].body+posts[startPageArray[i]].body+posts[startPageArray[i]].body+posts[startPageArray[i]].body);  

        let aboutArticle = document.createElement("div");
            aboutArticle.classList.add("about-article");

          let authorWrapper = document.createElement('div');
              authorWrapper.classList.add("author-wrapper");

            let authorA = document.createElement('a');
                authorA.classList.add("author-" + posts[startPageArray[i]].userId);
                authorA.classList.add("author");
                authorA.setAttribute("href", "user.html?user_id=" + posts[startPageArray[i]].userId);

        fetch('https://jsonplaceholder.typicode.com/users?id='+ posts[startPageArray[i]].userId)
          .then(response => response.json())
          .then((userInfo) => {
            authorA.textContent = userInfo[0].name;
          })

        let commentsBlockWrapper = document.createElement("div");
            commentsBlockWrapper.classList.add("comments-block-wrapper");

          let commentsHeader = document.createElement("div");
              commentsHeader.classList.add("comments-header");

            let commentsHeaderP = document.createElement("p");
                commentsHeaderP.textContent = "Comments ";

              let commentsHeaderPSpan = document.createElement("span");

            let showHideCommentsLabel = document.createElement("div");
                showHideCommentsLabel.classList.add("show-hide-comments-label");
                showHideCommentsLabel.textContent = "Show comments";
              //SHOW comments 
                showHideCommentsLabel.addEventListener('click', ()=> {
                  fetch('https://jsonplaceholder.typicode.com/posts/'+ posts[startPageArray[i]].id +'/comments')
                      .then(response => response.json())
                      .then((comments) => {
                          let nComments = randomCommentNumber();
                          showHideCommentsLabel.style.display='none';
                              commentsHeaderPSpan.textContent = nComments;

                          for(let j =0; j<nComments; j++){

                            let comment = document.createElement("div");
                                comment.classList.add("comment");
                                
                            let aboutComment = document.createElement("div");
                                aboutComment.classList.add("about-comment");
                            
                              let commentAuthor = document.createElement("p");
                                  commentAuthor.classList.add("comment-author");
                                  commentAuthor.textContent = capitalizeFirstLetter(comments[j].name);
                                  
                              let commentTime = document.createElement("p");
                                  commentTime.classList.add("comment-time");
                                  commentTime.textContent = comments[j].email;

                            let commentContent = document.createElement("div");
                                commentContent.classList.add("comment-content");

                              let commentText = document.createElement("p");
                                  commentText.classList.add("comment-text");
                                  commentText.textContent = comments[j].body;

                            commentsWrapper.append(comment);
                            comment.append(aboutComment);
                              aboutComment.append(commentAuthor, commentTime);
                            comment.append(commentContent);
                            commentContent.append(commentText);
                          }
                        })
                })

          let commentsWrapper = document.createElement("div");
              commentsWrapper.classList.add("comments-wrapper");
          

      wrapperForArticles.append(articleWrapper);
      articleWrapper.append(articleContent);
        articleContent.append(articleHeader);
          articleHeader.append(articleHeaderA);
          articleContent.append(articleMaintext);
      articleWrapper.append(aboutArticle);
        aboutArticle.append(authorWrapper);
          authorWrapper.append(authorA);
      articleWrapper.append(commentsBlockWrapper);
        commentsBlockWrapper.append(commentsHeader);
          commentsHeader.append(commentsHeaderP);
            commentsHeaderP.append(commentsHeaderPSpan);
          commentsHeader.append(showHideCommentsLabel);
          commentsBlockWrapper.append(commentsWrapper);
              
    }
    // addEventListenersForHideComments();  
  })
  
  
    
// -------------------FETCH for galeries
  

fetch('https://jsonplaceholder.typicode.com/albums')
  .then(response => response.json())
  .then(albums => {
    let startPageArray=randomArray(numberOfPosts, albums.length); //IMPORTANT _ NUMBER of articles on page!
    for(let i = 0; i<startPageArray.length; i++) {
        console.log('work')
        let galery = document.createElement('div');
          galery.classList.add("galery");

          let galeryNameH4 = document.createElement('h4');


          let galeryNameA = document.createElement('a');
              galeryNameA.classList.add("galeryName");
              galeryNameA.setAttribute("href", "galery.html?albumId="+ albums[startPageArray[i]].id);
              galeryNameA.textContent = albums[startPageArray[i]].title;

          let galeryP = document.createElement('p');
              galeryP.textContent = "Author: ";

              let galeryAuthorNameA = document.createElement('a');
              galeryAuthorNameA.classList.add("authorName");
              galeryAuthorNameA.setAttribute("href", "user.html?user_id="+ albums[startPageArray[i]].userId);

              fetch('https://jsonplaceholder.typicode.com/users?id='+ albums[startPageArray[i]].userId)
                    .then(response => response.json())
                    .then(userName => {
                      galeryAuthorNameA.textContent = userName[0].name;
                    });

              let ainside = document.createElement("a");
                  ainside.classList.add("ainside");
                  ainside.setAttribute("href", "galery.html?albumId="+ albums[startPageArray[i]].id);

                  let ainsideImg = document.createElement("img");
                      ainsideImg.setAttribute('src', "https://picsum.photos/300/300?random="+ albums[startPageArray[i]].userId);


      wrapperForGalleries.append(galery);
          galery.append(galeryNameH4);
              galeryNameH4.append(galeryNameA);
          galery.append(galeryP);
            galeryP.append(galeryAuthorNameA);
          galery.append(ainside);
            ainside.append(ainsideImg);
      }
    })

    document.getElementById("articleNum").addEventListener('change', (event) => {
      
      localStorage.setItem('articleNumLocal', event.target.value); //localstorage add

      let arrayToRemoveArticles = Array.from(document.getElementsByClassName('article-wrapper'));
      let arrayToRemoveGalery = Array.from(document.getElementsByClassName('galery'));
      arrayToRemoveArticles.map((el)=>{
        el.remove();
      });
      arrayToRemoveGalery.map((el)=>{
        el.remove();
      });
      

      fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then((posts) => {
        let startPageArray=randomArray(event.target.value, posts.length); //IMPORTANT _ NUMBER of articles on page!
        console.log(startPageArray);
        for(let i = 0; i<startPageArray.length; i++) {
          let articleWrapper = document.createElement("div");
            articleWrapper.classList.add("article-wrapper");
    
            let articleContent = document.createElement("div");
                articleContent.classList.add("article-content");
    
              let articleHeader = document.createElement("h1");
                  articleHeader.classList.add("article-header");
                console.log(i);
                console.log(startPageArray[i]);
                let articleHeaderA = document.createElement('a');
                    articleHeaderA.classList.add("title-anc");
                    articleHeaderA.setAttribute("href", "article.html?post_id=" + posts[startPageArray[i]-1].id); //ALL MAGIC with send info about page ID
                    articleHeaderA.textContent = capitalizeFirstLetter(posts[startPageArray[i]-1].title);
    
              let articleMaintext = document.createElement('p');
                  articleMaintext.classList.add("article-maintext");
                  articleMaintext.textContent = capitalizeFirstLetter(posts[startPageArray[i]-1].body+posts[startPageArray[i]-1].body+posts[startPageArray[i]-1].body+posts[startPageArray[i]-1].body+posts[startPageArray[i]-1].body);  
    
            let aboutArticle = document.createElement("div");
                aboutArticle.classList.add("about-article");
    
              let authorWrapper = document.createElement('div');
                  authorWrapper.classList.add("author-wrapper");
    
                let authorA = document.createElement('a');
                    authorA.classList.add("author-" + posts[startPageArray[i]-1].userId);
                    authorA.classList.add("author");
                    authorA.setAttribute("href", "user.html?user_id=" + posts[startPageArray[i]-1].userId);
    
            fetch('https://jsonplaceholder.typicode.com/users?id='+ posts[startPageArray[i]-1].userId)
              .then(response => response.json())
              .then((userInfo) => {
                authorA.textContent = userInfo[0].name;
              })
    
            let commentsBlockWrapper = document.createElement("div");
                commentsBlockWrapper.classList.add("comments-block-wrapper");
    
              let commentsHeader = document.createElement("div");
                  commentsHeader.classList.add("comments-header");
    
                let commentsHeaderP = document.createElement("p");
                    commentsHeaderP.textContent = "Comments ";
    
                  let commentsHeaderPSpan = document.createElement("span");
    
                let showHideCommentsLabel = document.createElement("div");
                    showHideCommentsLabel.classList.add("show-hide-comments-label");
                    showHideCommentsLabel.textContent = "Show comments";
                  //SHOW comments 
                    showHideCommentsLabel.addEventListener('click', ()=> {
                      fetch('https://jsonplaceholder.typicode.com/posts/'+ posts[startPageArray[i]-1].id +'/comments')
                          .then(response => response.json())
                          .then((comments) => {
                              let nComments = randomCommentNumber();
                              showHideCommentsLabel.style.display='none';
                                  commentsHeaderPSpan.textContent = nComments;
    
                              for(let j =0; j<nComments; j++){
    
                                let comment = document.createElement("div");
                                    comment.classList.add("comment");
                                    
                                let aboutComment = document.createElement("div");
                                    aboutComment.classList.add("about-comment");
                                
                                  let commentAuthor = document.createElement("p");
                                      commentAuthor.classList.add("comment-author");
                                      commentAuthor.textContent = capitalizeFirstLetter(comments[j].name);
                                      
                                  let commentTime = document.createElement("p");
                                      commentTime.classList.add("comment-time");
                                      commentTime.textContent = comments[j].email;
    
                                let commentContent = document.createElement("div");
                                    commentContent.classList.add("comment-content");
    
                                  let commentText = document.createElement("p");
                                      commentText.classList.add("comment-text");
                                      commentText.textContent = comments[j].body;
    
                                commentsWrapper.append(comment);
                                comment.append(aboutComment);
                                  aboutComment.append(commentAuthor, commentTime);
                                comment.append(commentContent);
                                commentContent.append(commentText);
                              }
                            })
                    })
    
              let commentsWrapper = document.createElement("div");
                  commentsWrapper.classList.add("comments-wrapper");
              
    
          wrapperForArticles.append(articleWrapper);
          articleWrapper.append(articleContent);
            articleContent.append(articleHeader);
              articleHeader.append(articleHeaderA);
              articleContent.append(articleMaintext);
          articleWrapper.append(aboutArticle);
            aboutArticle.append(authorWrapper);
              authorWrapper.append(authorA);
          articleWrapper.append(commentsBlockWrapper);
            commentsBlockWrapper.append(commentsHeader);
              commentsHeader.append(commentsHeaderP);
                commentsHeaderP.append(commentsHeaderPSpan);
              commentsHeader.append(showHideCommentsLabel);
              commentsBlockWrapper.append(commentsWrapper);
                  
        }
        // addEventListenersForHideComments();  
      })
      
      fetch('https://jsonplaceholder.typicode.com/albums')
  .then(response => response.json())
  .then(albums => {
    let startPageArray=randomArray(event.target.value, albums.length); //IMPORTANT _ NUMBER of articles on page!
    for(let i = 0; i<startPageArray.length; i++) {
        console.log('work')
        let galery = document.createElement('div');
          galery.classList.add("galery");

          let galeryNameH4 = document.createElement('h4');


          let galeryNameA = document.createElement('a');
              galeryNameA.classList.add("galeryName");
              galeryNameA.setAttribute("href", "galery.html?albumId="+ albums[startPageArray[i]-1].id);
              galeryNameA.textContent = albums[startPageArray[i]].title;

          let galeryP = document.createElement('p');
              galeryP.textContent = "Author: ";

              let galeryAuthorNameA = document.createElement('a');
              galeryAuthorNameA.classList.add("authorName");
              galeryAuthorNameA.setAttribute("href", "user.html?user_id="+ albums[startPageArray[i]-1].userId);

              fetch('https://jsonplaceholder.typicode.com/users?id='+ albums[startPageArray[i]-1].userId)
                    .then(response => response.json())
                    .then(userName => {
                      galeryAuthorNameA.textContent = userName[0].name;
                    });

              let ainside = document.createElement("a");
                  ainside.classList.add("ainside");
                  ainside.setAttribute("href", "galery.html?albumId="+ albums[startPageArray[i]-1].id);

                  let ainsideImg = document.createElement("img");
                      ainsideImg.setAttribute('src', "https://picsum.photos/300/300?random="+ albums[startPageArray[i]-1].userId);


      wrapperForGalleries.append(galery);
          galery.append(galeryNameH4);
              galeryNameH4.append(galeryNameA);
          galery.append(galeryP);
            galeryP.append(galeryAuthorNameA);
          galery.append(ainside);
            ainside.append(ainsideImg);
      }
    })

    });