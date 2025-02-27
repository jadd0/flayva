<<<<<<< HEAD
<<<<<<< HEAD
import { RECIPES } from "@flayva-monorepo/shared/constants";
=======
import {
  INGREDIENT_GROUPS,
  INGREDIENT_SUBGROUPS,
  INGREDIENT_UNIT,
  TAG_CATEGORIES,
  TAG_GROUPS,
} from "@/constants/recipes.constants";
>>>>>>> 76cb6eb (added posts & recipe db schema;)
=======
import { RECIPES } from "@flayva-monorepo/shared/constants";
>>>>>>> dd163c9 (restructure shared folder)
import { users } from "@/db/schema";
import { posts } from "@/db/schemas/posts.schema";
import { integer, pgEnum, pgTable, primaryKey, timestamp, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ## ENUMS ##

<<<<<<< HEAD
<<<<<<< HEAD
export const tagCategoryEnum = pgEnum("category", RECIPES.TAG_CATEGORIES);

export const tagGroupEnum = pgEnum("group", RECIPES.TAG_GROUPS);

export const ingredientUnitEnum = pgEnum("unit", RECIPES.INGREDIENT_UNIT);

export const ingredientGroupEnum = pgEnum("ingredient_group", RECIPES.INGREDIENT_GROUPS);

export const ingredientSubgroupEnum = pgEnum("ingredient_subgroup", RECIPES.INGREDIENT_SUBGROUPS);
=======
export const tagCategoryEnum = pgEnum("category", TAG_CATEGORIES);
=======
export const tagCategoryEnum = pgEnum("category", RECIPES.TAG_CATEGORIES);
>>>>>>> dd163c9 (restructure shared folder)

export const tagGroupEnum = pgEnum("group", RECIPES.TAG_GROUPS);

export const ingredientUnitEnum = pgEnum("unit", RECIPES.INGREDIENT_UNIT);

export const ingredientGroupEnum = pgEnum("ingredient_group", RECIPES.INGREDIENT_GROUPS);

<<<<<<< HEAD
export const ingredientSubgroupEnum = pgEnum("ingredient_subgroup", INGREDIENT_SUBGROUPS);
>>>>>>> 76cb6eb (added posts & recipe db schema;)
=======
export const ingredientSubgroupEnum = pgEnum("ingredient_subgroup", RECIPES.INGREDIENT_SUBGROUPS);
>>>>>>> dd163c9 (restructure shared folder)

// ## TABLES ##

export const recipes = pgTable("recipes", {
  id: varchar("id").primaryKey(),
  master_post_id: varchar("master_post_id").references(() => posts.id, { onDelete: "set null" }),
  title: varchar("title").notNull(),
  description: varchar("description").notNull(),
<<<<<<< HEAD
<<<<<<< HEAD
  created_at: timestamp("created_at", { mode: "string" }).defaultNow(),
});

export const recipe_instruction_steps = pgTable(
  "recipe_instruction_steps",
  {
    recipeId: varchar("recipe_id").references(() => recipes.id, { onDelete: "cascade" }),
    stepNumber: integer("step_number").notNull(),
    instruction: varchar("instruction").notNull(),
  },
  (table) => [primaryKey({ columns: [table.recipeId, table.stepNumber] })]
);

=======
  instructions: varchar("instructions").notNull(),
  created_at: timestamp("created_at", { mode: "string" }).defaultNow(),
});

>>>>>>> 76cb6eb (added posts & recipe db schema;)
=======
  created_at: timestamp("created_at", { mode: "string" }).defaultNow(),
});

export const recipe_instruction_steps = pgTable(
  "recipe_instruction_steps",
  {
    recipeId: varchar("recipe_id").references(() => recipes.id, { onDelete: "cascade" }),
    stepNumber: integer("step_number").notNull(),
    instruction: varchar("instruction").notNull(),
  },
  (table) => [primaryKey({ columns: [table.recipeId, table.stepNumber] })]
);

>>>>>>> dd163c9 (restructure shared folder)
export const recipe_tags = pgTable(
  "recipe_tags",
  {
    recipeID: varchar("recipe_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    tagID: varchar("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.recipeID, table.tagID] })]
);

export const tags = pgTable("tags", {
  id: varchar("id").primaryKey(),
  name: varchar("name").notNull(),
  category: tagCategoryEnum("category").notNull(),
  group: tagGroupEnum("group"),
});

export const recipe_ratings = pgTable("recipe_ratings", {
  id: varchar("id").primaryKey(),
  recipe_id: varchar("recipe_id").references(() => recipes.id, { onDelete: "cascade" }),
  user_id: varchar("user_id").references(() => users.id, { onDelete: "cascade" }),
  rating: integer("rating").notNull(),
  review: varchar("review"),
  date: timestamp("created_at", { mode: "string" }).defaultNow(),
});

export const recipe_ingredients = pgTable(
  "recipe_ingredients",
  {
    recipe_id: varchar("recipe_id")
      .notNull()
      .references(() => recipes.id, { onDelete: "cascade" }),
    ingredient_id: varchar("ingredient_id")
      .notNull()
      .references(() => ingredient_items.id, {
        onDelete: "cascade",
      }),
    amount_fractional_numerator: integer("amount_fractional_numerator").notNull(),
    amount_fractional_denominator: integer("amount_fractional_denominator").notNull().default(1),
    unit: ingredientUnitEnum("unit").notNull(),
  },
  (table) => [primaryKey({ columns: [table.ingredient_id, table.recipe_id] })]
);

export const ingredient_items = pgTable("ingredients_items", {
  id: varchar("id").primaryKey(),
  name: varchar("name").notNull(),
  group: ingredientGroupEnum("group").notNull(),
  subgroup: ingredientSubgroupEnum("subgroup").notNull(),
});

// ## RELATIONS ##

export const relations_recipes = relations(recipes, ({ one, many }) => ({
  masterPost: one(posts, { fields: [recipes.master_post_id], references: [posts.id] }),
  ratings: many(recipe_ratings),
  ingredients: many(recipe_ingredients),
  tagLinks: many(recipe_tags),
<<<<<<< HEAD
<<<<<<< HEAD
  instructions: many(recipe_instruction_steps),
=======
>>>>>>> 76cb6eb (added posts & recipe db schema;)
=======
  instructions: many(recipe_instruction_steps),
>>>>>>> dd163c9 (restructure shared folder)
}));

// Define relations for the recipe_ratings table.
export const relations_recipe_ratings = relations(recipe_ratings, ({ one }) => ({
  recipe: one(recipes, { fields: [recipe_ratings.recipe_id], references: [recipes.id] }),
  user: one(users, { fields: [recipe_ratings.user_id], references: [users.id] }),
}));

// Define relations for the recipe_ingredients table.
export const relations_recipe_ingredients = relations(recipe_ingredients, ({ one }) => ({
  recipe: one(recipes, { fields: [recipe_ingredients.recipe_id], references: [recipes.id] }),
  ingredientItem: one(ingredient_items, {
    fields: [recipe_ingredients.ingredient_id],
    references: [ingredient_items.id],
  }),
}));

// Define relations for the recipe_tags table.
export const relations_recipe_tags = relations(recipe_tags, ({ one }) => ({
  tag: one(tags, { fields: [recipe_tags.tagID], references: [tags.id] }),
}));

// Define relations for the tags table.
export const relations_tags = relations(tags, ({ many }) => ({
  recipeTagLinks: many(recipe_tags),
}));

// Define relations for the ingredient_items table.
export const relations_ingredient_items = relations(ingredient_items, ({ one, many }) => ({
  recipeIngredientLinks: many(recipe_ingredients),
}));
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> dd163c9 (restructure shared folder)

// Define relations for the recipe_instruction_steps table.
export const relations_recipe_instruction_steps = relations(
  recipe_instruction_steps,
  ({ one }) => ({
    recipe: one(recipes, { fields: [recipe_instruction_steps.recipeId], references: [recipes.id] }),
  })
);
<<<<<<< HEAD
=======
>>>>>>> 76cb6eb (added posts & recipe db schema;)
=======
>>>>>>> dd163c9 (restructure shared folder)
