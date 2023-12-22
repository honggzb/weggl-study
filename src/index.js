import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
// remove StrictMode
// React Hooks: useEffect() is called twice even if an empty array is used as an argument
// https://stackoverflow.com/questions/60618844/react-hooks-useeffect-is-called-twice-even-if-an-empty-array-is-used-as-an-ar
root.render(
  <App />
);

/**
 * You can also use a custom hook to run your effect only once.
https://github.com/facebook/react/issues/24502#issuecomment-1118867879

useEffect(() => {
  let ignore = false;
  fetchStuff().then(res => {
    if (!ignore) setResult(res)
  })
  return () => { ignore = true }
}, [])

*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
