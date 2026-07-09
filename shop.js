/* ============================================================
   BLUE SALON — SHOP PAGES (Product Listing + Product Detail)
   Vanilla JS, mirrors the conventions of app.js. Detects which
   page it is on via #plpGrid / #pdpRoot. Wishlist + bag persist
   in localStorage so the header counters agree across pages.
   ============================================================ */
(function () {
  "use strict";

  var data = window.BS_DATA;
  if (!data) return;
  var products = data.products;

  /* ── Shared helpers ─────────────────────────────────────── */

  function money(qar) {
    return "QAR " + Number(qar).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }); 
  }

  function store(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) || fallback; }
    catch (e) { return fallback; }
  }
  function save(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
  }

  var wishlist = store("bs-wishlist", []);

  /* Bag — real line items [{id, size, qty}]. bs-bag-count is kept
     in sync for anything still reading the plain counter. */
  var bag = store("bs-bag", []).filter(function (l) {
    return l && l.id && products.some(function (p) { return p.id === l.id; });
  });

  function bagQty() {
    return bag.reduce(function (n, l) { return n + l.qty; }, 0);
  }
  function saveBag() {
    save("bs-bag", bag);
    save("bs-bag-count", bagQty());
    syncCounters();
  }
  function addLine(id, size, qty) {
    var line = bag.filter(function (l) { return l.id === id && l.size === size; })[0];
    if (line) line.qty = Math.min(9, line.qty + qty);
    else bag.push({ id: id, size: size, qty: qty });
    saveBag();
  }

  function syncCounters() {
    var wishEl = document.getElementById("wishCount");
    var cartEl = document.getElementById("cartCount");
    var count = bagQty();
    if (wishEl) { wishEl.textContent = wishlist.length; wishEl.hidden = wishlist.length === 0; }
    if (cartEl) { cartEl.textContent = count; cartEl.hidden = count === 0; }
  }
  syncCounters();

  /* The header bag icon opens the cart */
  var bagNavBtn = document.querySelector('.bs-utils [aria-label="Bag"]');
  if (bagNavBtn) bagNavBtn.addEventListener("click", function () { location.href = "cart.html"; });

  function toggleWish(id) {
    var i = wishlist.indexOf(id);
    if (i === -1) wishlist.push(id); else wishlist.splice(i, 1);
    save("bs-wishlist", wishlist);
    syncCounters();
    return i === -1; // true = now wishlisted
  }

  var HEART_SVG =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>' +
    "</svg>";

  var CHEV_SVG =
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>';

  /* Toast — "added to bag" confirmation */
  var toastEl = null, toastTimer = null;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "shop-toast";
      toastEl.setAttribute("role", "status");
      document.body.appendChild(toastEl);
    }
    toastEl.innerHTML =
      '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>' +
      "<span>" + msg + "</span>";
    toastEl.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("is-visible"); }, 2600);
  }

  /* Product card — identical markup to the homepage card, wrapped
     in a link to the detail page. */
  function cardHTML(p, extraClass) {
    var template = document.getElementById("plpProductCardTemplate");
    if (!template) return "";

    var wished = wishlist.indexOf(p.id) !== -1;
    var onSale = p.compareAt != null && p.compareAt > p.price;
    var hasRelevantSizes = p.sizes.some(function (s) { return s !== "OS"; });
    var defaultSize = hasRelevantSizes ? p.sizes[0] : "";
    var classes = [
      "bs-card",
      p.hover ? "has-hover" : "",
      p.cat ? "cat-" + p.cat.toLowerCase().replace(/[^a-z0-9]+/g, "-") : "",
      extraClass || ""
    ].filter(Boolean).join(" ");

    var card = template.content.firstElementChild.cloneNode(true);
    var url = "product.html?id=" + p.id;

    card.className = classes;
    card.dataset.id = p.id;
    card.classList.toggle("has-size-options", hasRelevantSizes);

    card.querySelectorAll("[data-card-link]").forEach(function (link) {
      link.href = url;
      link.setAttribute("aria-label", p.name);
    });

    var mainImg = card.querySelector("[data-card-image]");
    mainImg.src = p.image;
    mainImg.alt = p.name;

    var hoverImg = card.querySelector("[data-card-hover]");
    if (p.hover) {
      hoverImg.src = p.hover;
      hoverImg.hidden = false;
    } else {
      hoverImg.remove();
    }

    var badgeWrap = card.querySelector("[data-card-badge]");
    if (p.soldOut) {
      badgeWrap.hidden = false;
      var soldBadge = document.createElement("span");
      soldBadge.className = "bs-badge bs-badge-soldout";
      soldBadge.textContent = "Sold out";
      badgeWrap.appendChild(soldBadge);
    } else if (p.badge) {
      badgeWrap.hidden = false;
      var badge = document.createElement("span");
      badge.className = "bs-badge bs-badge-" + (p.badgeTone || "neutral");
      badge.textContent = p.badge;
      badgeWrap.appendChild(badge);
    }

    var wish = card.querySelector("[data-wish]");
    wish.dataset.wish = p.id;
    wish.classList.toggle("is-wishlisted", wished);
    wish.setAttribute("aria-label", wished ? "Remove from wishlist" : "Add to wishlist");

    card.querySelector("[data-card-vendor]").textContent = p.vendor;
    card.querySelector("[data-card-name]").textContent = p.name;

    var priceEl = card.querySelector("[data-card-price]");
    priceEl.classList.toggle("on-sale", onSale);
    card.querySelector("[data-card-price-current]").textContent = money(p.price);
    var compareEl = card.querySelector("[data-card-price-compare]");
    if (onSale) {
      compareEl.hidden = false;
      compareEl.textContent = money(p.compareAt);
    }

    var colourEl = card.querySelector("[data-card-colour]");
    if (p.colorHex) {
      colourEl.hidden = false;
      card.querySelector("[data-card-colour-chip]").style.background = p.colorHex;
      card.querySelector("[data-card-colour-name]").textContent = p.color;
    }
    card.querySelector("[data-card-type]").textContent = p.type;

    var sizeEl = card.querySelector("[data-card-sizes]");
    if (hasRelevantSizes) {
      p.sizes.forEach(function (s) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = s;
        btn.dataset.cardSize = s;
        btn.dataset.cardId = p.id;
        btn.classList.toggle("is-selected", s === defaultSize);
        sizeEl.appendChild(btn);
      });
    } else {
      sizeEl.remove();
    }

    var quick = card.querySelector("[data-card-add]");
    quick.dataset.cardAdd = p.id;
    quick.textContent = p.soldOut ? "Sold out" : "Add to cart";
    quick.disabled = !!p.soldOut;

    return card.outerHTML;
  }

  /* Wishlist hearts inside any grid (delegated) */
  function bindWishClicks(rootEl, rerender) {
    rootEl.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-wish]");
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();
      var nowWished = toggleWish(btn.dataset.wish);
      btn.classList.toggle("is-wishlisted", nowWished);
      btn.setAttribute("aria-label", nowWished ? "Remove from wishlist" : "Add to wishlist");
      if (rerender) rerender();
    });
  }

  /* Size chips + quick add inside any card grid (delegated).
     Every product shelf on the site shares this behaviour. */
  function bindCardActions(rootEl, afterAdd) {
    rootEl.addEventListener("click", function (e) {
      var sizeBtn = e.target.closest("[data-card-size]");
      if (sizeBtn) {
        e.preventDefault();
        e.stopPropagation();
        sizeBtn.closest(".bs-card").querySelectorAll("[data-card-size]").forEach(function (btn) {
          btn.classList.toggle("is-selected", btn === sizeBtn);
        });
        return;
      }

      var quickBtn = e.target.closest("[data-card-add]");
      if (!quickBtn) return;
      e.preventDefault();
      e.stopPropagation();
      var product = products.filter(function (x) { return x.id === quickBtn.dataset.cardAdd; })[0];
      if (!product || product.soldOut) return;
      var card = quickBtn.closest(".bs-card");
      var selected = card.querySelector("[data-card-size].is-selected") || card.querySelector("[data-card-size]");
      var sizeValue = selected ? selected.dataset.cardSize : "OS";
      addLine(product.id, sizeValue, 1);
      toast("Added to bag - " + product.vendor + (selected ? ", size " + sizeValue : ""));
      if (afterAdd) afterAdd();
    });
  }

  /* ════════════════════════════════════════════════════════════
     QUICK VIEW — a real on-page modal (no navigation). Opened by
     the eye icon on any card. Shares money/addLine/toast/wishlist.
     ════════════════════════════════════════════════════════════ */
  var QV_CLOSE_SVG =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  var QV_HEART_SVG =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l9 9 8.8-8.6a5.5 5.5 0 0 0-.2-7.8z"/></svg>';

  var qvEl = null, qvLastFocus = null;

  function galleryFor(p) {
    var imgs = [p.image].concat(p.images || [], p.hover ? [p.hover] : []);
    return imgs.filter(function (src, i, arr) { return src && arr.indexOf(src) === i; });
  }

  function ensureQuickView() {
    if (qvEl) return qvEl;
    qvEl = document.createElement("div");
    qvEl.className = "qv-overlay";
    qvEl.hidden = true;
    qvEl.innerHTML =
      '<div class="qv-scrim" data-qv-close></div>' +
      '<div class="qv-dialog" role="dialog" aria-modal="true" aria-label="Quick view">' +
        '<button class="qv-close" type="button" data-qv-close aria-label="Close quick view">' + QV_CLOSE_SVG + "</button>" +
        '<div class="qv-media">' +
          '<img class="qv-img" data-qv-img alt="">' +
          '<div class="qv-badge" data-qv-badge hidden></div>' +
          '<div class="qv-thumbs" data-qv-thumbs></div>' +
        "</div>" +
        '<div class="qv-info">' +
          '<span class="qv-vendor" data-qv-vendor></span>' +
          '<h2 class="qv-name" data-qv-name></h2>' +
          '<div class="qv-price"><span class="qv-price-current" data-qv-price></span><span class="qv-price-compare" data-qv-compare hidden></span></div>' +
          '<p class="qv-desc" data-qv-desc></p>' +
          '<div class="qv-colour" data-qv-colour hidden><i data-qv-colour-chip></i><span data-qv-colour-name></span></div>' +
          '<div class="qv-sizes-wrap" data-qv-sizes-wrap hidden>' +
            '<div class="qv-sizes-label">Select size</div>' +
            '<div class="qv-sizes" data-qv-sizes></div>' +
          "</div>" +
          '<div class="qv-actions">' +
            '<button class="qv-add" type="button" data-qv-add>Add to bag</button>' +
            '<button class="qv-wish" type="button" data-qv-wish aria-label="Add to wishlist">' + QV_HEART_SVG + "</button>" +
          "</div>" +
          '<a class="qv-details" data-qv-details href="#">View full details</a>' +
        "</div>" +
      "</div>";
    document.body.appendChild(qvEl);

    qvEl.addEventListener("click", function (e) {
      if (e.target.closest("[data-qv-close]")) closeQuickView();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && qvEl && !qvEl.hidden) closeQuickView();
    });
    return qvEl;
  }

  function closeQuickView() {
    if (!qvEl || qvEl.hidden) return;
    qvEl.classList.remove("is-open");
    document.body.style.overflow = "";
    setTimeout(function () { qvEl.hidden = true; }, 240);
    if (qvLastFocus && qvLastFocus.focus) { try { qvLastFocus.focus(); } catch (e) {} }
  }

  function openQuickView(p) {
    if (!p) return;
    var el = ensureQuickView();
    qvLastFocus = document.activeElement;

    var onSale = p.compareAt != null && p.compareAt > p.price;
    var relevantSizes = p.sizes.filter(function (s) { return s !== "OS"; });
    var hasSizes = relevantSizes.length > 0;
    var selectedSize = hasSizes ? null : "OS";

    var q = function (sel) { return el.querySelector(sel); };

    /* Media + thumbnails */
    var gallery = galleryFor(p);
    var mainImg = q("[data-qv-img]");
    mainImg.src = gallery[0] || p.image;
    mainImg.alt = p.name;
    el.querySelector(".qv-dialog").classList.toggle("cat-jewellery", (p.cat || "").toLowerCase() === "jewellery");

    var badge = q("[data-qv-badge]");
    if (p.soldOut) { badge.hidden = false; badge.textContent = "Sold out"; badge.className = "qv-badge is-sale"; }
    else if (p.badge) { badge.hidden = false; badge.textContent = p.badge; badge.className = "qv-badge" + (p.badgeTone === "sale" ? " is-sale" : ""); }
    else { badge.hidden = true; badge.textContent = ""; }

    var thumbs = q("[data-qv-thumbs]");
    thumbs.innerHTML = "";
    if (gallery.length > 1) {
      gallery.forEach(function (src, i) {
        var t = document.createElement("button");
        t.type = "button";
        t.className = "qv-thumb" + (i === 0 ? " is-active" : "");
        t.innerHTML = '<img src="' + src + '" alt="">';
        t.addEventListener("click", function () {
          mainImg.src = src;
          thumbs.querySelectorAll(".qv-thumb").forEach(function (b) { b.classList.toggle("is-active", b === t); });
        });
        thumbs.appendChild(t);
      });
    }

    /* Text */
    q("[data-qv-vendor]").textContent = p.vendor;
    q("[data-qv-name]").textContent = p.name;
    q("[data-qv-price]").textContent = money(p.price);
    var compare = q("[data-qv-compare]");
    compare.hidden = !onSale;
    compare.textContent = onSale ? money(p.compareAt) : "";
    q(".qv-price").classList.toggle("on-sale", onSale);
    q("[data-qv-desc]").textContent = p.desc || "";

    /* Colour */
    var colour = q("[data-qv-colour]");
    if (p.colorHex) {
      colour.hidden = false;
      q("[data-qv-colour-chip]").style.background = p.colorHex;
      q("[data-qv-colour-name]").textContent = p.color || "";
    } else { colour.hidden = true; }

    /* Sizes */
    var sizesWrap = q("[data-qv-sizes-wrap]");
    var sizesEl = q("[data-qv-sizes]");
    sizesEl.innerHTML = "";
    sizesWrap.hidden = !hasSizes;
    if (hasSizes) {
      relevantSizes.forEach(function (s) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "qv-size";
        btn.textContent = s;
        btn.addEventListener("click", function () {
          selectedSize = s;
          sizesEl.querySelectorAll(".qv-size").forEach(function (b) { b.classList.toggle("is-active", b === btn); });
        });
        sizesEl.appendChild(btn);
      });
    }

    /* Add to bag */
    var addBtn = q("[data-qv-add]");
    addBtn.disabled = !!p.soldOut;
    addBtn.textContent = p.soldOut ? "Sold out" : "Add to bag";
    addBtn.onclick = function () {
      if (p.soldOut) return;
      if (hasSizes && !selectedSize) {
        toast("Please select a size first");
        sizesWrap.classList.add("qv-shake");
        setTimeout(function () { sizesWrap.classList.remove("qv-shake"); }, 500);
        return;
      }
      addLine(p.id, selectedSize || "OS", 1);
      toast("Added to bag - " + p.vendor + (hasSizes ? ", size " + selectedSize : ""));
      closeQuickView();
    };

    /* Wishlist */
    var wishBtn = q("[data-qv-wish]");
    wishBtn.classList.toggle("is-wishlisted", wishlist.indexOf(p.id) !== -1);
    wishBtn.onclick = function () {
      var nowWished = toggleWish(p.id);
      wishBtn.classList.toggle("is-wishlisted", nowWished);
      toast(nowWished ? "Saved to wishlist" : "Removed from wishlist");
    };

    /* Full details */
    q("[data-qv-details]").href = "product.html?id=" + p.id;

    /* Open */
    el.hidden = false;
    void el.offsetWidth;
    el.classList.add("is-open");
    document.body.style.overflow = "hidden";
    var closeBtn = q(".qv-close");
    if (closeBtn) closeBtn.focus();
  }

  /* Delegate quick-view clicks on any card grid */
  function bindQuickView(rootEl) {
    rootEl.addEventListener("click", function (e) {
      var trigger = e.target.closest("[data-quickview]");
      if (!trigger) return;
      e.preventDefault();
      e.stopPropagation();
      var card = trigger.closest(".bs-card");
      if (!card) return;
      var product = products.filter(function (x) { return x.id === card.dataset.id; })[0];
      if (product) openQuickView(product);
    });
  }

  /* Shared card renderer for pages that build their own shelves
     (e.g. kids.html) — one product card, everywhere. */
  window.BS_SHOP = {
    cardHTML: cardHTML,
    bindWishClicks: bindWishClicks,
    bindCardActions: bindCardActions,
    bindQuickView: bindQuickView,
    openQuickView: openQuickView,
  };

  /* ════════════════════════════════════════════════════════════
     PRODUCT LISTING PAGE
     ════════════════════════════════════════════════════════════ */
  var plpGrid = document.getElementById("plpGrid");
  if (plpGrid) initPLP();

  function initPLP() {
    var PAGE_SIZE = 10;

    /* Campaign image per department for the split hero */
    var HERO_IMGS = {
      All: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1400&q=85",
      Gowns: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1400&q=85",
      Jewellery: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1400&q=85"
    };
    data.categories.forEach(function (c) { HERO_IMGS[c.label] = c.img; });

    /* Magazine inserts woven into the grid to break catalog fatigue */
    var EDITORIALS = [
      { kicker: "Buyer's Edit", title: "Curated by Blue Salon buyers", link: "Read the edit",
        img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85" },
      { kicker: "Seasonal Mood", title: "Soft light, formal lines, after-dark polish", link: "Discover",
        img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=85" },
      { kicker: "Crafted For Qatar", title: "Occasion pieces selected for the city's calendar", link: "Explore",
        img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85" },
    ];

    function editorialHTML(ed) {
      return (
        '<a class="plp-editorial" href="#">' +
          '<img src="' + ed.img + '" alt="" loading="lazy">' +
          '<span class="plp-editorial-caption">' +
            '<span class="plp-editorial-kicker">' + ed.kicker + "</span>" +
            '<span class="plp-editorial-title">' + ed.title + "</span>" +
            '<span class="plp-editorial-link">' + ed.link + "</span>" +
          "</span>" +
        "</a>"
      );
    }

    var state = {
      cat: "All",
      brands: [],
      sizes: [],
      colors: [],
      price: null,          // [min, max] or null
      sort: "featured",
      visible: PAGE_SIZE,
    };

    /* Deep-link: listing.html?cat=Women */
    var qcat = new URLSearchParams(location.search).get("cat");
    var cats = ["All"].concat(unique(products.map(function (p) { return p.cat; })));
    if (qcat && cats.indexOf(qcat) !== -1) state.cat = qcat;

    var PRICE_RANGES = [
      { label: "Under QAR 500",       min: 0,    max: 500 },
      { label: "QAR 500 – 1,500",     min: 500,  max: 1500 },
      { label: "QAR 1,500 – 5,000",   min: 1500, max: 5000 },
      { label: "QAR 5,000+",          min: 5000, max: Infinity },
    ];

    function unique(arr) {
      return arr.filter(function (v, i) { return v && arr.indexOf(v) === i; }).sort();
    }

    /* ── Filtering + sorting ────────────────────────────────── */
    function filtered() {
      var list = products.filter(function (p) {
        if (state.cat !== "All" && p.cat !== state.cat) return false;
        if (state.brands.length && state.brands.indexOf(p.vendor) === -1) return false;
        if (state.sizes.length && !p.sizes.some(function (s) { return state.sizes.indexOf(s) !== -1; })) return false;
        if (state.colors.length && state.colors.indexOf(p.color) === -1) return false;
        if (state.price && (p.price < state.price[0] || p.price >= state.price[1])) return false;
        return true;
      });

      switch (state.sort) {
        case "price-asc":  list.sort(function (a, b) { return a.price - b.price; }); break;
        case "price-desc": list.sort(function (a, b) { return b.price - a.price; }); break;
        case "rating":     list.sort(function (a, b) { return b.rating - a.rating; }); break;
        case "newest":     list.sort(function (a, b) { return (b.badgeTone === "new") - (a.badgeTone === "new"); }); break;
        default: break; // featured = data order
      }
      return list;
    }

    /* ── Facet rail ─────────────────────────────────────────── */
    var railEl = document.getElementById("plpFacets");

    function facetGroup(key, title, bodyHTML, open) {
      return (
        '<div class="plp-facet' + (open ? " is-open" : "") + '" data-facet="' + key + '">' +
          '<button class="plp-facet-label" type="button" aria-expanded="' + (open ? "true" : "false") + '">' +
            "<span>" + title + "</span>" + CHEV_SVG +
          "</button>" +
          '<div class="plp-facet-body">' + bodyHTML + "</div>" +
        "</div>"
      );
    }

    function countBy(fn) {
      var m = {};
      products.forEach(function (p) {
        if (state.cat !== "All" && p.cat !== state.cat) return;
        var k = fn(p);
        if (k) m[k] = (m[k] || 0) + 1;
      });
      return m;
    }

    function renderRail() {
      var openState = {};
      railEl.querySelectorAll(".plp-facet").forEach(function (f) {
        openState[f.dataset.facet] = f.classList.contains("is-open");
      });
      function isOpen(key, fallback) {
        return key in openState ? openState[key] : fallback;
      }

      var brandCounts = countBy(function (p) { return p.vendor; });
      var brands = Object.keys(brandCounts).sort();
      var brandHTML = brands.map(function (b) {
        var checked = state.brands.indexOf(b) !== -1;
        return (
          '<label class="plp-check">' +
            '<input type="checkbox" data-brand="' + b + '"' + (checked ? " checked" : "") + ">" +
            '<span class="plp-box"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></span>' +
            "<span>" + b + "</span>" +
            '<span class="plp-check-count">' + brandCounts[b] + "</span>" +
          "</label>"
        );
      }).join("");

      var priceHTML = '<div class="plp-prices">' + PRICE_RANGES.map(function (r, i) {
        var checked = state.price && state.price[0] === r.min;
        return (
          '<label class="plp-check">' +
            '<input type="checkbox" data-price="' + i + '"' + (checked ? " checked" : "") + ">" +
            '<span class="plp-box"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></span>' +
            "<span>" + r.label + "</span>" +
          "</label>"
        );
      }).join("") + "</div>";

      var sizes = unique([].concat.apply([], products.map(function (p) { return p.sizes; }))).filter(function (s) {
        return s !== "OS";
      });
      var sizeHTML = '<div class="plp-sizes">' + sizes.map(function (s) {
        return '<button class="plp-size' + (state.sizes.indexOf(s) !== -1 ? " is-active" : "") + '" type="button" data-size="' + s + '">' + s + "</button>";
      }).join("") + "</div>";

      var colorSeen = {};
      var colorHTML = '<div class="plp-swatches">' + products.filter(function (p) {
        if (!p.colorHex || colorSeen[p.color]) return false;
        colorSeen[p.color] = true;
        return true;
      }).map(function (p) {
        return (
          '<button class="plp-swatch' + (state.colors.indexOf(p.color) !== -1 ? " is-active" : "") + '" type="button" ' +
            'data-color="' + p.color + '" style="background:' + p.colorHex + '" title="' + p.color + '" aria-label="' + p.color + '"></button>'
        );
      }).join("") + "</div>";

      var resultCount = filtered().length;
      railEl.innerHTML =
        '<div class="plp-filters-head">' +
          '<span class="plp-filters-title">Refine</span>' +
          '<button class="plp-clear" type="button" id="plpClear">Clear all</button>' +
          '<button class="bs-iconbtn plp-filters-close" type="button" id="plpFiltersClose" aria-label="Close filters">' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
          "</button>" +
        "</div>" +
        '<div class="plp-rail-body">' +
          facetGroup("brand", "Brand", brandHTML, isOpen("brand", true)) +
          facetGroup("price", "Price", priceHTML, isOpen("price", true)) +
          facetGroup("size", "Size", sizeHTML, isOpen("size", false)) +
          facetGroup("color", "Colour", colorHTML, isOpen("color", false)) +
        "</div>" +
        '<div class="plp-rail-foot">' +
          '<button class="bs-btn bs-btn-primary" type="button" id="plpApply">' +
            "View " + resultCount + (resultCount === 1 ? " piece" : " pieces") +
          "</button>" +
        "</div>";
    }

    /* ── Applied tags ───────────────────────────────────────── */
    function renderApplied() {
      var el = document.getElementById("plpApplied");
      var tags = [];
      state.brands.forEach(function (b) { tags.push({ t: "brand", v: b, label: b }); });
      state.sizes.forEach(function (s) { tags.push({ t: "size", v: s, label: "Size " + s }); });
      state.colors.forEach(function (c) { tags.push({ t: "color", v: c, label: c }); });
      if (state.price) {
        var r = PRICE_RANGES.filter(function (x) { return x.min === state.price[0]; })[0];
        if (r) tags.push({ t: "price", v: "", label: r.label });
      }
      el.innerHTML = tags.map(function (tag) {
        return (
          '<button class="plp-tag" type="button" data-t="' + tag.t + '" data-v="' + tag.v + '">' +
            "<span>" + tag.label + "</span>" +
            '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
          "</button>"
        );
      }).join("");
    }

    /* ── Chips ──────────────────────────────────────────────── */
    var chipsEl = document.getElementById("plpChips");
    function renderChips() {
      if (!chipsEl) return;
      chipsEl.innerHTML = cats.map(function (c) {
        return '<button class="shop-chip' + (c === state.cat ? " is-active" : "") + '" type="button" data-cat="' + c + '">' + c + "</button>";
      }).join("");
    }

    /* ── Scroll reveal: fade + 15px rise, 40ms stagger per batch.
       The reveal class is removed after the animation so it never
       slows the card's own 250ms hover transition. ── */
    function staggerReveal(container) {
      var items = Array.prototype.slice.call(container.children);
      if (!("IntersectionObserver" in window)) return;
      var io = new IntersectionObserver(function (entries) {
        var batch = 0;
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var el = en.target;
          var delay = batch * 40;
          el.style.transitionDelay = delay + "ms";
          el.classList.add("is-inview");
          io.unobserve(el);
          batch++;
          setTimeout(function () {
            el.style.transitionDelay = "";
            el.classList.remove("plp-item-reveal", "is-inview");
          }, delay + 560);
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -6% 0px" });
      items.forEach(function (el) {
        el.classList.add("plp-item-reveal");
        io.observe(el);
      });
    }

    /* ── Grid + load more ───────────────────────────────────── */
    function renderGrid() {
      var list = filtered();
      var shown = list.slice(0, state.visible);
      plpGrid.classList.add("is-catalog");

      var countEl = document.getElementById("plpCount");
      countEl.innerHTML = "<strong>" + list.length + "</strong> " + (list.length === 1 ? "piece" : "pieces");

      if (!list.length) {
        plpGrid.innerHTML =
          '<div class="plp-empty" style="grid-column: 1 / -1;">' +
            '<div class="plp-empty-title">Nothing matches — yet</div>' +
            "<p>Try removing a filter or two; the edit is tightly curated.</p>" +
            '<button class="bs-btn bs-btn-ghost" type="button" id="plpEmptyClear">Clear all filters</button>' +
          "</div>";
      } else {
        var html = "";
        shown.forEach(function (p, i) {
          html += cardHTML(p);
        });
        plpGrid.innerHTML = html;
        staggerReveal(plpGrid);
      }

      if (window.BSEnhanceShelves) window.BSEnhanceShelves();
      window.dispatchEvent(new Event("resize"));
      setTimeout(function () { window.dispatchEvent(new Event("resize")); }, 80);
      setTimeout(function () { window.dispatchEvent(new Event("resize")); }, 320);

      /* Load more */
      var moreEl = document.getElementById("plpMore");
      if (list.length > shown.length || shown.length > PAGE_SIZE) {
        moreEl.hidden = false;
        moreEl.querySelector(".plp-more-meta").textContent =
          "Showing " + shown.length + " of " + list.length;
        moreEl.querySelector(".plp-more-fill").style.width =
          Math.round((shown.length / list.length) * 100) + "%";
        moreEl.querySelector("button").hidden = shown.length >= list.length;
      } else {
        moreEl.hidden = true;
      }

      renderApplied();

      var crumbCurrent = document.getElementById("crumbCurrent");
      if (crumbCurrent) crumbCurrent.textContent = state.cat === "All" ? "Shop All" : state.cat;
      var headTitle = document.getElementById("plpTitle");
      if (headTitle) headTitle.textContent = state.cat === "All" ? "The Edit" : state.cat;
      var toolbarCat = document.getElementById("plpToolbarCat");
      if (toolbarCat) toolbarCat.textContent = state.cat === "All" ? "The Edit" : state.cat;
      document.title = "Blue Salon — " + (state.cat === "All" ? "Shop All" : state.cat);

      /* Swap the hero campaign image with the department */
      var heroImg = document.getElementById("plpHeroImg");
      if (heroImg) {
        var firstOfCat = products.filter(function (p) { return p.cat === state.cat; })[0];
        var src = HERO_IMGS[state.cat] || (firstOfCat && firstOfCat.image) || data.hero;
        if (heroImg.getAttribute("src") !== src) heroImg.src = src;
      }
    }

    function refresh(resetPage) {
      if (resetPage) state.visible = PAGE_SIZE;
      renderChips();
      renderRail();
      renderGrid();
    }

    /* ── Events ─────────────────────────────────────────────── */
    if (chipsEl) chipsEl.addEventListener("click", function (e) {
      var chip = e.target.closest("[data-cat]");
      if (!chip) return;
      state.cat = chip.dataset.cat;
      state.brands = []; state.sizes = []; state.colors = []; state.price = null;
      try {
        var url = new URL(location.href);
        if (state.cat === "All") url.searchParams.delete("cat");
        else url.searchParams.set("cat", state.cat);
        history.replaceState(null, "", url);
      } catch (err) { /* file:// may refuse URL rewrites — filtering still works */ }
      refresh(true);
    });

    railEl.addEventListener("click", function (e) {
      var label = e.target.closest(".plp-facet-label");
      if (label) {
        var facet = label.parentNode;
        facet.classList.toggle("is-open");
        label.setAttribute("aria-expanded", facet.classList.contains("is-open") ? "true" : "false");
        return;
      }
      var size = e.target.closest("[data-size]");
      if (size) {
        var s = size.dataset.size;
        var i = state.sizes.indexOf(s);
        if (i === -1) state.sizes.push(s); else state.sizes.splice(i, 1);
        refresh(true);
        return;
      }
      var swatch = e.target.closest("[data-color]");
      if (swatch) {
        var c = swatch.dataset.color;
        var j = state.colors.indexOf(c);
        if (j === -1) state.colors.push(c); else state.colors.splice(j, 1);
        refresh(true);
        return;
      }
      if (e.target.closest("#plpClear")) {
        state.brands = []; state.sizes = []; state.colors = []; state.price = null;
        refresh(true);
        return;
      }
      if (e.target.closest("#plpFiltersClose") || e.target.closest("#plpApply")) closeFilters();
    });

    railEl.addEventListener("change", function (e) {
      var brand = e.target.closest("[data-brand]");
      if (brand) {
        var b = brand.dataset.brand;
        var i = state.brands.indexOf(b);
        if (i === -1) state.brands.push(b); else state.brands.splice(i, 1);
        refresh(true);
        return;
      }
      var price = e.target.closest("[data-price]");
      if (price) {
        var r = PRICE_RANGES[Number(price.dataset.price)];
        state.price = (state.price && state.price[0] === r.min) ? null : [r.min, r.max];
        refresh(true);
      }
    });

    document.getElementById("plpApplied").addEventListener("click", function (e) {
      var tag = e.target.closest(".plp-tag");
      if (!tag) return;
      var t = tag.dataset.t, v = tag.dataset.v, i;
      if (t === "brand") { i = state.brands.indexOf(v); if (i > -1) state.brands.splice(i, 1); }
      if (t === "size")  { i = state.sizes.indexOf(v);  if (i > -1) state.sizes.splice(i, 1); }
      if (t === "color") { i = state.colors.indexOf(v); if (i > -1) state.colors.splice(i, 1); }
      if (t === "price") state.price = null;
      refresh(true);
    });

    document.getElementById("plpSort").addEventListener("change", function (e) {
      state.sort = e.target.value;
      refresh(true);
    });

    document.getElementById("plpMore").addEventListener("click", function (e) {
      if (!e.target.closest("button")) return;
      state.visible += PAGE_SIZE;
      renderGrid();
    });

    plpGrid.addEventListener("click", function (e) {
      if (e.target.closest("#plpEmptyClear")) {
        state.brands = []; state.sizes = []; state.colors = []; state.price = null;
        state.cat = "All";
        refresh(true);
      }
    });

    bindCardActions(plpGrid);
    bindWishClicks(plpGrid, null);
    bindQuickView(plpGrid);

    /* Mobile filter drawer */
    var filterBtn = document.getElementById("plpFilterBtn");
    var scrim = document.getElementById("plpScrim");
    function openFilters() {
      scrim.hidden = false;
      void scrim.offsetWidth;
      scrim.classList.add("is-open");
      railEl.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }
    function closeFilters() {
      scrim.classList.remove("is-open");
      railEl.classList.remove("is-open");
      document.body.style.overflow = "";
      setTimeout(function () { scrim.hidden = true; }, 250);
    }
    if (filterBtn) filterBtn.addEventListener("click", openFilters);
    if (scrim) scrim.addEventListener("click", closeFilters);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && railEl.classList.contains("is-open")) closeFilters();
    });

    refresh(false);
  }

  /* ════════════════════════════════════════════════════════════
     PRODUCT DETAIL PAGE
     ════════════════════════════════════════════════════════════ */
  var pdpRoot = document.getElementById("pdpRoot");
  if (pdpRoot) initPDPStatic();

  function initPDPStatic() {
    var id = new URLSearchParams(location.search).get("id");
    var p = products.filter(function (x) { return x.id === id; })[0] || products[0];
    var onSale = p.compareAt != null && p.compareAt > p.price;
    var savePct = onSale ? Math.round((1 - p.price / p.compareAt) * 100) : 0;
    var relevantSizes = p.sizes.filter(function (s) { return s !== "OS"; });
    var hasRelevantSizes = relevantSizes.length > 0;
    var selectedSize = hasRelevantSizes ? (relevantSizes.length === 1 ? relevantSizes[0] : null) : "OS";
    var qty = 1;
    var typeClass = "cat-" + String(p.cat || "").toLowerCase().replace(/[^a-z0-9]+/g, "-");
    pdpRoot.classList.add(typeClass);
    var galleryImages = [p.image].concat(p.images || [], p.hover ? [p.hover] : []).filter(function (src, i, arr) {
      return src && arr.indexOf(src) === i;
    });
    if (!galleryImages.length) galleryImages = [p.image];
    if (galleryImages.length < 4) {
      products.forEach(function (item) {
        if (galleryImages.length >= 4 || item.id === p.id || item.cat !== p.cat) return;
        [item.image].concat(item.images || [], item.hover ? [item.hover] : []).forEach(function (src) {
          if (src && galleryImages.length < 4 && galleryImages.indexOf(src) === -1) galleryImages.push(src);
        });
      });
    }
    if (galleryImages.length < 4) {
      products.forEach(function (item) {
        if (galleryImages.length >= 4 || item.id === p.id) return;
        [item.image].concat(item.images || [], item.hover ? [item.hover] : []).forEach(function (src) {
          if (src && galleryImages.length < 4 && galleryImages.indexOf(src) === -1) galleryImages.push(src);
        });
      });
    }

    document.title = "Blue Salon - " + p.vendor + " - " + p.name;

    function pdpField(name) {
      return document.querySelector('[data-pdp="' + name + '"]');
    }

    function setText(name, value) {
      document.querySelectorAll('[data-pdp="' + name + '"]').forEach(function (el) {
        el.textContent = value;
      });
    }

    function cloneTemplate(id) {
      return document.getElementById(id).content.firstElementChild.cloneNode(true);
    }

    function makeStar(filled) {
      var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      svg.setAttribute("width", "14");
      svg.setAttribute("height", "14");
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("fill", filled ? "currentColor" : "none");
      svg.setAttribute("stroke", "currentColor");
      svg.setAttribute("stroke-width", "1.4");
      svg.setAttribute("stroke-linejoin", "round");
      path.setAttribute("d", "M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z");
      svg.appendChild(path);
      return svg;
    }

    function editorialLine(product) {
      if (product.cat === "Jewellery") return "A polished finishing piece selected for gifting, layering and evening detail.";
      if (product.cat === "Gowns") return "A statement piece chosen by Blue Salon buyers for grand entrances and formal occasions.";
      if (product.cat === "Bags") return "A considered accessory with structure, colour and everyday boutique polish.";
      if (product.cat === "Footwear") return "A refined foundation for occasion dressing, tailored separates and after-dark looks.";
      if (product.cat === "Gourmet") return "A gift-ready indulgence from the Blue Salon gourmet edit.";
      return "Selected by Blue Salon buyers for the season's most considered wardrobes.";
    }

    function highlightChips(product) {
      var chips = [];
      if (product.cat === "Gowns") chips.push("Occasion ready");
      if (product.cat === "Bags") chips.push("Dust bag included");
      if (product.cat === "Footwear") chips.push("Boutique fitting");
      if (product.cat === "Gourmet") chips.push("Gift-ready packaging");
      (product.details || []).some(function (detail) {
        if (chips.length >= 4) return true;
        var clean = detail.split("·")[0].trim();
        if (clean && chips.indexOf(clean) === -1) chips.push(clean);
        return false;
      });
      return chips.slice(0, 4);
    }

    function promiseBadges(product) {
      var badges = [];
      if (product.soldOut) badges.push({ text: "Sold out", tone: "muted" });
      else if (product.badge) badges.push({ text: product.badge, tone: product.badgeTone || "status" });
      if (product.cat === "Bags") badges.push({ text: "Dust bag included", tone: "light" });
      else if (product.cat === "Footwear") badges.push({ text: "Boutique fitting", tone: "light" });
      else if (product.cat === "Gourmet") badges.push({ text: "Gift-ready packaging", tone: "light" });
      else badges.push({ text: "Blue Salon edit", tone: "light" });
      return badges.slice(0, 4);
    }

    function materialLine(product) {
      var detail = (product.details || [])[0] || "";
      if (detail) return detail.replace(/Â·/g, "-") + ".";
      if (product.cat === "Jewellery") return "Polished metals, crystal detail and a gift-ready finish.";
      if (product.cat === "Bags") return "Structured leather and considered hardware.";
      if (product.cat === "Footwear") return "Refined uppers and a polished evening profile.";
      if (product.cat === "Gourmet") return "Gift-ready packaging and selected Belgian chocolate pieces.";
      return "Premium materials selected for feel, finish and longevity.";
    }

    function occasionLine(product) {
      if (product.cat === "Gowns") return "Formal evenings, wedding invitations and grand entrances.";
      if (product.cat === "Jewellery") return "Gifting, layering and quiet evening detail.";
      if (product.cat === "Bags") return "Dinners, travel days and refined everyday styling.";
      if (product.cat === "Footwear") return "Occasion dressing, tailoring and after-dark edits.";
      if (product.cat === "Gourmet") return "Majlis hosting, gifting and celebratory tables.";
      return "A versatile piece for the modern Blue Salon wardrobe.";
    }

    setText("vendor", p.vendor);
    setText("title", p.name);
    setText("detailTitle", p.name);
    setText("editorialCopy", editorialLine(p));
    setText("editorialLine", editorialLine(p));
    setText("rating", p.rating.toFixed(1));
    setText("reviewCount", p.count);
    setText("price", money(p.price));
    setText("installment", money(p.price / 4));
    setText("colorName", p.color || "");
    setText("description", p.desc);
    setText("craftsmanship", ((p.details || [])[1] || (p.details || [])[0] || "Finished with the detail expected from the Blue Salon edit.").replace(/Â·/g, "-"));
    setText("materials", materialLine(p));
    setText("occasion", occasionLine(p));
    setText("stylingBlock", p.cat === "Jewellery"
      ? "Wear alone as a single point of light, or layer with fine chains from the same edit."
      : "Keep the surrounding styling restrained so the silhouette, colour and finish stay in focus.");
    setText("authenticText", "Sourced directly from " + p.vendor);
    setText("ref", "Ref. " + p.id.toUpperCase());
    setText("barVendor", p.vendor);
    setText("stockNote", p.soldOut ? "Currently sold out" : (hasRelevantSizes ? relevantSizes.length + " sizes available" : "One size available"));
    setText("stylingNote", p.cat === "Jewellery"
      ? "Layer with fine chains or wear alone when the silhouette needs one polished point of light."
      : "Pair with tonal accessories and a minimal evening clutch for a cleaner silhouette.");

    var promiseWrap = document.getElementById("pdpPromiseBadges");
    if (promiseWrap) {
      promiseWrap.textContent = "";
      promiseBadges(p).forEach(function (badge) {
        var span = document.createElement("span");
        span.className = "pdp-promise-badge pdp-promise-" + badge.tone;
        span.textContent = badge.text;
        promiseWrap.appendChild(span);
      });
    }

    var chipWrap = document.getElementById("pdpHighlightChips");
    if (chipWrap) {
      chipWrap.textContent = "";
      highlightChips(p).forEach(function (chip) {
        var span = document.createElement("span");
        span.textContent = chip;
        chipWrap.appendChild(span);
      });
    }

    var starsEl = pdpField("stars");
    if (starsEl) {
      starsEl.textContent = "";
      starsEl.setAttribute("aria-label", "Rated " + p.rating + " out of 5");
      for (var star = 1; star <= 5; star++) {
        starsEl.appendChild(makeStar(p.rating >= star - 0.25));
      }
    }

    var priceWrap = pdpField("priceWrap");
    var compareEl = pdpField("comparePrice");
    var saveEl = pdpField("save");
    if (priceWrap) priceWrap.classList.toggle("on-sale", onSale);
    if (compareEl) {
      compareEl.hidden = !onSale;
      compareEl.textContent = onSale ? money(p.compareAt) : "";
    }
    if (saveEl) {
      saveEl.hidden = !onSale;
      saveEl.textContent = onSale ? "Save " + savePct + "%" : "";
    }

    function productColorOptions(product) {
      var seen = {};
      var options = [];
      function add(name, hex, available) {
        if (!name || !hex || seen[name]) return;
        seen[name] = true;
        options.push({ name: name, hex: hex, available: available !== false });
      }
      add(product.color, product.colorHex, true);
      products.forEach(function (item) {
        if (options.length >= 5 || item.cat !== product.cat) return;
        add(item.color, item.colorHex, false);
      });
      return options;
    }

    var colorGroup = pdpField("colorGroup");
    var swatchRow = colorGroup ? colorGroup.querySelector(".pdp-swatch-row") : null;
    if (colorGroup) colorGroup.hidden = !p.colorHex;
    if (swatchRow && p.colorHex) {
      var colorOptions = productColorOptions(p);
      swatchRow.textContent = "";
      colorOptions.forEach(function (option) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "pdp-swatch" + (option.name === p.color ? " is-active" : "");
        btn.style.background = option.hex;
        btn.dataset.colorName = option.name;
        btn.setAttribute("aria-label", option.name);
        btn.setAttribute("aria-pressed", option.name === p.color ? "true" : "false");
        btn.title = option.name;
        if (!option.available) btn.classList.add("is-alt");
        swatchRow.appendChild(btn);
      });
      var colorLabel = document.createElement("span");
      colorLabel.className = "pdp-color-name";
      colorLabel.setAttribute("data-pdp", "colorName");
      colorLabel.textContent = p.color;
      swatchRow.appendChild(colorLabel);
      swatchRow.addEventListener("click", function (event) {
        var btn = event.target.closest(".pdp-swatch");
        if (!btn) return;
        swatchRow.querySelectorAll(".pdp-swatch").forEach(function (item) {
          var active = item === btn;
          item.classList.toggle("is-active", active);
          item.setAttribute("aria-pressed", active ? "true" : "false");
        });
        colorLabel.textContent = btn.dataset.colorName || p.color;
      });
    }

    var detailImage = document.querySelector("[data-pdp-detail-image]");
    if (detailImage) {
      detailImage.src = galleryImages[1] || galleryImages[0];
      detailImage.alt = p.name;
    }

    var stackEl = document.getElementById("pdpStack");
    var dotsEl = document.getElementById("pdpDots");
    var thumbsEl = document.getElementById("pdpThumbs");
    var referenceLayout = !!pdpRoot.closest(".pdp-reference-page");
    stackEl.textContent = "";
    dotsEl.textContent = "";
    if (thumbsEl) thumbsEl.textContent = "";
    dotsEl.hidden = galleryImages.length <= 1;
    if (thumbsEl) thumbsEl.hidden = galleryImages.length <= 1;
    galleryImages.forEach(function (src, i) {
      var frame = cloneTemplate("pdpFrameTemplate");
      var imgEl = frame.querySelector("img");
      var badgeEl = frame.querySelector("[data-pdp-frame-badge]");
      imgEl.src = src;
      imgEl.alt = p.name + (galleryImages.length > 1 ? " - view " + (i + 1) : "");
      if (i) imgEl.loading = "lazy";

      if (i === 0 && (p.soldOut || p.badge)) {
        badgeEl.hidden = false;
        badgeEl.textContent = p.soldOut ? "Sold out" : p.badge;
        badgeEl.classList.add("bs-badge-" + (p.soldOut ? "soldout" : (p.badgeTone || "neutral")));
      }
      if (!referenceLayout || i === 0) stackEl.appendChild(frame);

      if (thumbsEl) {
        var thumb = cloneTemplate("pdpThumbTemplate");
        var thumbImg = thumb.querySelector("img");
        var thumbLabel = thumb.querySelector("span");
        thumb.dataset.thumb = String(i);
        thumb.setAttribute("aria-label", "View image " + (i + 1));
        thumb.classList.toggle("is-active", i === 0);
        thumbImg.src = src;
        thumbImg.alt = "";
        thumbLabel.textContent = i === 0 ? "Main" : "View " + (i + 1);
        thumbsEl.appendChild(thumb);
      }

      if (galleryImages.length > 1) {
        var dot = cloneTemplate("pdpDotTemplate");
        dot.dataset.dot = String(i);
        dot.setAttribute("aria-label", "Image " + (i + 1));
        dot.classList.toggle("is-active", i === 0);
        dotsEl.appendChild(dot);
      }
    });

    // Hover-zoom ("full effect") on the main product image — cursor-tracking magnify.
    if (referenceLayout) {
      var zoomFrame = stackEl.querySelector(".pdp-frame");
      var zoomImg = zoomFrame && zoomFrame.querySelector("img");
      if (zoomFrame && zoomImg && !zoomFrame.dataset.zoomBound) {
        zoomFrame.dataset.zoomBound = "1";
        var ZOOM = 2.1;
        zoomFrame.addEventListener("mouseenter", function () {
          if (zoomFrame.classList.contains("is-switching")) return;
          zoomFrame.classList.add("is-zoom");
        });
        zoomFrame.addEventListener("mousemove", function (e) {
          if (!zoomFrame.classList.contains("is-zoom")) return;
          var r = zoomFrame.getBoundingClientRect();
          var x = ((e.clientX - r.left) / r.width) * 100;
          var y = ((e.clientY - r.top) / r.height) * 100;
          x = Math.max(0, Math.min(100, x));
          y = Math.max(0, Math.min(100, y));
          zoomImg.style.transformOrigin = x + "% " + y + "%";
          zoomImg.style.transform = "scale(" + ZOOM + ")";
        });
        zoomFrame.addEventListener("mouseleave", function () {
          zoomFrame.classList.remove("is-zoom");
          zoomImg.style.transform = "";
          zoomImg.style.transformOrigin = "";
        });
      }
    }

    var sizeWrap = document.getElementById("pdpSizes");
    var sizeName = document.getElementById("pdpSizeName");
    var sizeGroup = pdpField("sizeGroup");
    sizeWrap.textContent = "";
    if (sizeGroup) sizeGroup.hidden = !hasRelevantSizes;
    relevantSizes.forEach(function (s) {
      var btn = cloneTemplate("pdpSizeTemplate");
      btn.dataset.size = s;
      btn.textContent = s;
      btn.classList.toggle("is-active", s === selectedSize);
      sizeWrap.appendChild(btn);
    });
    if (sizeName) sizeName.textContent = hasRelevantSizes ? (selectedSize || "select") : "";

    document.querySelectorAll('[data-pdp="details"]').forEach(function (detailsList) {
      detailsList.textContent = "";
      p.details.forEach(function (detail) {
        var li = document.createElement("li");
        li.textContent = detail;
        detailsList.appendChild(li);
      });
    });

    var crumbEl = document.getElementById("pdpCrumbs");
    if (crumbEl) {
      crumbEl.textContent = "";
      [
        { label: "Home", href: "index.html" },
        { label: p.cat, href: "listing.html?cat=" + encodeURIComponent(p.cat) },
        { label: p.vendor }
      ].forEach(function (item, i) {
        if (i) {
          var sep = document.createElement("span");
          sep.className = "sep";
          sep.textContent = "/";
          crumbEl.appendChild(sep);
        }
        var el = item.href ? document.createElement("a") : document.createElement("span");
        el.textContent = item.label;
        if (item.href) el.href = item.href;
        else el.className = "current";
        crumbEl.appendChild(el);
      });
    }

    if (dotsEl && galleryImages.length > 1) {
      var frames = stackEl.children;
      function setActiveMedia(i) {
        dotsEl.querySelectorAll(".pdp-dot").forEach(function (d, j) {
          d.classList.toggle("is-active", j === i);
        });
        if (thumbsEl) {
          thumbsEl.querySelectorAll(".pdp-thumb").forEach(function (t, j) {
            t.classList.toggle("is-active", j === i);
          });
        }
        if (referenceLayout) {
          var mainFrame = frames[0];
          var mainImg = mainFrame && mainFrame.querySelector("img");
          if (mainImg) {
            if (mainImg.getAttribute("src") === galleryImages[i]) return;
            if (mainFrame) {
              mainFrame.classList.add("is-switching");
              void mainFrame.offsetWidth;
            }
            setTimeout(function () {
              mainImg.src = galleryImages[i];
              mainImg.alt = p.name + " - view " + (i + 1);
              setTimeout(function () {
                if (mainFrame) mainFrame.classList.remove("is-switching");
              }, 90);
            }, 120);
          }
        }
      }
      if (referenceLayout) setActiveMedia(0);
      stackEl.addEventListener("scroll", function () {
        if (referenceLayout) return;
        var i = Math.round(stackEl.scrollLeft / (stackEl.clientWidth + 12));
        i = Math.max(0, Math.min(frames.length - 1, i));
        setActiveMedia(i);
      }, { passive: true });
      dotsEl.addEventListener("click", function (e) {
        var d = e.target.closest("[data-dot]");
        if (!d) return;
        if (referenceLayout) {
          setActiveMedia(Number(d.dataset.dot));
          return;
        }
        frames[Number(d.dataset.dot)].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      });
      if (thumbsEl) {
        thumbsEl.addEventListener("click", function (e) {
          var thumb = e.target.closest("[data-thumb]");
          if (!thumb) return;
          if (referenceLayout) {
            setActiveMedia(Number(thumb.dataset.thumb));
            return;
          }
          frames[Number(thumb.dataset.thumb)].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
          setActiveMedia(Number(thumb.dataset.thumb));
        });
      }
    }

    sizeWrap.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-size]");
      if (!btn) return;
      selectedSize = btn.dataset.size;
      pdpRoot.querySelectorAll(".pdp-size").forEach(function (b) {
        b.classList.toggle("is-active", b === btn);
      });
      if (sizeName) sizeName.textContent = selectedSize;
    });

    var qtyOut = document.getElementById("qtyOut");
    var addBtn = document.getElementById("pdpAdd");
    var bar = document.getElementById("pdpMobilebar");
    var barBtn = document.getElementById("pdpBarAdd");
    addBtn.disabled = !!p.soldOut;
    barBtn.disabled = !!p.soldOut;
    barBtn.textContent = p.soldOut ? "Sold out" : "Add to bag";

    function syncQty() {
      qtyOut.textContent = qty;
      addBtn.textContent = p.soldOut ? "Sold out" : "Add to bag - " + money(p.price * qty);
      var barAmount = document.getElementById("pdpBarAmount");
      if (barAmount) barAmount.textContent = money(p.price * qty);
    }
    syncQty();

    document.getElementById("qtyDown").addEventListener("click", function () { if (qty > 1) { qty--; syncQty(); } });
    document.getElementById("qtyUp").addEventListener("click", function () { if (qty < 9) { qty++; syncQty(); } });

    function addToBag() {
      if (p.soldOut) return;
      if (!selectedSize) {
        toast("Please select a size first");
        sizeWrap.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
      addLine(p.id, selectedSize || "OS", qty);
      toast("Added to bag - " + p.vendor + (hasRelevantSizes ? ", size " + selectedSize : ""));
    }
    addBtn.addEventListener("click", addToBag);
    barBtn.addEventListener("click", addToBag);

    document.querySelectorAll("[data-delivery]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        document.querySelectorAll("[data-delivery]").forEach(function (b) {
          b.classList.toggle("is-active", b === btn);
        });
        var copy = document.getElementById("pdpDeliveryCopy");
        if (copy) {
          copy.textContent = btn.dataset.delivery === "boutique"
            ? "Reserve online and collect from Blue Salon boutique once your order is prepared."
            : "Same-day delivery in Doha for eligible orders placed before 2pm.";
        }
      });
    });

    var wishBtn = document.getElementById("pdpWish");
    wishBtn.classList.toggle("is-wishlisted", wishlist.indexOf(p.id) !== -1);
    wishBtn.addEventListener("click", function () {
      var nowWished = toggleWish(p.id);
      this.classList.toggle("is-wishlisted", nowWished);
      toast(nowWished ? "Saved to wishlist" : "Removed from wishlist");
    });

    pdpRoot.addEventListener("click", function (e) {
      var btn = e.target.closest(".pdp-acc-btn");
      if (!btn) return;
      var item = btn.parentNode;
      item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", item.classList.contains("is-open") ? "true" : "false");
    });

    document.querySelectorAll("[data-pdp-tab]").forEach(function (tab) {
      tab.addEventListener("click", function () {
        var key = tab.dataset.pdpTab;
        document.querySelectorAll("[data-pdp-tab]").forEach(function (btn) {
          var active = btn === tab;
          btn.classList.toggle("is-active", active);
          btn.setAttribute("aria-selected", active ? "true" : "false");
        });
        document.querySelectorAll("[data-pdp-panel]").forEach(function (panel) {
          var active = panel.dataset.pdpPanel === key;
          panel.classList.toggle("is-active", active);
          panel.hidden = !active;
        });
      });
    });

    document.getElementById("pdpShare").addEventListener("click", function () {
      var url = location.href;
      if (navigator.share) {
        navigator.share({ title: p.vendor + " - " + p.name, url: url }).catch(function () {});
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(function () { toast("Link copied to clipboard"); });
      }
    });

    var relatedGrid = document.getElementById("pdpRelated");
    if (relatedGrid) {
      var pool = products.filter(function (x) { return x.id !== p.id; });
      pool.sort(function (a, b) { return (b.cat === p.cat) - (a.cat === p.cat); });
      relatedGrid.innerHTML = pool.slice(0, 4).map(function (item) { return cardHTML(item); }).join("");
      bindWishClicks(relatedGrid, null);
      bindCardActions(relatedGrid);
    }

    var buyRow = pdpRoot.querySelector(".pdp-buy");
    if ("IntersectionObserver" in window && buyRow) {
      new IntersectionObserver(function (entries) {
        bar.classList.toggle("is-visible", !entries[0].isIntersecting);
      }, { rootMargin: "-60px 0px 0px 0px" }).observe(buyRow);
    } else {
      bar.classList.add("is-visible");
    }

    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("is-inview"); io.unobserve(en.target); }
        });
      }, { threshold: 0.12 });
      [document.querySelector(".pdp-related")].filter(Boolean).forEach(function (el) {
        el.classList.add("pdp-reveal");
        io.observe(el);
      });
    }
  }

  /* ════════════════════════════════════════════════════════════
     CART PAGE — line items, delivery progress, promo, gifting,
     order summary and cross-sell. State lives in the shared bag.
     ════════════════════════════════════════════════════════════ */
  var cartLines = document.getElementById("cartLines");
  if (cartLines) initCart();

  function initCart() {
    var SHIP_THRESHOLD = 499;
    var SHIP_FEE = 30;
    var PROMOS = { WELCOME10: 0.10, PRIVE15: 0.15 };
    var promo = store("bs-promo", null);   // {code, pct}
    var gift = store("bs-gift", false) === true;

    /* Demo seeding — cart.html?seed fills an empty bag for previews */
    if (new URLSearchParams(location.search).has("seed") && bag.length === 0) {
      addLine("zm-ivory-gown", "8", 1);
      addLine("swk-sparkling-dance-set", "OS", 1);
      addLine("justcavalli-earrings", "OS", 2);
    }

    var layoutEl = document.getElementById("cartLayout");
    var emptyEl = document.getElementById("cartEmpty");
    var headCountEl = document.getElementById("cartHeadCount");
    var shipEl = document.getElementById("cartShip");
    var summaryEl = document.getElementById("cartSummary");
    var relatedEl = document.getElementById("cartRelated");

    document.title = "Blue Salon — Shopping Bag";

    function prod(id) { return products.filter(function (p) { return p.id === id; })[0]; }
    function subtotal() {
      return bag.reduce(function (s, l) { return s + prod(l.id).price * l.qty; }, 0);
    }

    /* ── One line item ── */
    function lineHTML(l, i) {
      var p = prod(l.id);
      var onSale = p.compareAt != null && p.compareAt > p.price;
      var sizeCtl = p.sizes.length > 1
        ? '<label class="cart-size">Size' +
            '<select data-line-size="' + i + '" aria-label="Size">' +
              p.sizes.map(function (s) {
                return "<option" + (s === l.size ? " selected" : "") + ">" + s + "</option>";
              }).join("") +
            "</select></label>"
        : '<span class="cart-size">Size · ' + l.size + "</span>";

      return (
        '<article class="cart-line" data-line="' + i + '">' +
          '<a class="cart-line-media" href="product.html?id=' + p.id + '">' +
            '<img src="' + p.image + '" alt="' + p.name + '" loading="lazy">' +
          "</a>" +
          '<div class="cart-line-info">' +
            '<span class="bs-eyebrow cart-line-vendor">' + p.vendor + "</span>" +
            '<a class="cart-line-name" href="product.html?id=' + p.id + '">' + p.name + "</a>" +
            '<div class="cart-line-meta">' +
              (p.colorHex ? '<span class="cart-line-colour"><i style="background:' + p.colorHex + '"></i>' + p.color + "</span>" : "") +
              sizeCtl +
            "</div>" +
            '<div class="cart-line-actions">' +
              '<button type="button" data-line-wish="' + i + '">Move to wishlist</button>' +
              '<span aria-hidden="true">·</span>' +
              '<button type="button" data-line-remove="' + i + '">Remove</button>' +
            "</div>" +
          "</div>" +
          '<div class="cart-line-qty" role="group" aria-label="Quantity">' +
            '<button type="button" data-line-down="' + i + '" aria-label="Decrease quantity">−</button>' +
            "<output>" + l.qty + "</output>" +
            '<button type="button" data-line-up="' + i + '" aria-label="Increase quantity">+</button>' +
          "</div>" +
          '<div class="cart-line-total">' +
            '<span class="cart-line-price">' + money(p.price * l.qty) + "</span>" +
            (onSale ? '<span class="cart-line-compare">' + money(p.compareAt * l.qty) + "</span>" : "") +
          "</div>" +
        "</article>"
      );
    }

    var PAYMENT_ICONS =
      '<ul class="payment-methods cart-payments">' +
        '<li><img src="//www.bluesalon.com/cdn/shop/files/Visa_Inverted_x32_5700ab8c-cb49-4355-83c3-4d1146a8076c_x32.png?v=1644226717" alt="Visa" loading="lazy"></li>' +
        '<li><img src="//www.bluesalon.com/cdn/shop/files/mastercard-logo-design-history-1979_x32.jpg?v=1644232735" alt="Mastercard" loading="lazy"></li>' +
        '<li><img src="//www.bluesalon.com/cdn/shop/files/Group_1_x32.jpg?v=1660140162" alt="Apple Pay" loading="lazy"></li>' +
        '<li><img src="//www.bluesalon.com/cdn/shop/files/21Google_Pay9bc22ee1-7e10-4d6f-b0ec-57672824e23d_x32_1_x32.png?v=1709793011" alt="Google Pay" loading="lazy"></li>' +
      "</ul>";

    function render() {
      var count = bagQty();
      var isEmpty = bag.length === 0;
      layoutEl.hidden = isEmpty;
      shipEl.hidden = isEmpty;
      emptyEl.hidden = !isEmpty;
      if (headCountEl) headCountEl.textContent = isEmpty ? "" : "· " + count + (count === 1 ? " piece" : " pieces");
      syncCounters();
      renderRelated();
      if (isEmpty) { syncMobilebar(0); return; }

      cartLines.innerHTML = bag.map(lineHTML).join("");

      /* Free delivery progress */
      var sub = subtotal();
      var left = Math.max(0, SHIP_THRESHOLD - sub);
      shipEl.innerHTML =
        '<div class="cart-ship-copy">' +
          (left > 0
            ? "You are <strong>" + money(left) + "</strong> away from complimentary delivery"
            : "<strong>Complimentary delivery</strong> applied to your order") +
        "</div>" +
        '<div class="cart-ship-bar"><div class="cart-ship-fill" style="width:' +
          Math.min(100, Math.round((sub / SHIP_THRESHOLD) * 100)) + '%"></div></div>';

      /* Order summary */
      var discount = promo ? sub * promo.pct : 0;
      var delivery = (sub - discount) >= SHIP_THRESHOLD ? 0 : SHIP_FEE;
      var total = sub - discount + delivery;
      summaryEl.innerHTML =
        '<h2 class="cart-summary-title">Order summary</h2>' +
        '<dl class="cart-summary-rows">' +
          "<div><dt>Subtotal · " + count + (count === 1 ? " piece" : " pieces") + "</dt><dd>" + money(sub) + "</dd></div>" +
          (promo
            ? '<div class="is-discount"><dt>' + promo.code + " · −" + Math.round(promo.pct * 100) + "%" +
              ' <button type="button" id="cartPromoRemove" aria-label="Remove promo code">×</button></dt>' +
              "<dd>−" + money(discount) + "</dd></div>"
            : "") +
          "<div><dt>Delivery</dt><dd>" + (delivery === 0 ? "Complimentary" : money(delivery)) + "</dd></div>" +
        "</dl>" +
        '<div class="cart-summary-total"><span>Total</span><span>' + money(total) + "</span></div>" +
        '<p class="cart-summary-instalments">or 4 interest-free payments of <strong>' + money(total / 4) + "</strong></p>" +
        '<p class="cart-summary-tax">Prices include VAT · duties calculated at checkout</p>' +
        (promo ? "" :
          '<form class="cart-promo" id="cartPromoForm">' +
            '<input type="text" id="cartPromoInput" placeholder="Promo code" aria-label="Promo code" autocomplete="off">' +
            '<button type="submit">Apply</button>' +
          "</form>") +
        '<label class="cart-gift">' +
          '<input type="checkbox" id="cartGift"' + (gift ? " checked" : "") + ">" +
          '<span class="cart-gift-box"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></span>' +
          "<span>Wrap in the Blue Salon box — <strong>complimentary</strong></span>" +
        "</label>" +
        '<button class="bs-btn bs-btn-primary cart-checkout" type="button" id="cartCheckout">Proceed to checkout — ' + money(total) + "</button>" +
        '<div class="cart-summary-trust"><span>100% authentic</span><span aria-hidden="true">·</span><span>14-day returns</span><span aria-hidden="true">·</span><span>Secure payment</span></div>' +
        PAYMENT_ICONS;

      syncMobilebar(total);
    }

    /* ── Cross-sell: pieces from the same departments, not in the bag ── */
    function renderRelated() {
      if (!relatedEl) return;
      var inBag = bag.map(function (l) { return l.id; });
      var cats = bag.map(function (l) { return prod(l.id).cat; });
      var pool = products.filter(function (p) {
        return inBag.indexOf(p.id) === -1 && !p.soldOut;
      });
      pool.sort(function (a, b) { return (cats.indexOf(b.cat) !== -1) - (cats.indexOf(a.cat) !== -1); });
      relatedEl.innerHTML = pool.slice(0, 4).map(function (p) { return cardHTML(p); }).join("");
    }

    /* ── Line item events (delegated once) ── */
    cartLines.addEventListener("click", function (e) {
      var t = e.target.closest("[data-line-up],[data-line-down],[data-line-remove],[data-line-wish]");
      if (!t) return;
      var i, l;
      if (t.dataset.lineUp != null) {
        l = bag[Number(t.dataset.lineUp)];
        if (l && l.qty < 9) { l.qty++; saveBag(); render(); }
      } else if (t.dataset.lineDown != null) {
        l = bag[Number(t.dataset.lineDown)];
        if (l && l.qty > 1) { l.qty--; saveBag(); render(); }
      } else if (t.dataset.lineRemove != null) {
        i = Number(t.dataset.lineRemove);
        l = bag[i];
        bag.splice(i, 1);
        saveBag(); render();
        toast("Removed — " + prod(l.id).vendor);
      } else if (t.dataset.lineWish != null) {
        i = Number(t.dataset.lineWish);
        l = bag[i];
        if (wishlist.indexOf(l.id) === -1) toggleWish(l.id);
        bag.splice(i, 1);
        saveBag(); render();
        toast("Moved to wishlist — " + prod(l.id).vendor);
      }
    });

    cartLines.addEventListener("change", function (e) {
      var sel = e.target.closest("[data-line-size]");
      if (!sel) return;
      var i = Number(sel.dataset.lineSize);
      var l = bag[i];
      var twin = bag.filter(function (x, j) { return j !== i && x.id === l.id && x.size === sel.value; })[0];
      if (twin) { twin.qty = Math.min(9, twin.qty + l.qty); bag.splice(i, 1); }
      else l.size = sel.value;
      saveBag(); render();
    });

    /* ── Summary events (delegated once) ── */
    summaryEl.addEventListener("click", function (e) {
      if (e.target.closest("#cartPromoRemove")) {
        promo = null; save("bs-promo", null); render();
        return;
      }
      if (e.target.closest("#cartCheckout")) {
        toast("Checkout is next — this is a design prototype");
      }
    });
    summaryEl.addEventListener("submit", function (e) {
      var form = e.target.closest("#cartPromoForm");
      if (!form) return;
      e.preventDefault();
      var code = document.getElementById("cartPromoInput").value.trim().toUpperCase();
      if (PROMOS[code]) {
        promo = { code: code, pct: PROMOS[code] };
        save("bs-promo", promo);
        render();
        toast("Promo applied — " + code);
      } else if (code) {
        toast("We don't recognise that code");
      }
    });
    summaryEl.addEventListener("change", function (e) {
      if (!e.target.closest("#cartGift")) return;
      gift = e.target.checked;
      save("bs-gift", gift);
      toast(gift ? "We'll wrap it in the Blue Salon box" : "Gift wrapping removed");
    });

    /* ── Cross-sell quick add (size chips + quick add, like the PLP) ── */
    if (relatedEl) {
      bindWishClicks(relatedEl, null);
      bindCardActions(relatedEl, render);
    }

    /* ── Sticky checkout bar (mobile) ── */
    var bar = document.createElement("div");
    bar.className = "cart-mobilebar";
    bar.innerHTML =
      '<span class="cart-mobilebar-price">' +
        '<span class="cart-mobilebar-label">Total</span>' +
        '<span class="cart-mobilebar-amount" id="cartBarTotal"></span>' +
      "</span>" +
      '<button class="bs-btn bs-btn-primary" type="button" id="cartBarCheckout">Checkout</button>';
    document.body.appendChild(bar);
    bar.querySelector("#cartBarCheckout").addEventListener("click", function () {
      toast("Checkout is next — this is a design prototype");
    });
    function syncMobilebar(total) {
      bar.hidden = bag.length === 0;
      var amount = document.getElementById("cartBarTotal");
      if (amount) amount.textContent = money(total);
    }
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        bar.classList.toggle("is-away", entries[0].isIntersecting);
      }, { threshold: 0.2 }).observe(summaryEl);
    }

    render();
  }
})();
