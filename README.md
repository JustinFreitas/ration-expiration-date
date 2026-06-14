# ration-expiration-date

A Foundry VTT module that watches for ration items being added to a character sheet's inventory (e.g. dragged from a compendium). When a matching item is added, it appends an expiration date stamp to the item name, ex.: `Rations, Iron (11/13/2022)`.

By default it watches for four ration types, each with its own expiration window:

| Item name (default)      | Expires in |
| ------------------------ | ---------- |
| Rations, Iron            | 56 days    |
| Rations, Standard        | 14 days    |
| Rations, Fresh Food      | 28 days    |
| Rations, Preserved Meat  | 28 days    |

Each item name and its days-until-expiration can be changed in the Foundry world's settings. Name matching is case-insensitive: the configured name is matched as a substring of the dropped item's name (so "Rations, Iron" also matches "Rations, Iron +1"). Items that already carry a date stamp are skipped, so re-dropping a stamped item won't add a second date.

## Additional items

A settings field accepts a JSON array of name/days tuples to extend the list beyond the four built-ins. Example (also shown in the settings UI):

```json
[["Rations, ripe", 2], ["Rations, preserved", 365]]
```

Malformed JSON is reported via a UI notification and ignored.

## SimpleCalendar

There is a setting to use SimpleCalendar as the date source instead of the real-world calendar. It takes effect when the option is enabled and SimpleCalendar is installed and active in the world.
