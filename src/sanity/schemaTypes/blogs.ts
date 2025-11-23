import { defineType, defineField } from "sanity";

export const blog = defineType({
  name: "blog",
  title: "Blog",
  type: "document",
  fields: [
    // 🔹 Blog Title
    defineField({
      name: "title",
      title: "Blog Title",
      type: "string",
      validation: (Rule) => Rule.required().min(5).max(100),
    }),

    // 🔹 Slug (for dynamic pages)
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    // 🔹 Main Image
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),

    // 🔹 Blog Gallery (multiple images)
    defineField({
      name: "gallery",
      title: "Blog Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),

    // 🔹 Blog Content / Paragraph (Rich text)
    defineField({
      name: "content",
      title: "Blog Paragraph",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 1", value: "h1" },
            { title: "Heading 2", value: "h2" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),

    // 🔹 Publish Date
    defineField({
      name: "publishDate",
      title: "Publish Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
