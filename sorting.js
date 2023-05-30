
var input=document.querySelector("input#sz");
var speed=document.querySelector("input#sp");
var NA=document.querySelector("button");
var barSec=document.querySelector(".bars-section");

var BS=document.querySelector(".btn1");
var SS=document.querySelector(".btn2");
var IS=document.querySelector(".btn3");
var QS=document.querySelector(".btn4");
var MS=document.querySelector(".btn5");
var A=[]

var new_arr=0;

//adding EventListener to new array button.
NA.addEventListener("click",function(){
    newBars();
});

//adding EventListener to input bar to detect Enter and create new array.
input.addEventListener("keypress",function(event){
    if(event.key==="Enter"){
        newBars();
    }
});

//function which creates new array(i.e new bars) when New Array button is clicked.
function newBars(){
    new_arr=1;
    var n=input.value;
    A=[];
    var B=[];
    for(var i=0;i<n;i++){
        A.push(Math.floor(Math.random()*100)+1);
    }

    //Making barSec empty.
    while (barSec.firstChild) {
        barSec.removeChild(barSec.firstChild);
    }

    //Add new elements to NA.
    for(var i=0;i<n;i++){
        B.push(document.createElement("div"));
        B[i].classList.add("bar");
        B[i].style.height=A[i]+"px";
        barSec.appendChild(B[i]);
    }
}

//function for swapping 2 bars.
function swap(el1,el2){
    if(el1 && el2){
        const H1=el1.style.height;
        const H2=el2.style.height;

        el1.style.height=H2;
        el2.style.height=H1;
    }
}

function waitforme(milisec) {
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, milisec);
    })
}

/*PART-1*/
//adding event listener to bubble sort button which call bubbleSort function.
BS.addEventListener("click",function(){
    new_arr=0;
    bubbleSort();
});

//function for bubble sort.
async function bubbleSort(){
    if(new_arr==1)return;
    var n=barSec.childElementCount;
    console.log(n);
    for(var i=0;i<n-1;i++){
        for(var j=0;j<n-i-1;j++){        
            if(new_arr==1)return;

            var el1=document.querySelector(".bars-section :nth-child("+(j+1)+")");
            var el2=document.querySelector(".bars-section :nth-child("+(j+2)+")");

            el1.style.backgroundColor="blue";
            el2.style.backgroundColor="blue";
            await waitforme(1000/speed.value);

            if(A[j]>A[j+1]){
                var temp=A[j];
                A[j]=A[j+1];
                A[j+1]=temp;   
                swap(el1,el2);
            }
            el1.style.backgroundColor="yellow";
            el2.style.backgroundColor="yellow";
        }
        document.querySelector(".bars-section :nth-child("+(n-i)+")").style.backgroundColor="green";
    }
    document.querySelector(".bars-section :nth-child(1)").style.backgroundColor="green";
}

/*PART-2*/
//adding event listener to selection sort button which call selectionSort function.
SS.addEventListener("click",function(){
    new_arr=0;
    selectionSort();
});

//function for selection sort.
async function selectionSort(){
    if(new_arr==1)return;
    var n=barSec.childElementCount;
    for(var i=0;i<n;i++){
        if(new_arr==1)return;

        var T=document.querySelector(".bars-section :nth-child("+(i+1)+")");
        T.style.backgroundColor="blue";
        var ind=i;
        var curr_mini=T;
        for(var j=i+1;j<n;j++){
            if(new_arr==1)return;
    
            var R=document.querySelector(".bars-section :nth-child("+(j+1)+")");
            R.style.backgroundColor="red";
            
            await waitforme(1000/speed.value);
            
            if(A[j]<A[ind]){
                ind=j;
                if(curr_mini!==T)curr_mini.style.backgroundColor="yellow";
                curr_mini=R;
            }
            else R.style.backgroundColor="yellow";
        }
        var temp=A[i];
        A[i]=A[ind];
        A[ind]=temp;
        swap(T,curr_mini);
        curr_mini.style.backgroundColor="yellow";
        T.style.backgroundColor="green";
    }
}

/*PART-3*/
//adding event listener to selection sort button which call insertionSort function.
IS.addEventListener("click",function(){
    new_arr=0;
    insertionSort();
});

//function for Insertion sort.
async function insertionSort(){
    if(new_arr==1)return;
    var n=barSec.childElementCount;
    for(var i=0;i<n;i++){
        if(new_arr==1)return;
        
        var T=document.querySelector(".bars-section :nth-child("+(i+1)+")");
        T.style.backgroundColor="blue";
        var temp=A[i];
        var j;
        for(j=i-1;j>=0;j--){
            if(new_arr==1)return;

            document.querySelector(".bars-section :nth-child("+(j+1)+")").style.backgroundColor="red";
            await waitforme(1000/speed.value);
            if(A[j]<A[i])break;
            document.querySelector(".bars-section :nth-child("+(j+1)+")").style.backgroundColor="green";
        }
        if(j!=-1)document.querySelector(".bars-section :nth-child("+(j+1)+")").style.backgroundColor="green";
        j++;//now j represent position where A[i] will be present in sorted order.

        for(var k=i;k>j;k--){
            if(new_arr==1)return;

            A[k]=A[k-1];
            var el1=document.querySelector(".bars-section :nth-child("+(k+1)+")");
            var el2=document.querySelector(".bars-section :nth-child("+(k)+")");
            swap(el1,el2);
        }
        A[j]=temp;
        document.querySelector(".bars-section :nth-child("+(j+1)+")").style.height=temp+"px";
        T.style.backgroundColor="green";
    }
}

/*PART-4*/
//adding event listener to selection sort button which call quickSort function.
QS.addEventListener("click",function(){
    var n=barSec.childElementCount;
    new_arr=0;
    quickSort(0,n-1);
});

//function for quick sort.
async function quickSort(i,j){
    if(new_arr==1)return;
    
    if(i>=j){
        if(i==j)document.querySelector(".bars-section :nth-child("+(j+1)+")").style.backgroundColor="green";    
        return;
    }
    var p=await partition(i,j);
    await quickSort(i,p-1);
    await quickSort(p+1,j);
}

async function partition(i,j){
    if(new_arr==1)return;

    document.querySelector(".bars-section :nth-child("+(j+1)+")").style.backgroundColor="red";
    await waitforme(500/speed.value);
    var pivot=A[j];
    var p=i;
    for(var k=i;k<j;k++){
        if(new_arr==1)return;

        var T=document.querySelector(".bars-section :nth-child("+(k+1)+")");
        T.style.backgroundColor="orange";
        await waitforme(500/speed.value);
        if(A[k]<pivot){
            T.style.backgroundColor="purple";
            document.querySelector(".bars-section :nth-child("+(p+1)+")").style.backgroundColor="blue";
            var temp=A[p];
            A[p]=A[k];
            A[k]=temp;
            var el1=document.querySelector(".bars-section :nth-child("+(k+1)+")");
            var el2=document.querySelector(".bars-section :nth-child("+(p+1)+")");
            swap(el1,el2);
            p++;
        }
        else T.style.backgroundColor="purple";
    }
    
    if(new_arr==1)return;

    A[j]=A[p];
    A[p]=pivot;
    var el1=document.querySelector(".bars-section :nth-child("+(j+1)+")");
    var el2=document.querySelector(".bars-section :nth-child("+(p+1)+")");
    swap(el1,el2);

    for(var k=i;k<=j;k++){
        if(new_arr==1)return;

        document.querySelector(".bars-section :nth-child("+(k+1)+")").style.backgroundColor="yellow";    
    }
    document.querySelector(".bars-section :nth-child("+(p+1)+")").style.backgroundColor="green";
    return p;
}

/*PART-5*/
//adding event listener to selection sort button which call mergeSort function.
MS.addEventListener("click",function(){
    var n=barSec.childElementCount;
    new_arr=0;
    mergeSort(0,n-1);
});

//function for merge sort.
async function mergeSort(i,j){
    if(new_arr==1)return;

    if(i>=j)return;
    var m=i+Math.floor((j-i)/2);
    await mergeSort(i,m);
    await mergeSort(m+1,j);
    await merge(i,j,m);
}

async function merge(i,j,m){
    if(new_arr==1)return;

    for(var k=i;k<=m;k++){
        if(new_arr==1)return;

        document.querySelector(".bars-section :nth-child("+(k+1)+")").style.backgroundColor="blue";
        await waitforme(1000/speed.value);
    }
    for(var k=m+1;k<=j;k++){
        if(new_arr==1)return;

        document.querySelector(".bars-section :nth-child("+(k+1)+")").style.backgroundColor="purple";
        await waitforme(1000/speed.value);
    }
    var k1=i;
    var k2=m+1;
    var B=[];
    while(k1<=m && k2<=j){
        if(A[k1]<A[k2]){
            B.push(A[k1]);
            k1++;
        }
        else{
            B.push(A[k2]);
            k2++;
        }
    }
    while(k1<=m){
        B.push(A[k1]);
        k1++;
    }
    while(k2<=j){
        B.push(A[k2]);
        k2++;
    }
    for(var k=0;k<B.length;k++){
        if(new_arr==1)return;
        
        A[i+k]=B[k];
        document.querySelector(".bars-section :nth-child("+(i+k+1)+")").style.height=A[i+k]+"px";
        document.querySelector(".bars-section :nth-child("+(i+k+1)+")").style.backgroundColor="green";
        await waitforme(1000/speed.value);
    }
}