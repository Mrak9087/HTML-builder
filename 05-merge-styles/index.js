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
            }
        }
    }
    await writeFile(destFile, data);
}

buildCss(path.join(__dirname,'styles'),path.join(__dirname,'project-dist'));