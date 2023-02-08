import { applyMiddleware, compose, createStore } from "redux";
import reducer from "./index";

/**
 * Create store with default Redux Devtools
 */
const store = createStore(
  reducer,
  // @ts-ignore
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? compose(
        applyMiddleware(/* swClientMiddleware as any */),
        // @ts-ignore
        // eslint-disable-next-line no-underscore-dangle
        (window.__REDUX_DEVTOOLS_EXTENSION__ &&
          // @ts-ignore
          // eslint-disable-next-line no-underscore-dangle
          window.__REDUX_DEVTOOLS_EXTENSION__()) ||
          undefined
      )
    : applyMiddleware(/* swClientMiddleware as any */)
);

export default store;
