---
layout: page
title: Blog
permalink: /blog/
lang: da
---

<div class="blog-page">
  <h1>Blog</h1>
  <p class="page-intro">Referater fra tegnearrangementer, tegnetips og nyheder fra Tegneklubben.</p>

  {% if site.posts.size > 0 %}
    <div class="posts-list">
      {% for post in site.posts %}
        <article class="post-card">
          <time datetime="{{ post.date | date_to_xmlschema }}" class="post-date">{{ post.date | date: "%d.%m.%Y" }}</time>
          <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
          {% if post.excerpt %}
            <p class="post-excerpt">{{ post.excerpt | strip_html | truncate: 200 }}</p>
          {% endif %}
          <a href="{{ post.url | relative_url }}" class="read-more">Læs Mere &rarr;</a>
        </article>
      {% endfor %}
    </div>
  {% else %}
    <p class="no-posts">Der er pt. ingen blogindlæg. Tjek snart igen!</p>
  {% endif %}
</div>
