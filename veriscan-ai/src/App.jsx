import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import UploadForm from './components/UploadForm';
import Results from './components/Results';
import Footer from './components/Footer';

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleVerify = async (productId, file) => {
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('product_id', productId);
    formData.append('image', file);

    const BACKEND_URL = import.meta.env.PROD
      ? 'https://shoumik1908-veriscan-backend.hf.space/verify'
      : 'http://127.0.0.1:8000/verify';

    try {
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Verification failed. Please try again.');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError('An error occurred during verification. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Header />
      <main>
        <Hero />
        <div className="card">
          <UploadForm onVerify={handleVerify} isLoading={loading} />
          {error && <div className="error-message">{error}</div>}
          <Results data={result} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
