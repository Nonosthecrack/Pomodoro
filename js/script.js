let workTittle = document.getElementById("work");
let breakTittle = document.getElementById("break");

let minuteW = parseInt(document.getElementById("minutesW").value) || 25;
let secondeW = parseInt(document.getElementById("secondesW").value) || 0;
let minuteB = parseInt(document.getElementById("minutesB").value) || 5;
let secondeB = parseInt(document.getElementById("secondesB").value) || 0;
let minute = minuteW;
let seconde = secondeW;
let pause = true;
let configurationVisible = false;
let id;

let lancerBoutton = document.getElementById("start");
let resetBoutton = document.getElementById("reset");
let modifierBoutton = document.getElementById("settings");

lancerBoutton.addEventListener("click", function () {
  minute = minuteW;
  seconde = secondeW;
  id = setInterval(timer, 1000);
});

resetBoutton.addEventListener("click", function () {
  location.reload();
});

modifierBoutton.addEventListener("click", function () {
  configurationVisible = !configurationVisible;

  if (configurationVisible) {
    document.getElementById("start").style.display = "none";
    document.getElementById("container").style.display = "none";
    document.getElementById("configuration").style.display = "block";
    document.getElementById("box").style.display = "none";
  } else {
    document.getElementById("start").style.display = "block";
    document.getElementById("container").style.display = "flex";
    document.getElementById("configuration").style.display = "none";
    document.getElementById("box").style.display = "flex";
  }
});

function afficheTimer(temps) {
  let chronoS = temps.toString();
  chronoS = chronoS.length < 2 ? "0" + chronoS : chronoS;
  return chronoS;
}

window.onload = () => {
  document.getElementById("reset").style.display = "none";
  document.getElementById("minutes").innerHTML = afficheTimer(minute);
  document.getElementById("secondes").innerHTML = afficheTimer(seconde);
  document.getElementById("configuration").style.display = "none";
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
      seconde = secondeW + 1;
      workTittle.classList.add("active");
      breakTittle.classList.remove("active");
      pause = true;
    }
  }
}
