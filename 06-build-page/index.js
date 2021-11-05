const path = require('path');
const {mkdir, rm, readdir, copyFile, readFile, writeFile} = require('fs/promises');


const templateReg = /{{[a-zA-X0-9]+}}/g;

const recreateDir = async (path) => {
    await rm(path,{force:true,recursive:true});
    await mkdir(path,{recursive:true});
}

const copyDir = async (srcDir, destDir) => {
    await recreateDir(destDir);

    const contentDir = await readdir(srcDir, {withFileTypes: true});

    for (let file of contentDir){
        if (file.isDirectory()){
            await copyDir(path.join(srcDir,file.name),path.join(destDir,file.name));
        } else {
            await copyFile(path.join(srcDir,file.name),path.join(destDir,file.name))
        }
    }
}

const buildCss = async (srcDir, destDir) => {
    const destFile = path.join(destDir,'style.css');

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

const buildHTML = async (srcTemplate, destDir) => {
    const destFile = path.join(destDir,'index.html');
    let data = await readFile(srcTemplate, {encoding: 'utf8'});
    let res = data.match(templateReg);    
    for (let item of res){
        let linkFile = path.join(__dirname,'components', `${item.slice(2,-2)}.html`);
        try {
            let temp = await readFile(linkFile, {encoding: 'utf8'});
            while (data.indexOf(item) > -1){
                data = data.replace(item, temp);
            }
            
        } catch{
            continue;
        }
    }
    await writeFile(destFile, data);
}


const buildProject = async () => {
    let destFolder = path.join(__dirname,'project-dist');
    await recreateDir(destFolder);
    await copyDir(path.join(__dirname,'assets'),path.join(destFolder,'assets'));
    await buildCss(path.join(__dirname,'styles'),destFolder);
    await buildHTML(path.join(__dirname,'template.html'),destFolder);
}

buildProject();
