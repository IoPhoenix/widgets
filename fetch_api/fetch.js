// Avatars from: https://api.adorable.io/avatars/

/* The Fetch API provides a JavaScript interface for accessing 
and manipulating parts of the HTTP pipeline, such as requests 
and responses. It also provides a global fetch() method that 
provides an easy, logical way to fetch resources asynchronously
 across the network.*/

const container = document.querySelector('div');
const list = document.querySelector('ul');

fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(json => {
    for (let i = 0; i < json.length; i++) {
        const listItem = document.createElement('li');
        const userImage = document.createElement('img');
        userImage.src = `./avatars/${json[i].id}.png`;      
        listItem.innerHTML = `<p class="name">${json[i].name}</p><p class="email"><em>${json[i].email}</em></p>`;
        listItem.appendChild(userImage);  
        list.appendChild(listItem);
      }   
  })
  .catch(result => {
      console.log('ERROR!');
    const errorImage = document.createElement('img');
    const text = document.createElement('p');
    errorImage.src = './avatars/2.png'; 
    text.innerText = 'Something went wrong. We don\'t know why';
    container.appendChild(errorImage);
    container.appendChild(text);
  });