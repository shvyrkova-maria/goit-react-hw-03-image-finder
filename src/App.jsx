import { Component } from 'react';
import './App.css';
import Searchbar from 'components/Searchbar/Searchbar';
import SearchResult from 'components/SearchResult/SearchResult';

class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
  };

  handleSubmitForm = value => {
    this.setState({ searchQuery: value, page: 1 });
  };

  handleButtonClick = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  render() {
    const { handleSubmitForm, handleButtonClick } = this;
    const { searchQuery, page } = this.state;
    return (
      <>
        <Searchbar onSubmit={handleSubmitForm} />
        <SearchResult
          searchQuery={searchQuery}
          onClick={handleButtonClick}
          page={page}
        />
      </>
    );
  }
}

export default App;
