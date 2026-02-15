import React, { useState, useEffect } from 'react';

const Essay2 = () => {
  const [language, setLanguage] = useState('en');
  const [content, setContent] = useState(
    "Nepal is a beautiful country known for Mount Everest. It has a rich culture and friendly people. Tourism is a major part of the economy."
  );
  const [originalText] = useState(
    "Nepal is a beautiful country known for Mount Everest. It has a rich culture and friendly people. Tourism is a major part of the economy."
  );

  // MASSIVE LANGUAGE LIST
  // Note: I removed Newari (new) as it is currently rejected by the MyMemory API endpoint.
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ne', name: 'Nepali' },
    { code: 'hi', name: 'Hindi' },
    { code: 'bho', name: 'Bhojpuri' },
    { code: 'mai', name: 'Maithili' },
    { code: 'sa', name: 'Sanskrit' },
    { code: 'bn', name: 'Bengali' },
    { code: 'pa', name: 'Punjabi' },
    { code: 'ur', name: 'Urdu' },
    { code: 'ta', name: 'Tamil' },
    { code: 'te', name: 'Telugu' },
    { code: 'ml', name: 'Malayalam' },
    { code: 'kn', name: 'Kannada' },
    { code: 'gu', name: 'Gujarati' },
    { code: 'mr', name: 'Marathi' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'zh', name: 'Chinese (Simplified)' },
    { code: 'ar', name: 'Arabic' },
    { code: 'tr', name: 'Turkish' },
    { code: 'vi', name: 'Vietnamese' },
    { code: 'th', name: 'Thai' },
    { code: 'id', name: 'Indonesian' },
    { code: 'ms', name: 'Malay' },
    { code: 'nl', name: 'Dutch' },
    { code: 'sv', name: 'Swedish' },
    { code: 'no', name: 'Norwegian' },
    { code: 'da', name: 'Danish' },
    { code: 'fi', name: 'Finnish' },
    { code: 'pl', name: 'Polish' },
    { code: 'he', name: 'Hebrew' },
    { code: 'el', name: 'Greek' },
    { code: 'cs', name: 'Czech' },
    { code: 'ro', name: 'Romanian' },
    { code: 'hu', name: 'Hungarian' }
  ];

  useEffect(() => {
    const translateText = async () => {
      if (language === 'en') {
        setContent(originalText);
        return;
      }

      try {
        const pair = `en|${language}`;
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(originalText)}&langpair=${pair}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.responseData) {
          setContent(data.responseData.translatedText);
        } else {
          setContent("Translation not available for this language pair.");
        }
      } catch (error) {
        console.error("Translation Error:", error);
        setContent("Error: Connection issue. Please check your internet.");
      }
    };

    translateText();
  }, [language, originalText]);

  return (
    <div style={{ padding: '20px', border: '1px solid #007bff', margin: '20px', borderRadius: '8px', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#007bff' }}>Essay 2: Global Translator (Free API)</h2>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Change Language:</label>
        <select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)}
          style={{ padding: '8px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc', cursor: 'pointer' }}
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ padding: '20px', backgroundColor: '#f0f7ff', borderRadius: '6px', borderLeft: '5px solid #007bff' }}>
        <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#333', margin: 0 }}>
          {content}
        </p>
      </div>
      
      <div style={{ marginTop: '15px', fontSize: '12px', color: '#777' }}>
        <strong>Supported:</strong> Nepali, Bhojpuri, Maithili, Sanskrit + 40 others.
      </div>
    </div>
  );
};

export default Essay2;