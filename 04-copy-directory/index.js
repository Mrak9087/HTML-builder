const path = require('path');
const {mkdir, rm, readdir, copyFile} = require('fs/promises');


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

copyDir(path.join(__dirname,'files'),path.join(__dirname,'files-copy'));