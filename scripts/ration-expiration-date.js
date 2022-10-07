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
