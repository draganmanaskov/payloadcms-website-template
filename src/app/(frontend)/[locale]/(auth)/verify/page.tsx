import { Button } from '@/components/ui/button'

import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { handleAPIError } from '@/utilities/errors'

type APIError = {
  message: string // Error message, e.g., "APIError: Verification token is invalid."
  data: any | null // Additional data (could be of any type), in this case, it is null.
  isOperational: boolean // Indicates if the error is expected or operational.
  isPublic: boolean // Indicates if the error is safe to expose to the client.
  status: number // HTTP status code, e.g., 403.
  cause: Error | null // Cause of the error (could be another Error object or null).
  stack?: string // Optional stack trace of the error.
}

const Verify = async ({ searchParams }) => {
  const payload = await getPayloadHMR({ config: configPromise })

  try {
    const result = await payload.verifyEmail({
      collection: 'users',
      token: searchParams.token,
    })
  } catch (error) {
    const apiError = handleAPIError(error)
  }

  return (
    <div>
      {/* <Button variant={'default'} onClick={() => verify(searchParams.token)}>
        Verify
      </Button> */}
    </div>
  )
}

export default Verify
