/* // promise -> pending, resolve(success), reject(error)

const loadCategory = () => {
  fetch("https://news-api-fs.vercel.app/api/categories") // promise
    .then((response) => response.json()) //res -- promise
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};
 */

const categoryContainer = document.getElementById("category-container");
const newsContainer = document.getElementById("newsContainer");

const loadCategoryAsync = async () => {
  try {
    const res = await fetch("https://news-api-fs.vercel.app/api/categories");
    const data = await res.json();
    const categories = data.categories;
    showCategory(categories);
  } catch (error) {
    console.log(error);
  }
};

const showCategory = (categories) => {
  categories.forEach((category) => {
    categoryContainer.innerHTML += `
      <li id="${category.id}" class="hover:border-b-4 border-red-600 cursor-pointer">
            ${category.title}
          </li>`;
  });

  categoryContainer.addEventListener("click", (e) => {
    const allLi = document.querySelectorAll("li");
    allLi.forEach((li) => {
      li.classList.remove("border-b-4");
    });
    if (e.target.localName === "li") {
      e.target.classList.add("border-b-4");
      loadNewsByCategory(e.target.id);
    }
  });
};

const loadNewsByCategory = async (categoryId) => {
  try {
    const res = await fetch(
      `https://news-api-fs.vercel.app/api/categories/${categoryId}`
    );
    const data = await res.json();
    const articles = data.articles;
    showNewsByCategory(articles);
  } catch (error) {
    console.log(error);
  }
};

const showNewsByCategory = (articles) => {
  console.log(articles);
  newsContainer.innerHTML = "";
  articles.forEach((article) => {
    newsContainer.innerHTML += `
        <div class = "border-2 border-gray-100 rounded-lg"> 
            <div>
             <img src='${article.image.srcset[5].url}'> 
            </div>
            <div class = "p-2">
                <h1 class = "font-extrabold mt-3"> ${article.title}</h1>
                <p class = "mt-3 text-sm"> ${article.time}</p>
            </div>
        </div>
        `;
  });
};

loadCategoryAsync();
loadNewsByCategory("main");
