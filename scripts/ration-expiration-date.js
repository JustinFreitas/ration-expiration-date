Hooks.on('preCreateItem', (document) => {
    if (document?.type === 'item'
        && (document?.name === 'Rations, standard'
            || document?.name === 'Rations, iron')) {
        const expirationDateValue = document.name.endsWith('standard') ? 6.048e+8 * 2 : 6.048e+8 * 4;
        const expirationDate = new Date(Date.now() + expirationDateValue);
        const updatedName = `${document.name} (${expirationDate.toLocaleDateString()})`;
        document.data.update({ name: updatedName });
    }
});
