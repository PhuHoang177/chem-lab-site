import {defineType, defineField} from 'sanity'
import {descriptionText} from './descriptionText'
import {
  pageField,
  orderField,
  slugField,
  titleField,
  contentField,
  imageField,
  updatedField,
} from './sharedFields'

export const goalType = defineType({
  name: 'goalType',
  title: 'Goal',
  type: 'document',
  fields: [
    pageField(),
    orderField(),
    slugField(),
    titleField({title: 'Goal Title'}),
    contentField({title: 'Goal Content'}),
    imageField({title: 'Goal Icon'}),
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
    updatedField(),
  ],
})
