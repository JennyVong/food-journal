const dbConfig = require( '../config/db.config.js' );
const Sequelize = require( 'sequelize' );
const sequelize = new Sequelize( dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.food = require( './food.model.js' )( sequelize, Sequelize );
db.tag = require( './tag.model.js' )( sequelize, Sequelize );
db.tag.belongsToMany( db.food, {
    through: 'food_tag',
    as: 'foods',
    foreignKey: 'tag_id',
});
db.food.belongsToMany( db.tag, {
    through: 'food_tag',
    as: 'tags',
    foreignKey: 'food_id',
});
module.exports = db;
