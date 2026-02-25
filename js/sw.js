self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("app-cache-v1-1").then((cache) => {
      return cache.addAll([
        "/",               // root
        "./index.html",
        "./home.html",
        "./members.html",
        "./view-member.html",
        "./add-member.html",
        "./attendance.html",
        "./signup.html",
        "./css/index.css",
        "./css/home.css",
        "./css/attendance.css",
        "./css/home.css",
        "./css/members.css",
        "./css/view-member.css",
        "./css/add-member.css",
        "./css/signup.css",
        "./js/login.js",
        "./js/home.js", 
        "./js/members.js",
        "./js/signup.js",
        "./js/view-member.js",
        "./js/add-member.js",
        "./js/attendance.js",
        "./js/supabaseClient.js",
        "./icons/irm-icon-192.jpg",
        "./icons/irm-icon-512.jpg",
        "images/add-member.png",
        "images/add-attendance.png",
        "./manifest.json"
      ]);
    })
  );
});

// Network falling back to cache
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
