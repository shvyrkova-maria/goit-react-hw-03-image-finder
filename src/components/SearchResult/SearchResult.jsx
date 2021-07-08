import { Component } from 'react';
import Spinner from 'components/Spinner/Spinner';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Notification from 'components/Notification/Notification';
import Modal from 'components/Modal/Modal';
import FetchImagesApi from 'services/pixabayApi';

const fetchImagesApi = new FetchImagesApi();

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
    showModal: false,
    activeImage: {},
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearchQuery = prevProps.searchQuery;
    const newSearchQuery = this.props.searchQuery;

    if (prevSearchQuery !== newSearchQuery) {
      this.setState({ images: [] });
      fetchImagesApi.resetPage();
      this.fetchImagesOnClick();
    }
  }

  fetchImagesOnClick = () => {
    this.setState({ status: Status.PENDING });

    fetchImagesApi
      .fetchImages(this.props.searchQuery)
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

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  handleImageClick = event => {
    this.toggleModal();

    const activeImage = this.state.images.find(
      image => image.id === +event.target.id,
    );

    this.setState({ activeImage });
  };

  render() {
    const { images, error, status, activeImage, showModal } = this.state;
    const { id, largeImageURL, tags } = activeImage;

    if (status === Status.IDLE) return <></>;
    if (status === Status.PENDING) return <Spinner />;
    if (status === Status.REJECTED) return <Notification text={error} />;
    if (status === Status.RESOLVED) {
      return (
        <>
          <ImageGallery images={images} onImageClick={this.handleImageClick} />
          <Button onClick={this.fetchImagesOnClick} />
          {showModal && (
            <Modal toggleModal={this.toggleModal}>
              <img id={id} src={largeImageURL} alt={tags} />
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
