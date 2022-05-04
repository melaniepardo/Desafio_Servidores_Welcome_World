// 7. Agrega la fecha actual al comienzo del contenido de cada archivo creado en formato
// “dd / mm / yyyy”. Considera que si el día o el mes es menor a 10 concatenar un “0” a la
// izquierda. (Opcional)

const date = new Date()
const [month, day, year] = [date.getMonth() + 1, date.getDate(), date.getFullYear()]

const daysAndMonthsChecker = () => {
    if (month < 10 && day < 10) {
        return (`0${day}-0${month}-${year}`)
    } else {
        return (`${day}-${month}-${year}`)
    }
}
module.exports = daysAndMonthsChecker