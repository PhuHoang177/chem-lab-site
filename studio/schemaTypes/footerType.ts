import {defineField, defineType} from 'sanity'

export const footerType = defineType({
  name: 'footerType',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
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
          // You can also restrict marks if you want
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'socials',
      title: 'Social Media Links',
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
    }),
    defineField({
      name: 'universityDescription',
      type: 'string',
    }),
    defineField({
      name: 'universityLogo',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'universityLogoLink',
      type: 'string',
    }),
  ],
})
