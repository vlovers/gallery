import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Gallery } from './pages/gallery';
import store from './reducers/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
      <Provider store={store}>
          <Gallery />
      </Provider>
);
