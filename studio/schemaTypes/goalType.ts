import {defineField, defineType} from 'sanity'
import {descriptionText} from './descriptionText'

export const goalType = defineType({
  name: 'goalType',
  title: 'Goal',
  type: 'document',
  fields: [
    defineField({
      name: 'page',
      type: 'string',
      description: descriptionText.page,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      type: 'number',
      description: descriptionText.order,
      validation: (rule) => rule.required().min(1).max(10000),
    }),
    defineField({
      name: 'slug',
      title: 'ID',
      type: 'slug',
      options: {
        source: (doc: any) => `${doc.page || ''}-goal-${doc.order || ''}`,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
            .slice(0, 96),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Goal Title',
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'link',
      type: 'string',
      description: descriptionText.link,
    }),
    defineField({
      name: 'linkLabel',
      type: 'string',
      description: descriptionText.linkLabel,
    }),
  ],
})
