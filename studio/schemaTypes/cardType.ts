import {defineType} from 'sanity'
import {
  pageField,
  orderField,
  slugField,
  titleField,
  contentField,
  imageField,
  linkField,
  linkLabelField,
} from './sharedFields'

export const cardType = defineType({
  name: 'cardType',
  title: 'Card',
  type: 'document',
  fields: [
    pageField(),
    orderField(),
    slugField(),
    titleField({title: 'Card Title'}),
    contentField({title: 'Card Content'}),
    imageField({title: 'Card Image', required: false}),
    linkField({title: 'Card Link', required: false}),
    linkLabelField({title: 'Link Text', required: false}),
  ],
})
