console.log("Hello World! This code runs immediately when the file is loaded.");

Hooks.on("init", function() {
  console.log("This code runs once the Foundry VTT software begins its initialization workflow.");
});

Hooks.on("ready", function() {
  console.log("This code runs once core initialization is ready and game data is available.");
});

Hooks.on("preCreateItem", (doc, createData, options, user) => {
    if ( !foundry.utils.hasProperty(createData, "system.proficient") ) doc.updateSource({"system.proficient": true});
});

Hooks.on("preCreateItem", (doc, createData, options, user) => {
    console.log(doc, createData, options, user);    
});

Hooks.on('createItem', (document, options, userId) => {
    console.log(document.data.data);
});
  
Hooks.on('createItem', (document) => {
    if (document
        && document.type === 'item'
        && (document.name === 'Rations, standard'
            || document.name === 'Rations, iron')) {
        const expirationDateValue = document.name.endsWith('standard') ? 6.048e+8 * 2 : 6.048e+8 * 4;
        const expirationDate = new Date(Date.now() + expirationDateValue);
        document.name = `${document.name} (${expirationDate.toLocaleDateString()})`;
        document._source.name = document.name; // Required to maintain name when new items are dropped in.
    }
});

Hooks.on('updateItem', (oseItem, item, options, user) => {
    console.log(oseItem);
    console.log(item);
});

// CONFIG.debug.hooks = true;