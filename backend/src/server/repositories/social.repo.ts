import { db } from '@/db';
import { users } from '@/db/schema';
import { eq, sql, asc } from 'drizzle-orm';

/**
 * Get a user object from the database by their ID
 * @param userId - the ID of the user
 * @returns the user object or null if the user does not exist
 */
export const getUserById = async (userId: string) => {
	const [user] = await db.select().from(users).where(eq(users.id, userId));

	return user as typeof user | null;
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
	if (!username) {
		return false;
	}

	const usersList = await db
		.select()
		.from(users)
		.where(sql`${users.username} ILIKE ${'%' + username + '%'}`)
		.orderBy(
			sql`CASE
      WHEN ${users.username} ILIKE ${username.toLowerCase()} THEN 1 
      WHEN ${users.username} ILIKE ${`${username.toLowerCase()}%`} THEN 2
      ELSE 3
    END`,
			asc(users.id)
		)
		.limit(pageSize)
		.offset((pageNumber - 1) * pageSize);

    if (usersList.length === 0) return null;
  const newUsersList = [];
  
  for (let i = 0; i < usersList.length; i++) {
    newUsersList[i] = await getUserById(usersList[i].id);
  }


	const totalCount = await db
		.select({ count: sql<number>`count(*)` })
		.from(users)
		.where(sql`${users.username} ILIKE ${'%' + username + '%'}`)
		.then((result) => result[0].count);

	const totalPages = Math.ceil(totalCount / pageSize);

  

	return {
		exists: true,
		users: newUsersList,
		pagination: {
			currentPage: pageNumber,
			totalPages: totalPages,
			pageSize: pageSize,
			totalCount: totalCount,
		},
	};
};

export default {
	getUserById,
	getUsersByUsername,
};
