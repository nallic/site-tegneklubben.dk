---
layout: home
title: Forside
lang: da
---

<!-- Hero Section -->
<section class="hero">
  <div class="hero-content">
    <h1>Tegneklubben</h1>
    <p class="hero-tagline">Tegne- og malearrangementer — find fællesskab og inspiration.</p>
    <a href="{{ site.mailing_list.url }}" target="_blank" class="btn btn-primary">
      {{ site.mailing_list.button_text }}
    </a>
  </div>
</section>

<!-- Kommande Arrangementer -->
<section class="section events-preview">
  <div class="container">
    <h2>Kommande Arrangementer</h2>
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
        <p class="no-events">Der er pt. ingen kommande arrangementer. Tilmeld nyhedsbrevet for at være den første der hører om nye events!</p>
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
    <h2>Hvad Vi Gør</h2>
    <div class="mission-grid">
      <div class="mission-card">
        <div class="mission-icon">&#127912;</div>
        <h3>Find Arrangementer</h3>
        <p>Oversigt over alle tegne- og malebegivenheder — ét sted.</p>
      </div>
      <div class="mission-card">
        <div class="mission-icon">&#128101;</div>
        <h3>Mød Ligesindede</h3>
        <p>Deltag i fælles tegnestunder, malerkurser og netværk med andre kunstentusiaster.</p>
      </div>
      <div class="mission-card">
        <div class="mission-icon">&#128221;</div>
        <h3>Del Erfaringer</h3>
        <p>Lær af andres teknikker, del dine egne og få inspiration til næste værk.</p>
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
