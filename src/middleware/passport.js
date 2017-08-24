import { Strategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user';
import config from '../config';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
};

export default passport => passport.use(new Strategy(opts, (payload, done) => {
  User.findById(payload.sub)
    .then(user => {
      if (user) {
        return done(null, user);
      }

      return done(new Error("User not found."), null);
    })
    .catch(err => done(err, false))
}));
