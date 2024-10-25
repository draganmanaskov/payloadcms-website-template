import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import * as React from 'react'

import { render } from '@react-email/components'
import { User } from '@/payload-types'

type MagicLinksTemplateProps = {
  resetPasswordLink: string
  user: User
}

export const magicLinksTemplate = ({ resetPasswordLink, user }: MagicLinksTemplateProps) => {
  return render(<AppResetPasswordEmail resetPasswordLink={resetPasswordLink} user={user} />)
}

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : 'http://localhost:3000'

export const AppResetPasswordEmail = ({ resetPasswordLink, user }: MagicLinksTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>Password Reset Request</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`${baseUrl}/api/media/file/logo-v2-light.png`}
            width="150"
            height="50"
            alt="App Logo"
          />
          <Section>
            <Text style={headerText}>Hello {user.name},</Text>
            <Text style={text}>
              We received a request to reset your password. If you made this request, please click
              the button below to set a new password.
            </Text>
            <Button style={button} href={resetPasswordLink}>
              Reset Password
            </Button>
            <Text style={text}>
              If you did not request a password reset, please ignore this email or contact our
              support team if you have any concerns.
            </Text>
            <Text style={footerText}>
              Regards,
              <br />
              The Support Team
            </Text>
            <Text style={footerNote}>
              Please do not share this email with anyone to keep your account secure.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

AppResetPasswordEmail.PreviewProps = {
  resetPasswordLink: 'https://example.com/reset-password',
  user: { name: 'User' },
} as MagicLinksTemplateProps

export default AppResetPasswordEmail

const main = {
  backgroundColor: '#f4f4f7',
  padding: '30px 0',
}

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #dcdcdc',
  padding: '30px 40px',
  borderRadius: '10px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  maxWidth: '600px',
  margin: '0 auto',
}

const headerText = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#333333',
  marginBottom: '20px',
  fontFamily: "'Arial', sans-serif",
}

const text = {
  fontSize: '16px',
  fontFamily: "'Arial', sans-serif",
  color: '#555555',
  lineHeight: '1.5',
  margin: '10px 0',
}

const footerText = {
  fontSize: '16px',
  fontFamily: "'Arial', sans-serif",
  color: '#333333',
  marginTop: '20px',
  lineHeight: '1.5',
}

const footerNote = {
  fontSize: '14px',
  fontFamily: "'Arial', sans-serif",
  color: '#999999',
  marginTop: '15px',
  lineHeight: '1.5',
}

const button = {
  backgroundColor: '#28a745',
  borderRadius: '5px',
  color: '#ffffff',
  fontFamily: "'Arial', sans-serif",
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  width: '220px',
  padding: '12px 0',
  margin: '20px 0',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  ':hover': {
    backgroundColor: '#218838',
  },
}
