let button = document.querySelectorAll('.button');
let chose=document.querySelector('.chosen-color');
let lst=document.querySelector('.sd');
lst.onclick=function(){
  lst.classList.toggle('last')
}
for ( let r of button){
  r.onclick=function(){
    if ( lst.checked){
      r.style.backgroundColor='white';
  }
  else {
    r.style.backgroundColor=chose.value;
  }
  }
}
