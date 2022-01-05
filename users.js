
//function to capitalise 1 leter of title Names
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  //array for contactname create loop 
  let liContactNames = ["Name:", "Nickname:", "Email:", "adress:", "Geolocation:"];
  
  const wrapperForAuthors = document.getElementById('content-wrapper'); //const for Fetch output
  //----------------------------------------------------------------------------FETCH JSON BLA BLA BLA--------------------------------------------------------------
  
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then((users) => {
      users.map((user, index) => {
        
      let aboutAuthorWrapper = document.createElement("div");
          aboutAuthorWrapper.classList.add("about-author-wrapper");
  
          let authorAvatar = document.createElement("div");
              authorAvatar.classList.add("author-avatar");
  
            let userH1 = document.createElement("h1");

            let userH1A = document.createElement("a");
                userH1A.setAttribute("href", "user.html?user_id=" + user.id); //ALL MAGIC with send info about page ID
                userH1A.textContent = user.name;

            let avatarWrap = document.createElement("div");
                avatarWrap.classList.add("avatar-wrap");

            let avatarImg = document.createElement("img");
                avatarImg.setAttribute("src", `images/avatar-${index+1}.png`);
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
                
  
        wrapperForAuthors.append(aboutAuthorWrapper);
            aboutAuthorWrapper.append(authorAvatar);
                authorAvatar.append(userH1);
                    userH1.append(userH1A);
                authorAvatar.append(avatarWrap);
                    avatarWrap.append(avatarImg);
            aboutAuthorWrapper.append(authorContacts);
                authorContacts.append(contactNames);
                    contactNames.append(contactNamesUl);
                authorContacts.append(contactValues);
                    contactValues.append(contactValuesUl);
                    contactValuesUl.append(contactValuesLiName, contactValuesLiNick, contactValuesLiEmail,  contactValuesLiAdress, contactValuesLiGeolocation);
            aboutAuthorWrapper.append(aboutAuthor);
                aboutAuthor.append(aboutAuthorH2);
                aboutAuthor.append(aboutAuthorP);

      })
    })
  