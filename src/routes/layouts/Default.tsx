import { motion, AnimatePresence } from 'framer-motion'
import { useLocation, useOutlet, ScrollRestoration } from 'react-router-dom'
import Header from '@/components/Header'

export default function DefaultLayout() {
  const location = useLocation()
  const outlet = useOutlet()
  //Fragment
  return (
    <>
      <Header />
      <AnimatePresence>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, position: 'absolute' }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, position: 'absolute' }}
          transition={{ duration: 0.3 }}>
          {outlet}
        </motion.div>
      </AnimatePresence>
      <ScrollRestoration />
    </>
  )
}
