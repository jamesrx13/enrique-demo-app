class HandleFile {

    static callElementAction;
    static delimiter;
    static onReadFile = () => { };
    static processFile = [];

    constructor(callElementAction, delimiter, onReadFile = () => { }) {
        this.callElementAction = callElementAction
        this.delimiter = delimiter
        this.onReadFile = onReadFile
        this.init()
    }

    init() {
        const jQueryElement = $(this.callElementAction)

        jQueryElement.on('click', e => {
            e.preventDefault()

            const fileInput = document.createElement('input')
            fileInput.type = 'file'
            fileInput.accept = '.csv'

            fileInput.addEventListener('change', e => {
                this.readFile(e)
            })

            fileInput.click()

        })
    }

    parseCSV(text) {
        let lines = text.replace(/\r/g, '').split('\n');
        return lines.map(line => {
            let values = line.split(this.delimiter);
            return values;
        });
    }

    readFile(evt) {
        let file = evt.target.files[0];
        let reader = new FileReader();
        reader.onload = (e) => {
            let lines = this.parseCSV(e.target.result);
            this.processFile = this.reverseMatrix(lines);
            this.onReadFile(this.processFile)
        };
        reader.readAsBinaryString(file);
    }

    reverseMatrix(matrix) {
        let output = [];
        matrix.forEach((values, row) => {
            values.forEach((value, col) => {
                if (output[col] === undefined) output[col] = [];
                output[col][row] = value;
            });
        });
        return output;
    }

}

