import {defineField, defineType} from 'sanity'
import {descriptionText} from './descriptionText'

export const footerType = defineType({
  name: 'footerType',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'page',
      type: 'string',
      description: descriptionText.page,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Lab Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'info',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'socialsMedia',
      title: 'Social Media',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', type: 'string', validation: (rule) => rule.required()},
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
      validation: (rule) => rule.required(),
    }),
  ],
})
