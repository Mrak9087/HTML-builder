const path = require('path');
const fs = require('fs');
const readStream = fs.createReadStream(path.join(__dirname,'text.txt'),{
    encoding:'utf8',
});



readStream.on('readable', () => {

    let data;
    while (data = readStream.read()){
        console.log(data);
    }
    
});