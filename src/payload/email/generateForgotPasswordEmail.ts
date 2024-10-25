import { magicLinksTemplate } from './magic-links-template'

const generateForgotPasswordEmail = async ({ token, user }): Promise<string> => {
  let resetUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/reset/${token}`

  return magicLinksTemplate({ resetPasswordLink: resetUrl, user })
}

export default generateForgotPasswordEmail
