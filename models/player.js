module.exports = function(sequelize, DataTypes) {
  var Player = sequelize.define("Player", {
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
    },
    player_registered_flag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    player_checkedIn_flag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0 
    }
  });
  return Player;
};

//////// Players.hasMany(Users, { through: 'Players', foreignKey: 'id' }) //////////
//////// Players.hasMany(Tournaments, { through: 'Players', foreignKey: 'id' }) //////////

/// Check if correct !!!!
