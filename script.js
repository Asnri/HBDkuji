const stampSound = new Audio("stamp.mp3");
stampSound.preload = "auto";

window.onload = () => {

  // 効果音を事前読み込み
  stampSound.load();

  const params = new URLSearchParams(window.location.search);
  const prize = params.get("prize");

  let got = JSON.parse(localStorage.getItem("got") || "[]");

  const button = document.getElementById("stampButton");

  // 保存済みスタンプ表示
  got.forEach(letter => {
    const target = document.getElementById(letter);

    if (target) {
      target.innerHTML = `<img src="get-stamp.png" alt="GET">`;
    }
  });

  // QRで来たスタンプがまだならボタン表示
  if (button && prize && !got.includes(prize)) {

    button.style.display = "flex";

    button.addEventListener("click", () => {

      // 二重防止
      if (!got.includes(prize)) {
        got.push(prize);
        localStorage.setItem("got", JSON.stringify(got));
      }

      // 音
      stampSound.currentTime = 0;
      stampSound.play().catch(() => {});

      // スタンプ表示
      const target = document.getElementById(prize);
      if (target) {
        target.innerHTML = `<img src="get-stamp.png" alt="GET">`;
      }

      // バイブ
      if (navigator.vibrate) {
        navigator.vibrate(80);
      }

      button.style.display = "none";

      // コンプリート判定
      if (got.length === 9) {
        setTimeout(() => {
          location.href = "complete.html";
        }, 800);
      }

    });

  }

};
