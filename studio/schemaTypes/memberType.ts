import {defineType, defineField} from 'sanity'
import {
  pageField,
  orderField,
  slugField,
  titleField,
  contentField,
  imageField,
} from './sharedFields'

export const memberType = defineType({
  name: 'memberType',
  title: 'Member',
  type: 'document',
  fields: [
    pageField(),
    orderField(),
    slugField(),
    titleField({title: 'Member Name'}),
    defineField({
      name: 'role',
      title: 'Member Role',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    contentField({title: 'Member Info'}),
    imageField({title: 'Profile Image', required: false}),
  ],
})
