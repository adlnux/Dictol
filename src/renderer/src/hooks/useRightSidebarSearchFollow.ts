import { useEffect } from 'react'
import { useMatch } from 'react-router-dom'

import { useAppStore } from '@/stores/app-store'

export function useRightSidebarSearchFollow(): void {
  const term = useMatch('/search/:term')?.params.term?.trim()
  const follow = useAppStore((state) => state.followRightSidebarSearch)
  const followTabs = useAppStore((state) => state.followSearchInRightSidebarTabs)

  useEffect(() => {
    if (follow && term) followTabs(term)
  }, [follow, followTabs, term])
}
