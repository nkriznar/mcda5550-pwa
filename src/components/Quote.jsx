// src/components/Quote.jsx
import { useState, useEffect } from 'react';

function Quote() {
  const [quote, setQuote] = useState({ text: 'Loading quote...', author: '' });

  // Backup quotes for when we are offline
  const fallbackQuotes = [
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Success is not final, failure is not fatal.", author: "Winston Churchill" }
  ];

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        // Try to fetch a random quote from a free API
        const response = await fetch('https://dummyjson.com/quotes/random');

        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        setQuote({ text: data.quote, author: data.author });

      } catch (error) {
        console.log('Offline or API error. Using fallback quote.');
        // If fetch fails (offline), pick a random one from our local list
        const randomFallback = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
        setQuote(randomFallback);
      }
    };

    fetchQuote();
  }, []);

  return (
    <div className="quote-card">
      <blockquote>
        "{quote.text}"
      </blockquote>
      <cite>- {quote.author}</cite>
    </div>
  );
}

export default Quote;