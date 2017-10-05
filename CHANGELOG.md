# 4.5.0 (2017-08-09)

- Updated project to SkyUX SPA Library.
- Added console service and deprecated messaging.
- Updated angular2localization to angular-l10n for translation service.
- Fix for 'Sky Grid Calling Data Provider Multiple Times When Columns Change' ([683](https://github.com/blackbaud/skyux2/issues/683)).

# 4.5.2 (2017-08-16)

- Update components to use sky wait component.
- Removed local directory references to sky components.
- Fixed issue when no initial active tab selected in vertical tabbar component.
- Added removeSelectedItem to link record component api.
- Updated field selection styles and logic on link record component.
- updated link record component logic to move record directly to linked state if no match fields.

# 4.5.3 (2017-08-21)

- Added ability to define field label for link component field matching.
- Fixed issue where filtered checklist was clearing all items or only selecting shown items when clicking 'Select all' or 'Clear all'

# 4.5.4 (2017-09-07)

- Added unit tests for link records component
- Added 'showNewFieldValues' property to link records component and updated docs and unit tests

# 4.5.5 (2017-09-11)

- Fixed search issue with list view component when search criteria returns no items
and selectionEnabled is true; selection column checked state is set.

# 4.5.6 (2017-09-21)

- added ability to hide content for list view repeater
- exposed row index for use in repeater templates

# 4.5.7 (2017-10-3)

- updated skyux dependency to version 2.1.0
- refactored wizard to use Sky modal service directly

# 4.5.8 (2017-10-5)

- updated skyux dependency to version 2.2.0
