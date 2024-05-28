import { useEffect, useState, ChangeEvent } from 'react';
import { fetchGallery, Image } from '../../gallery-api';
import ImageGallery from '../ImageGallery/ImageGallery';
import SearchBar from '../SearchBar/SearchBar';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';
import { GalleryResponse } from '../../gallery-api';

export default function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [searched, setSearched] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  useEffect(() => {
    async function getImages(): Promise<void> {
      try {
        if (searched) {
          setLoading(true);
          const data: GalleryResponse = await fetchGallery(query, page);
          setImages(prevImages => [...prevImages, ...data.results]);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getImages();
  }, [query, page, searched]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value);
    setPage(1);
    setSearched(false);
  };

  const handleLoadMore = (): void => {
    setPage(prevPage => prevPage + 1);
  };

  const handleSearch = (): void => {
    if (query.trim() !== '') {
      setImages([]);
      setSearched(true);
      setPage(1);
    }
  };

  const openModal = (image: Image): void => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = (): void => {
    setSelectedImage(null);
    setModalIsOpen(false);
  };

  return (
    <>
      <SearchBar
        query={query}
        handleChange={handleChange}
        handleSearch={handleSearch}
      />
      {images.length > 0 && (
        <ImageGallery onImageClick={openModal} images={images} />
      )}
      {error && <ErrorMessage />}
      {loading && <Loader />}
      {images.length > 0 && !loading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      <ImageModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        selectedImage={selectedImage}
      />
    </>
  );
}
