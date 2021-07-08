import { Component } from 'react';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchInput,
} from 'components/Searchbar/Searchbar.styled';

const INITIAL_STATE = {
  value: '',
};

class Searchbar extends Component {
  state = {
    ...INITIAL_STATE,
  };

  handleChange = event => {
    this.setState({ value: event.target.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { value } = this.state;

    if (value.trim() === '') {
      alert('Type a keyword to start searching images');
    }

    this.props.onSubmit(value);
    this.formReset();
  };

  formReset = () => {
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { handleChange, handleSubmit } = this;
    return (
      <Header>
        <SearchForm onSubmit={handleSubmit}>
          <SearchFormButton type="submit" />
          <SearchInput
            type="text"
            value={this.state.value}
            onChange={handleChange}
            debounceTimeout={1000}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Header>
    );
  }
}

export default Searchbar;
