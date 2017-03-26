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
    // To create an association between Users and Players
    {
      classMethods: {
        associate: function(models) {
          // User has many Player data
          User.hasMany(models.Player);
        }
      }
    }
  );
  return User;
};

