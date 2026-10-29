// Opening hours as shown on the site. Keep in sync with openingHoursSpecification
// in src/layouts/Base.astro and with the Google Business Profile.
export const openingHours: readonly [days: string, times: string][] = [
  ['Mon–Thu', '9am–12pm, 2pm–6pm'],
  ['Sat', '9am–1pm'],
];
