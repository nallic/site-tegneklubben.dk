---
layout: home
title: Forside
lang: da
---

<!-- Hero Section -->
<section class="hero" id="hero">
  <div class="hero-bg"></div>
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <h1>Tegneklubben</h1>
    <p class="hero-tagline">Tegne- og malearrangementer — find fællesskab og inspiration.</p>
    <a href="{{ site.mailing_list.url }}" target="_blank" class="btn btn-primary">
      {{ site.mailing_list.button_text }}
    </a>
  </div>

  <!-- Artist legend badge (hidden until hover, links to artworks listing) -->
  <div class="hero-artist-badge" id="heroArtistBadge">
    <button class="badge-nav badge-nav-prev" id="badgeNavPrev" title="Forrige kunstværk">&#8249;</button>
    <a href="{{ '/kunstvaerker/' | relative_url }}" class="badge-info" id="badgeInfo">
      <span class="artist-name" id="artistName"></span>
      <span class="artist-title" id="artistTitle"></span>
    </a>
    <button class="badge-nav badge-nav-next" id="badgeNavNext" title="Næste kunstværk">&#8250;</button>
  </div>

  <!-- Artwork data (injected by Jekyll from manifest) -->
  <div id="heroArtworksData" style="display:none;"
        data-baseurl="{{ site.baseurl }}"
        data-artworks='[
          {% for item in site.data.artworks-manifest.artworks %}
          {
            "filename": "{{ item.filename | escape }}",
            "artist": "{{ item.artist | default: "Unknown" | escape }}",
            "artist_link": "{{ item.artist_link | default: "" | escape }}",
            "title": "{{ item.title | default: "Untitled" | escape }}",
            "date": "{{ item.date | default: "Unknown" | escape }}",
            "source_link": "{{ item.source_link | default: "" | escape }}",
            "description": "{{ item.description | default: "" | escape }}"
          }{% if forloop.last == false %},{% endif %}
          {% endfor %}
        ]'>
  </div>
</section>

<!-- Kommende Arrangementer -->
<section class="section events-preview">
  <div class="container">
    <h2>Kommende Arrangementer</h2>
    <div class="event-cards">
      {% assign future_events = site.events | where_exp: "event", "event.date >= site.time" | sort: "date" %}
      {% if future_events.size > 0 %}
        {% for event in future_events limit: 3 %}
          <div class="event-card">
            <div class="event-card-date">
              <span class="day">{{ event.date | date: "%d" }}</span>
              <span class="month">{{ event.date | date: "%b" | replace: "Sept", "Sep" | downcase }}</span>
            </div>
            <div class="event-card-content">
              <h3><a href="{{ event.url | relative_url }}">{{ event.title }}</a></h3>
              {% if event.location %}
                <p class="event-card-location">📍 {{ event.location }}</p>
              {% endif %}
              {% if event.excerpt %}
                <p class="event-card-excerpt">{{ event.excerpt | strip_html | truncate: 100 }}</p>
              {% endif %}
            </div>
          </div>
        {% endfor %}
      {% else %}
        <p class="no-events">Der er pt. ingen Kommende arrangementer. Tilmeld nyhedsbrevet for at være den første der hører om nye events!</p>
      {% endif %}
    </div>
    <div class="section-cta">
      <a href="{{ '/arrangementer/' | relative_url }}" class="btn btn-secondary">Se Alle Arrangementer &rarr;</a>
    </div>
  </div>
</section>

<!-- Hvad Vi Gør -->
<section class="section mission">
  <div class="container">
    <h2>Hvad er vores mission</h2>
    <div class="mission-grid">
      <div class="mission-card">
        <div class="mission-icon">&#127912;</div>
        <h3>Arrangementer</h3>
        <p>Vi afholder klubaftener og tegne events hvor man frit kan dukke op. Vi samler også alle tegne- og malebegivenheder vi syntes kan være relevante at kende til.</p>
      </div>
      <div class="mission-card">
        <div class="mission-icon">&#128101;</div>
        <h3>Mød Ligesindede</h3>
        <p>Deltag i meetups, mød andre der kan lide at tegne og male - alle er velkomne - fra Manga til klassisk tegning, fra abstrakt til fotorealistisk. Uanset din stil, så er du en del af fællesskabet.</p>
      </div>
      <div class="mission-card">
        <div class="mission-icon">&#128105;</div>
        <h3>På tværs af alder</h3>
        <p>Vores klub er for alle aldre og alle niveauer. Børn er velkomne til vores arrangementer, men vores møder er uden en underviser, så børn skal enten have en voksen med, eller være gamle nok til selv at deltage aktivt.</p>
      </div>
    </div>
  </div>
</section>

<!-- Seneste Blog Indlæg -->
<section class="section blog-preview">
  <div class="container">
    <h2>Seneste fra Bloggen</h2>
    <div class="blog-grid">
      {% for post in site.posts limit: 3 %}
        <article class="blog-card">
          <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
          <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%d.%m.%Y" }}</time>
          {% if post.excerpt %}
            <p>{{ post.excerpt | strip_html | truncate: 150 }}</p>
          {% endif %}
        </article>
      {% endfor %}
    </div>
    <div class="section-cta">
      <a href="{{ '/blog/' | relative_url }}" class="btn btn-secondary">Læs Alle Indlæg &rarr;</a>
    </div>
  </div>
</section>

<!-- Nyhedsbrev Tilmelding -->
<section class="section newsletter">
  <div class="container">
    <h2>Tilmeld Nyhedsbrevet</h2>
    <p>Få besked om nye tegne- og malearrangementer. Vi sender kun relevant indhold — ingen spam.</p>
    <a href="{{ site.mailing_list.url }}" target="_blank" class="btn btn-primary btn-large">
      {{ site.mailing_list.button_text }}
    </a>
  </div>
</section>
