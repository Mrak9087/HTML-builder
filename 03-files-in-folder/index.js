const { readdir,stat } = require('fs/promises');
const path = require('path');
const fs = require('fs');

const  showFilesInformation = async (pathDir) => {
    
    try {
        const files = await readdir(pathDir,{withFileTypes: true});
        for (const file of files){
            if (file.isDirectory()){
                await showFilesInformation(path.join(pathDir,file.name))
            }else{
                const fileInfo = await stat(path.join(pathDir,file.name));
                const ext = path.extname(file.name);
                const flName = path.basename(file.name,ext);
                const fileSize = fileInfo.size;
                console.log(`${flName} - ${ext.slice(1)} - ${fileSize}b`);
            }
            
        }
    } catch (err) {
        console.error(err);
    }
}


const pathDir = path.join(__dirname,'secret-folder');

showFilesInformation(pathDir);


