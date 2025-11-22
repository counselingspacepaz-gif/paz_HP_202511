// ハンバーガー開閉＋フォーカス管理（A11y最低限）
(function(){
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  if(!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    if(open){
      // メニューが開いたら最初のリンクにフォーカスを移動
      const firstLink = nav.querySelector('a');
      if(firstLink) firstLink.focus();
    }else{
      // メニューが閉じたらトグルボタンにフォーカスを戻す
      toggle.focus();
    }
  });

  // ESCキーでの閉じる処理（追加推奨機能）
  document.addEventListener('keydown', (e) => {
    if (nav.classList.contains('is-open') && e.key === 'Escape') {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });

// ★ ここで即時関数を正しく閉じる ★
})();
// ファイル末尾に改行を入れておく