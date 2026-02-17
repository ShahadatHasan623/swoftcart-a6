// Routes
const routes = {
    "/": "home.html",
    "/allProducts": "allProducts.html",
    "/about": "about.html",
    "/contact": "contact.html"
};

// Load Page
async function loadPage(path) {

    const file = routes[path];

    if (!file) {
        document.getElementById("content").innerHTML = "<h1>404 Page Not Found</h1>";
        setActiveLink(null);
        return;
    }

    try {
        const response = await fetch(file);
        const html = await response.text();
        document.getElementById("content").innerHTML = html;

        initPageScripts(path);

    } catch (error) {
        document.getElementById("content").innerHTML = "<h1>Error loading page</h1>";
    }

    setActiveLink(path);
}

// Active Link
function setActiveLink(path) {
    const links = document.querySelectorAll("[data-link]");

    links.forEach(link => {
        link.classList.remove("active");

        const linkPath = link.getAttribute("href");

        if (linkPath === path) {
            link.classList.add("active");
        }
    });
}

// Router
function router() {
    const path = window.location.hash.slice(1) || "/";
    loadPage(path);
}

// Handle Nav Click
document.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
        e.preventDefault();
        const url = e.target.getAttribute("href");
        window.location.hash = url;
    }
});

// Page Specific JS Init
function initPageScripts(path) {

    if (path === "/") {
        const homeBtn = document.getElementById("homeBtn");
        if (homeBtn) {
            homeBtn.addEventListener("click", () => {
                alert("Home Button Clicked!");
            });
        }
    }

    if (path === "/allProducts") {
        if (typeof initProducts === "function") {
            initProducts();
        }
        loadCategories()
    }
    else if (path === "/") {
        if (typeof initProducts === "function") {
            initProducts();
        }
        topTrendingProduct()
    }
}

// Events
window.addEventListener("hashchange", router);
window.addEventListener("load", router);



// Load categories on page load
const loadCategories = async () => {

    const url = "https://fakestoreapi.com/products/categories";
    const res = await fetch(url);
    const data = await res.json();
    displayCategoriesLevel(data);

}

// Load All Products
const loadAllProducts = async () => {
    const url = "https://fakestoreapi.com/products";
    const res = await fetch(url);
    const data = await res.json();
    displayCategory(data);

}

// Load Category Products
const loadCategorie = async (category) => {
    const url = `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategory(data);
}
// {
//     "id": 17,
//     "title": "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
//     "price": 39.99,
//     "description": "Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn't overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.",
//     "category": "women's clothing",
//     "image": "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2t.png",
//     "rating": {
//         "rate": 3.8,
//         "count": 679
//     }
// }
// Display Products

const detailsProducts = async (id) => {
    const url = `https://fakestoreapi.com/products/${id}`
    const res = await fetch(url)
    const details = await res.json()
    displayDetails(details)

}
const displayDetails = (details) => {
    const detailsContainer = document.getElementById('modal-container')
    detailsContainer.innerHTML = ""
    detailsContainer.innerHTML = `
    <div>
    <div class="flex gap-5 flex-col ">
        
        <div class="bg-gray-300 p-5 rounded-xl flex justify-center">
            <img class="h-35" src="${details.image}"/>
        </div>
        <div class="flex justify-between">
           <div class="badge badge-primary">${details.category}</div>
           <div>
           <i class="fa-solid fa-star fa-x text-yellow-500"></i>
           <span>${details.rating.rate}(${details.rating.count})</span>
           </div>
        </div>
        <div>
          <h1 class="text-xl font-bold mb-3">${details.title}</h1>
          <span class="text-2xl font-bold">
           Description
          </span>
          <p class="text-justify">${details.description}</p>
          <span class="text-xl font-bold">price :<i class="fa-solid fa-dollar-sign"></i>${details.price}</span>
         <div class="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6">
         

    <h2 class="text-xl font-semibold mb-4">Customer Review</h2>

    <!-- Star Rating -->
    <div class="flex gap-2 mb-4" id="starContainer">
        <span class="star text-2xl cursor-pointer text-gray-400">★</span>
        <span class="star text-2xl cursor-pointer text-gray-400">★</span>
        <span class="star text-2xl cursor-pointer text-gray-400">★</span>
        <span class="star text-2xl cursor-pointer text-gray-400">★</span>
        <span class="star text-2xl cursor-pointer text-gray-400">★</span>
    </div>

    <!-- Review Input -->
    <textarea 
        id="reviewInput" 
        class="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
        placeholder="Write your review..."></textarea>

    <button 
        class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition duration-300">
        Submit Review
    </button>

</div>

    </div>

        </div>
    </div>
    <div class="modal-action">
                        <form method="dialog">
                            <!-- if there is a button in form, it will close the modal -->
                            <button class="btn">Close</button>
                        </form>
     </div>
    </div>
    `
    document.getElementById("product-modal").showModal()

}

const displayCategory = (products) => {
    const category = document.getElementById('load-category');
    category.innerHTML = "";

    products.forEach(product => {
        const cardDiv = document.createElement('div');
        cardDiv.innerHTML = `
         <div class="card bg-base-100 w-75  shadow-sm">
            <figure class="flex justify-center h-96 bg-gray-300">
                <img class="p-10" src="${product.image}" alt="${product.title}" />
            </figure>
            <div class="card-body">
            <div>
            <div>

            <div class="flex justify-between">
             <div class="badge badge-outline badge-primary">${product.category}
            </div>
            <div>
              <i class="fa-solid fa-star text-yellow-500"></i>
              <span>${product.rating.rate}<span>(${product.rating.count})</span></span>
            </div>
            </div>
           
            

            </div>
            </div>
            <h2 class="card-title">
                 ${product.title.length ? product.title.slice(0, 25) : '.....'}
            </h2>
            <div>
             <span class="text-xl font-bold"><i class="fa-solid fa-dollar-sign"></i>${product.price}</span>
            </div>
                <div class="flex justify-between items-center gap-3">
                <div>
                <button onclick="detailsProducts(${product.id})" class="btn btn-soft"><i class="fa-solid fa-eye"></i>Details</button>
                </div>
                 <div class="card-actions ">
                    <button class="btn btn-primary"><i class="fa-solid fa-cart-arrow-down"></i> Add Cart</button>
                </div>
                </div>
            </div>
        </div>
        `;
        category.appendChild(cardDiv);
    })
}

//category Level
const displayCategoriesLevel = (categories) => {
    const container = document.getElementById("level-container");
    container.innerHTML = "";

    let activeButton = null;

    const allButton = document.createElement("button");
    allButton.className = "btn btn-primary mr-2";
    allButton.innerText = "All";

    allButton.addEventListener("click", () => {
        loadAllProducts();
        setActiveButton(allButton);
    });
    container.append(allButton);

    // Category buttons
    categories.forEach(cat => {
        const button = document.createElement("button");
        button.className = "btn btn-outline btn-primary mr-2";
        button.innerText = cat;

        button.addEventListener("click", () => {
            loadCategorie(cat);
            setActiveButton(button);
        });

        container.append(button);
    });

    const setActiveButton = (btn) => {
        if (activeButton) {
            activeButton.classList.remove("btn-primary");
            activeButton.classList.add("btn-outline", "btn-primary");
        }

        btn.classList.remove("btn-outline");
        btn.classList.add("btn-primary");
        activeButton = btn;
    }

    activeButton = allButton;
    loadAllProducts();
}
// load top poroduct

document.addEventListener("DOMContentLoaded", () => {
    loadTopProducts();
});

// Fetch top products (arrow function)
const loadTopProducts = async () => {
    try {
        const res = await fetch("https://fakestoreapi.com/products");
        const products = await res.json();
        displayTop(products);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
};

// Display top-rated products 
const displayTop = (products) => {
    const topTrending = document.getElementById('top-trending');
    if (!topTrending) return; // safety check

    topTrending.innerHTML = "";

    // Filter products with rating >= 4.7
    const topRated = products.filter(p => p.rating?.rate >= 4.7);

    if (topRated.length === 0) {
        topTrending.innerHTML = `
            <p class="text-center col-span-full text-gray-500">
                No top rated products found.
            </p>`;
        return;
    }

    // Create product cards
    topRated.forEach(product => {
        const card = document.createElement("div");
        card.className = "bg-white shadow-lg rounded-lg p-4 w-full max-w-sm mx-auto";

        card.innerHTML = `
            <div class="card bg-base-100 h-full shadow-sm">
                <figure class="bg-gray-200 p-6 h-64 flex items-center justify-center">
                    <img src="${product.image}" alt="${product.title}" class="max-h-full"/>
                </figure>
                <div class="card-body">
                    <div class="flex justify-between items-center mb-2">
                        <div class="badge badge-outline badge-primary px-3 py-1">${product.category}</div>
                        <div class="flex items-center gap-1">
                            <i class="fa-solid fa-star text-yellow-500"></i>
                            <span>${product.rating.rate} (${product.rating.count})</span>
                        </div>
                    </div>
                    <h2 class="card-title text-lg font-semibold">${product.title.slice(0, 32)}...</h2>
                    <p class="text-xl font-bold mt-2"><i class="fa-solid fa-dollar-sign"></i>${product.price}</p>
                    <div class="flex justify-between items-center mt-4">
                        <button onclick="topTrendingProduct(${product.id})" class="btn btn-soft px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">
                            <i class="fa-solid fa-eye"></i> Details
                        </button>
                        <button class="btn btn-primary px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                            <i class="fa-solid fa-cart-arrow-down"></i> Add Cart
                        </button>
                    </div>
                </div>
            </div>
        `;

        topTrending.appendChild(card);
    });
};

const topTrendingProduct = (id) => {
    const url = `https://fakestoreapi.com/products/${id}`
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            displayTopTrendingDetails(data)
        })
};

const displayTopTrendingDetails = (details) => {
    const detailsContainer = document.getElementById('top-container')
    detailsContainer.innerHTML = ""
    detailsContainer.innerHTML = `
    <div>
    <div class="flex gap-5 flex-col ">
        
        <div class="bg-gray-300 p-5 rounded-xl flex justify-center">
            <img class="h-35" src="${details.image}"/>
        </div>
        <div class="flex justify-between">
           <div class="badge badge-primary">${details.category}</div>
           <div>
           <i class="fa-solid fa-star fa-x text-yellow-500"></i>
           <span>${details.rating.rate}(${details.rating.count})</span>
           </div>
        </div>
        <div>
          <h1 class="text-xl font-bold mb-3">${details.title}</h1>
          <span class="text-2xl font-bold">
           Description
          </span>
          <p class="text-justify">${details.description}</p>
          <span class="text-xl font-bold">price :<i class="fa-solid fa-dollar-sign"></i>${details.price}</span>
         <div class="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6">
         

    <h2 class="text-xl font-semibold mb-4">Customer Review</h2>

    <!-- Star Rating -->
    <div class="flex gap-2 mb-4" id="starContainer">
        <span class="star text-2xl cursor-pointer text-gray-400">★</span>
        <span class="star text-2xl cursor-pointer text-gray-400">★</span>
        <span class="star text-2xl cursor-pointer text-gray-400">★</span>
        <span class="star text-2xl cursor-pointer text-gray-400">★</span>
        <span class="star text-2xl cursor-pointer text-gray-400">★</span>
    </div>

    <!-- Review Input -->
    <textarea 
        id="reviewInput" 
        class="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
        placeholder="Write your review..."></textarea>

    <button 
        class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition duration-300">
        Submit Review
    </button>

</div>

    </div>

        </div>
    </div>
    <div class="modal-action">
                        <form method="dialog">
                            <!-- if there is a button in form, it will close the modal -->
                            <button class="btn">Close</button>
                        </form>
     </div>
    </div>
    `
    document.getElementById("top-modal").showModal()
}



