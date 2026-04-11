document.getElementById("uploadForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const productId = document.getElementById("productId").value;
    const imageFile = document.getElementById("imageInput").files[0];

    const formData = new FormData();
    formData.append("product_id", productId);
    formData.append("image", imageFile);

    const response = await fetch("http://127.0.0.1:8000/verify", {
        method: "POST",
        body: formData
    });

    const data = await response.json();

    document.getElementById("result").innerHTML = `
        <p><b>Prediction:</b> ${data.prediction}</p>
        <p><b>Confidence:</b> ${(data.confidence * 100).toFixed(2)}%</p>
    `;
});
