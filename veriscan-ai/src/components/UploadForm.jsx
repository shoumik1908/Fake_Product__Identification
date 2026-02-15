import { useState } from 'react';

export default function UploadForm({ onVerify, isLoading }) {
    const [productId, setProductId] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (productId && selectedFile) {
            onVerify(productId, selectedFile);
        }
    };

    return (
        <form className="upload-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="product-id">Product ID</label>
                <input
                    type="text"
                    id="product-id"
                    placeholder="Enter Product ID"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    required
                />
            </div>

            <div className="form-group file-upload">
                <label htmlFor="image-upload" className="file-label">
                    {previewUrl ? (
                        <div className="image-preview" style={{ backgroundImage: `url(${previewUrl})` }}></div>
                    ) : (
                        <div className="upload-placeholder">
                            <span>Click to Upload Image</span>
                        </div>
                    )}
                </label>
                <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                    style={{ display: 'none' }}
                />
            </div>

            <button type="submit" className="btn-primary" disabled={isLoading}>
                {isLoading ? 'Verifying...' : 'Verify Authenticity'}
            </button>
        </form>
    );
}
