import { defineType, defineField } from "sanity";

export const project = defineType({
  name: "project",
  title: "Projects",
  type: "document",
  fields: [
    // 🔹 Project Number
    defineField({
      name: "projectNumber",
      title: "Project Number",
      type: "string",
      validation: (Rule) => Rule.required().min(1).error("Project number is required"),
    }),

    // 🔹 Project Name
    defineField({
      name: "name",
      title: "Project Name",
      type: "string",
      validation: (Rule) => Rule.required().min(3).error("Project name is required"),
    }),

    // 🔹 Main Image
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Main banner or thumbnail image for this project",
    }),

    // 🔹 Image Gallery
    defineField({
      name: "gallery",
      title: "Image Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "Additional images for the project gallery",
    }),

    // 🔹 Main Description
    defineField({
      name: "mainDescription",
      title: "Main Description",
      type: "text",
      description: "Short main description of the project",
    }),

    // 🔹 Detailed Description
    defineField({
      name: "description",
      title: "Detailed Description",
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
              { title: "Underline", value: "underline" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "URL",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "Link URL",
                  },
                ],
              },
            ],
          },
        },
      ],
      description: "Detailed description with rich text formatting",
    }),

    // 🔹 Date
    defineField({
      name: "date",
      title: "Project Date",
      type: "date",
      validation: (Rule) => Rule.required().error("Project date is required"),
      description: "Date when the project was completed or published",
    }),
  ],
});