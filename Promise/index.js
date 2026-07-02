//promise in javascript is an object which is eventually responsible for completion and failure of an asynchronous task.

const promise = new Promise((resolve, reject) => {
    let condition = true;
    if (condition) {
        resolve("Promise is resolved successfully");
    }
    else{
        reject("Promise is rejected");
    }
});

// Methods to call/handle promises:

// 1. .then() - handles resolved value
promise.then((result) => {
    console.log("Success:", result);
});

// 2. .catch() - handles rejected value
promise.catch((error) => {
    console.log("Error:", error);
});

// 3. .finally() - executes regardless of resolution or rejection
promise.finally(() => {
    console.log("Promise settled");
});

// 4. .then() with both resolve and reject handlers
promise.then(
    (result) => console.log("Resolved:", result),
    (error) => console.log("Rejected:", error)
);

// 5. Promise.all() - waits for all promises to resolve
Promise.all([promise]).then((results) => {
    console.log("All promises resolved:", results);
});

// 6. Promise.race() - returns first settled promise ("settled" means either resolved or rejected)
Promise.race([promise]).then((result) => {
    console.log("First promise:", result);
});

// 7. Promise.allSettled() - waits for all promises to settle
Promise.allSettled([promise]).then((results) => {
    console.log("All settled:", results);
});

// 8. Promise.any() - returns first fulfilled promise
Promise.any([promise]).then((result) => {
    console.log("Any fulfilled:", result);
}).catch(() => {
    console.log("No fulfilled promises");
});
