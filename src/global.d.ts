type Callback = (..._args: any[]) => void

interface SupabaseResponseType<T>  {
  data: T[] | null
  error: any | null
  status: number
  statusText: string
}