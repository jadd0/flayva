import socialServices from '@/server/services/social.services';
import { RequestHandler, Request, Response } from 'express';


export const getUserById: RequestHandler = async (req, res) => {
	const { userId } = req.params;

	if (!userId) {
		res.status(400).send({ message: 'User Id is required' });
		return;
	}

	const user = await socialServices.getUserById(userId);

	if (user) res.status(200).send({ user });
	else res.status(404).send({ message: 'user not found' });
};

export const getUsersByUsername = async (req: Request, res: Response) => {
	const { username, pageSize, pageNumber } = req.query;

	if (!username || !pageSize || !pageNumber) {
		res.status(400).send({
			message:
				'Missing required query parameters: username, pageSize, and pageNumber',
		});
		return;
	}

	const recipes = await socialServices.getUsersByUsername(
		username.toString(),
		parseInt(pageSize.toString()),
		parseInt(pageNumber.toString())
	);

	res.status(200).send({ recipes });
};

export default {
	getUserById,
  getUsersByUsername
};
