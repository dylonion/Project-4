const db = require('../db/config');

const User = {};

User.findByUserName = userName => {
  return db.oneOrNone(`
    SELECT * FROM users
    WHERE username = $1
  `, [userName]);
};

User.create = user => {
  return db.one(`
    INSERT INTO users
    (firstname, lastname, username, email, password_digest)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `, [user.firstname, user.lastname, user.username, user.email, user.password_digest]);
};

User.destroyProfile = id => {
  return db.none(`
    DELETE FROM user_profiles
    WHERE user_id = $1
  `,id)
}

User.destroy = id => {
  return db.none(`
    DELETE FROM users
    WHERE id = $1
  `,id)
}

module.exports = User;
