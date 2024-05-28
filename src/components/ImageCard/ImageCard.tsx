import css from './ImageCard.module.css';

interface ImageCardProps {
  src: string;
  alt: string;
  onImageClick: () => void;
}

export default function ImageCard({ src, alt, onImageClick }: ImageCardProps) {
  return (
    <div>
      <img
        className={css.smallImage}
        onClick={onImageClick}
        src={src}
        alt={alt}
        width="250"
        height="250"
      />
    </div>
  );
}
