import 'regenerator-runtime/runtime';
import 'dotenv/config';

const elementDiv = document.querySelector('[data-container]') as HTMLDivElement;

async function handleAPIRequest() {
  const url = await fetch(
    `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${process.env.PRIVATE}`,
  );

  const response = await url.json();
  const {
    results: { books },
  } = response;

  books.forEach((book) => {
    const div = document.createElement('div');
    const {
      title, rank, publisher, description, author, book_image,
    } = book;

    div.innerHTML = `
    <div class="c-container__card">
      <div class="c-container__face__one c-container__face__two">
        <div class="c-container__content">
          <h2>${title}</h2>
          <p>${description}</p>
          <ul>
          <li>Rank: ${rank}</li>
            <li>Author: ${author}</li>
            <li>Publisher: ${publisher}</li>
          </ul>
        </div>
      </div>
      <div class="c-container__face__one c-container__face__three">
        <h2><img src="${book_image}" alt=""></h2>
      </div>
    </div>
  `;
    elementDiv.appendChild(div);
  });
}

handleAPIRequest();
