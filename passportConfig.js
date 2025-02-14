const LocalStrategy=require('passport-local').Strategy
const passport = require('passport')
const User = require('./schema')
exports.initializePassport=(passport)=>{
    passport.use(new LocalStrategy(async(username,password,done)=>{
        try{
            const user = await User.findOne({UserName:username})
            if (!user)
            {
                return done(null,false,{message:"No user Found"})
            }
            else if (user.password !== password)
            {
                return done(null,false,{message:"Invalid Password"})
            }    
            return done(null,User)  
        }
        catch(err)
        {
            return done(err)
        }
    }))

    passport.serializeUser((user,done)=>{
        done(null,user.id)
    })

    passport.deserializeUser(async(id,done)=>{
        try{
        const user = await user.findById({id})
        done(null,user)
        }
        catch(err)
        {
            done(err)
        }

    })
}