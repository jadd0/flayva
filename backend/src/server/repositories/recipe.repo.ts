import { RECIPE_TAGS_SEARCH_QUERY_RETURN_LIMIT } from '@/constants/posts.constants';
import { db } from '@/db';
import { tags, recipes } from '@/db/schema';
import { sql, eq, asc } from 'drizzle-orm';

/**
 * Query the database for tags that are similar to the search query
 * @param searchQuery - the search query
 * @returns a list of tags that are similar to the search query
 */
export const querySimilarValidTagOptions = async (searchQuery: string) =>
	db
		.select()
		.from(tags)
		.where(sql`${tags.name} ILIKE ${`%${searchQuery.toLowerCase()}%`}`)
		.orderBy(
			// 1. search for exact match
			// 2. search for match at the beginning of the string
			// 3. search for match anywhere in the string
			sql`CASE
    WHEN ${tags.name} ILIKE ${searchQuery.toLowerCase()} THEN 1 
    WHEN ${tags.name} ILIKE ${`${searchQuery.toLowerCase()}%`} THEN 2
    ELSE 3
  END`
		)
		.limit(RECIPE_TAGS_SEARCH_QUERY_RETURN_LIMIT);


/**
 * Get a single recipe based on a given id
 * @param id of the recipe in question
 * @returns a single recipe matching the given id
 */
export const getRecipeByID = async (id: string) => {
  const recipe = await db.select().from(recipes).where(eq(recipes.id, id));
  
  if (recipe.length === 0) return null;
  
  return recipe[0];
}


/**
 * Get a list of posts based on their title that are similar to the search query. Uses pagination
 * @param recipeTitle - The title of a recipe in a search query
 * @param pageSize - The size of the results to be returned (for pagination)
 * @param pageNumber - The page number for the results to be returned (for pagination)
 *
 */
export const getRecipesByTitle = async (
	recipeTitle: string,
	pageSize: number,
	pageNumber: number
) => {
	// TODO: return null instead of false when nothing returned
	// TODO: refeed into getbyid

	const recipesList = await db
		.select()
		.from(recipes)
		.where(sql`${recipes.title} ILIKE ${'%' + recipeTitle + '%'}`)
		.orderBy(
			sql`CASE
      WHEN ${recipes.title} ILIKE ${recipeTitle.toLowerCase()} THEN 1 
      WHEN ${recipes.title} ILIKE ${`${recipeTitle.toLowerCase()}%`} THEN 2
      ELSE 3
    END`,
			asc(recipes.id)
		)
		.limit(pageSize)
		.offset((pageNumber - 1) * pageSize);

	if (recipesList.length === 0) return null;


	const totalCount = await db
		.select({ count: sql<number>`count(*)` })
		.from(recipes)
		.where(sql`${recipes.title} ILIKE ${'%' + recipeTitle + '%'}`)
		.then((result) => result[0].count);

	const totalPages = Math.ceil(totalCount / pageSize);

	return {
		recipes: recipesList,
		pagination: {
			currentPage: pageNumber,
			totalPages: totalPages,
			pageSize: pageSize,
			totalCount: totalCount,
		},
	};
};

export default {
	querySimilarValidTagOptions,
	getRecipeByID,
	getRecipesByTitle,
};
