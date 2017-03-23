module.exports = function(sequelize, DataTypes) {
  var Players = sequelize.define("players", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    player_id: {
      type: DataTypes.INTEGER,
      allowNull: false
      ///// Figure out how to make this a FOREIGN_KEY to Users.id
    },
    tournament_id: {
      type: DataTypes.INTEGER,
      allowNull: false
      ///// Figure out how to make this a FOREIGN_KEY to Tournaments.id
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return Players;
};

//////// Players.hasMany(Users, { through: 'Players', foreignKey: 'id' }) //////////
//////// Players.hasMany(Tournaments, { through: 'Players', foreignKey: 'id' }) //////////

/// Check if correct !!!!
