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



//promsie code for callback 


function login(username, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (username && password) {
                console.log("✔ Logged in successfully.");
                resolve({ userId: "user_101", token: "xyz123" });
            } else {
                reject("Login Failed: Missing credentials");
            }
        }, 1000);
    });
}
function getUserDetails(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`✔ Fetched details for User ID: ${userId}`);
            resolve({ userId: userId, name: "Animesh", email: "animesh@example.com" });
        }, 1000);
    });
}

function createOrder(userId, item) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`✔ Order placed for ${item}.`);
            resolve({ orderId: "ord_999", userId: userId, item: item });
        }, 1000);
    });
}

function getOrderDetails(orderId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`✔ Fetched receipt for Order ID: ${orderId}`);
            resolve({ orderId: orderId, status: "Delivered", total: "₹1,499" });
        }, 1000);
    });
}
login("animesh_tripathi", "securePassword123")
    .then((authData) => {
        return getUserDetails(authData.userId);
    })
    .then((userData) => {
        return createOrder(userData.userId, "Mechanical Keyboard");
    })
    .then((orderData) => {
        return getOrderDetails(orderData.orderId);
    })
    .then((finalReceipt) => {
        console.log("--- Final Order Receipt ---", finalReceipt);
    })
    .catch((error) => {
        console.error("An error occurred in the chain:", error);
    });


