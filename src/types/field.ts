export type FieldConfig = {
  name: string
  type: 'text' | 'email' | 'select' | 'radio' | 'checkbox'
  label: string
  required?: boolean
  placeholder?: string
  autoComplete?: string
  helper?: string
  options?: Array<{ value: string, label: string }>
  validation?: {
    minLength?: { value: number, message: string }
    maxLength?: { value: number, message: string }
    pattern?: { value: RegExp, message: string }
    custom?: (value: any) => string | undefined
  }
}
