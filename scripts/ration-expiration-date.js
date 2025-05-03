const DAY = 8.64e+7;
const MODULE_NAME = "ration-expiration-date";
const FRESH_FOOD_RATIONS_ITEM_NAME = "freshFoodRationsItemName";
const FRESH_FOOD_RATIONS_ITEM_NAME_DEFAULT = "Rations, Fresh Food";
const FRESH_FOOD_RATIONS_EXPIRE_DAYS = "freshFoodRationsExpireDays";
const FRESH_FOOD_RATIONS_EXPIRE_DAYS_DEFAULT = 28;
const IRON_RATIONS_ITEM_NAME = "ironRationsItemName";
const IRON_RATIONS_ITEM_NAME_DEFAULT = "Rations, Iron";
const IRON_RATIONS_EXPIRE_DAYS = "ironRationsExpireDays";
const IRON_RATIONS_EXPIRE_DAYS_DEFAULT = 56;
const JSON_ARRAY_OF_ITEM_AND_DAY_TUPLES = "jsonArrayOfItemAndDayTuples";
const PRESERVED_MEAT_RATIONS_ITEM_NAME = "preservedMeatRationsItemName";
const PRESERVED_MEAT_RATIONS_ITEM_NAME_DEFAULT = "Rations, Preserved Meat";
const PRESERVED_MEAT_RATIONS_EXPIRE_DAYS = "preservedMeatRationsExpireDays";
const PRESERVED_MEAT_RATIONS_EXPIRE_DAYS_DEFAULT = 28;
const STANDARD_RATIONS_ITEM_NAME = "standardRationsItemName";
const STANDARD_RATIONS_ITEM_NAME_DEFAULT = "Rations, Standard";
const STANDARD_RATIONS_EXPIRE_DAYS = "standardRationsExpireDays";
const STANDARD_RATIONS_EXPIRE_DAYS_DEFAULT = 14;
const USE_SIMPLE_CALENDAR = "useSimpleCalendar";

Hooks.on("init", function() {
    const world = "world";

    game.settings.register(MODULE_NAME, IRON_RATIONS_ITEM_NAME, {
        name: "Iron Rations Item Name",
        hint: "The item name for Iron Rations that will be used to match on inventory addition for expiration date stamping.",
        scope: world,
        config: true,
        type: String,
        default: IRON_RATIONS_ITEM_NAME_DEFAULT
    });

    game.settings.register(MODULE_NAME, IRON_RATIONS_EXPIRE_DAYS, {
        name: "Iron Rations Expire Days",
        hint: "The number of days until iron rations expiration.",
        scope: world,
        config: true,
        type: Number,
        default: IRON_RATIONS_EXPIRE_DAYS_DEFAULT
    });

    game.settings.register(MODULE_NAME, STANDARD_RATIONS_ITEM_NAME, {
        name: "Standard Rations Item Name",
        hint: "The item name for Standard Rations that will be used to match on inventory addition for expiration date stamping.",
        scope: world,
        config: true,
        type: String,
        default: STANDARD_RATIONS_ITEM_NAME_DEFAULT
    });

    game.settings.register(MODULE_NAME, STANDARD_RATIONS_EXPIRE_DAYS, {
        name: "Standard Rations Expire Days",
        hint: "The number of days until standard rations expiration.",
        scope: world,
        config: true,
        type: Number,
        default: STANDARD_RATIONS_EXPIRE_DAYS_DEFAULT
    });

    game.settings.register(MODULE_NAME, FRESH_FOOD_RATIONS_ITEM_NAME, {
        name: "Fresh Food Rations Item Name",
        hint: "The item name for Fresh Food Rations that will be used to match on inventory addition for expiration date stamping.",
        scope: world,
        config: true,
        type: String,
        default: FRESH_FOOD_RATIONS_ITEM_NAME_DEFAULT
    });

    game.settings.register(MODULE_NAME, FRESH_FOOD_RATIONS_EXPIRE_DAYS, {
        name: "Fresh Food Rations Expire Days",
        hint: "The number of days until fresh food rations expiration.",
        scope: world,
        config: true,
        type: Number,
        default: FRESH_FOOD_RATIONS_EXPIRE_DAYS_DEFAULT
    });

    game.settings.register(MODULE_NAME, PRESERVED_MEAT_RATIONS_ITEM_NAME, {
        name: "Preserved Meat Rations Item Name",
        hint: "The item name for Preserved Meat Rations that will be used to match on inventory addition for expiration date stamping.",
        scope: world,
        config: true,
        type: String,
        default: PRESERVED_MEAT_RATIONS_ITEM_NAME_DEFAULT
    });

    game.settings.register(MODULE_NAME, PRESERVED_MEAT_RATIONS_EXPIRE_DAYS, {
        name: "Preserved Meat Rations Expire Days",
        hint: "The number of days until preserved meat rations expiration.",
        scope: world,
        config: true,
        type: Number,
        default: PRESERVED_MEAT_RATIONS_EXPIRE_DAYS_DEFAULT
    });

    game.settings.register(MODULE_NAME, JSON_ARRAY_OF_ITEM_AND_DAY_TUPLES, {
        name: "JSON Array of Item and Day Tuples",
        hint: "A way to supply more item/expiration-day combos beyond the hardcoded two above. Ex: [[\"Rations, ripe\", 2], [\"Rations, preserved\", 365]]",
        scope: world,
        config: true,
        type: String,
        default: ""
    });

    game.settings.register(MODULE_NAME, USE_SIMPLE_CALENDAR, {
		name: "Use SimpleCalendar",
		hint: "Uses the SimpleCalendar instead of the real world calendar if that module is installed and active in the world.",
		scope: world,
		config: true,
		type: Boolean,
		default: false
	});
});

Hooks.on("preCreateItem", (document) => {
    const ironRationsItemName = game.settings.get(MODULE_NAME, IRON_RATIONS_ITEM_NAME);
    const standardRationsItemName = game.settings.get(MODULE_NAME, STANDARD_RATIONS_ITEM_NAME);
    const freshFoodRationsItemName = game.settings.get(MODULE_NAME, FRESH_FOOD_RATIONS_ITEM_NAME);
    const preservedMeatRationsItemName = game.settings.get(MODULE_NAME, PRESERVED_MEAT_RATIONS_ITEM_NAME);
    const ironRationsExpireDays = game.settings.get(MODULE_NAME, IRON_RATIONS_EXPIRE_DAYS);
    const standardRationsExpireDays = game.settings.get(MODULE_NAME, STANDARD_RATIONS_EXPIRE_DAYS);
    const freshFoodRationsExpireDays = game.settings.get(MODULE_NAME, FRESH_FOOD_RATIONS_EXPIRE_DAYS);
    const preservedMeatRationsExpireDays = game.settings.get(MODULE_NAME, PRESERVED_MEAT_RATIONS_EXPIRE_DAYS);
    const itemAndDayTuples = [
        [ironRationsItemName, ironRationsExpireDays],
        [standardRationsItemName, standardRationsExpireDays],
        [freshFoodRationsItemName, freshFoodRationsExpireDays],
        [preservedMeatRationsItemName, preservedMeatRationsExpireDays]
    ];

    const additionalItemsSettingValue = game.settings.get(MODULE_NAME, JSON_ARRAY_OF_ITEM_AND_DAY_TUPLES).toString();
    let additionalItems = null;
    try {
        if (additionalItemsSettingValue) {
            additionalItems = JSON.parse(additionalItemsSettingValue);
        }
    } catch (err) {
        console.log(`Error parsing the item/days tuple array for ${MODULE_NAME}.`);
    }

    if (Array.isArray(additionalItems)) {
        itemAndDayTuples.push(...additionalItems);
    }

    if (document?.ownership
        && Object.keys(document.ownership).length > 1) {
        const days = findNameAndReturnDays(itemAndDayTuples, document.name);
        updateItemNameWithDate(document, days);
    }
});

function findNameAndReturnDays(tuples, name) {
    const regex = new RegExp(name, "i");
    const matchedItemTuple = tuples.find((tuple) => Array.isArray(tuple) && tuple[0].match(regex));
    return matchedItemTuple === undefined
            ? null
            : matchedItemTuple[1];
}

function updateItemNameWithDate(document, days) {
    if (days == null || Number.isNaN(days)) return;
    
    const useSimpleCalendar = game.settings.get(MODULE_NAME, USE_SIMPLE_CALENDAR);
    let expirationDateString;
    if (useSimpleCalendar && typeof SimpleCalendar !== 'undefined') {
        const currentTimestamp = SimpleCalendar.api.timestamp();
        const expirationTimestamp = SimpleCalendar.api.timestampPlusInterval(currentTimestamp, {day: days});
        expirationDateString = SimpleCalendar.api.formatTimestamp(expirationTimestamp, 'M/D/YYYY');
    } else {
        const expirationDateValue = DAY * days;
        const expirationDate = new Date(Date.now() + expirationDateValue);
        expirationDateString = expirationDate.toLocaleDateString();
    }

    const updatedName = `${document.name} (${expirationDateString})`;
    document.system.parent.updateSource({ name: updatedName });
}
