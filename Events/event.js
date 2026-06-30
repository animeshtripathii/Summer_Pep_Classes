//Event in javascript is a way to handle user interactions and other occurrences in the browser. Events can be triggered by user actions such as clicks, key presses, or mouse movements, as well as by other events like page load or form submission.

//event capturing and bubbling are two phases of event propagation in the DOM. In the capturing phase, the event is first captured by the outermost element and propagated down to the target element. In the bubbling phase, the event bubbles up from the target element to the outermost element.

//Event delegation is a technique in JavaScript where you attach a single event listener to a parent element instead of multiple listeners to individual child elements. This allows you to handle events for dynamically added elements and improves performance by reducing the number of event listeners in the DOM.

const firstBox=document.getElementById("first");
const secondBox=document.getElementById("second");
const thirdBox=document.getElementById("third");

firstBox.addEventListener("click",function(){
    console.log("First Box Clicked");
},true);

secondBox.addEventListener("click",function(){
    console.log("Second Box Clicked");
},true);
thirdBox.addEventListener("click",function(){
    console.log("Third Box Clicked");
},true);


//event bubbling phase
firstBox.addEventListener("click",function(){
    console.log("Event Bubbling: First Box Clicked");
},);

secondBox.addEventListener("click",function(){
    console.log("Event Bubbling: Second Box Clicked");
},);
thirdBox.addEventListener("click",function(){
    console.log("Event Bubbling: Third Box Clicked");
},);