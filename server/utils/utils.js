const fs = require('fs');
const { exec } = require('child_process');

const extensions = {
    'python3': 'py',
    'javascript': 'js',
    'java': 'java',
    'c': 'c',
    'cpp': 'cpp'
}

exports.sendMessage = async (data) => {
    // make folder
    await fs.mkdir(`./temp/${data.folder}`, (err) => {
        if (err) {
            console.log(err)
        }
    })

    await fs.writeFile(`./temp/${data.folder}/src.${extensions[data.lang]}`, data.src, (err) => {
        if (err) {
            console.log(err)
        }
    })

    await fs.writeFile(`./temp/${data.folder}/input.txt`, data.input, (err) => {
        if (err) {
            console.log(err)
        }
    })

    await fs.writeFile(`./temp/${data.folder}/output.txt`, '', (err) => {
        if (err) {
            console.log(err)
        }
    })

    const command = `python3 ./server/utils/run.py ./temp/${data.folder}/src.${extensions[data.lang]} ${data.lang} ${data.timeOut}`
    exec(command, (err, stdout, stderr) => {
        if (err) {
            console.log(err)
        }

        console.log(stdout)
    })
}