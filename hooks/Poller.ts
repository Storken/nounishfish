import { useEffect, useRef } from 'react'

// helper hook to call a function regularly in time intervals

export default function usePoller (fn: any, delay: any, extraWatch: any) {
  const savedCallback = useRef()
  // Remember the latest fn.
  useEffect(() => {
    savedCallback.current = fn
  }, [fn])
  // Set up the interval.
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    function tick () {
      //@ts-ignore
      savedCallback.current()
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
  // run at start too
  useEffect(() => {
    fn()
  }, [extraWatch])
}
