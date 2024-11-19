import styles from './Loader.module.css'

export default function Loader() {
  return (
    <div className={styles.hloader}>
      <svg viewBox="22.857142857142858 22.857142857142858 45.714285714285715 45.714285714285715">
        <circle
          cx="45.714285714285715"
          cy="45.714285714285715"
          r="20"
          stroke-width="5.714285714285714"
          stroke-dasharray="125.664"
          stroke-dashoffset="125.66370614359172px"></circle>
      </svg>
    </div>
  )
}
