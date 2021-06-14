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

request.onerror = function(event) {
    console.log("Woops! " + event.target.errorCode);
  };
  
  function saveRecord(record) {
    // This function will create a transaction on the pending db with readwrite access
    const transaction = db.transaction(["pending"], "readwrite");
  
    const store = transaction.objectStore("pending");
  
    // will add a record to the store 
    store.add(record);
  }
  
  function checkDatabase() {
    // create a transaction then will access the pending object store
    const transaction = db.transaction(["pending"], "readwrite");

    const store = transaction.objectStore("pending");
    // will get all records from store and create a variable
    const getAll = store.getAll();

    getAll.onsuccess = function() {
        if (getAll.result.length > 0) {
          fetch("/api/transaction/bulk", {
            method: "POST",
            body: JSON.stringify(getAll.result),
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json"
            }
          })
          .then(response => response.json())
          .then(() => {
            // will create a transaction on the pending db
            const transaction = db.transaction(["pending"], "readwrite");

            const store = transaction.objectStore("pending");
    
            // will clear the store
            store.clear();
          });
        }
      };
    }
    
    // will listen when the app come back online again
    window.addEventListener("online", checkDatabase);



