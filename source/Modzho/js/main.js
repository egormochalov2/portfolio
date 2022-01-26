  // Utils
    const footerYears = document.querySelectorAll('.footer-year');
  if (footerYears) {    
      footerYears.forEach(el => el.textContent = new Date().getFullYear().toString());
  }

// Отправка формы
document.addEventListener('DOMContentLoaded', () => {
  const callbackForm = document.querySelectorAll('.form');

  callbackForm.forEach((el) => {
      el.addEventListener('submit', async (e) => {
          e.preventDefault();
          try {
            el.querySelector('button[type="submit"]').classList.add('uk-disabled');
            const response = await fetch('js/send.php', {
                method: 'POST',
                body: new FormData(el)
            });
            if (response.ok) {
                el.reset();
                el.querySelector('button[type="submit"]').classList.remove('uk-disabled');
                UIkit.modal('#modal-thanks').show();
                if (fileSelectorModal) {
                    deleteUploadModal();
                }
                if (fileSelectorBottom) {
                    deleteUploadBottom();
                }
            } else {
                el.querySelector('button[type="submit"]').classList.remove('uk-disabled');
            }
          } catch {
              el.querySelector('button[type="submit"]').classList.remove('uk-disabled');
          }
      });
  })
});

document.querySelector('.burger-icon').addEventListener('click',function(){
  document.querySelector('.burger-icon').classList.toggle('open');
})


// Mobile Accordion
try{
  const addAccordion = (mobileAccordion, mobileAccordionTitle, mobileAccordionContent, accordionTargets) => {
    mobileAccordionTitle.wrap("<a class='uk-accordion-title'></a>");
    mobileAccordionContent.addClass('uk-accordion-content');
    mobileAccordion.attr('uk-accordion', `multiple: true; targets: ${accordionTargets}`);
};

const removeAccordion = (mobileAccordion, mobileAccordionTitle, mobileAccordionContent) => {
    mobileAccordionTitle.unwrap();
    mobileAccordionContent.removeClass('uk-accordion-content').removeAttr('hidden');
    mobileAccordion.removeAttr('uk-accordion').removeClass('uk-accordion');
};

const toMobileAccordion = (width, mobileAccordion, mobileAccordionTitle, mobileAccordionContent, accordionTargets = '> *') => {
    $(window).on('load resize', () => {
        if (window.innerWidth < width && !mobileAccordionContent.hasClass('uk-accordion-content')) {
            addAccordion(mobileAccordion, mobileAccordionTitle, mobileAccordionContent, accordionTargets);
        } else if (window.innerWidth > width && mobileAccordionContent.hasClass('uk-accordion-content')) {
            removeAccordion(mobileAccordion, mobileAccordionTitle, mobileAccordionContent);
        }
    });
};


toMobileAccordion(639.98, $('.accordion'), $('.accordion .accordion-title'), $('.accordion .accordion-content'));
}
catch {

}

function showFile(e) {
  var files = e.target.files;
  for (var i = 0, f; f = files[i]; i++) {
    var fr = new FileReader();
    fr.onload = (function(theFile) {
      return function(e) {
          document.querySelector('.fileLabel').innerHTML=""+theFile.name;
          document.querySelector('.fileSize').innerHTML=""+(Math.round(theFile.size/1000))+" KB";
          document.querySelector('.fileDescription').style.display="flex";
      };
    })(f);

    fr.readAsDataURL(f);
  }
}

document.getElementById('file').addEventListener('change', showFile, false);

document.querySelector('.delited').addEventListener("click",function(e){
    e.preventDefault();
    document.getElementById('file').value='';
    document.querySelector('.fileLabel').innerHTML="Прикрепить&nbsp;файл";
    document.querySelector('.fileDescription').style.display="none";
});

function showFileForm(e) {
  var files = e.target.files;
  for (var i = 0, f; f = files[i]; i++) {
    var fr = new FileReader();
    fr.onload = (function(theFile) {
      return function(e) {
          document.querySelector('.fileLabelForm').innerHTML=""+theFile.name;
          document.querySelector('.fileSizeForm').innerHTML=""+(Math.round(theFile.size/1000))+" KB";
          document.querySelector('.fileDescriptionForm').style.display="flex";
      };
    })(f);

    fr.readAsDataURL(f);
  }
}

try{
  document.getElementById('fileForm').addEventListener('change', showFileForm, false);

document.querySelector('.delitedForm').addEventListener("click",function(e){
    e.preventDefault();
    document.getElementById('fileForm').value='';
    document.querySelector('.fileLabelForm').innerHTML="Прикрепить&nbsp;файл";
    document.querySelector('.fileDescriptionForm').style.display="none";
});
}
catch{}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiAgLy8gVXRpbHNcclxuICAgIGNvbnN0IGZvb3RlclllYXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZvb3Rlci15ZWFyJyk7XHJcbiAgaWYgKGZvb3RlclllYXJzKSB7ICAgIFxyXG4gICAgICBmb290ZXJZZWFycy5mb3JFYWNoKGVsID0+IGVsLnRleHRDb250ZW50ID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpLnRvU3RyaW5nKCkpO1xyXG4gIH1cclxuXHJcbi8vINCe0YLQv9GA0LDQstC60LAg0YTQvtGA0LzRi1xyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gIGNvbnN0IGNhbGxiYWNrRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5mb3JtJyk7XHJcblxyXG4gIGNhbGxiYWNrRm9ybS5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBhc3luYyAoZSkgPT4ge1xyXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgZWwucXVlcnlTZWxlY3RvcignYnV0dG9uW3R5cGU9XCJzdWJtaXRcIl0nKS5jbGFzc0xpc3QuYWRkKCd1ay1kaXNhYmxlZCcpO1xyXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdqcy9zZW5kLnBocCcsIHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgYm9keTogbmV3IEZvcm1EYXRhKGVsKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgICAgICAgICBlbC5yZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgZWwucXVlcnlTZWxlY3RvcignYnV0dG9uW3R5cGU9XCJzdWJtaXRcIl0nKS5jbGFzc0xpc3QucmVtb3ZlKCd1ay1kaXNhYmxlZCcpO1xyXG4gICAgICAgICAgICAgICAgVUlraXQubW9kYWwoJyNtb2RhbC10aGFua3MnKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZmlsZVNlbGVjdG9yTW9kYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGVVcGxvYWRNb2RhbCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGZpbGVTZWxlY3RvckJvdHRvbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZVVwbG9hZEJvdHRvbSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZWwucXVlcnlTZWxlY3RvcignYnV0dG9uW3R5cGU9XCJzdWJtaXRcIl0nKS5jbGFzc0xpc3QucmVtb3ZlKCd1ay1kaXNhYmxlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGNhdGNoIHtcclxuICAgICAgICAgICAgICBlbC5xdWVyeVNlbGVjdG9yKCdidXR0b25bdHlwZT1cInN1Ym1pdFwiXScpLmNsYXNzTGlzdC5yZW1vdmUoJ3VrLWRpc2FibGVkJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gIH0pXHJcbn0pO1xyXG5cclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ1cmdlci1pY29uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGZ1bmN0aW9uKCl7XHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ1cmdlci1pY29uJykuY2xhc3NMaXN0LnRvZ2dsZSgnb3BlbicpO1xyXG59KVxyXG5cclxuXHJcbi8vIE1vYmlsZSBBY2NvcmRpb25cclxudHJ5e1xyXG4gIGNvbnN0IGFkZEFjY29yZGlvbiA9IChtb2JpbGVBY2NvcmRpb24sIG1vYmlsZUFjY29yZGlvblRpdGxlLCBtb2JpbGVBY2NvcmRpb25Db250ZW50LCBhY2NvcmRpb25UYXJnZXRzKSA9PiB7XHJcbiAgICBtb2JpbGVBY2NvcmRpb25UaXRsZS53cmFwKFwiPGEgY2xhc3M9J3VrLWFjY29yZGlvbi10aXRsZSc+PC9hPlwiKTtcclxuICAgIG1vYmlsZUFjY29yZGlvbkNvbnRlbnQuYWRkQ2xhc3MoJ3VrLWFjY29yZGlvbi1jb250ZW50Jyk7XHJcbiAgICBtb2JpbGVBY2NvcmRpb24uYXR0cigndWstYWNjb3JkaW9uJywgYG11bHRpcGxlOiB0cnVlOyB0YXJnZXRzOiAke2FjY29yZGlvblRhcmdldHN9YCk7XHJcbn07XHJcblxyXG5jb25zdCByZW1vdmVBY2NvcmRpb24gPSAobW9iaWxlQWNjb3JkaW9uLCBtb2JpbGVBY2NvcmRpb25UaXRsZSwgbW9iaWxlQWNjb3JkaW9uQ29udGVudCkgPT4ge1xyXG4gICAgbW9iaWxlQWNjb3JkaW9uVGl0bGUudW53cmFwKCk7XHJcbiAgICBtb2JpbGVBY2NvcmRpb25Db250ZW50LnJlbW92ZUNsYXNzKCd1ay1hY2NvcmRpb24tY29udGVudCcpLnJlbW92ZUF0dHIoJ2hpZGRlbicpO1xyXG4gICAgbW9iaWxlQWNjb3JkaW9uLnJlbW92ZUF0dHIoJ3VrLWFjY29yZGlvbicpLnJlbW92ZUNsYXNzKCd1ay1hY2NvcmRpb24nKTtcclxufTtcclxuXHJcbmNvbnN0IHRvTW9iaWxlQWNjb3JkaW9uID0gKHdpZHRoLCBtb2JpbGVBY2NvcmRpb24sIG1vYmlsZUFjY29yZGlvblRpdGxlLCBtb2JpbGVBY2NvcmRpb25Db250ZW50LCBhY2NvcmRpb25UYXJnZXRzID0gJz4gKicpID0+IHtcclxuICAgICQod2luZG93KS5vbignbG9hZCByZXNpemUnLCAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgd2lkdGggJiYgIW1vYmlsZUFjY29yZGlvbkNvbnRlbnQuaGFzQ2xhc3MoJ3VrLWFjY29yZGlvbi1jb250ZW50JykpIHtcclxuICAgICAgICAgICAgYWRkQWNjb3JkaW9uKG1vYmlsZUFjY29yZGlvbiwgbW9iaWxlQWNjb3JkaW9uVGl0bGUsIG1vYmlsZUFjY29yZGlvbkNvbnRlbnQsIGFjY29yZGlvblRhcmdldHMpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAod2luZG93LmlubmVyV2lkdGggPiB3aWR0aCAmJiBtb2JpbGVBY2NvcmRpb25Db250ZW50Lmhhc0NsYXNzKCd1ay1hY2NvcmRpb24tY29udGVudCcpKSB7XHJcbiAgICAgICAgICAgIHJlbW92ZUFjY29yZGlvbihtb2JpbGVBY2NvcmRpb24sIG1vYmlsZUFjY29yZGlvblRpdGxlLCBtb2JpbGVBY2NvcmRpb25Db250ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuXHJcblxyXG50b01vYmlsZUFjY29yZGlvbig2MzkuOTgsICQoJy5hY2NvcmRpb24nKSwgJCgnLmFjY29yZGlvbiAuYWNjb3JkaW9uLXRpdGxlJyksICQoJy5hY2NvcmRpb24gLmFjY29yZGlvbi1jb250ZW50JykpO1xyXG59XHJcbmNhdGNoIHtcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dGaWxlKGUpIHtcclxuICB2YXIgZmlsZXMgPSBlLnRhcmdldC5maWxlcztcclxuICBmb3IgKHZhciBpID0gMCwgZjsgZiA9IGZpbGVzW2ldOyBpKyspIHtcclxuICAgIHZhciBmciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcbiAgICBmci5vbmxvYWQgPSAoZnVuY3Rpb24odGhlRmlsZSkge1xyXG4gICAgICByZXR1cm4gZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZpbGVMYWJlbCcpLmlubmVySFRNTD1cIlwiK3RoZUZpbGUubmFtZTtcclxuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maWxlU2l6ZScpLmlubmVySFRNTD1cIlwiKyhNYXRoLnJvdW5kKHRoZUZpbGUuc2l6ZS8xMDAwKSkrXCIgS0JcIjtcclxuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maWxlRGVzY3JpcHRpb24nKS5zdHlsZS5kaXNwbGF5PVwiZmxleFwiO1xyXG4gICAgICB9O1xyXG4gICAgfSkoZik7XHJcblxyXG4gICAgZnIucmVhZEFzRGF0YVVSTChmKTtcclxuICB9XHJcbn1cclxuXHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWxlJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgc2hvd0ZpbGUsIGZhbHNlKTtcclxuXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZWxpdGVkJykuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsZnVuY3Rpb24oZSl7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsZScpLnZhbHVlPScnO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZpbGVMYWJlbCcpLmlubmVySFRNTD1cItCf0YDQuNC60YDQtdC/0LjRgtGMJm5ic3A70YTQsNC50LtcIjtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maWxlRGVzY3JpcHRpb24nKS5zdHlsZS5kaXNwbGF5PVwibm9uZVwiO1xyXG59KTtcclxuXHJcbmZ1bmN0aW9uIHNob3dGaWxlRm9ybShlKSB7XHJcbiAgdmFyIGZpbGVzID0gZS50YXJnZXQuZmlsZXM7XHJcbiAgZm9yICh2YXIgaSA9IDAsIGY7IGYgPSBmaWxlc1tpXTsgaSsrKSB7XHJcbiAgICB2YXIgZnIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG4gICAgZnIub25sb2FkID0gKGZ1bmN0aW9uKHRoZUZpbGUpIHtcclxuICAgICAgcmV0dXJuIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maWxlTGFiZWxGb3JtJykuaW5uZXJIVE1MPVwiXCIrdGhlRmlsZS5uYW1lO1xyXG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZpbGVTaXplRm9ybScpLmlubmVySFRNTD1cIlwiKyhNYXRoLnJvdW5kKHRoZUZpbGUuc2l6ZS8xMDAwKSkrXCIgS0JcIjtcclxuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maWxlRGVzY3JpcHRpb25Gb3JtJykuc3R5bGUuZGlzcGxheT1cImZsZXhcIjtcclxuICAgICAgfTtcclxuICAgIH0pKGYpO1xyXG5cclxuICAgIGZyLnJlYWRBc0RhdGFVUkwoZik7XHJcbiAgfVxyXG59XHJcblxyXG50cnl7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbGVGb3JtJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgc2hvd0ZpbGVGb3JtLCBmYWxzZSk7XHJcblxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGVsaXRlZEZvcm0nKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIixmdW5jdGlvbihlKXtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWxlRm9ybScpLnZhbHVlPScnO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZpbGVMYWJlbEZvcm0nKS5pbm5lckhUTUw9XCLQn9GA0LjQutGA0LXQv9C40YLRjCZuYnNwO9GE0LDQudC7XCI7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmlsZURlc2NyaXB0aW9uRm9ybScpLnN0eWxlLmRpc3BsYXk9XCJub25lXCI7XHJcbn0pO1xyXG59XHJcbmNhdGNoe30iXSwiZmlsZSI6Im1haW4uanMifQ==
