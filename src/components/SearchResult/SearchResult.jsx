import { Component } from 'react';
import Spinner from 'components/Spinner/Spinner';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Notification from 'components/Notification/Notification';
import Modal from 'components/Modal/Modal';
import fetchImages from 'services/pixabayApi';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class SearchResult extends Component {
  state = {
    status: Status.IDLE,
    images: [],
    activeImage: null,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearchQuery = prevProps.searchQuery;
    const newSearchQuery = this.props.searchQuery;
    const prevPage = prevProps.page;
    const newPage = this.props.page;

    if (prevSearchQuery !== newSearchQuery) {
      this.setState({ images: [] });
      this.fetchImagesOnClick();
    }

    if (prevPage !== newPage && this.props.page !== 1) {
      this.fetchImagesOnClick();
    }
  }

  fetchImagesOnClick = () => {
    this.setState({ status: Status.PENDING });

    fetchImages(this.props.searchQuery, this.props.page)
      .then(({ hits }) => {
        if (hits.length === 0) {
          // this.setState({
          //   error: "Sorry, we couldn't find any matches",
          //   status: Status.REJECTED,
          // });
          alert("Sorry, we couldn't find any matches");
        } else {
          this.setState(({ images }) => ({
            images: [...images, ...hits],
            status: Status.RESOLVED,
          }));
        }
      })
      .catch(error => {
        this.setState({ error, status: Status.REJECTED });
      });
  };

  resetActiveImage = () => {
    this.setState({ activeImage: null });
  };

  handleImageClick = activeImage => {
    this.setState({ activeImage });
  };

  render() {
    const { images, error, status, activeImage } = this.state;

    if (status === Status.IDLE) return <></>;
    if (status === Status.PENDING) return <Spinner />;
    if (status === Status.REJECTED) return <Notification text={error} />;
    if (status === Status.RESOLVED) {
      return (
        <>
          <ImageGallery images={images} onImageClick={this.handleImageClick} />
          <Button onClick={this.props.onClick} />
          {activeImage && (
            <Modal closeModal={this.resetActiveImage}>
              <img
                id={activeImage.id}
                src={activeImage.largeImageURL}
                alt={activeImage.tags}
              />
            </Modal>
          )}
        </>
      );
    }
  }
}

export default SearchResult;

// Enjoy ImageFinder.
// return <Notification text="Type a keyword to start searching images" />;
