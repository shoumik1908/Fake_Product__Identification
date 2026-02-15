export default function Results({ data }) {
    if (!data) return null;

    const { prediction, confidence, blockchain_tx } = data;
    const isReal = prediction.toLowerCase() === 'real' || prediction.toLowerCase().includes('authentic');
    const confidencePercent = (confidence * 100).toFixed(2);

    return (
        <div className={`results-card ${isReal ? 'authentic' : 'fake'}`}>
            <h3>Verification Result</h3>

            <div className="result-item">
                <span className="label">Status:</span>
                <span className="value status">{prediction}</span>
            </div>

            <div className="result-item">
                <span className="label">Accuracy:</span>
                <span className="value">{confidencePercent}%</span>
            </div>

            {blockchain_tx && (
                <div className="result-item">
                    <span className="label">Blockchain TX:</span>
                    <span className="value tx-id" title={blockchain_tx}>{blockchain_tx}</span>
                </div>
            )}
        </div>
    );
}
