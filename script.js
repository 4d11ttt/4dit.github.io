// ==========================================
// KONFIGURASI: GANTI USERNAME GITHUB DI SINI
// ==========================================
const githubUsername = '4d11ttt'; // Ganti dengan username Anda
// ==========================================

const repoList = document.getElementById('repoList');
const profileImage = document.getElementById('profileImage');
const profileName = document.getElementById('profileName');

// Fungsi untuk mengambil data profil (Foto & Link)
async function fetchProfile() {
  try {
    const response = await fetch(`https://api.github.com/users/${githubUsername}`);
    const data = await response.json();
    
    if (data.avatar_url) profileImage.src = data.avatar_url;
    if (data.name) profileName.textContent = data.name;
    // Update link github di tombol sosial pertama
    document.querySelector('.social-links a:first-child').href = data.html_url;
  } catch (error) {
    console.error('Gagal mengambil profil:', error);
  }
}

// Fungsi untuk mengambil repository
async function fetchRepos() {
  try {
    // Mengambil repos, diurutkan dari yang terbaru (sort=updated)
    const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`);
    const repos = await response.json();

    repoList.innerHTML = ''; // Hapus loading text

    repos.forEach(repo => {
      // Warna dot bahasa pemrograman (random untuk variasi)
      const colors = ['#f1e05a', '#e34c26', '#563d7c', '#3178c6', '#3572A5'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const language = repo.language || 'Code';

      const card = document.createElement('div');
      card.className = 'repo-card';
      
      card.innerHTML = `
        <div>
          <div class="repo-header">
            <a href="${repo.html_url}" target="_blank" class="repo-name">
              <i class="far fa-folder-open" style="margin-right:8px"></i>${repo.name}
            </a>
            <i class="fas fa-external-link-alt" style="font-size:12px; opacity:0.5"></i>
          </div>
          <p class="repo-desc">${repo.description ? repo.description : 'Tidak ada deskripsi tersedia.'}</p>
        </div>
        <div class="repo-stats">
          <span><span class="repo-lang-dot" style="background:${randomColor}"></span>${language}</span>
          <span><i class="far fa-star"></i> ${repo.stargazers_count}</span>
          <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
        </div>
      `;
      
      repoList.appendChild(card);
    });
  } catch (error) {
    repoList.innerHTML = `<p class="loading">Gagal memuat repository. Pastikan username benar.</p>`;
  }
}

// Jalankan fungsi saat halaman dimuat
fetchProfile();
fetchRepos();
