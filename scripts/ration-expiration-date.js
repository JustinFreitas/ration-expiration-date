Hooks.on('preCreateItem', (document) => {
    if (document?.type === 'item'
        && (document?.name === 'Rations, standard'
            || document?.name === 'Rations, iron')) {
        const week = 6.048e+8;
        const expirationDateValue = document.name.endsWith('standard') ? week * 2 : week * 4;
        const expirationDate = new Date(Date.now() + expirationDateValue);
        const updatedName = `${document.name} (${expirationDate.toLocaleDateString()})`;
        document.data.update({ name: updatedName });
    }
});
