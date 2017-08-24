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
	create({ body }, res) {
		let user = new UserModel(addFullNameToBody(body));

		user.save()
			.then(({ _id }) => UserModel.findById(_id).then(result => res.send(result)))
			.catch(error => res.status(400).send(resMessage(error.message)))
	},
});

export default userApi;
