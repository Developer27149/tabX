import type { toast } from "react-hot-toast"

declare global {
  interface Window {
    _toast: toast
  }
  _toast: toast
}
