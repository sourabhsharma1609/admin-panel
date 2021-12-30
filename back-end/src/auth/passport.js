const passport = require("passport");
const passportJWT = require("passport-jwt");
const Admin = require("../models").Admin;

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET,
};

passport.use(
	new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
		try {
			const admin = await Admin.findByPk(jwt_payload.id);
			if (admin) {
				return done(null, admin);
			} else {
				return done(null, false);
			}
		} catch (error) {
			return done(error, false);
		}
	})
);
