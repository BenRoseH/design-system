import type { LucideIcon } from 'lucide-react'
import type { SelectOption } from '../components/atoms/Select/Select'

export type FieldConfig = {
  name: string
  type: 'text' | 'email' | 'select' | 'radio' | 'checkbox'
  label: string
  required?: boolean
  placeholder?: string
  autoComplete?: string
  icon?: LucideIcon
  helper?: string
  options?: SelectOption[]
  validation?: {
    minLength?: { value: number, message: string }
    maxLength?: { value: number, message: string }
    pattern?: { value: RegExp, message: string }
    custom?: (value: any) => string | undefined
  }
}
