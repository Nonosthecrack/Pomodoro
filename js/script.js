let workTittle = document.getElementById("work");
let breakTittle = document.getElementById("break");

let minute = 0;
let seconde = 10;

let minuteW = 0;
let secondeW = 10;

let minuteB = 0;
let secondeB = 5;

let pause = true;

let id;

//variable qui stock l'id boutton lancer
let lancerBoutton = document.getElementById("start");
let resetBoutton = document.getElementById("reset");

//lance la fonction decompte quand le bouton est cliqué
lancerBoutton.addEventListener("click", lancerDecompte);
resetBoutton.addEventListener("click", reset);

//fonction qui permetra l'affichage du temps
function afficheTimer(temps) {
  let chronoS = temps.toString();
  chronoS = chronoS.length < 2 ? "0" + chronoS : chronoS;
  return chronoS;
}

//on affiche le temps et le bouton reset n'apparait pas
window.onload = () => {
  document.getElementById("reset").style.display = "none";
  document.getElementById("minutes").innerHTML = afficheTimer(minute);
  document.getElementById("secondes").innerHTML = afficheTimer(seconde);
};

function timer() {
  document.getElementById("start").style.display = "none";
  document.getElementById("reset").style.display = "block";

  if (seconde == 0 && minute != 0) {
    seconde = 59;
    minute -= 1;
  } else {
    seconde -= 1;
  }
  document.getElementById("minutes").innerHTML = afficheTimer(minute);
  document.getElementById("secondes").innerHTML = afficheTimer(seconde);
  if (seconde == 0 && minute == 0) {
    if (pause) {
      minute = minuteB;
      seconde = secondeB;
      workTittle.classList.remove("active");
      breakTittle.classList.add("active");
      document.getElementById("minutes").innerHTML = afficheTimer(minuteB);
      document.getElementById("secondes").innerHTML = afficheTimer(secondeB);
      pause = false;
    } else {
      minute = minuteW;
      seconde = secondeW;
      workTittle.classList.add("active");
      breakTittle.classList.remove("active");
      pause = true;
    }
  }
}

function lancerDecompte() {
  minute = minuteW;
  seconde = secondeW;
  id = setInterval(timer, 1000);
}

function arretDecompte() {
  clearInterval(id);
  minute = minuteW;
  seconde = secondeW;
  document.getElementById("minutes").innerHTML = afficheTimer(minute);
  document.getElementById("secondes").innerHTML = afficheTimer(seconde);
}

function reset() {
  location.reload();
}
