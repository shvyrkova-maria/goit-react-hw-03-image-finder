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

export default ImageGallery;
