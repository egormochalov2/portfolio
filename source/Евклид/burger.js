document.addEventListener('DOMContentLoaded',function(){
  let timer;
  let proverka;
  document.querySelector('.burger').addEventListener('click',function(burger){
    burger.currentTarget.classList.toggle('burger-active')

    if(proverka){
      clearTimeout(timer);
      document.querySelector('.menu').style.display='none';
    }
    if(document.querySelector('.menu').style.display=="none"){
        document.querySelector('.menu').style.display='block';
        setTimeout(function(){
        document.querySelector('.menu').classList.add('is-active');
        },20);
        proverka=false;
    }
    else{
        document.querySelector('.menu').classList.remove('is-active');
        timer=setTimeout(function(){
        document.querySelector('.menu').style.display='none';
        },300);
        proverka=true;
    }
  })
});
