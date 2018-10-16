import React, { Component } from 'react';
import './App.css';
import BookService from './bookService/BookService';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BookService />
      </div>
    );
  }
}

export default App;
