import {defineField, defineType} from 'sanity'
import {descriptionText} from './descriptionText'
import {titleField, contentField} from './sharedFields'

export const footerType = defineType({
  name: 'footerType',
  title: 'Footer',
  type: 'document',
  fields: [
    titleField({title: 'Lab Title'}),
    contentField({title: 'Lab Info'}),
    defineField({
      name: 'socials',
      title: 'Social Media',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'link', type: 'string', validation: (rule) => rule.required()},
            {name: 'icon', type: 'image', validation: (rule) => rule.required()},
          ],
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'partner',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'partnerLink',
      type: 'string',
      description: descriptionText.link,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'partnerRelationship',
      type: 'string',
      description: descriptionText.partnerRelationship,
      initialValue: 'Associated with',
      validation: (rule) => rule.required(),
    }),
  ],
})
