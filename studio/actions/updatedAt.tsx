import {useDocumentOperation, type DocumentActionProps} from 'sanity'
import {CheckmarkIcon} from '@sanity/icons'

export const SetUpdatedAtAction = (props: DocumentActionProps) => {
  const {patch, publish} = useDocumentOperation(props.id, props.type)
  const draft = props.draft
  const published = props.published

  // Only enable if there are unsaved changes
  let isUnchanged = false
  if (!draft) isUnchanged = true
  else if (published && JSON.stringify(draft) === JSON.stringify(published)) isUnchanged = true

  return {
    label: 'Publish',
    icon: CheckmarkIcon,
    disabled: isUnchanged ? true : undefined, // never use null!
    onHandle: () => {
      patch.execute([{set: {updatedAt: new Date().toISOString()}}])
      publish.execute()
      props.onComplete()
    },
  }
}
