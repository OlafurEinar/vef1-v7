/**
 * Verkefni 7 – Reikniæfingarforrit
 *
 * Forrit sem æfir hraða í að reikna einföld dæmi
 */

// fasti sem segir til um hve marga leiki eigi að spila
const GAMES_TO_PLAY = 10;

/**
 * Birtir upplýsingar um leik og eftir að notandi samþykkir spilar fyrsta leik
 * með kalli í play().
 * Eftir leik er notanda boðið að spila annan leik, ef ekki hættir forrit.
 */
function start() {
  alert('Markmiðið er að svara eins mörgum af 10 dæmum rétt eins hratt og mögulegt er.');
  play();
}

/**
 * Birtir skilaboð um að hætt hafi verið í leik og kallar á annan()
 */
function quit() {
  alert('Hætt í leik');
  annan();
}

/**
 * Spyr hvort notandi vilji spila annan leik og kallar þá á play()
 * annars gerist ekkert.
 */
function annan() {
  if (confirm('Spila annan leik?')) {
    play();
  } else {
    return;
  }
}

/**
 * Spilar einn leik. Heldur utan um hvenær leikur byrjaði, hvenær endar og
 * fjölda réttra svara. Eftir leik eru birtar upplýsingar um niðurstöðu:
 *   Þú svaraðir X af 10 dæmum rétt á Y sekúndum
 *   Meðalrétt svör á sekúndu eru Z
 * Þar sem Y og Z hafa tvo aukastafi.
 *
 * Ef notandi ýtir á "Cancel" í leik eru skilaboðin "Hætt í leik." birt og engar
 * upplsýingar um niðurstöður.
 *
 */
function play() {
  let x = 0;
  let timeStart = new Date();

  for (let i = 0; i < GAMES_TO_PLAY; i++) {
    let ans = ask();
    if (ans === null) {
      quit();
      return;
    }
    else {
      x = x + ans;
    }
  }
  let timeEnd = new Date();
  let time = (timeEnd-timeStart)/1000;
  let avg = x/time;

  alert('Þú svaraðir '+x+' af 10 dæmum rétt á '+time.toFixed(2)+' sekúndum. \nMeðalrétt svör á sekúndu eru '+ avg.toFixed(2));

  annan();
}

/**
 * Spyr einnar spurningar og skilar upplýsingum um svar (mögulega með því að
 * nota true, false og null ef notandi hættir). Birtir notanda propmpt til að
 * svara í og túlkar svarið yfir í tölu.
 *
 * Mögulegar spurningar eru:
 * - `+` dæmi þar sem báðar tölur geta verið á bilinu `[1, 100]`
 * - `-` dæmi þar sem báðar tölur geta verið á bilinu `[1, 100]`
 * - `*` dæmi þar sem báðar tölur geta verið á bilinu `[1, 10]`
 * - `/` dæmi þar sem fyrri tala er á bilinu `[2, 10]` og seinni talan er fyrri
 *   talan sinnum tala á bilinu `[2, 10]` þ.a. svarið verði alltaf heiltala
 *
 * Sniðugt væri að færa það að búa til spurningu í nýtt fall sem ask() kallar í.

* Breyting nemanda: í '/' dæmum er fyrri talan margfeldi af seinni 

 */
function ask() {
  const op = ['+','-','*','/'];
  let x = 0;
  let y = 0;
  let z;
  const a = 10;
  const b = 100;

  let rand = randomNumber(0,3);

  if (rand < 1) {
    x = randomNumber(1,b);
    y = randomNumber(1,b);
    z = x+y;
  } else if (rand < 2) {
    x = randomNumber(1,b);
    y = randomNumber(1,b);
    z = x-y;
  } else if (rand < 3) {
    x = randomNumber(1,a);
    y = randomNumber(1,a);
    z = x*y;
  } else {
    y = randomNumber(2,a);
    x = y * randomNumber(2,a);
    z = x/y;
  }

  let result = prompt('Hvað er '+ x + ' '+ op[rand] + ' ' + y+'?');
  if (result  === null) {
    return null;
  }
  else if (Math.abs(z - parseInt(result,10)) < Number.EPSILON) {
    return 1;
  }
  else {
    return 0;
  }
}

/**
 * Skilar tölu af handahófi á bilinu [min, max]
 */
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Byrjar leik
start();