module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("users", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      // removing allowNull here 

      // reason: A user will have a username, email and password
      // The username will be used to populate leaderboard.
      // As per today's info, when a user deletes their account, the id and username needn't be deleted from this database
      // Only the email and password can be deleted. 
      // This ensures that the id (needed for foreign key relation in players table), and username (needed to display on leaderboard) are still available,
      // while email and password are not, thereby not letting the deleted user to sign in.
      validate: {
        isEmail: true
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING
      // See reason above for why allowNull has been removed
// Figure out more about hashed passwords to store here
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      isIn: [['admin', 'user']]
    }
  });
  return Users;
};

