const { Model, DataTypes } = require("sequelize");

// I'm not sure we need to be worried about this. We can
// delete it if we don't want it.
const bcrypt = require("bcrypt");

const sequelize = require("../config/connection");

class User extends Model {
  checkPassword(password) {
    // Again, we can remove bcrypt if we don't want to worry about salting.
    return bcrypt.compareSync(password, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // What do we want to require for password types?
      },
    },
  },

  // I'm not possitive what this does. Is it something that we need?

  // hooks: {
  //    beforeCreate: async (newUserData) => {
  //       newUserData.password = await bcrypt.hash(newUserData.password, 10);
  //       return newUserData;
  //     },
  //     beforeUpdate: async (updatedUserData) => {
  //       updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
  //       return updatedUserData;
  //     },
  //  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
