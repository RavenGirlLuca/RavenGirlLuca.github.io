async function loadMod(file) {
    let cleanName = file.name.substring(0, file.name.lastIndexOf('.'));
    console.log(cleanName, file);

    if (file.type === "image") {
        addLookupTable(imageLookupTable, cleanName, file);
    }

    else if(file.subtype === "ogg" || file.subtype === "wav" || file.subtype === "mp3" ) {
        addLookupTable(musicLookupTable, cleanName, file);
    }

    else if(file.subtype === "json") {
        let jsonFile = file.data;
        
        jsonArray.push(jsonFile);
        console.log(jsonArray);
    }
}