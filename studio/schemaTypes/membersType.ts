import {defineType, defineField} from 'sanity'
import {orderField, titleField, contentField, imageField} from './sharedFields'

export const membersType = defineType({
  name: 'membersType',
  title: 'Members',
  type: 'document',
  fields: [
    orderField({title: 'Position Order'}),
    titleField({title: 'Position Title'}),
    defineField({
      name: 'membersList',
      title: 'Members List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            orderField({title: 'Member Order'}),
            titleField({title: 'Member Name'}),
            contentField({title: 'Member Info', required: false}),
            imageField({title: 'Member Image', required: false}),
          ],
        },
      ],
    }),
  ],
})
