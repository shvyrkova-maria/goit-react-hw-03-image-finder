import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from 'components/ImageGallery/ImageGallery.styled';

function ImageGallery({ images, onImageClick }) {
  return (
    <Gallery>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          id={id}
          imageSrc={webformatURL}
          onClick={() => onImageClick({ id, largeImageURL, tags })}
          alt={tags}
        />
      ))}
    </Gallery>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      webformatURL: PropTypes.string,
      largeImageURL: PropTypes.string,
      tags: PropTypes.string,
    }),
  ),
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGallery;
