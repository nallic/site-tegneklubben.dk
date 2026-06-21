---
layout: page
title: Kunstværker
permalink: /kunstvaerker/
lang: da
---

<div class="artworks-page">
  <h1>Kunstværker</h1>
  <p class="page-intro">Oversigt over kunstværker udstillet af Tegneklubben.</p>

  {% if site.artworks.size > 0 %}
    <div class="artworks-grid">
      {% for artwork in site.artworks %}
        {% include artwork-card.html artwork=artwork %}
      {% endfor %}
    </div>
  {% else %}
    <p class="no-artworks">Der er pt. ingen kunstværker at vise.</p>
  {% endif %}
</div>
