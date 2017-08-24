import resource from 'resource-router-middleware';
import { merge, get } from 'lodash/fp';
import resMessage from '../lib/res-message';
import UserModel from '../models/user';

const addFullNameToBody = body => merge({
	name: {
		full: `${get('name.first', body)} ${get('name.last', body)}`
	},
}, body);

const userApi = resource({
	id: 'user',

	index({ params }, res) {
		UserModel.find()
			.then(result => res.send(result))
			.catch(error => res.status(400).send(error))
	},

	read({ params: { user } }, res) {
		UserModel.findById(user)
			.then(result => res.send(result))
			.catch(() => res.status(404).send(resMessage('User not found.')))
	},

	update({ params: { user }, body }, res) {
		UserModel.findByIdAndUpdate(user, addFullNameToBody(body))
			.then(() => UserModel.findById(user).then(result => res.send(result)))
			.catch(() => res.status(404).send(resMessage('User not found.')))
	},

	delete({ params: { user } }, res) {
		UserModel.findById(user)
			.then(result => result.remove(err => {
				if (err) res.status(400).send(err);

				res.send(resMessage('User successfully seleted!'))
			}))
			.catch(() => res.status(404).send(resMessage('User not found.')))
	}
});

export default userApi;
