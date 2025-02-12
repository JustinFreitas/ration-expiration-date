const DAY = 8.64e+7;
const MODULE_NAME = "ration-expiration-date";
const IRON_RATIONS_ITEM_NAME = "ironRationsItemName";
const IRON_RATIONS_ITEM_NAME_DEFAULT = "Rations, iron";
const IRON_RATIONS_EXPIRE_DAYS = "ironRationsExpireDays";
const IRON_RATIONS_EXPIRE_DAYS_DEFAULT = 56;
const JSON_ARRAY_OF_ITEM_AND_DAY_TUPLES = "jsonArrayOfItemAndDayTuples";
const STANDARD_RATIONS_ITEM_NAME = "standardRationsItemName";
const STANDARD_RATIONS_ITEM_NAME_DEFAULT = "Rations, standard";
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
    const ironRationsExpireDays = game.settings.get(MODULE_NAME, IRON_RATIONS_EXPIRE_DAYS);
    const standardRationsExpireDays = game.settings.get(MODULE_NAME, STANDARD_RATIONS_EXPIRE_DAYS);
    const itemAndDayTuples = [
        [ironRationsItemName, ironRationsExpireDays],
        [standardRationsItemName, standardRationsExpireDays]
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
    const matchedItemTuple = tuples.find((tuple) => Array.isArray(tuple) && tuple[0] === name);
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
