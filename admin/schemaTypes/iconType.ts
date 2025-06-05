import {defineField, defineType} from 'sanity'

export const iconType = defineType({
  name: 'iconType',
  title: 'Icon',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
