const db = require( "../models" );
const Food = db.food;
const Tag = db.tag;

exports.create = ( tag ) => {
    return Tag.create({
      name: tag.name,
    })
      .then( ( tag ) => {
        console.log( ">> Created Tag: " + JSON.stringify( tag, null, 2 ) );
        return tag;
      })
      .catch( ( err ) => {
        console.log( ">> Error while creating Tag: ", err );
      });
  };

  exports.findAll = () => {
    return Tag.findAll({
      include: [
        {
          model: Food,
          as: "foods",
          attributes: [ 'id', 'menu_item', 'restaurant', 'address', 'rating', 'review' ],
          through: {
            attributes: [],
          }
        },
      ],
    })
      .then( ( tags ) => {
        return tags;
      })
      .catch( ( err ) => {
        console.log( ">> Error while retrieving Tags: ", err );
      });
  };

  exports.findById = ( id ) => {
    return Tag.findByPk( id, {
      include: [
        {
          model: Food,
          as: 'foods',
          attributes: [ 'id', 'menu_item', 'restaurant', 'address', 'rating', 'review' ],
          through: {
            attributes: [],
          }
        },
      ],
    })
      .then( ( tag ) => {
        return tag;
      })
      .catch( ( err ) => {
        console.log( ">> Error while finding Tag: ", err );
      });
  };

  exports.addFood = ( tagId, foodId ) => {
    return Tag.findByPk( tagId )
      .then( ( tag ) => {
        if ( !tag ) {
          console.log( "Tag not found!" );
          return null;
        }
        return Food.findByPk( foodId ).then( ( food ) => {
          if ( !food ) {
            console.log( "Food not found!" );
            return null;
          }
          tag.addTutorial( food );
          console.log( `>> added Food id=${food.id} to Tag id=${tag.id}` );
          return tag;
        });
      })
      .catch( ( err ) => {
        console.log( ">> Error while adding Tutorial to Tag: ", err );
      });
  };