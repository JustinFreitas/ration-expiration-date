## [1.5.1] - 2026-06-14
### Fixed
- Item name matching no longer treats the dropped item name as a regular expression, which could throw on names containing special characters (e.g. parentheses) and break item creation.
- Matching direction corrected: the configured ration name is now matched as a case-insensitive substring of the dropped item's name.
- Re-dropping an already-stamped item no longer appends a second expiration date.
- Custom item/day tuples with non-numeric day values are now ignored instead of producing an "Invalid Date" stamp.
- Malformed JSON in the custom tuples setting is now surfaced via a UI notification.
### Changed
- Consistent indentation; dropped unused `preCreateItem` hook parameters.

## [1.5.0] - 2026-05-30
### Changed
- Updated for Foundry VTT v14 compatibility.
- Modernized `preCreateItem` hook signature.
- Improved Actor detection logic for inventory additions.
- Optimized item name updates using direct `updateSource` call.

## [1.4.1] - 2025-05-03
### Changed
- Fix for precreate hook.

## [1.4.0] - 2025-05-03
### Added
- Add in two more entries for Fresh Food and Preserved Meat.
### Changed
- Changed the name matches to be case insensitive.
- Changed the existing names to have leading caps on all words (i.e. Rations, iron to Rations, Iron).

## [1.3.2] - 2025-05-01
### Changed
- Changed the verified major version from 12 to 13 after some testing with it.

## [1.3.1] - 2025-02-09
### Changed
- Changed the month and day format of the date in the SimpleCalendar case to be the short format (no leading zeros) to match the toLocaleDate() used without SimpleCalendar.
### Fixed
- Fixed the error thrown for SimpleCalendar not being defined by checking type instead of object existence.

## [1.3.0] - 2024-06-08
### Changed
- Change item rename to use system and updateSource() instead of the deprecated data and update() for v12 compatibility.

## [1.2.1] - 2023-07-29
### Changed
- Fix for the expiration date being added to all items instead of just specified items.

## [1.2.0] - 2023-07-29
### Added
- Added the option to use SimpleCalendar module as the expiration date source instead of the real world calendar.  That will work if the option is enabled and SimpleCalendar is installed and active in the world.


## [1.1.0] - 2023-06-25
### Added
- Added a new setting that excepts an array of name/days tuples to extend the item list.  Ex: [["Rations, ripe", 2], ["Rations, preserved", 365]]

### Changed
- Adapt existing iron/standard mechanism to utilize new tuple array mechanism by using those two as the first tuples.
- Linter formatting.


## [1.0.4] - 2022-11-24
### Added
- Add CHANGELOG.md to have a single location for tracking change history conforming to the approach of other modules.

### Changed
- Use constants instead of redundant string/number definitions.
- Linter formatting.

### Removed
- Removal of debugging onChange handler definition for settings registrations.
- Clean up unnecessary comments.


## [1.0.3] - 2022-11-13
### Added
- Addition of name and number defaults for settings values.
- Release artifact built via script.


## [1.0.2] - 2022-11-13
### Fixed
- Fix for creation with no owner (default compendium creation).
- Fix for module description.

### Removed
- No extraneous files or directories in module archive (~2kb now).


## [1.0.1] - 2022-10-30
### Fixed
- Iron Rations should be 56 days, not 28.


## [1.0.0] - 2022-10-07
### Initial release
- Initial release with hard coded names and date spans.

[1.5.1]: https://github.com/JustinFreitas/ration-expiration-date/compare/1.5.0...1.5.1
[1.5.0]: https://github.com/JustinFreitas/ration-expiration-date/compare/1.4.1...1.5.0
[1.4.1]: https://github.com/JustinFreitas/ration-expiration-date/compare/1.4.0...1.4.1
[1.4.0]: https://github.com/JustinFreitas/ration-expiration-date/compare/1.3.2...1.4.0
[1.3.2]: https://github.com/JustinFreitas/ration-expiration-date/compare/1.3.1...1.3.2
[1.3.1]: https://github.com/JustinFreitas/ration-expiration-date/compare/1.3.0...1.3.1
[1.3.0]: https://github.com/JustinFreitas/ration-expiration-date/compare/1.2.1...1.3.0
[1.2.1]: https://github.com/JustinFreitas/ration-expiration-date/compare/1.2.0...1.2.1
[1.2.0]: https://github.com/JustinFreitas/ration-expiration-date/compare/1.1.0...1.2.0
[1.1.0]: https://github.com/JustinFreitas/ration-expiration-date/compare/1.0.4...1.1.0
[1.0.4]: https://github.com/JustinFreitas/ration-expiration-date/compare/1.0.3...1.0.4
[1.0.3]: https://github.com/JustinFreitas/ration-expiration-date/compare/1.0.2...1.0.3
[1.0.2]: https://github.com/JustinFreitas/ration-expiration-date/compare/1.0.1...1.0.2
[1.0.1]: https://github.com/JustinFreitas/ration-expiration-date/compare/1.0.0...1.0.1
[1.0.0]: https://github.com/JustinFreitas/ration-expiration-date/releases/tag/1.0.0
