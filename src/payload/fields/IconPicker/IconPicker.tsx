import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { cn } from '@/utilities'
import { IconsLucide } from './IconsLucide'

type IconPickerProps = {
  onSelect: (iconName: string) => void
  selectedIcon: string
}

const IconPicker = ({ selectedIcon, onSelect }: IconPickerProps) => {
  const [search, setSearch] = useState('')

  const filteredIcons = Object.keys(IconsLucide).filter((iconName) =>
    iconName.toLowerCase().includes(search.toLowerCase()),
  )

  const handleIconSelect = (iconName: string) => {
    onSelect(iconName)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn('flex items-center px-4 py-6')}>
          {selectedIcon ? (
            <>
              {React.createElement(IconsLucide[selectedIcon], { size: 28 })}
              <span className="ml-2">{selectedIcon}</span>
            </>
          ) : (
            'Select an icon'
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-[400px] h-[350px] p-4" // Fixed height for consistent layout
        align="start"
      >
        {/* Search Input */}
        <Input
          placeholder="Search icons..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-6"
        />

        {/* Icon Grid */}
        <div className="grid grid-cols-5 gap-3 overflow-y-auto max-h-[250px] p-2">
          {/* Scroll only within the grid */}
          {filteredIcons.map((iconName) => {
            const IconComponent = IconsLucide[iconName]
            return (
              <div
                key={iconName}
                onClick={() => handleIconSelect(iconName)}
                className={`flex flex-col items-center p-3 border rounded-lg cursor-pointer transition-all transform hover:scale-110 ${
                  selectedIcon === iconName ? 'border-blue-500 bg-blue-100' : 'border-gray-300'
                } hover:bg-gray-100`}
              >
                <IconComponent
                  size={28}
                  className={selectedIcon === iconName ? 'text-blue-600' : 'text-gray-600'}
                />
                <div className="text-xs text-center">{iconName}</div>
              </div>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default IconPicker
