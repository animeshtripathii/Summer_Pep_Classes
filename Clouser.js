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