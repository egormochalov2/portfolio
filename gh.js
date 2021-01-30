let button = document.querySelectorAll('.button');
let chose=document.querySelector('.chosen-color');
let lst=document.querySelector('.sd');
lst.onclick=function(){
  lst.classList.toggle('last')
}
for ( let r of button){
  r.onclick=function(){
    if ( lst.classList.contains('last')){
      r.style.backgroundColor='white';
      r.style.borderColor='black';
  }
  else {
    r.style.backgroundColor=chose.value;
    r.style.borderColor=chose.value;
  }
  }
}
