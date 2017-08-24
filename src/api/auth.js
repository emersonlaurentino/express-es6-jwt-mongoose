import { isEmpty } from 'lodash/fp';
import resource from 'resource-router-middleware';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user';
import config from '../config';

const authApi = resource({
	create({ body: { email, password } }, res) {
		UserModel.findOne({ email }).select("+password")
      .then(result => {
        if (isEmpty(result)) {
          return res.status(401).send({
            success: false,
            message: 'Authentication failed. User not found.'
          })
        }

        result.comparePassword(password, (err, isMatch) => {
          if (isMatch && !err) {
            var token = jwt.sign({ sub: result._id }, config.jwtSecret, {
              expiresIn: "2 days"
            });

            return res.json({
              success: true,
              message: 'Authentication successfull',
              token
            });
          }

          res.status(401).send({
            success: false,
            message: 'Authentication failed. Passwords did not match.'
          });
        });
      })
      .catch(err => res.send(err.toString()))
	},
});

export default authApi;
