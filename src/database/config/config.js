// sequelize-cli loads this file via a native dynamic import(), which does
// not go through the ts-node/register hook (that only patches require()),
// so this one file has to stay .js/CommonJS. It re-exports the app's own
// validated DB config (constants/config.ts) instead of duplicating it —
// requiring a .ts file still works here since ts-node/register patches
// require() process-wide, once .sequelizerc has registered it.
const { DATABASE } = require("../../constants/config");

module.exports = {
    username: DATABASE.USER_NAME,
    password: DATABASE.PASSWORD,
    database: DATABASE.DB_NAME,
    host: DATABASE.HOSTNAME,
    port: DATABASE.DB_PORT,
    dialect: "postgres",
};
