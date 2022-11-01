const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Signup = require('../models/Signup')

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    const emailUser = await Signup.findOne({ email: email });

    if (!emailUser) {
        return done(null, false, {message: 'Unregistered user.'});
    } else {
        const math = await emailUser.matchPassword(password);
        if (!math) {
            return done(null, false, {message : 'Incorrect Password.'})           
        } else {
            return done(null, emailUser);
        }
    }
}))

passport.serializeUser((emailUser, done) => {
    done(null, emailUser.id);
});

passport.deserializeUser((id, done ) => {
    Signup.findById(id, (err, emailUser) => {
        done(err,emailUser);
    })
})