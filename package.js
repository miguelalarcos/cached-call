Package.describe({
  name: 'miguelalarcos:cached-call',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'A cached call implementation.',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.use('coffeescript');
  api.addFiles('cached-call.coffee', 'client');
  api.export('cachedCall', 'client');
  api.export('invalidateCache', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('miguelalarcos:cached-call');
  api.addFiles('cached-call-tests.js');
});
