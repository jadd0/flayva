import { useInfiniteScrollFeed } from "@/hooks/post.hooks";
import { Post } from "@flayva-monorepo/shared/types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type FeedContextType = {
  posts: Post[];
  activeIndex: number;
  isLoading: boolean;
  isPending: boolean;
  hasNextPage: boolean;
  error: Error | null;

  nextPost: () => void;
  prevPost: () => void;

  fetchMore: () => void;
  refresh: () => void;
};

const FeedContext = createContext<FeedContextType | null>(null);

export const useFeed = () => {
  const context = useContext(FeedContext);
  if (!context) {
    throw new Error("useFeed must be used within a FeedProvider");
  }
  return context;
};

export const FeedProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const {
    data,
    isLoading,
    isPending,
    hasNextPage,
    error,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteScrollFeed();

  const fetchMore = useCallback(() => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  const posts = useMemo(
    () => data?.pages.flatMap((feedSection) => feedSection.feed) ?? [],
    [data]
  );

  const nextPost = useCallback(() => {
    setActiveIndex((prevIndex) => Math.min(prevIndex + 1, posts.length));
  }, [setActiveIndex, posts]);

  const prevPost = useCallback(() => {
    setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  }, [setActiveIndex]);

  useEffect(() => {
    if (activeIndex >= posts.length) {
      if (!isFetchingNextPage && hasNextPage) {
        fetchNextPage();
      }
    }
  }, [activeIndex, posts, isFetchingNextPage]);

  return (
    <FeedContext.Provider
      value={{
        posts,
        isLoading,
        isPending,
        hasNextPage: hasNextPage || false,
        error,
        fetchMore,
        refresh: () => {},
        activeIndex,
        nextPost,
        prevPost,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
};
