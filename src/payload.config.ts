import { s3Storage } from '@payloadcms/storage-s3'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
// import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/plugin-cloud'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import {
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  ItalicFeature,
  LinkFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import sharp from 'sharp' // editor-import
import { UnderlineFeature } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import Categories from '@/payload/collections/Categories'
import { Media } from '@/payload/collections/Media'
import { Pages } from '@/payload/collections/Pages'
import { Posts } from '@/payload/collections/Posts'
import Users from '@/payload/collections/Users'
// import { seedHandler } from './endpoints/seedHandler'
import { Footer } from '@/Footer/config'
import { Header } from '@/payload/globals/Header/config'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { Page, Post } from 'src/payload-types'
import Products from '@/payload/collections/Products'
import Inventories from '@/payload/collections/Inventories/config'
import Designs from '@/payload/collections/Designs'
import { Filter } from '@/payload/globals/Filter'
import { showToAdmin } from '@/payload/hidden/showToAdmin'
import Orders from '@/payload/collections/Orders'

import nodemailerSendgrid from 'nodemailer-sendgrid'
import Tags from './payload/collections/Tags'
import Colors from './payload/collections/Options/Colors'
import Sizes from './payload/collections/Options/Sizes'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Payload Website Template` : 'Payload Website Template'
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  return doc?.slug
    ? `${process.env.NEXT_PUBLIC_SERVER_URL!}/${doc.slug}`
    : process.env.NEXT_PUBLIC_SERVER_URL!
}

export default buildConfig({
  admin: {
    // components: {
    //   // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
    //   // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
    //   beforeLogin: ['@/components/BeforeLogin'],
    //   // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
    //   // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
    //   beforeDashboard: ['@/components/BeforeDashboard'],
    // },
    // components: {
    //   views: {
    //     Account : CustomAccount
    //   }
    // },
    dependencies: {},
    components: {
      // actions: ['@/payload/actions/Test'],
      Nav: {
        path: '@/payload/views/Nav',
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  email: nodemailerAdapter({
    defaultFromAddress: 'dmanaskov@hotmail.com',
    defaultFromName: 'Mega Desigsn',
    transportOptions: {
      host: process.env.SMTP_HOST,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      port: process.env.SMTP_PORT,
      secure: false,
    },
    // Nodemailer transportOptions
    // transportOptions: nodemailerSendgrid({
    //   apiKey: process.env.SENDGRID_API_KEY,
    // }),
  }),
  localization: {
    locales: [
      {
        label: {
          en: 'English',
          mk: 'Англиски',
        },
        code: 'en',
      },
      {
        label: {
          en: 'Macedonian',
          mk: 'Македониски',
        },
        code: 'mk',
      },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => {
      return [
        ...defaultFeatures,
        UnderlineFeature(),
        BoldFeature(),
        ItalicFeature(),
        LinkFeature({
          enabledCollections: ['pages'],
          fields: ({ defaultFields }) => {
            const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
              if ('name' in field && field.name === 'url') return false
              return true
            })

            return [
              ...defaultFieldsWithoutUrl,
              {
                name: 'url',
                type: 'text',
                admin: {
                  condition: ({ linkType }) => linkType !== 'internal',
                },
                label: ({ t }) => t('fields:enterURL'),
                required: true,
              },
            ]
          },
        }),
      ]
    },
  }),
  // database-adapter-config-start
  db: postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URI,
    },
  }),
  // database-adapter-config-end
  collections: [
    Pages,
    Posts,
    Media,
    Categories,
    Users,
    Products,
    Inventories,
    Designs,
    Orders,
    Tags,
    Colors,
    Sizes,
  ],
  cors: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),
  csrf: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),
  endpoints: [
    // The seed endpoint is used to populate the database with some example data
    // You should delete this endpoint before deploying your site to production
    // {
    //   handler: seedHandler,
    //   method: 'get',
    //   path: '/seed',
    // },
  ],
  globals: [Header, Footer, Filter],
  plugins: [
    s3Storage({
      collections: {
        media: {
          prefix: 'media',
        },
      },
      disableLocalStorage: true,
      acl: 'private',
      bucket: process.env.S3_BUCKET as string,
      config: {
        endpoint: process.env.S3_ENDPOINT,
        forcePathStyle: true,
        region: 'us-east-1', // Dummy region to avoid error
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY as string,
          secretAccessKey: process.env.S3_SECRET_KEY as string,
        },
      },
    }),

    redirectsPlugin({
      collections: ['pages'], //'products'

      overrides: {
        // @ts-expect-error
        fields: ({ defaultFields }) => {
          return defaultFields.map((field) => {
            if ('name' in field && field.name === 'from') {
              return {
                ...field,
                admin: {
                  description: 'You will need to rebuild the website when changing this field.',
                },
              }
            }
            return field
          })
        },
        hooks: {
          afterChange: [revalidateRedirects],
        },
        admin: {
          hidden: showToAdmin,
        },
      },
    }),
    nestedDocsPlugin({
      collections: ['categories', 'designs'],
      // breadcrumbsFieldSlug: (test) => test.title,
      generateLabel: (_, doc) => doc.title as string,
      generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
    }),
    seoPlugin({
      generateTitle,
      generateURL,
    }),
    formBuilderPlugin({
      fields: {
        payment: false,
      },
      formOverrides: {
        fields: ({ defaultFields }) => {
          return defaultFields.map((field) => {
            if ('name' in field && field.name === 'confirmationMessage') {
              return {
                ...field,
                editor: lexicalEditor({
                  features: ({ rootFeatures }) => {
                    return [
                      ...rootFeatures,
                      FixedToolbarFeature(),
                      HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    ]
                  },
                }),
              }
            }
            return field
          })
        },
        admin: {
          hidden: showToAdmin,
        },
      },
      formSubmissionOverrides: {
        admin: {
          hidden: showToAdmin,
        },
      },
    }),
    payloadCloudPlugin(), // storage-adapter-placeholder
  ],
  secret: process.env.PAYLOAD_SECRET!,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
