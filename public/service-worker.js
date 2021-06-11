const FILES_TO_CACHE = [
    "/", 
    "/index.html", 
    "/index.js",  
    "/styles.css",
    "/favicon.ico", 
    "/icons/icon-144x144.png",
    "/icons/icon-192x192.png", 
    "/icons/icon-512x512.png"
  ];
  
  const CACHE_NAME = "static-cache-v2";
  const DATA_CACHE_NAME = "data-cache-v1";
  
  // The install handler will create a new cache
  self.addEventListener("install", function (evt) {
    evt.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
        console.log("Your files were successfully pre-cached!");
        return cache.addAll(FILES_TO_CACHE);
      })
    );
  
    self.skipWaiting();
  });

  // The activate handler will remove old cache
self.addEventListener("activate", function (evt) {
    evt.waitUntil(
      caches.keys().then(keyList => {
        return Promise.all(
          keyList.map(key => {
            if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
              console.log("Removing old cache data", key);
              return caches.delete(key);
            }
          })
        );
      })
    );
  
    self.clients.claim();
  });