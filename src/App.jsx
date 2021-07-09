import { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Searchbar from 'components/Searchbar/Searchbar';
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

class App extends Component {
  state = {
    status: Status.IDLE,
    searchQuery: '',
    page: 1,
    images: [],
    activeImage: null,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, searchQuery } = this.state;

    if (prevState.searchQuery !== searchQuery) {
      this.setState({ images: [] });
      this.fetchImagesOnClick(searchQuery, page);
    }

    if (prevState.page !== page && page !== 1) {
      this.fetchImagesOnClick(searchQuery, page);
    }
  }

  fetchImagesOnClick = (searchQuery, page) => {
    this.setState({ status: Status.PENDING });

    fetchImages(searchQuery, page)
      .then(({ hits }) => {
        if (hits.length === 0) {
          this.setState({ status: Status.IDLE });
          toast.error("Sorry, we couldn't find any matches");
        } else {
          this.setState(({ images }) => ({
            images: [...images, ...hits],
            status: Status.RESOLVED,
          }));

          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
          });
        }
      })
      .catch(error => {
        this.setState({ error, status: Status.REJECTED });
      });
  };

  handleSubmitForm = value => {
    this.setState({ searchQuery: value, page: 1 });
  };

  handleButtonClick = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  resetActiveImage = () => {
    this.setState({ activeImage: null });
  };

  handleImageClick = activeImage => {
    this.setState({ activeImage });
  };

  render() {
    const {
      handleSubmitForm,
      handleButtonClick,
      handleImageClick,
      resetActiveImage,
    } = this;

    const { images, error, status, activeImage } = this.state;

    return (
      <>
        <Searchbar onSubmit={handleSubmitForm} toast={toast} />
        {status === Status.IDLE && <></>}
        {status === Status.PENDING && <Spinner />}
        {status === Status.REJECTED && <Notification text={error} />}
        {status === Status.RESOLVED && (
          <>
            <ImageGallery images={images} onImageClick={handleImageClick} />
            <Button onClick={handleButtonClick} />
            {activeImage && (
              <Modal closeModal={resetActiveImage}>
                <img src={activeImage.largeImageURL} alt={activeImage.tags} />
              </Modal>
            )}
          </>
        )}
        <Toaster
          position="top-right"
          containerStyle={{ top: 100 }}
          toastOptions={{
            style: {
              border: '1px solid #3f51b5',
              padding: '12px',
              color: '#212121',
            },
          }}
        />
      </>
    );
  }
}

export default App;
