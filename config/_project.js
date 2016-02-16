/**
 * API Project configuration.
 * This holds static configuration of the project, ex: file paths, module configurations, etc. Do not place environment
 * specific configuration in here, use {environment}.js
 * */
module.exports = {
  // SERVER specific configuration
  server: {
    path: {
      routes: "app/routes",
      public: false,
      views: false
    },
    request: {
      limit: 50000,
      cors: ['OPTIONS', 'POST', 'GET', 'DELETE'],
      restful: true
    },
    views: false
  },
  // SQL specific configuration
  sql: {
    timezone: "+00:00",
    path: {
      models: "app/models"
    }
  },
  // MONGO settings
  mongo: {
    debug: false,
    schemas: "app/schemas",
    database: "shehutaila"
  },
  // SERVICE specific configuration
  service: {
    path: "app/services"
  }
};