const db = require( "../models" );
const Food = db.food;
const Tag = db.tag;

exports.create = ( food ) => {
    return Food.create({
      menu_item: food.menu_item,
      restaurant: food.restaurant,
      address: food.address,
      rating: food.rating,
      review: food.review
    })
      .then( ( food ) => {
        console.log( ">> Created Food: " + JSON.stringify( food, null, 4 ) );
        return food;
      })
      .catch( ( err ) => {
        console.log( ">> Error while creating Food: ", err );
      });
};

exports.findAll = () => {
    return Food.findAll({
      include: [
        {
          model: Tag,
          as: "tags",
          attributes: [ "id", "name" ],
          through: {
            attributes: [],
          },
          // through: {
          //   attributes: ["tag_id", "tutorial_id"],
          // },
        },
      ],
    })
      .then( ( foods ) => {
        return foods;
      })
      .catch( ( err ) => {
        console.log( ">> Error while retrieving Foods: ", err );
      });
};

exports.findById = ( id ) => {
    return Food.findByPk( id, {
      include: [
        {
          model: Tag,
          as: "tags",
          attributes: [ "id", "name" ],
          through: {
            attributes: [],
          },
          // through: {
          //   attributes: ["tag_id", "tutorial_id"],
          // },
        },
      ],
    })
      .then( ( food ) => {
        return food;
      })
      .catch( ( err ) => {
        console.log( ">> Error while finding Food: ", err );
      });
  };