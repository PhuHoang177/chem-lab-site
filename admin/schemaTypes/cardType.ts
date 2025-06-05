import {defineField, defineType} from 'sanity'

export const cardType = defineType({
  name: 'cardType',
  title: 'Card',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'icon',
      type: 'image',
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'link',
      type: 'string',
    }),
    defineField({
      name: 'linkLabel',
      type: 'string',
    }),
  ],
})
