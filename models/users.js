module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("users", {
    // Can be removed if timestamps 'CreatedAt' and 'UpdatedAt' are required in database
    timestamps: false,
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
// Figure out more about hashed passwords to store here
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      isIn: [['admin', 'user']]
    }
  });
  return Tournaments;
};

/// Check if correct !!!!
