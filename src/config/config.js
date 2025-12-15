require('dotenv').config();

const config={
    PORT: process.env.PORT,
    MongoCon: process.env.MONGO_DB,
    JWTpassword: process.env.JWT_PW
}

module.exports=config