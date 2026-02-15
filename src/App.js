import React from 'react';
import Essay1 from './Essay1';
import Essay2 from './Essay2';

function App() {
  return (
    <div className="App" style={{ maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Translation Demo</h1>
      
      {/* LibreTranslate Component */}
      <Essay1 />
      
      {/* Google Translate Wrapper Component */}
      <Essay2 />
    </div>
  );
}

export default App;