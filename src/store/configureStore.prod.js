import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import axios from 'axios'
import axiosMiddleware from 'redux-axios-middleware'
import rootReducer from '../reducers'
import { routerMiddleware } from 'react-router-redux'
import { APIRoot } from '../constants/constants'
import update from 'immutability-helper';
import { autoRehydrate } from 'redux-persist';

export default function configureStore(history, initialState = {}) {
  const client = axios.create({
     baseURL: APIRoot,
     headers: {
       'Accept': 'application/vnd.blabla-clone-v1+json',
       'Content-Type': 'application/json'
     },
     responseType: 'json'
  })

  client.interceptors.request.use((config) => {
    if (!store.getState().session.email) {
      return config;
    } else {
      const { session } = store.getState()
      return update(config, {
        $merge: {
          headers: {
            'X-User-Email': session.email,
            'X-User-Token': session.access_token
          },
        },
      });
    }
  });

  const rMiddleware = routerMiddleware(history)

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        thunk,
        rMiddleware,
        axiosMiddleware(client)
      ),
      autoRehydrate(),
    )
  )

  return store
}
