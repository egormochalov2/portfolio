let like = document.querySelector('.g');
let l = document.querySelector('.q');

like.onclick=function(){
  if (like.classList.contains('add')){
    like.classList.remove('add');
    like.src="2.png";
    l.textContent--;
}
else {
  like.classList.add('add');
  like.src="4.png";
  l.textContent++;
}
}
let lik = document.querySelector('.gg');
let li = document.querySelector('.qq');

lik.onclick=function(){
  if (lik.classList.contains('add')){
    lik.classList.remove('add');
    lik.src="2.png";
    li.textContent--;
}
else {
  lik.classList.add('add');
  lik.src="4.png";
  li.textContent++;
}
}
let lk = document.querySelector('.ggg');
let lii = document.querySelector('.qqq');

lk.onclick=function(){
  if (lk.classList.contains('add')){
    lk.classList.remove('add');
    lk.src="2.png";
    lii.textContent--;
}
else {
  lk.classList.add('add');
  lk.src="4.png";
  lii.textContent++;
}
}
