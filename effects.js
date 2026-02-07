/* ===============================
   TYPEWRITER EFFECT (SMOOTH)
================================ */
function typeText(el, speed = 45){
  const text = el.innerText;
  el.innerText = "";
  let i = 0;

  el.style.opacity = 1;
  const timer = setInterval(() => {
    el.innerText += text.charAt(i);
    i++;
    if(i >= text.length){
      clearInterval(timer);
    }
  }, speed);
}

document.addEventListener("DOMContentLoaded", ()=>{
  document.querySelectorAll('.type').forEach(el=>{
    el.style.opacity = 0;
    setTimeout(()=>typeText(el), 300);
  });
});

/* ===============================
   LOCK SYSTEM (SAFE & STABLE)
================================ */
let input = [];
const correct = "123456";

/* กดตัวเลข */
function press(n){
  if(input.length >= 6) return;

  input.push(n);

  const dots = document.querySelectorAll('.pin div');
  if(dots[input.length - 1]){
    dots[input.length - 1].style.background = "#ff5fa2";
  }

  if(navigator.vibrate){
    navigator.vibrate(20);
  }
}

/* ยืนยันรหัส */
function confirmPin(){
  if(input.join("") === correct){
    unlockSuccess();
  }else{
    unlockError();
  }
}

/* ===============================
   SUCCESS
================================ */
function unlockSuccess(){
  showPopup(
    "ถูกต้องนะ 💖",
    "กำลังพาเธอไปหน้าเมนู…",
    true
  );

  setTimeout(()=>{
    location.href = "menu.html";
  }, 1500);
}

/* ===============================
   ERROR
================================ */
function unlockError(){
  const card = document.querySelector('.card');
  if(card){
    card.classList.add('shake');
    setTimeout(()=>card.classList.remove('shake'), 400);
  }

  showPopup(
    "ยังไม่ใช่น้า 🥺",
    "ลองคิดดี ๆ อีกครั้งนะ เธอจะลืมจริงหรอคนเก่ง",
    false
  );

  resetPin();

  if(navigator.vibrate){
    navigator.vibrate([50,30,50]);
  }
}

/* ===============================
   RESET PIN
================================ */
function resetPin(){
  input = [];
  document.querySelectorAll('.pin div').forEach(d=>{
    d.style.background = "#fff";
  });
}

/* ===============================
   POPUP GUI (ONE SYSTEM)
================================ */
function showPopup(title, text, success){
  let popup = document.getElementById("popup");

  if(!popup){
    popup = document.createElement("div");
    popup.id = "popup";
    popup.className = "popup-lock";
    popup.innerHTML = `
      <div class="popup-box">
        <h2></h2>
        <p></p>
        <button class="btn" onclick="closePopup()">โอเค</button>
      </div>
    `;
    document.body.appendChild(popup);
  }

  const box = popup.querySelector(".popup-box");
  popup.querySelector("h2").innerText = title;
  popup.querySelector("p").innerText = text;

  box.classList.toggle("success", success);
  popup.style.display = "flex";
}

function closePopup(){
  const popup = document.getElementById("popup");
  if(popup) popup.style.display = "none";
}

/* ===============================
   CARD PARALLAX (SAFE)
================================ */
document.addEventListener("mousemove", e=>{
  const card = document.querySelector(".card");
  if(!card) return;

  const x = (window.innerWidth / 2 - e.clientX) / 30;
  const y = (window.innerHeight / 2 - e.clientY) / 30;

  card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
});
heart.addEventListener("pointerdown", e=>{
  e.preventDefault();   // ⭐ ตัวนี้สำคัญมาก
  hold = true;
});



