import {defineType} from 'sanity'
import {
  pageField,
  orderField,
  slugField,
  titleField,
  contentField,
  imageField,
  updatedField,
} from './sharedFields'

export const postType = defineType({
  name: 'postType',
  title: 'Post',
  type: 'document',
  fields: [
    pageField(),
    orderField(),
    slugField(),
    titleField({title: 'Post Title'}),
    contentField({title: 'Post Content'}),
    imageField({title: 'Post Image', required: false}),
    updatedField(),
  ],
})
