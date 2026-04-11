import { useState } from 'react';
import AuthForm from './AuthForm';
import Results from './Results';

export default function Hero() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleVerify = async (productId, productName, productBrand) => {
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('product_id', productId);
    if (productName) formData.append('product_name', productName);
    if (productBrand) formData.append('product_brand', productBrand);

    const BACKEND_URL = import.meta.env.PROD
      ? 'https://shoumik1908-veriscan-backend.hf.space/verify'
      : 'http://127.0.0.1:8000/verify';

    try {
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Verification failed. Please try again.');
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError('Verification failed. Please check the product ID and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-inner">
        {/* Left column: Heading + result feedback */}
        <div className="hero-left">
          <h1 className="hero-heading">
            Verify Your<br />Product Instantly
          </h1>
          <p style={{ fontSize: '1rem', color: '#475569', marginTop: '0.75rem', lineHeight: '1.6', maxWidth: '380px' }}>
            Instantly authenticate your products using AI-powered verification.<br />
            Protect yourself from counterfeits in seconds.
          </p>

          {/* Results shown below heading on desktop */}
          {result && (
            <div style={{ marginTop: '1.5rem', maxWidth: '420px' }}>
              <Results data={result} />
            </div>
          )}
          {error && (
            <div className="error-message" style={{ maxWidth: '420px', marginTop: '1.5rem' }}>
              {error}
            </div>
          )}
        </div>

        {/* Right column: Auth card */}
        <div className="hero-right">
          <AuthForm onVerify={handleVerify} isLoading={loading} />
        </div>
      </div>
    </section>
  );
}
