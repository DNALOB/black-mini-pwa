/*
 *
 *  Black Mini PWA
 *  Copyright (c) 2018-2020 techaurelian. All rights reserved. 
 *  Licensed under the MIT license.
 *  https://techaurelian.com
 *
 */

const curCacheVersion = "3";
const curCacheName = `blackminipwa-${curCacheVersion}`;
const urlsToCache = [
  '/',
  'index.html',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(curCacheName).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== curCacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request);
      })
  );
});