export interface MessageBar {
  open?: boolean
  status: 'error' | 'success' | 'warning' | 'info' | ''
  text: string
  variant?: 'light' | 'normal'
}
