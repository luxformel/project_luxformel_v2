self.addEventListener("install", (e) => {
  //console.log("install");
  e.waitUntil(
    caches.open("static").then((cache) => {
      //add more caching but only a few
      return cache.addAll(["./", "./logos/192/logo192.png"]);
    })
  );
});

self.addEventListener("fetch", (e) => {
  //console.log(`Intercepting fetch request for: ${e.request.url}`);
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
