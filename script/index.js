const routes = {
    "/": "home.html",
    "/allProducts": "allProducts.html",
    "/about": "about.html",
    "/contact": "contact.html"
};

async function loadPage(path) {
    const file = routes[path] || "home.html";

    try {
        const response = await fetch(file);
        const html = await response.text();
        document.getElementById("content").innerHTML = html;
    } catch {
        document.getElementById("content").innerHTML = "<h1>404 Page Not Found</h1>";
    }

    setActiveLink(path);
}

function setActiveLink(path) {
    const links = document.querySelectorAll("[data-link]");

    links.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${path}`) {
            link.classList.add("active");
        }
    });
}

function router() {
    const path = window.location.hash.slice(1) || "/";
    loadPage(path);
}

document.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
        e.preventDefault();
        const url = e.target.getAttribute("href");
        window.location.hash = url;
    }
});

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
