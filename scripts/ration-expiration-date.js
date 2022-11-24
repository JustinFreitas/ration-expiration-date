const MODULE_NAME = "ration-expiration-date";
const IRON_RATIONS_ITEM_NAME = "ironRationsItemName";
const IRON_RATIONS_ITEM_NAME_DEFAULT = "Rations, iron";
const IRON_RATIONS_EXPIRE_DAYS = "ironRationsExpireDays";
const IRON_RATIONS_EXPIRE_DAYS_DEFAULT = 56;
const STANDARD_RATIONS_ITEM_NAME = "standardRationsItemName";
const STANDARD_RATIONS_ITEM_NAME_DEFAULT = "Rations, standard";
const STANDARD_RATIONS_EXPIRE_DAYS = "standardRationsExpireDays";
const STANDARD_RATIONS_EXPIRE_DAYS_DEFAULT = 14;

Hooks.on("init", function() {
    const world = "world";

    game.settings.register(MODULE_NAME, IRON_RATIONS_ITEM_NAME, {
        name: "Iron Rations Item Name",
        hint: "The item name for Iron Rations that will be used to match on inventory addition for expiration date stamping.",
        scope: world,
        config: true,
        type: String,
        default: IRON_RATIONS_ITEM_NAME_DEFAULT,
    });

    game.settings.register(MODULE_NAME, IRON_RATIONS_EXPIRE_DAYS, {
        name: "Iron Rations Expire Days",
        hint: "The number of days until iron rations expiration.",
        scope: world,
        config: true,
        type: Number,
        default: IRON_RATIONS_EXPIRE_DAYS_DEFAULT,
    });

    game.settings.register(MODULE_NAME, STANDARD_RATIONS_ITEM_NAME, {
        name: "Standard Rations Item Name",
        hint: "The item name for Standard Rations that will be used to match on inventory addition for expiration date stamping.",
        scope: world,
        config: true,
        type: String,
        default: STANDARD_RATIONS_ITEM_NAME_DEFAULT,
    });

    game.settings.register(MODULE_NAME, STANDARD_RATIONS_EXPIRE_DAYS, {
        name: "Standard Rations Expire Days",
        hint: "The number of days until standard rations expiration.",
        scope: world,
        config: true,
        type: Number,
        default: STANDARD_RATIONS_EXPIRE_DAYS_DEFAULT,
    });
});

Hooks.on("preCreateItem", (document) => {
    const ironRationsItemName = game.settings.get(MODULE_NAME, IRON_RATIONS_ITEM_NAME) || IRON_RATIONS_ITEM_NAME_DEFAULT;
    const standardRationsItemName = game.settings.get(MODULE_NAME, STANDARD_RATIONS_ITEM_NAME) || STANDARD_RATIONS_ITEM_NAME_DEFAULT;

    if (document?.ownership
        && Object.keys(document.ownership).length > 1
        && (document?.name === ironRationsItemName
            || document?.name === standardRationsItemName)) {
        const day = 8.64e+7;
        const ironRationsExpireDays = game.settings.get(MODULE_NAME, IRON_RATIONS_EXPIRE_DAYS) || IRON_RATIONS_EXPIRE_DAYS_DEFAULT;
        const standardRationsExpireDays = game.settings.get(MODULE_NAME, STANDARD_RATIONS_EXPIRE_DAYS) || STANDARD_RATIONS_EXPIRE_DAYS_DEFAULT;
        const expirationDateValue = document.name === standardRationsItemName
                                        ? day * standardRationsExpireDays
                                        : day * ironRationsExpireDays;
        const expirationDate = new Date(Date.now() + expirationDateValue);
        const updatedName = `${document.name} (${expirationDate.toLocaleDateString()})`;
        document.data.update({ name: updatedName });
    }
});
