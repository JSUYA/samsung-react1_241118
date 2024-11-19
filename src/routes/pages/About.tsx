import { motion } from 'framer-motion'

export default function About() {
  return (
    <>
      <h1>About</h1>
      <motion.div
        initial={{ width: '100px', backgroundColor: '#F00' }}
        animate={{
          width: '200px',
          backgroundColor: '#F0F',
          position: 'absolute'
        }}
        exit={{ position: 'absolute' }}
        transition={{
          width: { duration: 3, delay: 1 },
          backgroundColor: { duration: 3, delay: 1, ease: 'easeInOut' } // backgroundColor도 부드럽게
        }}>
        <div style={{ height: '100px' }}></div>
      </motion.div>
    </>
  )
}
