let smena1 = document.querySelector('.ty');
window.onscroll=function(){
if (window.pageYOffset > 200){
  smena1.classList.remove('dis');
}
else{
  smena1.classList.add('dis');
}
}
smena1.onclick=function(){
  window.scrollTo(0,0);
}
