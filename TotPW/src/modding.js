async function loadMod(file) {
  //Sorts loaded files for mods into their designated arrays
  let cleanName = file.name.substring(0, file.name.lastIndexOf('.'));

  if (file.type === "image") {
    addLookupTable(imageLookupTable, cleanName, file);
  }

  else if(file.subtype === "ogg" || file.subtype === "wav" || file.subtype === "mp3" ) {
    addLookupTable(musicLookupTable, cleanName, file);
  }

  else if(file.subtype === "json") {
    let jsonFile = file.data;
        
    jsonArray.push(jsonFile);
  }
}

async function loadDatabaseManifest(fileName,index) {
  let fileExtention = fileName.substring(fileName.indexOf('.') + 1);
  let cleanName = fileName.substring(0, fileName.lastIndexOf('.'));
  let file;
    
  if (fileExtention === "png" || fileExtention === "jpg" || fileExtention === "jpeg" || fileExtention === "gif" ) {
    file = await loadImage(modDatabaseURL + "/mods/" + modDatabaseIndexFile[index].id + "/src/" + fileName);
    addLookupTable(imageLookupTable, cleanName, file);
  }

  else if(fileExtention === "ogg" || fileExtention === "wav" || fileExtention === "mp3" ) {
    file = await loadSound(modDatabaseURL + "/mods/" + modDatabaseIndexFile[index].id + "/src/" + fileName);
    addLookupTable(musicLookupTable, cleanName, file);
  }

  else if(fileExtention === "json") {
    file = await loadJSON(modDatabaseURL + "/mods/" + modDatabaseIndexFile[index].id + "/src/" + fileName);
    jsonArray.push(file);
  }
}

async function fetchDatabaseMod(index) {
  let currentManifest = await loadJSON(modDatabaseURL + "/mods/" + modDatabaseIndexFile[index].id + "/manifest.json")
    
  for (let i = 0; i < currentManifest.length; i++) {
    await loadDatabaseManifest(currentManifest[i],index);
  }
}