---
layout: page
title: Arrangementer
permalink: /arrangementer/
lang: da
---

<div class="events-page">
  <h1>Arrangementer</h1>
  <p class="page-intro">Oversigt over tegne- og malearrangementer. Kommande events først, efterfulgt af tidligere arrangementer.</p>

  <!-- Kommande Arrangementer -->
  <section class="events-section">
    <h2>Kommande Arrangementer</h2>
    {% assign future_events = site.events | where_exp: "event", "event.date >= site.time" | sort: "date" %}
    {% if future_events.size > 0 %}
      <div class="events-list">
        {% for event in future_events %}
          <article class="event-item">
            <div class="event-item-date">
              <span class="day">{{ event.date | date: "%d" }}</span>
              <span class="month-name">{{ event.date | date: "%B" }}</span>
              {% if event.tid %}
              <span class="time">🕐 {{ event.tid }}</span>
              {% endif %}
            </div>
            <div class="event-item-content">
              <h3><a href="{{ event.url | relative_url }}">{{ event.title }}</a></h3>
              {% if event.location %}
                <p class="event-location">📍 {{ event.location }}</p>
              {% endif %}
              {% if event.excerpt %}
                <p>{{ event.excerpt | strip_html }}</p>
              {% endif %}
              <a href="{{ event.url | relative_url }}" class="btn btn-small">Læs Mere</a>
            </div>
          </article>
        {% endfor %}
      </div>
    {% else %}
      <p class="no-events">Der er pt. ingen kommande arrangementer. Tilmeld nyhedsbrevet for at være den første der hører om nye events!</p>
    {% endif %}
  </section>

  <!-- Tidligere Arrangementer -->
  <section class="events-section">
    <h2>Tidligere Arrangementer</h2>
    {% assign past_events = site.events | where_exp: "event", "event.date < site.time" | sort: "date" | reverse %}
    {% if past_events.size > 0 %}
      {% assign last_month = "" %}
      {% for event in past_events %}
        {% assign current_month = event.date | date: "%B %Y" %}
        {% if current_month != last_month %}
          <h3>{{ current_month }}</h3>
          {% assign last_month = current_month %}
        {% endif %}
        <article class="event-item past-event">
          <div class="event-item-content">
            <h3><a href="{{ event.url | relative_url }}">{{ event.title }}</a></h3>
            {% if event.location %}
              <p class="event-location">📍 {{ event.location }}</p>
            {% endif %}
          </article>
      {% endfor %}
    {% else %}
      <p class="no-events">Der er pt. ingen tidligere arrangementer at vise.</p>
    {% endif %}
  </section>

  <!-- Submit Event -->
  <section class="events-section submit-event">
    <h2>Har Du Et Arrangement?</h2>
    <p>Kender du et tegne- eller malearrangement, som vi bør vide om? Send os en besked!</p>
    <a href="mailto:kontakt@tegneklubben.dk?subject=Arrangementstilbud" class="btn btn-secondary">Send Arrangementstilbud</a>
  </section>
</div>
