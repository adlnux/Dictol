import { useLayoutEffect } from 'react'

export function useMainWindowChrome(): void {
  useLayoutEffect(() => {
    const root = document.documentElement
    if (window.dictol.platform === 'darwin') {
      root.dataset.chromeVibrancy = 'on'
    } else {
      delete root.dataset.chromeVibrancy
    }

    let active = true
    let receivedFocusEvent = false
    const unsubscribe = window.dictol.app.onMainWindowFocusChanged((isFocused) => {
      receivedFocusEvent = true
      root.dataset.windowActive = String(isFocused)
    })

    void window.dictol.app.isMainWindowFocused().then((isFocused) => {
      if (active && !receivedFocusEvent) root.dataset.windowActive = String(isFocused)
    })

    return () => {
      active = false
      unsubscribe()
      delete root.dataset.windowActive
      delete root.dataset.chromeVibrancy
    }
  }, [])
}
