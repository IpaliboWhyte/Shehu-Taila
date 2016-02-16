process.env.TZ = "+00:00";  // Timezone should always be set to UTC.
/*
 *  node launch.js --env={environment}
 * */

var crux = require('node-crux'),
  app = crux.app;
crux.globalize();

app
  .name('api')
  .components(['log', 'sql', 'server', 'service', 'mongo'], true)
  .extends("app/extends")
  .projectConfig("config/_project.js")
  .envConfig("config/env", "js");
  
  app.init();

/* Launch everything */
app.run(function(){
  log.debug('Api node: %s launched', crux.APP_NODE_ID);
});