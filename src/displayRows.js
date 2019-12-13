const logRow = row => { console.log(`${row[0]}, ${row[1]}, ${row[2]}`) }
const displayRows = rows => {
  rows.map(logRow)
}

module.exports = { displayRows }

