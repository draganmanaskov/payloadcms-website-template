'use client'
import { useFormFields, useAllFormFields } from '@payloadcms/ui'
import { useEffect, useState } from 'react'
import qs from 'qs'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { StockKeepingUnit } from '@/payload-types'

const GenerateSKUsComponent = (props) => {
  const [fields, dispatchFields] = useAllFormFields()

  const [variants, setVariants] = useState<StockKeepingUnit[] | null>(null)

  useEffect(() => {
    if (!fields.baseSku.initialValue) return
    fetchData()
  }, [fields.baseSku.initialValue])

  const fetchData = async () => {
    const query = {
      sku: {
        // property name to filter on
        contains: fields.baseSku.initialValue, // operator to use and value to compare against
      },
    }

    const stringifiedQuery = qs.stringify(
      {
        where: query, // ensure that `qs` adds the `where` property, too!
      },
      { addQueryPrefix: true },
    )
    console.log(stringifiedQuery)
    try {
      const req = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/stockKeepingUnits${stringifiedQuery}`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      const data = await req.json()

      setVariants(data.docs)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {variants ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">SKU</TableHead>
              <TableHead>Color</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {variants.map((variant) => (
              <TableRow key={variant.sku}>
                <TableCell className="font-medium">{variant.sku}</TableCell>
                <TableCell>{variant.color}</TableCell>
                <TableCell>{variant.size}</TableCell>
                <TableCell>{variant.capacity}</TableCell>
                <TableCell className="text-right">{variant.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : null}
    </>
  )
}

export default GenerateSKUsComponent
