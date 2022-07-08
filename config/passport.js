const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const fs = require('fs');
const path = require('path');
require("dotenv").config();

const {User} =  require("../models")

const PUB_KEY = fs.readFileSync(process.env.PUBLICKEYPATH, 'utf8');
console.log(PUB_KEY);

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256']
  };


  module.exports = (passport) => {
    // The JWT payload is passed into the verify callback
    passport.use(new JwtStrategy(options, function(jwt_payload, done) {

        console.log(jwt_payload);

        try{
        
        User.findByPk( jwt_payload.userId).then( (user)=> {
            
            if (user) {
                console.log(user);
                return done(null, user);
            } else {
                return done(null, false);
            }
            
        })
    }
        catch (err) {
                return done(err,false)
        }
        
    }));
}