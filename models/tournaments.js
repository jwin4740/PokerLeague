module.exports = function(sequelize, DataTypes) {
  var Tournaments = sequelize.define("tournaments", {
    // Can be removed if timestamps 'CreatedAt' and 'UpdatedAt' are required in database
    // timestamps: false,
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false
    }
  });
  return Tournaments;
};


// Check if right !!