import Loader from 'react-loader-spinner';
import { LoaderContainer } from './Spinner.styled';

function Spinner() {
  return (
    <LoaderContainer>
      <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={5000}
      />
    </LoaderContainer>
  );
}

export default Spinner;
