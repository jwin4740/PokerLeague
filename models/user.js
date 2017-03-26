module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hash: {
      type: DataTypes.STRING
      // See reason above for why allowNull has been removed
// Figure out more about hashed passwords to store here
    },
    salt: {
      type: DataTypes.STRING
// Figure out more about hashed passwords to store here
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user',
      isIn: [['admin', 'user']]
    }
  },
    // Here we'll pass a second "classMethods" object into the define method
    // This is for any additional configuration we want to give our models
    {
      // We're saying that we want our Author to have Posts
      classMethods: {
        associate: function(models) {
          // Associating Author with Posts
          // When an Author is deleted, also delete any associated Posts
          User.hasMany(models.Player);
        }
      }
    }
  );
  return User;
};

