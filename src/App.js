import React, { Component } from 'react';
import { TextEditor } from './components';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="editor">
          <TextEditor/>
        </div>
      </div>
    );
  }
}

export default App;
