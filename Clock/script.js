
const hourHand = document.querySelector('[data-hand-hour]');
const minuteHand = document.querySelector('[data-hand-minute]');
const secondHand = document.querySelector('[data-hand-second]');

function clockSetup() {
    const date = new Date();

    const secondRatio = date.getSeconds() / 60;
    const minuteRatio = (secondRatio + date.getMinutes()) / 60;
    const hourRatio = (minuteRatio + date.getHours()) / 12;

    setRotation(hourHand, hourRatio);
    setRotation(minuteHand, minuteRatio);
    setRotation(secondHand, secondRatio);

}

setRotation = (elt, rotationRatio) => {
    elt.style.setProperty('--rotation', rotationRatio * 360);
}

clockSetup();
setInterval(clockSetup, 1000);
