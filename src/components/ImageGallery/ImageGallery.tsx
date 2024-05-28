import { useRef, useEffect } from 'react';
import ImageCard from '../ImageCard/ImageCard';
import { Image } from '../../gallery-api';
import css from './ImageGallery.module.css';

interface ImageGalleryProps {
  images: Image[];
  onImageClick: (image: Image) => void;
}

export default function ImageGallery({
  images,
  onImageClick,
}: ImageGalleryProps) {
  const lastImageRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (lastImageRef.current) {
      lastImageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [images]);

  return (
    <ul className={css.galleryList}>
      {images.map((image, index) => (
        <li
          className={css.galleryListItem}
          key={image.id}
          ref={index === images.length - 1 ? lastImageRef : null}
        >
          <ImageCard
            onImageClick={() => onImageClick(image)}
            src={image.urls.small}
            alt={image.alt_description}
          />
        </li>
      ))}
    </ul>
  );
}
