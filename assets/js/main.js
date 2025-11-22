// ハンバーガー開閉＋フォーカス管理（A11y最低限）
(function(){
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  if(!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    if(open){
      const firstLink = nav.querySelector('a');
      if(firstLink) firstLink.focus();
    }else{
      toggle.focus();
    }
  });
