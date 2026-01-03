self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("app-cache-v1-1").then((cache) => {
      return cache.addAll([
        "/",               // root
        "./index.html",
        "./home.html",
        "./styles.css",
        "./js/login.js",
        "./js/home.js", 
        "./js/supabaseClient.js",
        "./js/icons/irm-icon-192.jpg",
        "./js/icons/irm-icon-512.jpg",
        "./js/manifest.json"
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
