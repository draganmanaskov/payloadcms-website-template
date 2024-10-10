import React, { Fragment } from 'react'

import type { Filter } from '@/payload-types'

import { FilterArchiveBlock } from '@/blocks/FilteArchiveBlock/Component'

const blockComponents = {
  filterArchive: FilterArchiveBlock,
}

export const RenderFilterBlocks: React.FC<{
  locale: 'string'
  blocks: Filter['layout'][0][]
  type: 'desktop' | 'mobile'
}> = (props) => {
  const { blocks, type, locale } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  {/* @ts-expect-error */}
                  <Block {...block} type={type} locale={locale} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
