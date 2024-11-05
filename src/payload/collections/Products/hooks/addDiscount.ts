import { Product } from '@/payload-types'
import type { CollectionBeforeReadHook } from 'payload'

export const addDiscount: CollectionBeforeReadHook<Product> = async ({
  doc, // full document data
  req, // full express request
  query, // JSON formatted query
}) => {
  return doc
}
