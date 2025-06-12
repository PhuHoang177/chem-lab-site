import {DateTimeInput, DateTimeInputProps, set} from 'sanity'
import {Button} from '@sanity/ui'

export default function ReloadableDatetime(props: DateTimeInputProps) {
  const {onChange} = props

  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
      <DateTimeInput {...props} />
      <Button
        mode="bleed"
        tone="primary"
        text="Now"
        onClick={() => onChange(set(new Date().toISOString()))}
      />
    </div>
  )
}
