import { HomeAdvertsDataProvider } from '@/context/home/home-context'
import EditAdvertMainView from '@/sections/edit-advert/main-view'
import React from 'react'

export default function EditPage({params}) {
  return (
    <HomeAdvertsDataProvider>
      <EditAdvertMainView id={params.id} />
    </HomeAdvertsDataProvider>
    
  )
}
