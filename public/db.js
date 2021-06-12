let db;
// This request will build a new budget database.
const request = indexedDB.open("budget", 1);

request.onupgradeneeded = function(event) {
   // Object pending will be created and will be set autoIncrement to true
  const db = event.target.result;
  db.createObjectStore("pending", { autoIncrement: true });
};

request.onsuccess = function(event) {
  db = event.target.result;

  //In order to start reading from db the navigator has to check if is online
  if (navigator.onLine) {
    checkDatabase();
  }
}; 