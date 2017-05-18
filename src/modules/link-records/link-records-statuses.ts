export const Statuses = {
  Created: 'created',
  Edit: 'edit',
  Linked: 'linked',
  NoMatch: 'no_match',
  Suggested: 'suggested',
  Selected: 'selected',
  isValid: (value: string) =>
    value === Statuses.Created ||
    value === Statuses.Edit ||
    value === Statuses.Linked ||
    value === Statuses.NoMatch ||
    value === Statuses.Suggested ||
    value === Statuses.Selected
};
