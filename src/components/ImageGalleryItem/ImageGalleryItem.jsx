import PropTypes from 'prop-types';
import defaultImage from 'components/ImageGalleryItem/placeholder-image.jpg';
import {
  GalleryItem,
  GalleryImage,
} from 'components/ImageGalleryItem/ImageGalleryItem.styled';

function ImageGalleryItem({ id, imageSrc, alt, onClick }) {
  return (
    <GalleryItem>
      <GalleryImage
        id={id}
        src={imageSrc}
        alt={alt}
        loading="lazy"
        onClick={onClick}
      />
    </GalleryItem>
  );
}

ImageGalleryItem.defaultProps = {
  imageSrc: defaultImage,
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  imageSrc: PropTypes.string,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
