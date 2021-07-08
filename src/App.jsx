import { Component } from 'react';
import './App.css';
import Searchbar from 'components/Searchbar/Searchbar';
import SearchResult from 'components/SearchResult/SearchResult';

class App extends Component {
  state = {
    searchQuery: '',
  };

  handleSubmitForm = value => {
    this.setState({ searchQuery: value });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleSubmitForm} />
        <SearchResult searchQuery={this.state.searchQuery} />
      </>
    );
  }
}

export default App;
