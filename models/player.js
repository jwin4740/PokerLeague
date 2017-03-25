module.exports = function(sequelize, DataTypes) {
  var Player = sequelize.define("Player", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
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
  },
    {
      // Foreign keys to UserId and TournamentId
      classMethods: {
        associate: function(models) {
          // Foreign key to user_id
          Player.belongsTo(models.User, {
            foreignKey: {
              allowNull: false
            }
          });
          // Foreign key to tournament_id
          Player.belongsTo(models.Tournament, {
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    }
  );
  return Player;
};

//////// Players.hasMany(Users, { through: 'Players', foreignKey: 'id' }) //////////
//////// Players.hasMany(Tournaments, { through: 'Players', foreignKey: 'id' }) //////////

/// Check if correct !!!!
