document.addEventListener('DOMContentLoaded',function(){
  document.querySelectorAll('.section-aboutWork__stepList-item').forEach(function(tabsBtn){
    tabsBtn.addEventListener('click',function(event){
      const path = event.currentTarget.dataset.path;
      document.querySelectorAll('.section-aboutWork__stepList-item').forEach(function(el){
        el.classList.remove('current');
      });
      document.querySelectorAll('.swipeItem').forEach(function(tabContent){
        tabContent.classList.remove('active');
      });
      document.querySelector(`[data-target="${path}"]`).classList.add('active');
      event.target.classList.add('current');
    });
  });
});
