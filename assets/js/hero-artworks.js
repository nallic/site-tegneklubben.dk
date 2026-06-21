// Hero Artwork Rotation — Random selection, badge cycling
(function() {
  'use strict';

  var artworksData = [];
  var currentIndex = -1;
  var baseurl = '';

  // Defaults for missing fields
  var defaults = {
    artist: 'Unknown',
    title: 'Untitled'
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
    return {
      filename: entry.filename || '',
      artist: entry.artist || defaults.artist,
      title: entry.title || defaults.title
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

    // Populate badge — artist name with link if available
    var artistNameEl = document.getElementById('artistName');
    var artistLink = artworksData[index].artist_link || '';
    if (artistLink) {
      artistNameEl.innerHTML = '<a class="artist-link" href="' + artistLink + '" target="_blank" rel="noopener">' + artwork.artist + '</a>';
    } else {
      artistNameEl.textContent = artwork.artist;
    }
    document.getElementById('artistTitle').textContent = artwork.title;
  }

  function cycleArtwork(direction) {
    if (artworksData.length === 0) return;
    var newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = artworksData.length - 1;
    if (newIndex >= artworksData.length) newIndex = 0;
    applyHeroBackground(newIndex);
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', function() {
    var dataEl = document.getElementById('heroArtworksData');
    if (dataEl) {
      artworksData = JSON.parse(dataEl.getAttribute('data-artworks') || '[]');
    }

    baseurl = dataEl ? dataEl.getAttribute('data-baseurl') : '';

    var artworkIndex = pickRandomIndex();
    applyHeroBackground(artworkIndex);

    // Badge navigation buttons (cycle artworks)
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
  });
})();
