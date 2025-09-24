import { pgTable, text, timestamp, pgEnum, boolean } from "drizzle-orm/pg-core";
import { user } from "@/schema/auth-schema"; // <-- your Better Auth user table

// --------------------
// Enums
// --------------------
export const orgRoleEnum = pgEnum("org_role", [
    "ADMIN",
    "MEMBER"
]);

export const projectRoleEnum = pgEnum("project_role", [
    "ADMIN",
    "MEMBER"
]);

// --------------------
// Organization
// --------------------
export const organization = pgTable("organization", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});

// --------------------
// Organization Membership
// --------------------
export const organizationMembership = pgTable("organization_membership", {
    id: text("id").primaryKey(),
    organizationId: text("organization_id")
        .notNull()
        .references(() => organization.id, { onDelete: "cascade" }),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    role: orgRoleEnum().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// --------------------
// Project (dual ownership: either user OR org)
// --------------------
export const project = pgTable("project", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    domain: text("domain").notNull(),
    slug: text("slug").notNull(),
    userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
    organizationId: text("organization_id").references(() => organization.id, { onDelete: "cascade" }),
    hasData: boolean("has_data").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});

// --------------------
// Project Membership
// --------------------
export const projectMembership = pgTable("project_membership", {
    id: text("id").primaryKey(),
    projectId: text("project_id")
        .notNull()
        .references(() => project.id, { onDelete: "cascade" }),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    role: projectRoleEnum().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
