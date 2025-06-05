import {defineField, defineType} from 'sanity'

export const imageType = defineType({
  name: 'imageType',
  title: 'Image',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'caption',
      type: 'string',
      description: 'Image caption',
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required().max(new Date().toISOString()),
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
