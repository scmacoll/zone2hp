// Opening hours as shown on the site. Keep in sync with openingHoursSpecification
// in src/layouts/Base.astro and with the Google Business Profile.
export const openingHours: readonly [days: string, times: string][] = [
  ['Mon to Thu', '9am to 12pm, 2pm to 6pm'],
  ['Saturday', '9am to 1pm'],
  ['Fri and Sun', 'Closed'],
];
