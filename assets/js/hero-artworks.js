// Hero Artwork Rotation — Random selection, badge cycling, modal overlay
(function() {
  'use strict';

  var artworksData = [];
  var currentIndex = -1;
  var baseurl = '';

  // Defaults for missing fields
  var defaults = {
    artist: 'Unknown',
    artist_link: '',
    title: 'Untitled',
    date: 'Unknown',
    source_link: '',
    description: ''
  };

  function pickRandomIndex() {
    if (artworksData.length === 0) return -1;
    var index;
    do {
      index = Math.floor(Math.random() * artworksData.length);
    } while (index === currentIndex && artworksData.length > 1);
    return index;
  }

  function getArtwork(index) {
    if (index < 0 || index >= artworksData.length) return null;
    var entry = artworksData[index];
    // Merge with defaults for any missing fields
    return {
      filename: entry.filename || '',
      artist: entry.artist || defaults.artist,
      artist_link: entry.artist_link || defaults.artist_link,
      title: entry.title || defaults.title,
      date: entry.date || defaults.date,
      source_link: entry.source_link || defaults.source_link,
      description: entry.description || defaults.description
    };
  }

  function getAssetPath(filename) {
    return baseurl ? baseurl + '/assets/artworks/' + filename : './assets/artworks/' + filename;
  }

  function applyHeroBackground(index) {
    if (index < 0 || index >= artworksData.length) return;
    currentIndex = index;
    var artwork = getArtwork(index);
    var heroBg = document.querySelector('.hero-bg');
    heroBg.style.backgroundImage = "url('" + getAssetPath(artwork.filename) + "')";
    heroBg.style.backgroundSize = 'cover';
    heroBg.style.backgroundPosition = 'center';

    // Populate badge
    document.getElementById('artistName').textContent = artwork.artist;
    document.getElementById('artistTitle').textContent = artwork.title;
  }

  function cycleArtwork(direction) {
    if (artworksData.length === 0) return;
    var newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = artworksData.length - 1;
    if (newIndex >= artworksData.length) newIndex = 0;
    applyHeroBackground(newIndex);
  }

  function showBadge() {
    // Badge visibility is now CSS-only via .hero:hover .hero-artist-badge
    // Just ensure data is populated
  }

  function hideBadge() {
    // No-op — CSS handles hiding
  }

  function openModal() {
    if (currentIndex < 0) return;
    var artwork = getArtwork(currentIndex);
    var modal = document.getElementById('artworkModal');
    document.getElementById('artworkModalImage').src = getAssetPath(artwork.filename);
    document.getElementById('artworkModalImage').alt = artwork.title;
    document.getElementById('artworkModalTitle').textContent = artwork.title;
    document.getElementById('artworkModalArtist').textContent = artwork.artist;
    if (artwork.artist_link) {
      document.getElementById('artworkModalArtistLink').href = artwork.artist_link;
      document.getElementById('artworkModalArtistLink').style.display = 'inline';
    } else {
      document.getElementById('artworkModalArtistLink').style.display = 'none';
    }
    document.getElementById('artworkModalDate').textContent = 'Date: ' + artwork.date;
    document.getElementById('artworkModalDescription').textContent = artwork.description;
    if (artwork.source_link) {
      document.getElementById('artworkModalSourceLink').href = artwork.source_link;
      document.getElementById('artworkModalSourceText').textContent = 'View source';
      document.getElementById('artworkModalSourceLink').style.display = 'inline';
    } else {
      document.getElementById('artworkModalSourceLink').style.display = 'none';
    }
    modal.style.display = 'flex';
  }

  function closeModal() {
    document.getElementById('artworkModal').style.display = 'none';
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', function() {
    var dataEl = document.getElementById('heroArtworksData');
    if (dataEl) {
      artworksData = JSON.parse(dataEl.getAttribute('data-artworks') || '[]');
    }

    // Get baseurl from the page's data attribute or config
    baseurl = document.getElementById('heroArtworksData').getAttribute('data-baseurl') || '';

    var artworkIndex = pickRandomIndex();
    applyHeroBackground(artworkIndex);

    var hero = document.getElementById('hero');
    if (hero) {
      hero.addEventListener('mouseenter', showBadge);
      hero.addEventListener('mouseleave', hideBadge);
    }

    // Badge click opens modal (but not when clicking nav buttons)
    var badgeInfo = document.getElementById('badgeInfo');
    if (badgeInfo) {
      badgeInfo.addEventListener('click', openModal);
      badgeInfo.style.cursor = 'pointer';
    }

    // Prev/Next navigation buttons
    var prevBtn = document.getElementById('badgeNavPrev');
    var nextBtn = document.getElementById('badgeNavNext');
    if (prevBtn) prevBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      cycleArtwork(-1);
    });
    if (nextBtn) nextBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      cycleArtwork(1);
    });

    var closeBtn = document.getElementById('artworkModalClose');
    var backdrop = document.querySelector('.artwork-modal-backdrop');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeModal();
    });
  });
})();
