window.onscroll = ()=>{
  if(window.pageYOffset > 0)
    document.getElementById('scrollToTop').classList.add('visible');
  else
    document.getElementById('scrollToTop').classList.remove('visible');  
}
