import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

// export const get = query({
//   handler: async (context) => {
//     const identity = await context.auth.getUserIdentity();
//     if (!identity) throw new Error("Not logged in");
//     const documents = await context.db.query("documents").collect();
//     return documents;
//   },
// });

export const archive = mutation({
  args: {
    id: v.id("documents"),
  },
  handler: async (context, args) => {
    const identity = await context.auth.getUserIdentity();
    if (!identity) throw new Error("Not logged in");
    const userId = identity.subject;

    const existingDocument = await context.db.get(args.id);

    if (!existingDocument) throw new Error("Document not found");

    if (existingDocument.userId !== userId)
      throw new Error("Document does not belong to this user");
    const recursiveArchive = async (documentId: Id<"documents">) => {
      const children = await context.db
        .query("documents")
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentDocument", documentId)
        )
        .collect();

      for (const child of children) {
        await context.db.patch(child._id, {
          isArchived: true,
        });

        await recursiveArchive(child._id);
      }
    };
    const document = await context.db.patch(args.id, {
      isArchived: true,
    });

    recursiveArchive(args.id);

    return document;
  },
});

export const getTrash = query({
  handler: async (context) => {
    const identity = await context.auth.getUserIdentity();
    if (!identity) throw new Error("Not logged in");

    const userId = identity.subject;
    const documents = await context.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), true))
      .order("desc")
      .collect();
    return documents;
  },
});

export const restore = mutation({
  args: { id: v.id("documents") },
  handler: async (context, args) => {
    const identity = await context.auth.getUserIdentity();
    if (!identity) throw new Error("Not logged in");
    const userId = identity.subject;

    const existingDocument = await context.db.get(args.id);

    if (!existingDocument) throw new Error("Document not found");
    if (existingDocument.userId !== userId)
      throw new Error("Document does not belong to this user");

    const recursiveRestore = async (documentId: Id<"documents">) => {
      const children = await context.db
        .query("documents")
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentDocument", documentId)
        )
        .collect();

      for (const child of children) {
        await context.db.patch(child._id, {
          isArchived: false,
        });

        await recursiveRestore(child._id);
      }
    };

    const options: Partial<Doc<"documents">> = {
      isArchived: false,
    };
    if (existingDocument.parentDocument) {
      const parentDocument = await context.db.get(
        existingDocument.parentDocument
      );
      if (!parentDocument?.isArchived) {
        options.parentDocument = undefined;
      }

      await context.db.patch(args.id, options);
      const document = await recursiveRestore(args.id);
      return document;
    }
  },
});

export const getSideBar = query({
  args: {
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (context, args) => {
    const identity = await context.auth.getUserIdentity();
    if (!identity) throw new Error("Not logged in");
    const userId = identity.subject;
    const documents = await context.db
      .query("documents")
      .withIndex("by_user_parent", (q) =>
        q.eq("userId", userId).eq("parentDocument", args.parentDocument)
      )
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();
    return documents;
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (context, args) => {
    const identity = await context.auth.getUserIdentity();
    if (!identity) throw new Error("Not logged in");
    const userId = identity.subject;
    const document = await context.db.insert("documents", {
      title: args.title,
      parentDocument: args.parentDocument,
      userId,
      isArchived: false,
      isPublished: false,
    });

    return document;
  },
});

export const remove = mutation({
  args: {
    id: v.id("documents"),
  },
  handler: async (context, args) => {
    const identity = await context.auth.getUserIdentity();
    if (!identity) throw new Error("Not logged in");

    const userId = identity.subject;

    const existingDocument = await context.db.get(args.id);
    if (!existingDocument) throw new Error("Document not found");
    if (existingDocument.userId !== userId)
      throw new Error("Document does not belong to this user");

    const document = await context.db.delete(args.id);
    return document;
  },
});
