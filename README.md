# ration-expiration-date

A Foundry VTT module that will watch for the drag of ration items from the compendium to the character sheet.  By default, it watches for iron and standard rations with the names 'Rations, iron' (8 week expiration) and 'Rations, standard' (2 week expiration).  When the item is added to the inventory of the sheet, it will append an expiration date stamp to the item name, ex.: (11/13/2022).  The two ration item names to watch for, along with the days until expiration for each can be configured in the Foundry world's settings.

Added a new setting that excepts an array of name/days tuples to extend the item list so that custom items beyond the original two can be added in.
Example, also shown in the settings UI: [["Rations, ripe", 2], ["Rations, preserved", 365]]