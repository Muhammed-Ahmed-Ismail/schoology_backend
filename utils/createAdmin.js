const readline = require('readline');
const {User} = require('../models')
const bcrypt = require("bcrypt");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let userName = ''
let phone=''
let password = ''
let confirmPassword = ''
console.log('\n Welcome in Schoology  LMS system .... \n')

rl.question('Enter Admin\'s user name: ',(name)=>{
    userName = name
    rl.question('phone in ddd-dddd-dddd: ',(Input_phone)=>{
        phone = Input_phone
        rl.question('password: ',(Input_password)=>{
            password = Input_password
            rl.question('confrim password: ',async (InputConfirmedPassword) => {
                confirmPassword = InputConfirmedPassword
                if (confirmPassword !== password) {
                    console.log('error Abort')
                    process.exit(1)
                }
                const salt = await bcrypt.genSalt(10);
                // now we set user password to hashed password
                const encryptedPassword = await bcrypt.hash(password, salt);
                const user = new User({
                    name: name,
                    phone: phone,
                    password: encryptedPassword,
                    roleId:4,
                    email: `${name}_admin@schoology.com`
                });
                await user.save();
                process.exit(0)
            })
        })
    })
})

