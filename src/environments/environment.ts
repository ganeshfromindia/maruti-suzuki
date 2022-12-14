// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  base_url: 'http://103.248.60.11:9011/legal/api/v1/',
  snapToRoadUrl: 'https://roads.googleapis.com/v1/snapToRoads?path=',
  apiKey: '&key=AIzaSyAhBskN2Nm9cbEihwCEE4CWE2R-8iGyCTA',
  googleBaseUrl: 'https://maps.googleapis.com/maps/api/geocode/json?',
  MAP_API_KEY: 'AIzaSyDi5O_ZKHS7Tfh5Z8bbPDVe4AzD1BdWhUA',
  pageCount: 20,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
