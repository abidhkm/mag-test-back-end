module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: true
    },
    dob: {
      type: Sequelize.DATE,
      allowNull: true
    },
    contact: {
      type: Sequelize.STRING,
      allowNull: true
    },
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    }
  },{
    tableName: 'user',
    underscored: false,
    timestamps: false
  });

  return User;
};