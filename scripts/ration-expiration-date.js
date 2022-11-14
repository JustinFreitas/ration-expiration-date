Hooks.on('init', function() {
    const moduleName = 'ration-expiration-date';
    const world = 'world';

    game.settings.register(moduleName, 'ironRationsItemName', {
        name: 'Iron Rations Item Name',
        hint: 'The item name for Iron Rations that will be used to match on inventory addition for expiration date stamping.',
        scope: world,     // "world" = sync to db, "client" = local storage
        config: true,       // false if you dont want it to show in module config
        type: String,       // Number, Boolean, String, Object
        default: 'Rations, iron',
        onChange: value => { // value is the new value of the setting
          console.log(value);
        },
    });

    game.settings.register(moduleName, 'ironRationsExpireDays', {
        name: 'Iron Rations Expire Days',
        hint: 'The number of days until iron rations expiration.',
        scope: world,
        config: true,
        type: Number,
        default: 56,
        onChange: value => {
          console.log(value);
        },
    });

    game.settings.register(moduleName, 'standardRationsItemName', {
        name: 'Standard Rations Item Name',
        hint: 'The item name for Standard Rations that will be used to match on inventory addition for expiration date stamping.',
        scope: world,
        config: true,
        type: String,
        default: 'Rations, standard',
        onChange: value => {
          console.log(value);
        },
    });
      
    game.settings.register(moduleName, 'standardRationsExpireDays', {
        name: 'Standard Rations Expire Days',
        hint: 'The number of days until standard rations expiration.',
        scope: world,
        config: true,
        type: Number,
        default: 14,
        onChange: value => {
          console.log(value);
        },
    });
});
  
Hooks.on('preCreateItem', (document) => {
    const moduleName = 'ration-expiration-date';
    const ironRationsItemName = game.settings.get(moduleName, 'ironRationsItemName') || 'Rations, iron';
    const standardRationsItemName = game.settings.get(moduleName, 'standardRationsItemName') || 'Rations, standard';

    if (document?.ownership
        && Object.keys(document.ownership).length > 1
        && (document?.name === ironRationsItemName
            || document?.name === standardRationsItemName)) {
        const day = 8.64e+7;
        const ironRationsExpireDays = game.settings.get(moduleName, 'ironRationsExpireDays') || 56;
        const standardRationsExpireDays = game.settings.get(moduleName, 'standardRationsExpireDays') || 14;
        const expirationDateValue = document.name === standardRationsItemName
                                        ? day * standardRationsExpireDays
                                        : day * ironRationsExpireDays;
        const expirationDate = new Date(Date.now() + expirationDateValue);
        const updatedName = `${document.name} (${expirationDate.toLocaleDateString()})`;
        document.data.update({ name: updatedName });
    }
});
