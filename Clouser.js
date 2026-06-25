//Clouser in js is a fucntion which remembers the variables from the place where it was created, even if it is executed outside of that scope. In other words, a closure allows a function to access variables from its outer (enclosing) function's scope, even after the outer function has finished executing.
//Closures are created every time a function is created, at function creation time. A closure is a combination of a function and the lexical environment within which that function was declared. This environment consists of any local variables that were in-scope at the time the closure was created.


function outerFunction() {
    let outerVariable = "I am from the outer function";

    function innerFunction() {
        console.log(outerVariable); // Accessing the outer function's variable
    }
}
const outer = outerFunction(); // Calling the outer function
console.log(outer); // This will throw a ReferenceError because outerVariable is not accessible outside of outerFunction




function createBankAccount(initialBalance) {
    let balance = initialBalance; // This variable is private to the closure
    return {
        deposit: function(amount) {
            balance += amount;
            console.log(`Deposited: ${amount}. New Balance: ${balance}`);
        },
        withdraw: function(amount) {
            if (amount <= balance) {
                balance -= amount;
                console.log(`Withdrew: ${amount}. New Balance: ${balance}`);
            }
        },
        getBalance: function(){
                return balance;
            }
        }
    }
const myAccount = createBankAccount(100); // Create a new bank account with an initial balance of 100
myAccount.deposit(50);
myAccount.withdraw(30);
console.log(`Current Balance: ${myAccount.getBalance()}`); // Accessing the balance through the closure
