import React, { useState, useEffect } from 'react';

const Essay1 = () => {
  const [language, setLanguage] = useState('en');
  const [languages, setLanguages] = useState([]); // Empty at start
  const [content, setContent] = useState(
    "Artificial Intelligence is changing the world. It helps doctors diagnose diseases."
  );
  const [originalText] = useState(content);

  // 1. Fetch ALL supported languages from your server on startup
  useEffect(() => {
    fetch("http://localhost:5000/languages")
      .then(res => res.json())
      .then(data => {
        setLanguages(data); // This will load all 30+ languages automatically
      })
      .catch(err => console.error("Could not load languages. Is server running?", err));
  }, []);

  // 2. Handle Translation
  useEffect(() => {
    const translateText = async () => {
      if (language === 'en') {
        setContent(originalText);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/translate", {
          method: "POST",
          body: JSON.stringify({
            q: originalText,
            source: "en",
            target: language,
            format: "text"
          }),
          headers: { "Content-Type": "application/json" }
        });

        const data = await response.json();
        if (data.translatedText) setContent(data.translatedText);
      } catch (error) {
        console.error("LibreTranslate Error:", error);
      }
    };

    translateText();
  }, [language, originalText]);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px', borderRadius: '8px' }}>
      <h2>Essay 1: LibreTranslate (All Languages)</h2>
      
      <label style={{ marginRight: '10px' }}>Select Language:</label>
      <select 
        value={language} 
        onChange={(e) => setLanguage(e.target.value)}
        style={{ padding: '5px', fontSize: '16px' }}
      >
        <option value="en">English</option>
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
        <p style={{ fontSize: '18px', lineHeight: '1.6' }}>{content}</p>
      </div>
    </div>
  );
};

export default Essay1;