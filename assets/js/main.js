// ハンバーガー開閉＋フォーカス管理＋堅牢性強化
(function(){
  // セレクタの取得: IDを基準に要素を特定
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('site-nav');
  const breakpoint = 769; // CSSと合わせたPC表示のブレイクポイント

  if(!toggle || !nav) return;

  // 初期A11y設定
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', 'site-nav'); // 補助機能として付与

  // メニューの開閉を制御する共通関数
  const toggleMenu = (open) => {
    // 状態が明示されていない場合、現在の状態を反転させる
    const isOpening = (typeof open === 'boolean') ? open : !nav.classList.contains('is-open');

    if (isOpening) {
      nav.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      // 開いたら最初のリンクへフォーカス移動
      const firstLink = nav.querySelector('a');
      if(firstLink) firstLink.focus();
    } else {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      // 閉じたらトグルボタンへフォーカスを戻す
      toggle.focus();
    }
  };

  // 1. トグルボタンのクリックイベント
  toggle.addEventListener('click', () => toggleMenu());

  // 2. ESCキーでの閉じる処理 (A11y)
  document.addEventListener('keydown', (e) => {
    if (nav.classList.contains('is-open') && e.key === 'Escape') {
      toggleMenu(false);
    }
  });

  // 3. 外側クリックで閉じる処理 (誤操作防止)
  document.addEventListener('click', (e) => {
    // ナビが開いており、クリックターゲットがナビ内でもトグルボタンでもない場合
    if (nav.classList.contains('is-open') && !nav.contains(e.target) && !toggle.contains(e.target)) {
      toggleMenu(false);
    }
  });

  // 4. ナビ内のリンククリックで自動クローズ (UX向上)
  nav.addEventListener('click', (e) => {
    // クリックされた要素がアンカータグ<a>の場合に閉じる
    if (e.target.closest('a')) {
      // リンク移動後にメニューを閉じる
      // ただし、もしページ内アンカー#であれば、移動を妨げないようsetTimeoutで後処理する
      setTimeout(() => toggleMenu(false), 50);
    }
  });


  // 5. リサイズ時の復旧処理 (PC幅でのis-open削除)
  window.addEventListener('resize', () => {
    if (window.innerWidth >= breakpoint && nav.classList.contains('is-open')) {
      // PC幅になったら強制的にモバイル用の開状態を解除
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

})();