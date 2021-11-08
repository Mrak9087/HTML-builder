const {readFile, writeFile, readdir} = require('fs/promises');
const path = require('path');

const buildCss = async (srcDir, destDir) => {
    const destFile = path.join(destDir,'bundle.css');

    const cssFiles = await readdir(srcDir,{withFileTypes: true});
    let data = '';
    for (let file of cssFiles){
        if (file.isFile()){
            if (path.extname(file.name).slice(1) === 'css'){
                data += await readFile(path.join(srcDir,file.name));
                data += '\n';
            }
        }
    }
    await writeFile(destFile, data.slice(0,-1));
}

buildCss(path.join(__dirname,'styles'),path.join(__dirname,'project-dist'));