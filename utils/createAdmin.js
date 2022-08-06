const readline = require('readline');
const {User} = require('../models');
const bcrypt = require("bcrypt");
const {log} = require("util");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const PHONE_REGEX_PATTERN = /\d{3}-\d{4}-\d{4}/

let userName = ''
let phone=''
let password = ''
let confirmPassword = ''

console.log('\n Welcome to Schoology  LMS system .... \n');

rl.question('Enter Admin\'s user name: ',(name)=>{
    if (name.length <= 2) {
        console.error('name cannot be empty or too short, abort')
        process.exit(1);
    }
    userName = name;
    rl.question('phone in ddd-dddd-dddd: ',(Input_phone)=>{
        if (!PHONE_REGEX_PATTERN.test(Input_phone)){
            console.error('phone doesn\'t match the pattern, abort');
            process.exit(1);
        }
        phone = Input_phone;
        rl.question('password: ',(Input_password)=>{
            if (Input_password.length === 0) {
                console.error('password cannot be empty, abort')
                process.exit(1);
            }
            rl.question('confirm password: ',async (InputConfirmedPassword) => {
                confirmPassword = InputConfirmedPassword;
                if (confirmPassword !== password) {
                    console.error('passwords do not match, abort');
                    process.exit(1);
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
                if (await user.save()) {
                    console.log('new admin has been created successfully');
                } else {
                    console.error('an error occurred, could not create admin');
                }
                process.exit(0);
            });
        });
    });
});
