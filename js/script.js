let workTitle = document.getElementById("work");
let breackTittle = document.getElementById("break");

let minute = 25;
let seconde = 0;

let minuteW = 25;
let secondeW = 0;

let minuteB = 5;
let secondeB = 0;

function afficheTimer(temps) {
  let chronoS = temps.toString();
  chronoS = chronoS.length < 2 ? "0" + chronoS : chronoS;
  return chronoS;
}

window.onload = () => {
  document.getElementById("minutes").innerHTML = afficheTimer(work);
  document.getElementById("secondes").innerHTML = afficheTimer(secondes);
};

function start() {
  document.getElementById("start").style.display = "none";
  document.getElementById("reset").style.display = "block";

  secondes = 59;

  let workM = work - 1;
  let breakM = pause - 1;

  breakCount = false;

  let fonctionDecompte = () => {
    document.getElementById("minutes").innerHTML = afficheTimer(workM);
    document.getElementById("secondes").innerHTML = afficheTimer(secondes);

    secondes = secondes - 1;

    if (secondes === 0) {
      workM = workM - 1;

      if (workM === -1) {
        if (!breakCount) {
          workM = breakM;
          breakCount = true;
        } else {
          workM = work - 1;
          breakCount = false;
        }
      }
      secondes = 59;
    }
  };

  setInterval(afficheTimer, 1000);
}

function reset() {
  location.reload();
}
