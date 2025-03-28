import postRepo from '@/server/repositories/post.repo';
import recipeRepo from '@/server/repositories/recipe.repo';
import { uploadPostImages } from '@/server/services/images.services';
import { createNewPostSchema } from '@flayva-monorepo/shared/validation/post.validation';
import { z } from 'zod';

/**
 * Create a new post
 *
 * @param ownerId - The ID of the user creating the post
 * @param newPostData - The data for the new post
 */
export const createNewPost = async (
	ownerId: string,
	newPostData: z.infer<typeof createNewPostSchema>
) => {
	// TODO: handle upload image failures
	const { successes: imageUploads } = await uploadPostImages(
		newPostData.images
	);

	const { postId, recipeId } = await postRepo.saveNewPost(ownerId, {
		imageUploads: imageUploads,
		recipe: newPostData.recipe,
	});

	return { postId, recipeId };
};

export const deletePost = async (postId: string) => {
	const isDeleted = await postRepo.deleteExistingPost(postId);

	return {
		deleted: isDeleted,
	};
};

/**
 * Get a post by its ID
 * @param postId - The ID of the post to get
 * @returns The post with the given ID
 */
export const getPostById = async (postId: string) => {
	//TODO: process db response

	const post = await postRepo.getPostById(postId);

	return post;
};

/**
 * Get a feed of posts
 *
 */
export const getFeed = async () => {
	const posts = await postRepo.getRecentPosts(5);

	return posts;
};

/**
 * Get a list of posts based on their title that are similar to the search query. Uses pagination
 * @param recipeTitle - The title of a recipe in a search query
 * @param pageSize - The size of the results to be returned (for pagination)
 * @param pageNumber - The page number for the results to be returned (for pagination)
 *
 */
export const getPostsByTitle = async (
	recipeTitle: string,
	pageSize: number,
	pageNumber: number
) => {
	const recipes = await recipeRepo.getRecipesByTitle(
		recipeTitle,
		pageSize,
		pageNumber
	);

	if (!recipes) {
		return false;
	}

	if (recipes == null) {
		return null;
	}

  const posts = [];

  for (let i = 0; i < recipes.recipes.length; i++) {
    posts[i] = postRepo.getPostsByRecipeId(recipes.recipes[i].id);
  }

	return {
    posts,
    pagination: recipes.pagination
  };
};


export default {
	createNewPost,
	getPostById,
	getFeed,
	deletePost,
	getPostsByTitle
};
