module.exports = ( sequelize, Sequelize) => {
    const Food = sequelize.define( 'food', {
        menu_item: {
            type: Sequelize.STRING
        },
        restaurant: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        rating: {
            type: Sequelize.INTEGER
        },
        review: {
            type: Sequelize.TEXT
        }
    });
    return Food;
};