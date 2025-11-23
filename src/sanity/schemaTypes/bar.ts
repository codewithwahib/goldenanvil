import { defineType, defineField } from "sanity";

export const attentionBar = defineType({
  name: "attentionBar",
  title: "Attention Bar",
  type: "document",
  fields: [
    defineField({
      name: "text",
      title: "Text",
      type: "string",
      description: "Enter the text to display in the attention bar.",
      validation: (Rule) => Rule.required().min(5).max(150),
    }),
  ],
});
