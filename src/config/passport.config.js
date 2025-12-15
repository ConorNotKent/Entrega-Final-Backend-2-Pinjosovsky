const passport=require("passport")
const passport_local=require("passport-local")
const passport_jwt=require("passport-jwt")
const config=require("../config/config.js")
const UserManager=require("../dao/users.dao")

const userDao= new UserManager()


const LocalStrategy=  passport_local.Strategy
const jwtStrategy=  passport_jwt.Strategy
const jwtExtractor= passport_jwt.ExtractJwt

const CookieExtractor=(req)=>{
    let token= null
    if(req && req.cookies){
        token=req.cookies["currentUser"]
    }
    return token
}

const initializePassport=()=>{
    passport.use("register", new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    }, async (req, username, password, done)=>{
        try {
            const {first_name, last_name, email, age, role}=req.body
            const user= await userDao.registerUser(first_name, last_name, email, age, password, role)
            console.log(user)
            return done(null, user)    
        } catch (error) {
            return done(null, false)
        }

    }
));
    passport.use("login", new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    }, async (req, username, password, done)=>{
        try {
            const user= await userDao.loginUser(username, password)
            return done(null, user)   
        } catch (error) {
            return done(null, false)
        }

    }
));
    passport.use("jwt", new jwtStrategy({
        jwtFromRequest: jwtExtractor.fromExtractors([CookieExtractor]),
        secretOrKey: config.JWTpassword
    }, async(jwt_payload, done)=>{
        try {
            return done(null, jwt_payload)  
        } catch (error) {
            return done(null, error)
        }

    }));

}

module.exports={initializePassport}