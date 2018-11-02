import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <Provider store={storeInstance}>
    <App />
    </Provider>, 
    document.getElementById('root')
);
