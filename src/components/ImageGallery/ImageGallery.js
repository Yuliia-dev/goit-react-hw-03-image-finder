import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';

export default function ImageGallery({ openModal, images }) {
  return (
    <ImageGalleryList>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            imgForModal={() => {
              openModal(largeImageURL);
            }}
            data={{ id, webformatURL, tags, largeImageURL }}
          />
        );
      })}
    </ImageGalleryList>
  );
}
ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ),
  openModal: PropTypes.func.isRequired,
};
