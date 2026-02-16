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



//load categories level

const loadCategories = () => {
    const url = "https://fakestoreapi.com/products/categories"
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            displayCategoriesLevel(data)
        })
}

const loadCategorie = async (category) => {
    const url = `https://fakestoreapi.com/products/category/${category}`
    console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => {
            displayCategory(data)
        })


}

const displayCategory = (word) => {

}

const displayCategoriesLevel = (categories) => {

    const container = document.getElementById("level-container");
    container.innerHTML = "";

    categories.forEach(cat => {

        const button = document.createElement("button");
        button.className = "btn btn-outline btn-primary";
        button.innerText = cat;

        button.addEventListener("click", () => {
            loadCategorie(cat);
        });

        container.append(button);
    });
};



