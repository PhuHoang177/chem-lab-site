import {defineType} from 'sanity'
import {pageField, titleField, contentField, updatedField, imageField} from './sharedFields'

export const headerType = defineType({
  name: 'headerType',
  title: 'Header',
  type: 'document',
  fields: [
    pageField(),
    titleField({title: 'Page Title'}),
    contentField({title: 'Short Slogan', required: false}),
    imageField({title: 'Background Image', required: false}),
    updatedField(),
  ],
})
