// schemas/team.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'team2',
  title: 'Team',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'paragraph',
      title: 'Paragraph',
      type: 'array',
      of: [{ type: 'block' }]
    })
  ]
})