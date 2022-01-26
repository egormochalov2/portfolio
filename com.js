let sub=document.querySelector(".sub");
let text=document.querySelector(".text");
let ul=document.querySelector(".ul");

sub.onsubmit=function(evt){
  evt.preventDefault();

  r=document.createElement('li');
  r.textContent=text.value;
  ul.append(r);
  text.value="";
}
