import {defineField, defineType} from 'sanity'

export const headerType = defineType({
  name: 'headerType',
  title: 'Header',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      type: 'string',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Background Image',
    }),
  ],
})
