const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/martini_db');
const bcrypt = require('bcrypt');

const User = conn.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

User.addHook('beforeSave', async(user)=> {
  user.password = await bcrypt.hash(user.password, 5);
  console.log(user.password);
});

module.exports = {
  conn,
  User
};
