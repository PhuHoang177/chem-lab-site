import {defineField, defineType} from 'sanity'
import {descriptionText} from './descriptionText'

export const headerType = defineType({
  name: 'headerType',
  title: 'Header',
  type: 'document',
  fields: [
    defineField({
      name: 'page',
      type: 'string',
      description: descriptionText.page,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Short Slogan',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Background Image',
      type: 'image',
    }),
  ],
})
