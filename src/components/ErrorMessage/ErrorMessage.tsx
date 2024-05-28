import css from './ErrorMessage.module.css';

export default function ErrorMessage() {
  return (
    <>
      <p className={css.error}>Oops :(</p>
      <p className={css.error}>There was an error, please reload!!</p>
    </>
  );
}
