
// 1. Global Execution Context (GEC)This is the default or base execution context. Any code that is not inside a function is executed inside the Global Execution Context.Creation: It is created when the JavaScript engine starts up and loads your script.Key Characteristics: * It creates a global object (window in browsers, global in Node.js).It sets the value of the this keyword to that global object.There is only ever one Global Execution Context in a program.

// 2. Functional Execution Context (FEC)Every time a function is invoked (called), the JavaScript engine creates a brand-new execution context specifically for that function.Creation: It is created only when the function is called, not when it is defined.Key Characteristics:Each function has its own execution context.It has access to everything inside the GEC, but the GEC cannot look inside the FEC.It contains the function's arguments, local variables, and its own this binding.

// 3. Eval Execution ContextCode executed inside an eval() function gets its own execution context.Key Characteristics: It is rarely used in modern JavaScript because it can lead to security vulnerabilities and performance issues. Most developers avoid it entirely.

// The Call Stack & How Contexts InteractTo understand how these environments interact, we use the Call Stack (or Execution Context Stack). JavaScript is single-threaded, meaning it can only do one thing at a time. The stack keeps track of which context is currently running.The Global Context is pushed to the bottom of the stack first.When a function is called, its Functional Context is pushed to the top of the stack.The engine executes the code at the top of the stack.When the function finishes, its context is popped off the stack, and control returns to the context below it.Complete Code ExampleLet’s look at a practical example to see how the Global and Functional contexts are created and destroyed.JavaScript


// // 1. We are currently in the Global Execution Context (GEC)
// let globalVar = "I am Global";

// function firstFunction() {
//     // 3. A new Functional Execution Context (FEC) is created for firstFunction
//     let firstVar = "Inside First";
//     console.log(globalVar); // Accesses global context variable
    
//     secondFunction(); // Calling another function
//     // 6. Control returns here after secondFunction finishes
// }

// function secondFunction() {
//     // 4. A new Functional Execution Context (FEC) is created for secondFunction
//     let secondVar = "Inside Second";
//     console.log(secondVar);
//     // 5. secondFunction finishes. Its FEC is popped off the Call Stack.
// }

// firstFunction(); // 2. This invocation pushes firstFunction onto the Call Stack

// Visualizing the Execution Flow:StepCall Stack StateWhat is Happening?Start[ Global Context ]The script loads. globalVar, firstFunction, and secondFunction are allocated in memory.Line 18[ firstFunction FEC ][ Global Context ]firstFunction() is called. Its context is pushed to the top.Line 9[ secondFunction FEC ][ firstFunction FEC ][ Global Context ]Inside firstFunction, secondFunction() is called. A new context is pushed to the top.Line 15[ firstFunction FEC ][ Global Context ]secondFunction finishes. Its context is popped off and destroyed.Line 20[ Global Context ]firstFunction finishes. Its context is popped off. Only the Global context remains.



function thirdFunction() {
   
    if(true){
        var s=10;
        console.log(s); // 10. This will log 10 to the console
    }
    console.log(s); // 11. This will also log 10 to the console because var is function-scoped
}
console.log(s); // 12. This will throw a ReferenceError because s is not defined in the Global Execution Context
thirdFunction(); // 9. This invocation pushes thirdFunction onto the Call Stack