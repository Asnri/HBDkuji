window.onload = () => {

  const stampSound = new Audio("stamp.mp3");

  const params = new URLSearchParams(window.location.search);
  const prize = params.get("prize");

  let got = JSON.parse(localStorage.getItem("got") || "[]");

  const button = document.getElementById("stampButton");

  console.log("target:", document.getElementById(prize));

  console.log("JS動いてる");
  console.log("prize:", prize);
  console.log("button:", button);

  // 保存済みスタンプ表示
  got.forEach(letter => {
    const target = document.getElementById(letter);

    if (target) {
      target.innerHTML = `<img src="get-stamp.png" alt="GET">`;
    }
  });

  // 新しいスタンプならボタン表示
  if (button && prize && !got.includes(prize)) {

    button.style.display = "flex";

    button.addEventListener("click", () => {

      if (!got.includes(prize)) {
        got.push(prize);
        localStorage.setItem("got", JSON.stringify(got));
      }

      const target = document.getElementById(prize);
      if (target) {
        target.innerHTML = `<img src="get-stamp.png" alt="GET">`;
      }

      stampSound.currentTime = 0;
      stampSound.play();

      if (navigator.vibrate) {
        navigator.vibrate(80);
      }

      button.style.display = "none";

      // コンプリート判定
      const totalStamps = 9;

      if (got.length === totalStamps) {
        setTimeout(() => {
          location.href = "complete.html";
        }, 800);
      }

    });
  }

};