export type APIError = {
  message: string
  data: any | null
  isOperational: boolean
  isPublic: boolean
  status: number
  cause: Error | null
  stack?: string
}

// Utility function to handle and format the error as an APIError
export function handleAPIError(error: unknown): APIError {
  return {
    message: (error as Error).message || 'An unknown error occurred',
    data: (error as any).data || null,
    isOperational: (error as any).isOperational || false,
    isPublic: (error as any).isPublic || false,
    status: (error as any).status || 500,
    cause: (error as any).cause || null,
    stack: (error as Error).stack, // Optional stack trace
  }
}
