  // Make an AJAX request to fetch featured books
  fetch("/books/")
  .then((response) => response.json())
  .then((data) => {
    const featuredBooks = data;
    const featuredSection = document.querySelector(".featured");

    // Create HTML elements for each book
    featuredBooks.forEach((book) => {
      const bookHTML = `
  <div class="swiper-slide box">
    <div class="icons">
      <a href="#" class="fas fa-eye"></a>
     
    </div>
    <div class="image">
      <img src="${book.image}" alt="${book.title}">
    </div>
    <div class="content">
      <h3>${book.title}</h3>
      <div class="price">$${book.price}</div>
      <a href="#cart" class="btn">Add to Cart</a>
    </div>
  </div>
`;
      const swiperWrapper = document.querySelector("#swi");
      swiperWrapper.innerHTML += bookHTML;
    });
  })
  .catch((error) => console.error("Error fetching featured books:", error));