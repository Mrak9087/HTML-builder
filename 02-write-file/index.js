const fs = require('fs');
const path = require('path');
const {stdin, stdout} = require('process');
const readln = require('readline');

const writeStream = fs.createWriteStream(path.join(__dirname,'text.txt'),{
    encoding:'utf8',
});
const rl = readln.createInterface({ input: stdin, output:  stdout});

stdout.write('Enter text. For close enter "exit" or press CTRL+C\n');

const closeScript = () =>{
    writeStream.end();
    rl.close();
    stdout.write('Goodbuy!');
}

rl.on('line', (data) =>{
    if (data === 'exit'){
        closeScript();
    } else {
        writeStream.write(`${data}\n`);
    }
})

rl.on('SIGINT', () => {
    closeScript();
});