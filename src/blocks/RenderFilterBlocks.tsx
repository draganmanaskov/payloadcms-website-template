import React, { Fragment } from 'react'

import type { Filter } from '@/payload-types'

import FilterArchiveBlock from '@/blocks/FilterArchiveBlock/Component'

const blockComponents = {
  filterArchive: FilterArchiveBlock,
}

export const RenderFilterBlocks: React.FC<{
  locale: string
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
                <Fragment key={index}>
                  <Block block={block} type={type} locale={locale} />
                </Fragment>
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
