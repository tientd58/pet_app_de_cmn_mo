import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import ConnectedRootContainer from './Root';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRootContainer />
            </Provider>
      );
    }
}

export default App;
