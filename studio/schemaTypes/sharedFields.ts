import {defineField} from 'sanity'
import {descriptionText} from './descriptionText'

export const pageField = (options: {title?: string; required?: boolean} = {}) =>
  defineField({
    name: 'page',
    title: options.title ?? 'Page',
    type: 'string',
    description: descriptionText.page,
    options: {
      list: [
        {title: 'Home', value: 'home'},
        {title: 'Research', value: 'research'},
        {title: 'Members', value: 'members'},
        {title: 'Publications', value: 'publications'},
        {title: 'Contact', value: 'contact'},
      ],
    },
    validation: options.required === false ? undefined : (rule) => rule.required(),
  })

export const orderField = (options: {title?: string; required?: boolean} = {}) =>
  defineField({
    name: 'order',
    title: options.title ?? 'Order',
    type: 'number',
    description: descriptionText.order,
    validation:
      options.required === false ? undefined : (rule) => rule.required().min(1).max(10000),
  })

export const slugField = (options: {title?: string; required?: boolean} = {}) =>
  defineField({
    name: 'slug',
    title: options.title ?? 'ID',
    type: 'slug',
    options: {
      source: (doc: any) => `${doc.page || ''}-post-${doc.order || ''}`,
      slugify: (input: string) =>
        input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '')
          .slice(0, 96),
    },
    validation:
      options.required === false
        ? undefined
        : (rule) =>
            rule.required().custom((value) => {
              if (!value?.current) return true // allow required to handle empty
              if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.current)) {
                return 'Slug can only contain lowercase letters, numbers, and single hyphens between words; no consecutive or trailing hyphens.'
              }
              if (value.current.length > 96) {
                return 'Slug must be 96 characters or fewer.'
              }
              return true
            }),
  })

export const titleField = (options: {title?: string; required?: boolean} = {}) =>
  defineField({
    name: 'title',
    title: options.title ?? 'Title',
    type: 'string',
    validation: options.required === false ? undefined : (rule) => rule.required(),
  })

export const contentField = (options: {title?: string; required?: boolean} = {}) =>
  defineField({
    name: 'block',
    title: options.title ?? 'Content',
    type: 'array',
    of: [{type: 'block', styles: [{title: 'Normal', value: 'normal'}]}],
    validation: options.required === false ? undefined : (rule) => rule.required(),
  })

export const imageField = (options: {title?: string; required?: boolean} = {}) =>
  defineField({
    name: 'image',
    title: options.title ?? 'Image',
    type: 'image',
    validation: options.required ? (rule) => rule.required() : undefined,
  })

export const updatedField = (options: {title?: string} = {}) =>
  defineField({
    name: 'updatedAt',
    title: options.title ?? 'Last Updated',
    type: 'datetime',
    description: descriptionText.update,
    readOnly: true,
  })
