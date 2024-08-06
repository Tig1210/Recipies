import styles from "./Error.module.scss"

export const Error = ({ err }) => {
  return (
    <div className={styles.main}>
      <p>{err}</p>
    </div>
  )
}
