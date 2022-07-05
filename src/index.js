let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const form = document.querySelector('.add-toy-form')
  
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const imgUrl = e.target.image.value;
    
    addNewToy(name, imgUrl);
    
    form.reset();
  })

  function addNewToy(name, imgUrl) {
    const newToy = {
      name: name,
      image: imgUrl,
      likes: 0
    }

    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newToy)
    })
    .then(res => res.json())
    .then(renderCard)
  }

  function fetchToyList() {
    fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(toys => toys.forEach(renderCard))
  }

  function renderCard(card) {
    const ul = document.querySelector('#toy-collection');
    const li = document.createElement('li');
    const pName = document.createElement('p');
    const pLikes = document.createElement('p');
    const img = document.createElement('img');
    const btn = document.createElement('button');

    li.className = 'card';
    img.className = 'toy-avatar';
    img.src = card.image;
    btn.className = 'submit';
    btn.textContent = 'Like';
    pName.textContent = card.name;
    pLikes.textContent = `${card.likes} likes`;

    btn.addEventListener('click', () => {
      updateToy(card, pLikes);
    })

    ul.append(li);
    li.append(pName, img, pLikes, btn);
  }

  function updateToy(toy, likesElement) {
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        "likes": toy.likes += 1
      })
    })
    .then(res => res.json())
    .then(card => {
      likesElement.textContent = `${toy.likes} likes`
    })
  }

  fetchToyList();
});
