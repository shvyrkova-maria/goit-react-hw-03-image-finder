import PropTypes from 'prop-types';
import {
  Container,
  Message,
} from 'components/Notification/Notification.styled';

function Notification({ text }) {
  return (
    <Container>
      <Message>{text}</Message>
    </Container>
  );
}

Notification.defaultProps = {
  text: 'Something went wrong, please try again later ',
};

Notification.propTypes = {
  text: PropTypes.string,
};

export default Notification;
