import { titleFont } from '@/config';
import React from 'react'

interface Props {
  title: string;
  subTitile?: string;
  className?: string
}

export const Title = ({title, className, subTitile}:Props) => {
  return (
    <div className={`mt-3 ${className}`}>
      <h1 className={`${titleFont.className} antialiased text-4xl font-semibold my-5`}>
      {title}
      </h1>

      {
        subTitile && (
          <h3 className='text-xl mb-5'>{subTitile }</h3>
        )
      }
    </div>
  )
}
