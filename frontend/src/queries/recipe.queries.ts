import { createQueryKeys } from "@lukemorales/query-key-factory";

import { api } from "@/api/api";

export const recipe = createQueryKeys("recipe", {
  querySuggestedSimilarTags: (tagQuery: string) => ({
    queryFn: () => api.recipe.querySuggestedSimilarTags(tagQuery),
    queryKey: ["recipe", "querySuggestedSimilarTags", tagQuery],
  }),
});
