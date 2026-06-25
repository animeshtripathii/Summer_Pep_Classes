
// // Visualizing the Execution Flow:StepCall Stack StateWhat is Happening?Start[ Global Context ]The script loads. globalVar, firstFunction, and secondFunction are allocated in memory.Line 18[ firstFunction FEC ][ Global Context ]firstFunction() is called. Its context is pushed to the top.Line 9[ secondFunction FEC ][ firstFunction FEC ][ Global Context ]Inside firstFunction, secondFunction() is called. A new context is pushed to the top.Line 15[ firstFunction FEC ][ Global Context ]secondFunction finishes. Its context is popped off and destroyed.Line 20[ Global Context ]firstFunction finishes. Its context is popped off. Only the Global context remains.



// function thirdFunction() {
   
//     if(true){
//         var s=10;
//         console.log(s); // 10. This will log 10 to the console
//     }
//     console.log(s); // 11. This will also log 10 to the console because var is function-scoped
// }
// console.log(s); // 12. This will throw a ReferenceError because s is not defined in the Global Execution Context
// thirdFunction()