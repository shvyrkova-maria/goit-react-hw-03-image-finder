import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalContent } from 'components/Modal/Modal.styled';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.toggleModal();
    }
  };

  handleOnOverlayClick = event => {
    if (event.target === event.currentTarget) {
      this.props.toggleModal();
    }
  };

  render() {
    return createPortal(
      <Overlay onClick={this.handleOnOverlayClick}>
        <ModalContent>{this.props.children}</ModalContent>
      </Overlay>,
      modalRoot,
    );
  }
}

export default Modal;
