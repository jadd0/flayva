import socialRepo from '@/server/repositories/social.repo';
import { User } from '@flayva-monorepo/shared/types';

/**
 * Get a user by their ID
 * @param userId - the ID of the user
 * @returns the user object or null if the user does not exist
 */
export const getUserById = async (userId: string) => {
	const user = await socialRepo.getUserById(userId);

	if (!user) return null;

	const formattedUser: User = {
		id: user.id,
		bio: user.bio,
		username: user.username,
		profile_picture_url: user.profile_picture_url ?? undefined,
	};

	return formattedUser;
};

/**
 * Get a list of users based on their username that are similar to the search query. Uses pagination
 * @param username - The username of a user in a search query
 * @param pageSize - The size of the results to be returned (for pagination)
 * @param pageNumber - The page number for the results to be returned (for pagination)
 *
 */
export const getUsersByUsername = async (
	username: string,
	pageSize: number,
	pageNumber: number
) => {
	const users = await socialRepo.getUsersByUsername(
		username,
		pageSize,
		pageNumber
	);

	if (!users) {
		return false;
	}

	return users;
};

export default {
	getUserById,
	getUsersByUsername,
};
