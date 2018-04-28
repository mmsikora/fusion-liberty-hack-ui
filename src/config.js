/* eslint-disable max-len */

module.exports = {
  // Node.js app
  port: process.env.PORT || 3000,

  // API Gateway
  api: {
    // API URL to be used in the client-side code
    clientUrl: process.env.API_CLIENT_URL || 'http://localhost:8080',
    // API URL to be used in the server-side code
    serverUrl: process.env.API_SERVER_URL || 'http://localhost:8080',
  },

  // Database
  databaseUrl: process.env.DATABASE_URL || 'sqlite:database.sqlite',

  defaultMeta: {
    title: 'Agent Opportunity | Liberty Mutual Agent Dashboard',
    description: 'Empowering the Liberty Mutual Agent Team',
  },

  // Authentication
  auth: {
    jwt: { secret: process.env.JWT_SECRET || 'React Dashboard' },
  },
};
