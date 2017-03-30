module.exports = function(sequelize, DataTypes) {
  var Tournament = sequelize.define("Tournament", {
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
    },
    active_flag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    }
  },
    // To create an association between Tournaments and Players
    {
      classMethods: {
        associate: function(models) {
          // Tournament is connected to many player rows
          Tournament.hasMany(models.Player);
        }
      }
    }
  );
  return Tournament;
};
