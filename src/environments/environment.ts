/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyB4rBiWejCzoyk5Z86WBJt9QJw2FkumTOQ',
    authDomain: 'freshcipe-dev.firebaseapp.com',
    databaseURL: 'https://freshcipe-dev.firebaseio.com',
    projectId: 'freshcipe-dev',
    storageBucket: 'freshcipe-dev.appspot.com',
    messagingSenderId: '102281221586',
    appId: '1:102281221586:web:af1d3da1f08fa1e39c240b'
  }
};
