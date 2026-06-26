const increment=document.getElementById('increment');
const decrement=document.getElementById('decrement');
const reset=document.getElementById('reset');
const value=document.getElementById('count');

increment.addEventListener('click',()=>{
    let currentValue=parseInt(value.textContent);
    currentValue++;
    value.textContent=currentValue;
});

decrement.addEventListener('click',()=>{
    let currentValue=parseInt(value.textContent);
    if(currentValue>0){
    currentValue--;
    }
    value.textContent=currentValue;
});

reset.addEventListener('click',()=>{
    value.textContent=0;
});