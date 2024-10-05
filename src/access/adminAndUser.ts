import type { AccessArgs } from 'payload'

import { checkRole } from '../payload/collections/Users/checkRole'

import type { User } from '../payload-types'

type isAdminOrUser = (args: AccessArgs<User>) => boolean | { id: { equals: number } }

const adminsAndUser: isAdminOrUser = ({ req }) => {
  if (req.user) {
    if (checkRole(['admin'], req.user)) {
      return true
    }

    return {
      id: {
        equals: req.user.id,
      },
    }
  }

  return false
}

export default adminsAndUser
