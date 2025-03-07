import { users } from "@/db/schema";
import { recipes } from "@/db/schemas/recipes.schema";
import { relations } from "drizzle-orm";
import { pgTable, primaryKey, timestamp, varchar } from "drizzle-orm/pg-core";

// ## TABLES ##

export const posts = pgTable("posts", {
  id: varchar("id").primaryKey(),
  title: varchar("title").notNull(),
  description: varchar("description").notNull(),
  ownerID: varchar("owner_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  created_at: timestamp("created_at", { mode: "string" }).defaultNow(),
});

export const post_likes = pgTable(
  "post_likes",
  {
    postID: varchar("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    userID: varchar("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.postID, table.userID] })]
);

export const post_comments = pgTable("post_comments", {
  id: varchar("id").primaryKey(),
  comment: varchar("comment").notNull(),
  postID: varchar("post_id")
    .notNull()
    .references(() => posts.id, { onDelete: "cascade" }),
  userID: varchar("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  commented_at: timestamp("commented_at", { mode: "string" }).defaultNow(),
});

// ## RELATIONS ##

export const relations_posts = relations(posts, ({ one, many }) => ({
  owner: one(users, { fields: [posts.ownerID], references: [users.id] }),
  recipes: many(recipes),
  likes: many(post_likes),
  comments: many(post_comments),
}));

// Define relations for the post_likes table.
export const relations_post_likes = relations(post_likes, ({ one }) => ({
  post: one(posts, { fields: [post_likes.postID], references: [posts.id] }),
  user: one(users, { fields: [post_likes.userID], references: [users.id] }),
}));

// Define relations for the post_comments table.
export const relations_post_comments = relations(post_comments, ({ one }) => ({
  post: one(posts, { fields: [post_comments.postID], references: [posts.id] }),
  user: one(users, { fields: [post_comments.userID], references: [users.id] }),
}));
