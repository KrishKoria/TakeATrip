import React from 'react';

import './LoadingSpinner.css';

export const LoadingSpinner = props => {
  return (
    <div className={`${props.asOverlay && 'loading-screen'}`}>
      <div className="loading-spinner">

      </div>
    </div>
  );
};


