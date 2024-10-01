/*Variables pour l'indication du changement de phase*/
let workTittle = document.getElementById("work");
let breakTittle = document.getElementById("break");

/*Variables de Temps, pause, configuration*/
let minuteW = 25;
let secondeW = 0;
let minuteB = 5;
let secondeB = 0;
let minute = minuteW;
let seconde = secondeW;
let pause = true;
let configurationVisible = false;
let timerInterval;

/*Variable pour un son permettant une alerte sonore au moment des changements de phase*/
var sound = new Audio("son/PomodoSound.mp3");

/*Variables de Bouton */
let lancerBoutton = document.getElementById("start");
let resetBoutton = document.getElementById("reset");
let modifierBoutton = document.getElementById("settings");
let validerBoutton = document.getElementById("valider");

/*Événements lié au click sur les différents boutons*/
lancerBoutton.addEventListener("click", function () {
  if (!timerInterval) {
    sound.play();
    timerInterval = setInterval(timer, 1000);
  }
});

resetBoutton.addEventListener("click", function () {
  clearInterval(timerInterval);
  timerInterval = null;
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

    updateValues();
  }
});

validerBoutton.addEventListener("click", function () {
  updateValues();

  document.getElementById("minutes").innerHTML = afficheTimer(minute);
  document.getElementById("secondes").innerHTML = afficheTimer(seconde);

  document.getElementById("start").style.display = "block";
  document.getElementById("container").style.display = "flex";
  document.getElementById("configuration").style.display = "none";
  document.getElementById("box").style.display = "flex";
  document.getElementById("container").style.display = "block";
});

/*Fonction qui permet l'affichage formaté pour le timer*/
function afficheTimer(temps) {
  let chronoS = temps.toString();
  chronoS = chronoS.length < 2 ? "0" + chronoS : chronoS;
  return chronoS;
}

/*Fonction qui charge la page*/
document.addEventListener("DOMContentLoaded", () => {
  workTittle.classList.add("active");
  breakTittle.classList.remove("active");
  document.getElementById("reset").style.display = "none";
  document.getElementById("minutes").innerHTML = afficheTimer(minute);
  document.getElementById("secondes").innerHTML = afficheTimer(seconde);
  document.getElementById("configuration").style.display = "none";

  document.getElementById("minutesW").value = minuteW;
  document.getElementById("secondesW").value = secondeW;
  document.getElementById("minutesB").value = minuteB;
  document.getElementById("secondesB").value = secondeB;
});

/*Fonction pour mettre à jour les valeurs du minuteur*/
function updateValues() {
  minuteW = parseInt(document.getElementById("minutesW").value) || 25;
  secondeW = parseInt(document.getElementById("secondesW").value) || 0;
  minuteB = parseInt(document.getElementById("minutesB").value) || 5;
  secondeB = parseInt(document.getElementById("secondesB").value) || 0;

  if (pause) {
    minute = minuteW;
    seconde = secondeW;
  } else {
    minute = minuteB;
    seconde = secondeB;
  }
  document.getElementById("minutes").innerHTML = afficheTimer(minute);
  document.getElementById("secondes").innerHTML = afficheTimer(seconde);
}

/*Fonction Timer qui permet le décompte du temps, le changement de phase et l'apparition/disparition de certains boutons*/
function timer() {
  document.getElementById("start").style.display = "none";
  document.getElementById("reset").style.display = "block";

  if (seconde == 0 && minute != 0) {
    seconde = 59;
    minute -= 1;
  } else if (seconde > 0) {
    seconde -= 1;
  }

  document.getElementById("minutes").innerHTML = afficheTimer(minute);
  document.getElementById("secondes").innerHTML = afficheTimer(seconde);

  if (seconde == 0 && minute == 0) {
    sound.play();
    if (pause) {
      minute = minuteB;
      seconde = secondeB;
      workTittle.classList.remove("active");
      breakTittle.classList.add("active");
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
