/*Variables pour l'indication du changelent de phase*/
let workTittle = document.getElementById("work");
let breakTittle = document.getElementById("break");

/*Variables de Temps, pause, configuration*/
let minuteW = parseInt(document.getElementById("minutesW").value) || 25;
let secondeW = parseInt(document.getElementById("secondesW").value) || 0;
let minuteB = parseInt(document.getElementById("minutesB").value) || 5;
let secondeB = parseInt(document.getElementById("secondesB").value) || 0;
let minute = minuteW;
let seconde = secondeW;
let pause = true;
let configurationVisible = false;

/*Variable pour un son permettant une alerte sonore au moment des chagement de phase*/
var sound = new Audio("son/PomodoSound.mp3");
/*Variables de Bouton */
let lancerBoutton = document.getElementById("start");
let resetBoutton = document.getElementById("reset");
let modifierBoutton = document.getElementById("settings");

/*Évenements lié au click sur les différent bouttons*/
lancerBoutton.addEventListener("click", function () {
  sound.play();
  minute = minuteW;
  seconde = secondeW;
  setInterval(timer, 10);
});

resetBoutton.addEventListener("click", function () {
  location.reload();
});

modifierBoutton.addEventListener("click", function () {
  configurationVisible = !configurationVisible;

  if (configurationVisible) {
    document.getElementById("start").style.display = "none";
    document.getElementById("container").style.display = "none";
    document.getElementById("reset").style.display = "none";
    document.getElementById("configuration").style.display = "block";
    document.getElementById("box").style.display = "none";
  } else {
    document.getElementById("start").style.display = "block";
    document.getElementById("container").style.display = "flex";
    document.getElementById("configuration").style.display = "none";
    document.getElementById("box").style.display = "flex";
    document.getElementById("container").style.display = "block";
  }
});

/*Fonction qui permet m'affichage formater pour le timer */
function afficheTimer(temps) {
  let chronoS = temps.toString();
  chronoS = chronoS.length < 2 ? "0" + chronoS : chronoS;
  return chronoS;
}

/*Fonctio onload qui charge al page */
window.onload = () => {
  workTittle.classList.add("active");
  breakTittle.classList.remove("active");
  document.getElementById("reset").style.display = "none";
  document.getElementById("minutes").innerHTML = afficheTimer(minute);
  document.getElementById("secondes").innerHTML = afficheTimer(seconde);
  document.getElementById("configuration").style.display = "none";
};

/*Fonction Timer qui permet le decompte du temps, la changement de phase et l'apparition/disparition de certains boutton*/
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
      sound.play();
      workTittle.classList.remove("active");
      breakTittle.classList.add("active");
      document.getElementById("minutes").innerHTML = afficheTimer(minuteB);
      document.getElementById("secondes").innerHTML = afficheTimer(secondeB);
      pause = false;
    } else {
      minute = minuteW;
      seconde = secondeW + 1;
      sound.play();
      workTittle.classList.add("active");
      breakTittle.classList.remove("active");
      pause = true;
    }
  }
}
