import { createQueryKeys } from "@lukemorales/query-key-factory";

import { api } from "@/api/api";

export const social = createQueryKeys("social", {
  fetchUserById: (userId: string) => ({
    queryFn: () => api.social.fetchUserById(userId),
    queryKey: ["social", "userId", userId],
  }),
});

