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
const displayCategory = (products) => {
    const category = document.getElementById('load-category');
    category.innerHTML = "";

    products.forEach(product => {
        console.log(product)
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

                
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">Buy Now</button>
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








