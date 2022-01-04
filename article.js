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

function randomCommentNumber() {
  return Math.floor((Math.random()*5))+1;
  
}

const wrapperForArticles = document.getElementById('content'); //const for Fetch output
//----------------------------------------------------------------------------FETCH JSON BLA BLA BLA--------------------------------------------------------------
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const postId = urlParams.get('post_id');
console.log(postId);

fetch('https://jsonplaceholder.typicode.com/posts/'+ postId)
  .then(response => response.json())
  .then((post) => {
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

          let authorWrapper = document.createElement('div');
              authorWrapper.classList.add("author-wrapper");

            let authorA = document.createElement('a');
                authorA.classList.add("author-" + post.userId);
                authorA.classList.add("author");
                authorA.setAttribute("href", "user.html?user_id=" + post.userId);

        fetch('https://jsonplaceholder.typicode.com/users?id='+ post.userId)
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
              
          let commentsWrapper = document.createElement("div");
              commentsWrapper.classList.add("comments-wrapper");

                
          fetch('https://jsonplaceholder.typicode.com/posts/'+ post.id +'/comments')
          .then(response => response.json())
          .then((comments) => {
            let nComments = randomCommentNumber();
                commentsHeaderPSpan.textContent = nComments;

            for(let i =0; i<nComments; i++){

              let comment = document.createElement("div");
                  comment.classList.add("comment");
                  
              let aboutComment = document.createElement("div");
                  aboutComment.classList.add("about-comment");
              
                let commentAuthor = document.createElement("p");
                    commentAuthor.classList.add("comment-author");
                    commentAuthor.textContent = capitalizeFirstLetter(comments[i].name);
                    
                let commentTime = document.createElement("p");
                    commentTime.classList.add("comment-time");
                    commentTime.textContent = comments[i].email;

              let commentContent = document.createElement("div");
                  commentContent.classList.add("comment-content");

                let commentText = document.createElement("p");
                    commentText.classList.add("comment-text");
                    commentText.textContent = comments[i].body;

              commentsWrapper.append(comment);
              comment.append(aboutComment);
                aboutComment.append(commentAuthor, commentTime);
              comment.append(commentContent);
              commentContent.append(commentText);
            }
          })

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
              
    addEventListenersForHideComments();  
  })
