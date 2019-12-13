const logRow = row => { console.log(row.join(', ')) }
const displayRows = rows => {
  rows.map(logRow)
}

module.exports = { displayRows }

