import React from 'react'; 
import PropTypes from 'prop-types'; 


function App({ children }) { 
  return (
    <div className="container"> 
      {children}
    </div>
  );
}

App.propTypes = { children: PropTypes.object };

export default App;
