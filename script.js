function downloadVideo() {
  const url = document.getElementById("tiktokUrl").value;
  const result = document.getElementById("result");

  if (!url) {
    result.innerHTML = "<p style='color:red'>Masukkan link dulu</p>";
    return;
  }

  result.innerHTML = "<p>Processing...</p>";

  // ======== GANTI ENDPOINT DENGAN SERVER ANDA ========
  fetch("https://your-backend-api.com/api/tiktok?url=" + encodeURIComponent(url))
    .then(res => res.json())
    .then(data => {
      if (!data || !data.download_url) {
        result.innerHTML = "<p style='color:red'>Gagal mengambil video</p>";
        return;
      }

      result.innerHTML = `
        <video width="100%" controls>
          <source src="${data.download_url}" type="video/mp4">
        </video>
        <a class="download-btn" href="${data.download_url}" download>Download Video</a>
      `;
    })
    .catch(() => {
      result.innerHTML = "<p style='color:red'>Terjadi kesalahan server.</p>";
    });
}