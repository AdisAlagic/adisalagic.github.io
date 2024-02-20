let timer;
// Определяем константы для преобразования времени
const msPerSecond = 1000;
const msPerMinute = 60 * msPerSecond;
const msPerHour = 60 * msPerMinute;
const msPerDay = 24 * msPerHour;
const msPerYear = 365 * msPerDay;
const start = new Date()
start.setFullYear(2001, 2,2)
start.setHours(18, 0, 0)
document.addEventListener("DOMContentLoaded", ev => {
    timer = document.getElementById("text")
    setInterval(() => {
        const end = Date.now()
        timer.innerText = objAsString(convertMilliseconds(end - start))
    }, 1)
})

/**
 *
 * @param ms {Number}
 */
function convertMilliseconds(ms) {

    // Вычисляем годы, дни, часы, минуты, секунды и миллисекунды
    let years = Math.floor(ms / msPerYear);
    ms = ms % msPerYear;

    let days = Math.floor(ms / msPerDay);
    ms = ms % msPerDay;

    let hours = Math.floor(ms / msPerHour);
    ms = ms % msPerHour;

    let minutes = Math.floor(ms / msPerMinute);
    ms = ms % msPerMinute;

    let seconds = Math.floor(ms / msPerSecond);
    let milliseconds = ms % msPerSecond;

    // Возвращаем объект с преобразованным временем
    return {
        years: years,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        milliseconds: milliseconds
    };
}

/**
 *
 * @param number {String}
 * @param isMillis {Boolean}
 */
function normalize(number, isMillis = false) {
    let str = number + ""
    const num = Number.parseInt(number)
    if (num < 100 && num > 10 && isMillis) {
        str = `0${number}`
    }
    if (num < 10 && isMillis) {
        str = `00${number}`
    }
    if (num < 10) {
        str = `0${number}`
    }
    return str
}

/**
 *
 * @param number {Number}
 * @param list {Array<String>}
 */
function pron(number, list) {
    let currentYear;
    const last = number % 10
    if (last === 1) {
        currentYear = `${number} ${list.at(0)}`
    } else if (last > 1 && last < 5) {
        currentYear = `${number} ${list.at(1)}`
    } else if (last > 4 || last === 0) {
        currentYear = `${number} ${list.at(2)}`
    } else if (number < 20 && number > 9) {
        currentYear = `${number} ${list.at(2)}`
    }
    return currentYear
}

function objAsString(obj) {
    const currentYear = pron(obj.years, ["год", "года", "лет"])
    const currentDay = pron(obj.days, ["день", "дня", "дней"])
    const currentHour = pron(obj.hours, ["час", "часа", "часов"])
    const currentMinute = normalize(pron(obj.minutes, ["минуту", "минуты", "минут"]))
    const currentSecond = normalize(pron(obj.seconds, ["секунду", "секунды", "секунд"]))
    const currentMillis = normalize(pron(obj.milliseconds, ["миллисекунд", "миллисекунд", "миллисекунд"]), true)
    return `Без секса уже\n${currentYear} ${currentDay} ${currentHour} ${currentMinute}\n${currentSecond} ${currentMillis}`
}