import resource from 'resource-router-middleware';
import { merge, get, isEmpty } from 'lodash/fp';
import resMessage from '../lib/res-message';
import UserModel from '../models/user';

const addFullNameToBody = body => {
	if (isEmpty(get('name', body))) {
		return body;
	}

	return merge({
		name: {
			full: `${get('name.first', body)} ${get('name.last', body)}`
		},
	}, body);
};

const userApi = resource({
	id: 'userId',

	index({ params }, res) {
		UserModel.find()
			.then(result => res.send(result))
			.catch(error => res.status(400).send(error))
	},

	read({ params: { userId } }, res) {
		UserModel.findById(userId)
			.then(result => res.send(result))
			.catch(() => res.status(404).send(resMessage('User not found.')))
	},

	update({ params: { userId }, body }, res) {
		UserModel.findByIdAndUpdate(userId, addFullNameToBody(body))
			.then(() => UserModel.findById(userId).then(result => res.send(result)))
			.catch(() => res.status(404).send(resMessage('User not found.')))
	},

	delete({ params: { userId } }, res) {
		UserModel.findByIdAndRemove(userId)
			.then(() => res.send(resMessage('User successfully deleted!')))
			.catch(() => res.status(404).send(resMessage('User not found.')))
	}
});

export default userApi;
