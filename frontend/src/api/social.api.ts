import { request } from "@/lib/network";
import { User } from "@flayva-monorepo/shared/types";

/**
 * Fetches the user's profile information from the server.
 */
export async function fetchUserById(userID: string): Promise<{ user?: User }> {
  const { status, data } = await request({ url: `/api/s/u/${userID}`, method: "GET" });

  if (status === 404 || !data.exists || !data.user) {
    return { user: undefined };
  }

  return { user: data.user as User };
}

export async function getUserByUsername(username: string, pageSize: number, pageNumber: number) {
  const { data } = await request({
    url: `/api/u/usernameSearch/${username}`,
    method: "GET",
    params: { username, pageSize, pageNumber },
  });

  return { posts: data } as { posts: User[] | null };
}