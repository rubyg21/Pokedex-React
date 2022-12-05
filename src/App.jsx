import {AppRouter} from './AppRouter'

import React from 'react'
import { PokeonProvider } from './context/PokeonProvider'

export const App = () => {
  return (
    
    <PokeonProvider>
      <AppRouter />
    </PokeonProvider>
  )
}

