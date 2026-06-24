---
title: HackerGPT — OSINT recon
description: Reconocimiento OSINT en estilo terminal.
category: Seguridad
pubDate: 2026-06-23
theme: hud
---

# HackerGPT

Asistente de IA para ciberseguridad, investigadores y entusiastas de **OSINT**.

Note: Portada con tema terminal/HUD.

---

## Geolocation of hackergpt.app

<div class="frame-notch"></div>

<div class="kv-card">
  <div class="kv-hd"><span>Field</span><span>Value</span></div>
  <div class="kv-row"><span class="kv-key">IP Address</span><span class="kv-val">18.214.55.77</span></div>
  <div class="kv-row"><span class="kv-key">Country</span><span class="kv-val">United States (US)</span></div>
  <div class="kv-row"><span class="kv-key">Region</span><span class="kv-val">Virginia (VA)</span></div>
  <div class="kv-row"><span class="kv-key">City</span><span class="kv-val">Ashburn</span></div>
  <div class="kv-row"><span class="kv-key">ISP</span><span class="kv-val">Amazon.com, Inc.</span></div>
  <div class="kv-row"><span class="kv-key">Cloud</span><span class="kv-val">AWS EC2 — us-east-1</span></div>
</div>

Note: Resultado de resolver el dominio a su IP y geolocalizar.

---

## Recon — respuesta del asistente

<div class="frame-notch-r"></div>

<div class="chat-msg">
  <div class="chat-avatar hgpt">H</div>
  <div class="chat-info">
    <span class="chat-botname">HackerGPT</span>
    <div class="chat-body">La IP 18.214.55.77 pertenece a Amazon AWS en us-east-1 (Ashburn, Virginia). El dominio hackergpt.app esta protegido por CloudFront. Senales de infraestructura SaaS sobre AWS con CDN de Amazon.</div>
  </div>
</div>

<div class="chat-msg">
  <div class="chat-avatar user">U</div>
  <div class="chat-info">
    <span class="chat-username">analyst</span>
    <div class="chat-body">Hay mas subdominios activos?</div>
  </div>
</div>

Note: Simulacion de sesion de recon con el asistente.

---

## HTTP Headers — hackergpt.app

<div class="frame-notch"></div>
<div class="frame-notch-r"></div>

<div class="ep-card">
  <div class="ep-tabs">
    <span class="ep-tab ep-tab--active">Response Headers</span>
  </div>
  <pre class="ep-body">server: cloudfront
x-cache: Miss from cloudfront
via: 1.1 cloudfront (CloudFront)
content-type: text/html; charset=utf-8
strict-transport-security: max-age=31536000
x-content-type-options: nosniff
x-frame-options: SAMEORIGIN</pre>
</div>

Note: Headers de respuesta HTTP — CDN CloudFront delante de AWS.

---

## Borde · A — hud (original)

<div class="kv-card" style="width:520px;margin-top:1.2em">
  <div class="kv-hd"><span>Field</span><span>Value</span></div>
  <div class="kv-row"><span class="kv-key">Host</span><span class="kv-val">hackergpt.app</span></div>
  <div class="kv-row"><span class="kv-key">IP</span><span class="kv-val">18.214.55.77</span></div>
  <div class="kv-row"><span class="kv-key">CDN</span><span class="kv-val">CloudFront</span></div>
  <div class="kv-row"><span class="kv-key">Region</span><span class="kv-val">us-east-1</span></div>
  <div class="kv-row"><span class="kv-key">Status</span><span class="kv-val">200 OK</span></div>
</div>

Note: Slide de ejemplo del borde "A — hud (original)".

---

## Borde · bracket asim

Frame: fr-bracket


<div class="kv-card" style="width:520px;margin-top:1.2em">
  <div class="kv-hd"><span>Field</span><span>Value</span></div>
  <div class="kv-row"><span class="kv-key">Host</span><span class="kv-val">hackergpt.app</span></div>
  <div class="kv-row"><span class="kv-key">IP</span><span class="kv-val">18.214.55.77</span></div>
  <div class="kv-row"><span class="kv-key">CDN</span><span class="kv-val">CloudFront</span></div>
  <div class="kv-row"><span class="kv-key">Region</span><span class="kv-val">us-east-1</span></div>
  <div class="kv-row"><span class="kv-key">Status</span><span class="kv-val">200 OK</span></div>
</div>

Note: Slide de ejemplo del borde "bracket asim".

---

## Borde · placa diag

Frame: fr-placa


<div class="kv-card" style="width:520px;margin-top:1.2em">
  <div class="kv-hd"><span>Field</span><span>Value</span></div>
  <div class="kv-row"><span class="kv-key">Host</span><span class="kv-val">hackergpt.app</span></div>
  <div class="kv-row"><span class="kv-key">IP</span><span class="kv-val">18.214.55.77</span></div>
  <div class="kv-row"><span class="kv-key">CDN</span><span class="kv-val">CloudFront</span></div>
  <div class="kv-row"><span class="kv-key">Region</span><span class="kv-val">us-east-1</span></div>
  <div class="kv-row"><span class="kv-key">Status</span><span class="kv-val">200 OK</span></div>
</div>

Note: Slide de ejemplo del borde "placa diag".

---

## Borde · cyber (Cyberpunk 2077)

Frame: fr-cyber


<div class="kv-card" style="width:520px;margin-top:1.2em">
  <div class="kv-hd"><span>Field</span><span>Value</span></div>
  <div class="kv-row"><span class="kv-key">Host</span><span class="kv-val">hackergpt.app</span></div>
  <div class="kv-row"><span class="kv-key">IP</span><span class="kv-val">18.214.55.77</span></div>
  <div class="kv-row"><span class="kv-key">CDN</span><span class="kv-val">CloudFront</span></div>
  <div class="kv-row"><span class="kv-key">Region</span><span class="kv-val">us-east-1</span></div>
  <div class="kv-row"><span class="kv-key">Status</span><span class="kv-val">200 OK</span></div>
</div>

Note: Slide de ejemplo del borde "cyber (Cyberpunk 2077)".

---

## Borde · deusex (Deus Ex MD)

Frame: fr-deusex


<div class="kv-card" style="width:520px;margin-top:1.2em">
  <div class="kv-hd"><span>Field</span><span>Value</span></div>
  <div class="kv-row"><span class="kv-key">Host</span><span class="kv-val">hackergpt.app</span></div>
  <div class="kv-row"><span class="kv-key">IP</span><span class="kv-val">18.214.55.77</span></div>
  <div class="kv-row"><span class="kv-key">CDN</span><span class="kv-val">CloudFront</span></div>
  <div class="kv-row"><span class="kv-key">Region</span><span class="kv-val">us-east-1</span></div>
  <div class="kv-row"><span class="kv-key">Status</span><span class="kv-val">200 OK</span></div>
</div>

Note: Slide de ejemplo del borde "deusex (Deus Ex MD)".

---

## Borde · elite (Elite / Star Citizen)

Frame: fr-elite


<div class="kv-card" style="width:520px;margin-top:1.2em">
  <div class="kv-hd"><span>Field</span><span>Value</span></div>
  <div class="kv-row"><span class="kv-key">Host</span><span class="kv-val">hackergpt.app</span></div>
  <div class="kv-row"><span class="kv-key">IP</span><span class="kv-val">18.214.55.77</span></div>
  <div class="kv-row"><span class="kv-key">CDN</span><span class="kv-val">CloudFront</span></div>
  <div class="kv-row"><span class="kv-key">Region</span><span class="kv-val">us-east-1</span></div>
  <div class="kv-row"><span class="kv-key">Status</span><span class="kv-val">200 OK</span></div>
</div>

Note: Slide de ejemplo del borde "elite (Elite / Star Citizen)".

---

## Borde · notch (handle izquierda)

Frame: fr-notch


<div class="kv-card" style="width:520px;margin-top:1.2em">
  <div class="kv-hd"><span>Field</span><span>Value</span></div>
  <div class="kv-row"><span class="kv-key">Host</span><span class="kv-val">hackergpt.app</span></div>
  <div class="kv-row"><span class="kv-key">IP</span><span class="kv-val">18.214.55.77</span></div>
  <div class="kv-row"><span class="kv-key">CDN</span><span class="kv-val">CloudFront</span></div>
  <div class="kv-row"><span class="kv-key">Region</span><span class="kv-val">us-east-1</span></div>
  <div class="kv-row"><span class="kv-key">Status</span><span class="kv-val">200 OK</span></div>
</div>

Note: Slide de ejemplo del borde "notch handle".

---

## Que puede hacer

<div class="frame-notch"></div>

- Reconocimiento de dominios e IPs
- Enumeracion y recoleccion **OSINT**
- Analisis de cabeceras y trafico de red
- Resolucion y geolocalizacion de hosts

Note: Capacidades principales del asistente.

---

## Flujo de trabajo

<div class="frame-notch-r"></div>

- `resolve` el dominio a su IP
- `geoip` lookup sobre la IP
- correlaciona **ISP**, region y organizacion
- documenta el hallazgo

Note: Pipeline tipico de un recon basico.
