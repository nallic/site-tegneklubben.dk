---
layout: page
title: Kontakt
permalink: /kontakt/
lang: da
---

<div class="contact-page">
  <h1>Kontakt</h1>

  <section class="contact-section">
    <h2>Skriv Til Os</h2>
    <p>Har du spørgsmål, forslag til arrangementer eller vil bare sige hej? Vi elsker at høre fra dig.</p>

    <div class="contact-methods">
      <div class="contact-method">
        <span class="contact-icon">&#128231;</span>
        <h3>Email</h3>
        <a href="mailto:kontakt@tegneklubben.dk">kontakt@tegneklubben.dk</a>
      </div>
      <div class="contact-method">
        <span class="contact-icon">&#128227;</span>
        <h3>Nyhedsbrev</h3>
        <p>Tilmeld dig for at modtage besked om nye arrangementer.</p>
        <a href="{{ site.mailing_list.url }}" target="_blank" class="btn btn-small">Tilmeld Nyhedsbrev</a>
      </div>
    </div>
  </section>

  <section class="contact-section">
    <h2>Følg Os</h2>
    <p>Find os på sociale medier for daglig inspiration og arrangement-opdateringer.</p>
    <div class="social-links">
      {% if site.social.instagram %}
        <a href="{{ site.social.instagram }}" target="_blank" rel="noopener" class="social-link">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
          Instagram
        </a>
      {% endif %}
      {% if site.social.facebook %}
        <a href="{{ site.social.facebook }}" target="_blank" rel="noopener" class="social-link">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
          </svg>
          Facebook
        </a>
      {% endif %}
    </div>
  </section>

  <section class="contact-section">
    <h2>Arrangementstilbud</h2>
    <p>Kender du et tegne- eller malearrangement i København, som Tegneklubben bør vide om? Send os dine detaljer!</p>
    <a href="mailto:kontakt@tegneklubben.dk?subject=Arrangementstilbud" class="btn btn-primary">Send Arrangementstilbud</a>
  </section>
</div>
