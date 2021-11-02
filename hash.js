const {createHash} = require('crypto');

const pass = "yourMom";
function hash(into){
	return createHash('sha512').update(into).digest('base64');
}

// the password returned is same??? what
const hashed= hash(pass);
const pass2 = "bitch";
const hashed2= hash(pass2);
const match = hashed === hashed2;
console.log('match: ', match);

console.log('hashed: ', hashed);
console.log('hashed2: ', hashed2);


// smae hash????
console.log(match ? 'hash is the same' : 'hash is not the same');


console.log(hashed);