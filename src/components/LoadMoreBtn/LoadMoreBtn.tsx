import css from './LoadMoreBtn.module.css';

interface LoadMoreBtnProps {
  onClick: () => void;
}

export default function LoadMoreBtn({ onClick }: LoadMoreBtnProps) {
  return (
    <div className={css.LoadMoreBtnWrapper}>
      <button onClick={onClick} className={css.loadMoreBtn}>
        Load more
      </button>
    </div>
  );
}
