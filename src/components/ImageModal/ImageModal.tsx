import Modal from 'react-modal';
import { Image } from '../../gallery-api';
import css from './ImageModal.module.css';

Modal.setAppElement('#root');

interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedImage: Image | null;
}

export default function ImageModal({
  isOpen,
  onRequestClose,
  selectedImage,
}: ImageModalProps) {
  return (
    <Modal
      className={css.modal}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Image Modal"
    >
      {selectedImage && (
        <>
          <img
            className={css.modalImage}
            src={selectedImage.urls.regular}
            alt={selectedImage.alt_description || 'Image'}
            width="897"
            height="600"
          />
          <p className={css.descModal}>Likes: {selectedImage.likes}</p>
          {selectedImage.description && (
            <p className={css.descModal}>
              Description: {selectedImage.description}
            </p>
          )}
          <p className={css.descModal}>Author: {selectedImage.user.name}</p>
        </>
      )}
    </Modal>
  );
}
