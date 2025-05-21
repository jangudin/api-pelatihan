const bcrypt = require('bcryptjs');

const password = 'Whydin';
const hashedPassword = bcrypt.hashSync(password, 10);

console.log('Hashed Password:', hashedPassword);
