/// <reference path="./handleFile.js"/>
/// <reference path="../vendor/js/papaparse.js"/>

document.addEventListener('DOMContentLoaded', () => {

    const table = document.querySelector("table")
    const jQueryTable = $(table)

    jQueryTable.hide()

    Papa.parse('../data/CICL0002.csv', {
        download: true,
        skipEmptyLines: true,
        complete: (csv) => {

            let isFirst = true

            csv.data.forEach(row => {

                let rowToInsert = ''

                row.forEach(col => {
                    if (isFirst) {
                        jQueryTable.find('[head-elements]').append(`<th scope="col">${col}</th>`)
                    } else {

                        rowToInsert += `<td>${col}</td>`
                    }
                })

                if (!isFirst) {
                    jQueryTable.find('tbody').append(`<tr>${rowToInsert}</tr>`)
                }

                isFirst = false
            })

            $('.dots-container').hide()
            jQueryTable.show()

            jQueryTable.dataTable()


        }
    })


})