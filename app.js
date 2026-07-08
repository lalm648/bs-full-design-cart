/* ============================================================
   BLUE SALON — STOREFRONT HOMEPAGE (vanilla JS port of the React kit)
   Data comes from ui_kits/website/data.js (window.BS_DATA).
   ============================================================ */
(function () {
  "use strict";

  var data = window.BS_DATA;

  /* ── GCC locales (region · currency · language) ─────────────
     Prices in the data are stored in QAR (base). `rate` converts
     QAR → the country's currency; `dec` is the minor-unit count. */
  var GCC = [
    { cc: "QA", country: "Qatar",                ccy: "QAR", ccyName: "Qatari Riyal",   rate: 1,       dec: 2 },
    { cc: "SA", country: "Saudi Arabia",         ccy: "SAR", ccyName: "Saudi Riyal",    rate: 1.030,   dec: 2 },
    { cc: "AE", country: "United Arab Emirates", ccy: "AED", ccyName: "UAE Dirham",     rate: 1.009,   dec: 2 },
    { cc: "KW", country: "Kuwait",               ccy: "KWD", ccyName: "Kuwaiti Dinar",  rate: 0.0843,  dec: 3 },
    { cc: "BH", country: "Bahrain",              ccy: "BHD", ccyName: "Bahraini Dinar", rate: 0.1033,  dec: 3 },
    { cc: "OM", country: "Oman",                 ccy: "OMR", ccyName: "Omani Rial",     rate: 0.1056,  dec: 3 },
  ];

  /* Active selection (mutated by the locale picker). */
  var locale = { region: GCC[0], lang: "en" };

  /* ── Helpers ────────────────────────────────────────────── */

  function formatMoney(amountQAR) {
    var r = locale.region;
    return r.ccy + " " + (Number(amountQAR) * r.rate).toLocaleString("en-US", {
      minimumFractionDigits: r.dec,
      maximumFractionDigits: r.dec,
    });
  }

  function pill(variant, text) {
    return '<span class="pill ' + variant + '">' + text + "</span>";
  }

  /* Edit card: ec(tag, title, meta[, variant]) */
  function ec(tag, title, meta, variant) {
    return (
      '<div class="bs-edit-card' + (variant ? " " + variant : "") + '">' +
        '<div class="tag">' + tag + "</div>" +
        '<div class="title">' + title + "</div>" +
        '<div class="meta">' + meta + "</div>" +
      "</div>"
    );
  }

  /* ── Mega menus ─────────────────────────────────────────── */

  var MEGA_MENUS = {
    new:
      '<div class="bs-mega cols-5">' +
        '<div class="bs-col"><h4>Just landed</h4><ul>' +
          '<li class="featured">Shop all new arrivals →</li>' +
          "<li>Last 7 days " + pill("new", "NEW") + "</li>" +
          "<li>This month</li><li>Pre-order</li><li>Restocked</li><li>Coming soon</li>" +
        "</ul></div>" +
        '<div class="bs-col"><h4>For her</h4><ul>' +
          "<li>Clothing</li><li>Bags</li><li>Footwear</li>" +
          "<li>Lingerie</li><li>Fine jewellery</li><li>Abayas &amp; kaftans</li>" +
        "</ul></div>" +
        '<div class="bs-col"><h4>For him</h4><ul>' +
          "<li>Clothing</li><li>Footwear</li><li>Bags</li>" +
          "<li>Watches</li><li>Fragrances</li><li>Traditional wear</li>" +
        "</ul></div>" +
        '<div class="bs-col"><h4>Beyond fashion</h4><ul>' +
          "<li>Beauty &amp; fragrance</li><li>Newborn essentials</li>" +
          "<li>Home &amp; linen</li><li>Luggage</li><li>Gourmet</li><li>Gift boxes</li>" +
        "</ul></div>" +
        '<div class="bs-edit"><div class="bs-edit-label">THE EDIT</div>' +
          ec("THIS WEEK", "42 new arrivals", "From Creed, MCM, Aigner & more", "feature") +
          ec("EXCLUSIVE", "SS26 capsule launch", "Only at Blue Salon Qatar") +
        "</div>" +
      "</div>",

    women:
      '<div class="bs-mega cols-6">' +
        '<div class="bs-col"><h4>Clothing</h4><ul>' +
          '<li class="featured">Shop all clothing →</li>' +
          "<li>Dresses</li><li>Gowns</li><li>Tops &amp; blouses</li>" +
          "<li>Knitwear</li><li>Pants &amp; trousers</li><li>Skirts</li>" +
          "<li>Denim</li><li>Coats &amp; jackets</li>" +
          "<li>Jumpsuits &amp; sets</li><li>Activewear</li>" +
        "</ul></div>" +
        '<div class="bs-col"><h4>Lingerie &amp; intimates</h4><ul>' +
          '<li class="featured">All lingerie →</li>' +
          "<li>Bras</li><li>Panties</li><li>Shapewear</li>" +
          "<li>Hosiery &amp; daywear</li><li>Sports bras</li>" +
          "<li>Blushing brides " + pill("gift", "GIFT") + "</li>" +
          "<li>Maternity</li>" +
        "</ul>" +
        '<h4 class="sub">Sleep &amp; lounge</h4><ul>' +
          "<li>Nightdress</li><li>Pyjamas &amp; loungewear</li>" +
          "<li>Dressing gowns</li><li>Swimwear</li>" +
        "</ul></div>" +
        '<div class="bs-col"><h4>Modest &amp; occasion</h4><ul>' +
          '<li class="featured">Abayas &amp; kaftans ' + pill("eid", "EID") + "</li>" +
          "<li>Eid collection</li><li>Wedding guest</li>" +
          "<li>Bridal</li><li>Evening &amp; gowns</li><li>Resort wear</li>" +
        "</ul>" +
        '<h4 class="sub">Footwear</h4><ul>' +
          "<li>Heels</li><li>Sandals &amp; flats</li>" +
          "<li>Sneakers &amp; trainers</li><li>Boots</li><li>Loafers</li>" +
        "</ul></div>" +
        '<div class="bs-col"><h4>Bags</h4><ul>' +
          "<li>Shoulder bags</li><li>Hand bags</li><li>Tote bags</li>" +
          "<li>Crossbody</li><li>Clutch &amp; mini</li>" +
          "<li>Backpacks</li><li>Wallets &amp; card cases</li>" +
        "</ul>" +
        '<h4 class="sub">Accessories</h4><ul>' +
          "<li>Scarves &amp; belts</li><li>Sunglasses</li><li>Hair accessories</li>" +
        "</ul></div>" +
        '<div class="bs-col"><h4>Watches &amp; jewellery</h4><ul>' +
          "<li>Luxury timepieces " + pill("signature", "PREMIUM") + "</li>" +
          "<li>Fashion timepieces</li><li>Fine jewellery</li>" +
          "<li>Fashion jewellery</li><li>Necklaces &amp; sets</li>" +
          "<li>Earrings &amp; rings</li><li>Bracelets</li>" +
        "</ul>" +
        '<h4 class="sub">Top brands</h4><ul>' +
          "<li>La Perla</li><li>MCM</li><li>Aigner</li><li>Swarovski</li>" +
          '<li class="featured">View all A–Z →</li>' +
        "</ul></div>" +
        '<div class="bs-edit"><div class="bs-edit-label">THE EDIT</div>' +
          ec("EID 2026", "Abaya & kaftan edit", "42 pieces · from QAR 1,200", "feature") +
          ec("BRIDAL", "Trousseau by La Perla", "Hand-wrapped · gift ready") +
          ec("CONCIERGE", "Personal styling", "Complimentary · in-store") +
        "</div>" +
      "</div>",

    men:
      '<div class="bs-mega cols-6">' +
        '<div class="bs-col"><h4>Clothing</h4><ul>' +
          '<li class="featured">Shop all clothing →</li>' +
          "<li>T-shirts</li><li>Polo shirts</li><li>Shirts</li>" +
          "<li>Sweatshirts &amp; hoodies</li><li>Sweaters &amp; cardigans</li>" +
          "<li>Blazers</li><li>Coats &amp; jackets</li>" +
          "<li>Jeans</li><li>Trousers &amp; shorts</li><li>Sportswear</li>" +
        "</ul></div>" +
        '<div class="bs-col"><h4>Basics &amp; lounge</h4><ul>' +
          "<li>Underwear</li><li>Nightwear &amp; loungewear</li>" +
          "<li>Socks</li><li>Belts</li><li>Ties &amp; cufflinks</li>" +
          "<li>Caps &amp; hats</li><li>Scarves</li>" +
        "</ul>" +
        '<h4 class="sub">Traditional</h4><ul>' +
          '<li class="featured">Traditional wear ' + pill("signature", "QATAR") + "</li>" +
          "<li>Traditional footwear</li>" +
        "</ul></div>" +
        '<div class="bs-col"><h4>Footwear</h4><ul>' +
          '<li class="featured">All footwear →</li>' +
          "<li>Sneakers</li><li>Trainers</li>" +
          "<li>Loafers &amp; drivers</li><li>Oxford shoes</li>" +
          "<li>Boots</li><li>Slides &amp; sandals</li>" +
        "</ul>" +
        '<h4 class="sub">Bags</h4><ul>' +
          "<li>Backpacks</li><li>Crossbody bags</li><li>Wallets &amp; cardholders</li>" +
        "</ul></div>" +
        '<div class="bs-col"><h4>Watches</h4><ul>' +
          '<li class="featured">Luxury timepieces ' + pill("signature", "PREMIUM") + "</li>" +
          "<li>Breitling</li><li>Fashion timepieces</li><li>Smart watches</li>" +
        "</ul>" +
        '<h4 class="sub">Accessories</h4><ul>' +
          "<li>Sunglasses</li><li>Bracelets</li>" +
          "<li>Rings</li><li>Pens</li><li>Cufflinks</li>" +
        "</ul></div>" +
        '<div class="bs-col"><h4>Grooming &amp; scent</h4><ul>' +
          "<li>Men's fragrance</li><li>Skincare</li><li>Haircare</li>" +
        "</ul>" +
        '<h4 class="sub">Top brands</h4><ul>' +
          "<li>Creed</li><li>Tom Ford</li><li>Cole Haan</li>" +
          "<li>Corneliani</li><li>Jacob Cohen</li>" +
          '<li class="featured">View all A–Z →</li>' +
        "</ul></div>" +
        '<div class="bs-edit"><div class="bs-edit-label">THE EDIT</div>' +
          ec("SIGNATURE", "Breitling timepieces", "Swiss heritage · from QAR 18,500", "feature") +
          ec("SUMMER", "Linen & lightweight", "Built for Doha heat") +
          ec("GIFT GUIDE", "For him under QAR 2,500", "28 curated picks") +
        "</div>" +
      "</div>",

    kids:
      '<div class="bs-mega cols-6">' +
        '<div class="bs-col"><h4>Newborn</h4><ul>' +
          '<li class="featured">Boys · 0–9 months →</li>' +
          '<li class="featured">Girls · 0–9 months →</li>' +
          "<li>Babysuits</li><li>Baby nest</li><li>Blankets</li>" +
          "<li>Sets</li><li>Changing bags</li><li>Accessories</li>" +
        "</ul>" +
        '<h4 class="sub">Essentials</h4><ul>' +
          "<li>Strollers</li><li>Car seats</li><li>Feeding</li><li>Toys</li>" +
        "</ul></div>" +
        '<div class="bs-col"><h4>Baby · 9–36 months</h4><ul>' +
          '<li class="featured">All baby →</li>' +
          "<li>Baby boys</li><li>Baby girls</li>" +
          "<li>Tops &amp; bottoms</li><li>Dresses</li>" +
          "<li>Coats &amp; jackets</li><li>Jogging suits</li>" +
          "<li>Sets</li><li>Nightwear</li>" +
        "</ul></div>" +
        '<div class="bs-col"><h4>Kids &amp; teens · 3–16y</h4><ul>' +
          '<li class="featured">All kids &amp; teens →</li>' +
          "<li>Boys</li><li>Girls</li>" +
          "<li>Tops &amp; bottoms</li><li>Dresses</li>" +
          "<li>Jogging suits</li><li>Coats &amp; jackets</li>" +
          "<li>Swimwear</li>" +
          "<li>Eid outfits " + pill("eid", "EID") + "</li>" +
        "</ul></div>" +
        '<div class="bs-col"><h4>Footwear</h4><ul>' +
          '<li class="featured">All kids shoes →</li>' +
          "<li>Trainers</li><li>Ballerinas</li>" +
          "<li>Sandals &amp; slippers</li><li>School shoes</li>" +
        "</ul>" +
        '<h4 class="sub">Shop by age</h4><ul>' +
          "<li>Newborn (0–9m)</li><li>Baby (9–36m)</li>" +
          "<li>Kids (3–10y)</li><li>Teens (10–16y)</li>" +
        "</ul></div>" +
        '<div class="bs-col"><h4>Top brands</h4><ul>' +
          "<li>Aigner Kids</li><li>Missoni Kids</li><li>Moschino Kids</li>" +
          "<li>Polo Ralph Lauren</li><li>Tommy Hilfiger</li>" +
          "<li>Roberto Cavalli</li><li>Kissy Kissy</li>" +
          "<li>Emporio Armani</li>" +
          '<li class="featured">View all →</li>' +
        "</ul></div>" +
        '<div class="bs-edit"><div class="bs-edit-label">THE EDIT</div>' +
          ec("NEWBORN", "Welcome baby box", "Hand-wrapped · from QAR 450", "feature") +
          ec("EID 2026", "Mini-me looks", "Mother & daughter sets") +
          ec("SCHOOL", "Back to school edit", "Backpacks · shoes · essentials") +
        "</div>" +
      "</div>",

    beauty:
      '<div class="bs-mega cols-6">' +
        '<div class="bs-col"><h4>Fragrances</h4><ul>' +
          '<li class="featured">All fragrances →</li>' +
          "<li>Women's fragrance</li><li>Men's fragrance</li>" +
          "<li>Bathline</li><li>Extracts &amp; oils</li>" +
          "<li>Home fragrance</li><li>Gift sets</li>" +
        "</ul>" +
        '<h4 class="sub">Niche fragrance</h4><ul>' +
          '<li class="featured">Niche house ' + pill("signature", "RARE") + "</li>" +
          "<li>Creed</li><li>Tom Ford</li><li>Floris London</li>" +
        "</ul></div>" +
        '<div class="bs-col"><h4>Make-up · face</h4><ul>' +
          "<li>Foundation</li><li>Concealer</li><li>Powder</li>" +
          "<li>Blusher</li><li>Bronzer &amp; highlighter</li><li>Primer &amp; fixing</li>" +
        "</ul>" +
        '<h4 class="sub">Make-up · eyes</h4><ul>' +
          "<li>Eyeshadow</li><li>Mascara</li><li>Eyeliner</li><li>Eyebrows</li>" +
        "</ul></div>" +
        '<div class="bs-col"><h4>Make-up · lips</h4><ul>' +
          "<li>Lipsticks</li><li>Lip gloss &amp; tint</li>" +
          "<li>Lip liner</li><li>Lip balm</li><li>Lip care</li>" +
        "</ul>" +
        '<h4 class="sub">Nails &amp; tools</h4><ul>' +
          "<li>Nails</li><li>Tools &amp; brushes</li><li>Accessories</li>" +
        "</ul></div>" +
        '<div class="bs-col"><h4>Skincare &amp; self-care</h4><ul>' +
          '<li class="featured">All self-care →</li>' +
          "<li>Skincare</li><li>Face masks</li><li>Bodycare</li>" +
          "<li>Haircare</li><li>Bathing</li><li>Oral care</li>" +
        "</ul>" +
        '<h4 class="sub">For him</h4><ul>' +
          "<li>Men's skincare</li><li>Men's haircare</li>" +
        "</ul></div>" +
        '<div class="bs-col"><h4>Top beauty brands</h4><ul>' +
          "<li>Creed</li><li>Tom Ford</li><li>Sensai</li>" +
          "<li>Floris London</li><li>Acqua di Parma</li>" +
          "<li>Aigner Perfume</li>" +
          '<li class="featured">View all brands →</li>' +
        "</ul>" +
        '<h4 class="sub">Shop by</h4><ul>' +
          "<li>Gift sets</li><li>Best sellers</li><li>New arrivals</li>" +
        "</ul></div>" +
        '<div class="bs-edit"><div class="bs-edit-label">THE EDIT</div>' +
          ec("SIGNATURE", "The Creed house", "Wild Vetiver · QAR 1,635", "feature") +
          ec("SERVICE", "Free engraving", "On select fragrances") +
          ec("CONSULTATION", "Fragrance discovery", "Book in-store · free") +
        "</div>" +
      "</div>",

    luggage:
      '<div class="bs-mega cols-5">' +
        '<div class="bs-col"><h4>Luggage</h4><ul>' +
          '<li class="featured">All luggage →</li>' +
          "<li>Hard luggage</li><li>Soft luggage</li>" +
          "<li>Cabin size</li><li>Check-in size</li><li>Luggage sets</li>" +
        "</ul></div>" +
        '<div class="bs-col"><h4>Bags</h4><ul>' +
          '<li class="featured">All travel bags →</li>' +
          "<li>Backpacks</li><li>School backpacks</li>" +
          "<li>Crossbody</li><li>Bailhandle</li><li>Other bags</li>" +
        "</ul></div>" +
        '<div class="bs-col"><h4>Travel accessories</h4><ul>' +
          '<li class="featured">All accessories →</li>' +
          "<li>Wallets · men</li><li>Wallets · women</li>" +
          "<li>Charger &amp; USB</li><li>Notebook covers</li>" +
          "<li>Toiletries</li><li>Health &amp; safety</li>" +
          "<li>School accessories</li>" +
        "</ul></div>" +
        '<div class="bs-col"><h4>Top brands</h4><ul>' +
          "<li>Samsonite</li><li>American Tourister</li>" +
          "<li>MCM</li><li>Aigner</li><li>Alviero Martini</li>" +
          '<li class="featured">View all brands →</li>' +
        "</ul></div>" +
        '<div class="bs-edit"><div class="bs-edit-label">THE EDIT</div>' +
          ec("SUMMER", "Holiday-ready luggage", "From QAR 650", "feature") +
          ec("SERVICE", "Free monogramming", "On luggage purchases") +
          ec("BACK TO SCHOOL", "School backpack edit", "All ages · all brands") +
        "</div>" +
      "</div>",

    home:
      '<div class="bs-mega cols-6">' +
        '<div class="bs-col"><h4>Tableware</h4><ul>' +
          '<li class="featured">All tableware →</li>' +
          "<li>Dinnerware</li><li>Glassware</li><li>Drinkware</li>" +
          "<li>Cutlery</li><li>Trays</li><li>Bowls</li>" +
          "<li>Stands</li><li>Centerpieces</li>" +
        "</ul></div>" +
        '<div class="bs-col"><h4>Décor</h4><ul>' +
          '<li class="featured">All home décor →</li>' +
          "<li>Vases</li><li>Mirrors</li><li>Wall art</li>" +
          "<li>Candle holders</li><li>Candles</li>" +
          "<li>Candy boxes</li><li>Jewelry cabinets</li>" +
          "<li>Desk accessories</li><li>Trolleys</li>" +
        "</ul></div>" +
        '<div class="bs-col"><h4>Bedding &amp; bath</h4><ul>' +
          '<li class="featured">All bedding →</li>' +
          "<li>Beddings</li><li>Towels</li><li>Bath rugs</li>" +
          "<li>Bathrobes</li><li>Cushions</li><li>Slippers</li>" +
        "</ul></div>" +
        '<div class="bs-col"><h4>Home fragrance</h4><ul>' +
          '<li class="featured">All home fragrance →</li>' +
          "<li>Diffusers</li><li>Candles</li>" +
          "<li>Bakhoor &amp; oud " + pill("signature", "QATAR") + "</li>" +
          "<li>Linen fragrance</li>" +
        "</ul>" +
        '<h4 class="sub">Food warmers &amp; serving</h4><ul>' +
          "<li>Food warmers</li><li>Majlis serving</li>" +
        "</ul></div>" +
        '<div class="bs-col"><h4>Top home brands</h4><ul>' +
          "<li>Christofle</li><li>Baccarat</li>" +
          "<li>Lalique</li><li>Versace Home</li>" +
          '<li class="featured">View all →</li>' +
        "</ul>" +
        '<h4 class="sub">Occasion</h4><ul>' +
          "<li>Ramadan &amp; majlis " + pill("eid", "EID") + "</li>" +
          "<li>Wedding registry</li><li>Housewarming</li>" +
        "</ul></div>" +
        '<div class="bs-edit"><div class="bs-edit-label">THE EDIT</div>' +
          ec("RAMADAN 2026", "Majlis & entertaining", "Serveware · décor · bakhoor", "feature") +
          ec("SERVICE", "Wedding gift registry", "Curate & share") +
          ec("DELIVERY", "White-glove setup", "On furniture orders") +
        "</div>" +
      "</div>",

    gourmet:
      '<div class="bs-mega cols-6">' +
        '<div class="bs-col"><h4>Chocolates &amp; biscuits</h4><ul>' +
          '<li class="featured">All chocolates →</li>' +
          "<li>Chocolates</li><li>Biscuits</li>" +
          "<li>Truffles &amp; pralines</li><li>Boxed assortments</li>" +
          "<li>Hampers &amp; gifts</li>" +
        "</ul></div>" +
        '<div class="bs-col"><h4>Arabic &amp; regional</h4><ul>' +
          '<li class="featured">Arabic sweets ' + pill("signature", "QATAR") + "</li>" +
          "<li>Premium dates</li><li>Baklava</li>" +
          "<li>Maamoul</li><li>Honey</li><li>Oil &amp; spices</li>" +
        "</ul></div>" +
        '<div class="bs-col"><h4>Coffee &amp; tea</h4><ul>' +
          '<li class="featured">All coffee &amp; tea →</li>' +
          "<li>Coffee</li><li>Tea</li>" +
          "<li>Nespresso machines</li><li>Accessories</li>" +
        "</ul>" +
        '<h4 class="sub">Food essentials</h4><ul>' +
          "<li>Seafood</li><li>Sugar</li><li>Chips</li><li>Gums &amp; candies</li>" +
        "</ul></div>" +
        '<div class="bs-col"><h4>Gift hampers</h4><ul>' +
          '<li class="featured">All hampers →</li>' +
          "<li>Eid hampers " + pill("eid", "EID") + "</li>" +
          "<li>Ramadan hampers</li><li>Welcome baby</li><li>Build your own</li>" +
        "</ul>" +
        '<h4 class="sub">Shop by price</h4><ul>' +
          "<li>Under QAR 500</li><li>QAR 500–1,500</li><li>QAR 1,500+</li>" +
        "</ul></div>" +
        '<div class="bs-col"><h4>Top brands</h4><ul>' +
          "<li>Godiva</li><li>Pierre Marcolini</li>" +
          "<li>Nespresso</li><li>TWG Tea</li>" +
          '<li class="featured">View all →</li>' +
        "</ul>" +
        '<h4 class="sub">Corporate</h4><ul>' +
          "<li>Corporate gifting</li><li>Bulk orders</li><li>Custom branding</li>" +
        "</ul></div>" +
        '<div class="bs-edit"><div class="bs-edit-label">THE EDIT</div>' +
          ec("EID 2026", "Premium date hampers", "From QAR 350 · gift-wrapped", "feature") +
          ec("CONCEPT", "Gold Gourmet boutique", "In-store experience") +
          ec("B2B", "Corporate gifting concierge", "Dedicated account manager") +
        "</div>" +
      "</div>",

    brands: (function () {
      var letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0–9"];
      return (
        '<div class="bs-mega cols-5">' +
          '<div class="bs-col"><h4>Browse</h4><ul>' +
            '<li class="featured">All 500+ brands →</li>' +
            "<li>Women's brands</li><li>Men's brands</li><li>Kids' brands</li>" +
            "<li>Beauty brands</li><li>Watch brands</li>" +
            "<li>Luggage brands</li><li>Home brands</li><li>Gourmet brands</li>" +
          "</ul></div>" +
          '<div class="bs-col"><h4>Trending now</h4><ul>' +
            "<li>Creed " + pill("hot", "HOT") + "</li>" +
            "<li>MCM</li><li>Fossil</li><li>Cole Haan</li>" +
            "<li>Breitling</li><li>Aigner</li>" +
            "<li>Swarovski</li><li>Tom Ford</li>" +
          "</ul></div>" +
          '<div class="bs-col"><h4>Luxury houses</h4><ul>' +
            "<li>La Perla</li><li>Breitling</li><li>Tom Ford</li>" +
            "<li>Floris London</li><li>Sensai</li>" +
            "<li>Acqua di Parma</li><li>Christofle</li><li>Baccarat</li>" +
          "</ul></div>" +
          '<div class="bs-col"><h4>Browse A–Z</h4>' +
            '<ul class="bs-az">' +
              letters.map(function (l) { return "<li>" + l + "</li>"; }).join("") +
            "</ul>" +
          '<h4 class="sub">By region</h4><ul>' +
            "<li>Italian</li><li>French</li><li>Qatari designers</li>" +
          "</ul></div>" +
          '<div class="bs-edit"><div class="bs-edit-label">THE EDIT</div>' +
            ec("EXCLUSIVE", "Only at Blue Salon", "28 brands not found elsewhere in Qatar", "feature") +
            ec("HERITAGE", "Founders' picks", "Since 1981 · curated by Abu Issa") +
          "</div>" +
        "</div>"
      );
    })(),

    gift:
      '<div class="bs-mega cols-5">' +
        '<div class="bs-col"><h4>Build a gift</h4><ul>' +
          '<li class="featured">Build your Blue Salon box →</li>' +
          "<li>Choose products</li><li>Choose packaging</li>" +
          "<li>Add message card</li><li>Schedule delivery</li>" +
        "</ul>" +
        '<h4 class="sub">Shop by recipient</h4><ul>' +
          "<li>For her</li><li>For him</li><li>For mum &amp; dad</li>" +
          "<li>For kids</li><li>For baby</li>" +
        "</ul></div>" +
        '<div class="bs-col"><h4>Shop by occasion</h4><ul>' +
          "<li>Eid " + pill("eid", "EID") + "</li>" +
          "<li>Ramadan</li><li>Wedding</li><li>Anniversary</li>" +
          "<li>Birthday</li><li>Newborn</li><li>Graduation</li>" +
          "<li>Housewarming</li><li>Corporate</li>" +
        "</ul></div>" +
        '<div class="bs-col"><h4>Shop by price</h4><ul>' +
          "<li>Under QAR 250</li><li>QAR 250–500</li>" +
          "<li>QAR 500–1,500</li><li>QAR 1,500–5,000</li><li>QAR 5,000+</li>" +
        "</ul>" +
        '<h4 class="sub">Top gift categories</h4><ul>' +
          "<li>Fragrance gifts</li><li>Chocolate hampers</li>" +
          "<li>Date boxes</li><li>Jewellery</li><li>Watches</li>" +
        "</ul></div>" +
        '<div class="bs-col"><h4>Services</h4><ul>' +
          '<li class="featured">Free gift wrapping</li>' +
          "<li>Engraving &amp; monogramming</li><li>Personalised card</li>" +
          "<li>Scheduled delivery</li><li>Gift receipt option</li>" +
          "<li>Corporate gifting</li>" +
        "</ul></div>" +
        '<div class="bs-edit"><div class="bs-edit-label">THE EDIT</div>' +
          ec("SIGNATURE", "The Blue Salon box", "Iconic blue · hand-wrapped", "feature") +
          ec("EID 2026", "Most-gifted hampers", "Top picks · from QAR 350") +
          ec("B2B", "Corporate concierge", "For 50+ recipients") +
        "</div>" +
      "</div>",

    sale:
      '<div class="bs-mega cols-5">' +
        '<div class="bs-col"><h4>Sale by category</h4><ul>' +
          '<li class="featured" style="color: var(--sale)">Shop all sale →</li>' +
          "<li>Women</li><li>Men</li><li>Kids</li>" +
          "<li>Beauty &amp; fragrance</li><li>Luggage</li>" +
          "<li>Home &amp; linen</li><li>Watches &amp; jewellery</li>" +
        "</ul></div>" +
        '<div class="bs-col"><h4>By discount</h4><ul>' +
          "<li>Up to 30% off</li><li>30–50% off</li><li>50–70% off</li>" +
          "<li>Over 70% off " + pill("hot", "HOT") + "</li>" +
        "</ul>" +
        '<h4 class="sub">By price</h4><ul>' +
          "<li>Under QAR 250</li><li>QAR 250–500</li>" +
          "<li>QAR 500–1,500</li><li>QAR 1,500+</li>" +
        "</ul></div>" +
        '<div class="bs-col"><h4>Exceptional offers</h4><ul>' +
          '<li class="featured">Exceptional offers →</li>' +
          "<li>Last chance</li><li>Final cuts</li>" +
          "<li>Last sizes</li><li>Re-stocked sale</li><li>Just reduced today</li>" +
        "</ul></div>" +
        '<div class="bs-col"><h4>Top brands on sale</h4><ul>' +
          "<li>MCM</li><li>Aigner</li><li>Corneliani</li>" +
          "<li>Jacob Cohen</li><li>Cole Haan</li><li>Leo Lin</li>" +
          '<li class="featured">View all →</li>' +
        "</ul></div>" +
        '<div class="bs-edit"><div class="bs-edit-label" style="color: var(--sale)">END OF SEASON</div>' +
          ec("UP TO 70% OFF", "Mid-season sale live", "Across 8 departments", "sale-feature") +
          ec("PAYLATER", "Split into 4 payments", "Available on all orders") +
          ec("LAST CHANCE", "Final markdowns", "When they're gone, they're gone") +
        "</div>" +
      "</div>",
  };

  /* ── Nav: open mega menu on hover, close on leaving the zone ── */

  var navZone = document.getElementById("navZone");
  var megaHolder = document.getElementById("megaHolder");
  var navItems = document.querySelectorAll(".bs-nav-item");

  function closeMenu() {
    megaHolder.classList.remove("is-open");
    megaHolder.innerHTML = "";
      /* Kids & Baby has a dedicated department page */
  var kidsNav = document.querySelector('.bs-nav-item[data-menu="kids"]');
  if (kidsNav) {
    kidsNav.style.cursor = "pointer";
    kidsNav.addEventListener("click", function () { window.location.href = "kids.html"; });
  }

  navItems.forEach(function (el) { el.classList.remove("active"); });
  }

  navItems.forEach(function (el) {
    el.addEventListener("mouseenter", function () {
      navItems.forEach(function (other) { other.classList.remove("active"); });
      el.classList.add("active");
      megaHolder.innerHTML = MEGA_MENUS[el.dataset.menu] || "";
      megaHolder.classList.add("is-open");
    });
  });

  navZone.addEventListener("mouseleave", closeMenu);

  /* ── Mobile drawer: hamburger-triggered accordion nav ──────
     Reuses the top-level nav items and the MEGA_MENUS markup so
     the mobile menu never drifts from the desktop one. Lives in
     this IIFE because MEGA_MENUS is scoped here. */
  (function initMobileNav() {
    var btn = document.getElementById("hamburgerBtn");
    var drawer = document.getElementById("mobileDrawer");
    var scrim = document.getElementById("drawerScrim");
    var closeBtn = document.getElementById("drawerClose");
    var nav = document.getElementById("drawerNav");
    if (!btn || !drawer || !scrim || !nav) return;

    var CHEVRON =
      '<svg class="bs-drawer-chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>';

    // Build the accordion from the existing nav items.
    var html = "";
    navItems.forEach(function (el) {
      var key = el.dataset.menu;
      var sub = MEGA_MENUS[key] || "";
      var sale = el.classList.contains("sale") ? " sale" : "";
      html +=
        '<div class="bs-drawer-item">' +
          '<button class="bs-drawer-link' + sale + '" type="button" aria-expanded="false">' +
            "<span>" + el.textContent + "</span>" +
            (sub ? CHEVRON : "") +
          "</button>" +
          (sub ? '<div class="bs-drawer-sub">' + sub + "</div>" : "") +
        "</div>";
    });
    nav.innerHTML = html;

    function openDrawer() {
      drawer.hidden = false;
      scrim.hidden = false;
      void drawer.offsetWidth; // commit the off-canvas state so the slide animates
      drawer.classList.add("is-open");
      scrim.classList.add("is-open");
      drawer.setAttribute("aria-hidden", "false");
      btn.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }

    function closeDrawer() {
      drawer.classList.remove("is-open");
      scrim.classList.remove("is-open");
      drawer.setAttribute("aria-hidden", "true");
      btn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      var onEnd = function () {
        drawer.hidden = true;
        scrim.hidden = true;
        drawer.removeEventListener("transitionend", onEnd);
      };
      drawer.addEventListener("transitionend", onEnd);
    }

    btn.addEventListener("click", openDrawer);
    if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
    scrim.addEventListener("click", closeDrawer);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && drawer.classList.contains("is-open")) closeDrawer();
    });

    // Accordion toggle (one section open at a time).
    nav.addEventListener("click", function (e) {
      // A real link inside an open sub-panel: navigate + close.
      if (e.target.closest(".bs-drawer-sub li, .bs-drawer-sub a")) { closeDrawer(); return; }

      var link = e.target.closest(".bs-drawer-link");
      if (!link) return;
      var item = link.parentNode;
      var wasOpen = item.classList.contains("is-open");
      nav.querySelectorAll(".bs-drawer-item.is-open").forEach(function (o) {
        o.classList.remove("is-open");
        var l = o.querySelector(".bs-drawer-link");
        if (l) l.setAttribute("aria-expanded", "false");
      });
      if (!wasOpen && item.querySelector(".bs-drawer-sub")) {
        item.classList.add("is-open");
        link.setAttribute("aria-expanded", "true");
      }
    });

    // Reset if the viewport grows back to desktop.
    window.addEventListener("resize", function () {
      if (window.innerWidth > 900 && drawer.classList.contains("is-open")) closeDrawer();
    });
  })();

  /* ── Hero carousel ──────────────────────────────────────── */

  var SLIDES = [
     {
      full: true,
      img: "https://www.bluesalon.com/cdn/shop/files/ZMWBanner1920x720px_1920x.jpg?v=1782204665",
    },
    {
      heading: "ESCADA",
      sub: "Bold prints, gold jewellery and statement timepieces — the new collection.",
      cta: "Shop ESCADA",
      img: "https://cdn.shopify.com/s/files/1/0370/6444/1991/files/esca.jpg?v=1782906735",
    },
    
     {
      full: true,
      img: "https://www.bluesalon.com/cdn/shop/files/banner_9033da4d-42fc-45d1-a6fc-446d62d6be84_1920x.jpg?v=1780471512",
    },
    // {
    //   heading: "from 81 to Now",
    //   sub: "Shop the official products",
    //   cta: "Shop Now",
    //   img: "https://cdn.shopify.com/s/files/1/0370/6444/1991/files/Screenshot_2026-07-01_at_2.58.25_PM.png?v=1782907116",
    // },
    // {
    //   heading: "The Fragrance Edit",
    //   sub: "Discover niche and luxury scents, only at Blue Salon.",
    //   cta: "Shop beauty",
    //   img: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80",
    // },
   
  ];

  var heroTitle = document.getElementById("heroTitle");
  var heroSub = document.getElementById("heroSub");
  var heroCta = document.getElementById("heroCta");
  var heroImg = document.getElementById("heroImg");
  var heroDots = document.getElementById("heroDots");
  var heroSection = document.querySelector(".bs-hero");

  function setSlide(i) {
    var s = SLIDES[i];
    heroSection.classList.toggle("is-full", !!s.full);
    if (!s.full) {
      heroTitle.textContent = s.heading;
      heroSub.textContent = s.sub;
      heroCta.textContent = s.cta;
    }
    heroImg.src = s.img;
    heroDots.querySelectorAll(".bs-hero-dot").forEach(function (dot, j) {
      dot.classList.toggle("is-active", j === i);
    });
  }

  var current = 0;

  /* Hero exists only on the homepage — guard so shared pages
     (listing, product detail) can reuse this bundle safely. */
  if (heroSection && heroDots) {
  SLIDES.forEach(function (_, i) {
    var dot = document.createElement("button");
    dot.type = "button";
    dot.className = "bs-hero-dot" + (i === 0 ? " is-active" : "");
    dot.setAttribute("aria-label", "Slide " + (i + 1));
    dot.addEventListener("click", function () { goToSlide(i); resetAuto(); });
    heroDots.appendChild(dot);
  });

  function goToSlide(i) {
    current = (i + SLIDES.length) % SLIDES.length;
    setSlide(current);
  }

  /* Auto-advance every 4s; pause on hover. */
  var heroTimer = null;
  function startAuto() {
    if (SLIDES.length < 2) return;
    heroTimer = setInterval(function () { goToSlide(current + 1); }, 4000);
  }
  function resetAuto() {
    clearInterval(heroTimer);
    startAuto();
  }
  heroSection.addEventListener("mouseenter", function () { clearInterval(heroTimer); });
  heroSection.addEventListener("mouseleave", resetAuto);
  setSlide(current); // render slide 0 so the view matches the active dot
  startAuto();
  } // end hero guard

  /* ── Categories ─────────────────────────────────────────── */

  var catsGrid = document.getElementById("catsGrid");
  if (catsGrid) {
    catsGrid.innerHTML = data.categories.map(function (c) {
      return (
        '<a class="bs-cat-link" href="#">' +
          '<div class="bs-cat-card">' +
            '<img src="' + c.img + '" alt="' + c.label + '">' +
            '<div class="bs-cat-grad"></div>' +
            '<span class="bs-cat-label">' + c.label + "</span>" +
          "</div>" +
        "</a>"
      );
    }).join("");
  }

  /* ── Footer columns ─────────────────────────────────────── */

  var SHOP_COLS = [
    { heading: "Women's",      links: ["Clothing", "Footwear", "Bags", "Accessories", "Brands A–Z"] },
    { heading: "Men's",        links: ["Clothing", "Footwear", "Bags", "Watches", "Brands A–Z"] },
    { heading: "Kids & Baby",  links: ["Baby", "Girls", "Boys", "Footwear", "Brands A–Z"] },
    { heading: "Beauty",       links: ["Skincare", "Make-up", "Fragrance", "Gift sets", "Brands A–Z"] },
    { heading: "Home & Linen", links: ["Home décor", "Tableware", "Bedding", "Home fragrance", "Brands A–Z"] },
    { heading: "Gourmet",      links: ["Chocolates", "Arabic sweets", "Coffee & tea", "Hampers", "Brands A–Z"] },
  ];

  document.getElementById("shopMoreGrid").innerHTML = SHOP_COLS.map(function (col) {
    return (
      "<div>" +
        '<div class="bs-shopmore-col-h">' + col.heading + "</div>" +
        "<ul>" +
          col.links.map(function (link) {
            return '<li><a href="#"' + (link === "Brands A–Z" ? ' class="is-strong"' : "") + ">" + link + "</a></li>";
          }).join("") +
        "</ul>" +
      "</div>"
    );
  }).join("");

  var SOCIAL_HTML =
    '<ul class="social-icons">' +
      '<li class="facebook"><a href="https://www.facebook.com/bluesalonqatar/" title="Facebook" target="_blank" rel="noopener" aria-label="Facebook"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z"/></svg></a></li>' +
      '<li class="twitter"><a href="https://twitter.com/bluesalonqatar" title="X" target="_blank" rel="noopener" aria-label="X"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.2 2h3.3l-7.2 8.3L23 22h-6.6l-5.2-6.8L5.3 22H2l7.7-8.8L1.5 2h6.8l4.7 6.2L18.2 2zm-1.2 18h1.8L7.1 3.9H5.2L17 20z"/></svg></a></li>' +
      '<li class="instagram"><a href="https://www.instagram.com/bluesalon/" title="Instagram" target="_blank" rel="noopener" aria-label="Instagram"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></a></li>' +
      '<li class="youtube"><a href="https://www.youtube.com/user/bluesalonqatar" title="YouTube" target="_blank" rel="noopener" aria-label="YouTube"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.7-1.7C19.4 5.2 12 5.2 12 5.2s-7.4 0-8.9.4A2.5 2.5 0 0 0 1.4 7.3C1 8.8 1 12 1 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.7 1.7c1.5.4 8.9.4 8.9.4s7.4 0 8.9-.4a2.5 2.5 0 0 0 1.7-1.7C23 15.2 23 12 23 12zM9.8 15.3V8.7l5.7 3.3-5.7 3.3z"/></svg></a></li>' +
      '<li class="linkedin"><a href="https://www.linkedin.com/company/blue-salon/" title="LinkedIn" target="_blank" rel="noopener" aria-label="LinkedIn"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0 0-5zM3 9h4v12H3zM9 9h3.8v1.6h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21H9z"/></svg></a></li>' +
    '</ul>' +
    '<a class="footer-whatsapp" href="https://wa.me/97450109900" target="_blank" rel="noopener" aria-label="Contact us on WhatsApp: +974 5010 9900">' +
      'Whatsapp:' +
      '<span>+974 5010 9900</span>' +
    '</a>' +
    '<a class="footer-email" href="mailto:info@bluesalon.com">' +
      'Email:' +
      '<span>info@bluesalon.com</span>' +
    '</a>';

  var FOOTER_COLS = [
    { h: "Customer Care",    links: ["Track your order", "Shipping & delivery", "Returns & exchanges", "Contact us", "FAQ"] },
    { h: "About Blue Salon", links: ["Our story", "Boutiques in Qatar", "Careers", "Press", "Sustainability"] },
    { h: "Follow our social", social: true },
  ];

  document.getElementById("footerCols").innerHTML = FOOTER_COLS.map(function (c) {
    var body = c.social
      ? SOCIAL_HTML
      : "<ul>" + c.links.map(function (l) { return '<li><a href="#">' + l + "</a></li>"; }).join("") + "</ul>";
    return "<div><h4>" + c.h + "</h4>" + body + "</div>";
  }).join("");

  /* ── Locale picker: region · currency · language ────────── */
  (function setupLocale() {
    var btn = document.getElementById("localeBtn");
    var codeEl = document.getElementById("localeCode");
    var langSwitch = document.getElementById("localeLangSwitch");
    if (!btn) return;

    function syncLangSwitch() {
      if (!langSwitch) return;
      var isAr = locale.lang === "ar";
      // Show the language you can switch TO (Arabic label while in English, and vice versa).
      langSwitch.textContent = isAr ? "EN" : "ع";
      langSwitch.classList.toggle("is-ar", !isAr);
    }

    // Clicking the button toggles the language directly — no dropdown.
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      locale.lang = locale.lang === "ar" ? "en" : "ar";
      syncLangSwitch();
      document.documentElement.lang = locale.lang;
      document.documentElement.dir = locale.lang === "ar" ? "rtl" : "ltr";
    });

    if (codeEl) codeEl.textContent = locale.region.ccy;
    syncLangSwitch();
  })();

  /* Keep placeholder links from jumping the page */
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href="#"]');
    if (a) e.preventDefault();
  });
})();

/* ════════════════════════════════════════════════════════════
   Category fashion sliders (Women / Men) — standalone so it can
   never be blocked by an error in the main app bundle above.
   Any "*-collection-home-grid-wrapper" with a scroller div and
   left/right arrow buttons becomes a horizontal slider.
   ════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  function initSlider(wrap) {
    var scroller = wrap.querySelector('[data-women-slider], [data-men-slider]');
    if (!scroller) {
      for (var i = 0; i < wrap.children.length; i++) {
        if (wrap.children[i].tagName === "DIV") { scroller = wrap.children[i]; break; }
      }
    }
    var prev = wrap.querySelector('[class*="arrow-left"]');
    var next = wrap.querySelector('[class*="arrow-right"]');
    if (!scroller || !prev || !next) return;

    function step() {
      var card = scroller.children[0];
      var cardW = card ? card.getBoundingClientRect().width : scroller.clientWidth * 0.8;
      var perView = Math.max(1, Math.round(scroller.clientWidth / (cardW + 20)));
      return (cardW + 20) * perView;
    }
    function update() {
      var max = scroller.scrollWidth - scroller.clientWidth - 2;
      prev.disabled = scroller.scrollLeft <= 2;
      next.disabled = scroller.scrollLeft >= max;
    }

    prev.addEventListener("click", function () {
      scroller.scrollBy({ left: -step(), behavior: "smooth" });
    });
    next.addEventListener("click", function () {
      scroller.scrollBy({ left: step(), behavior: "smooth" });
    });
    scroller.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  function initAll() {
    var wraps = document.querySelectorAll('[class*="collection-home-grid-wrapper"]');
    for (var i = 0; i < wraps.length; i++) initSlider(wraps[i]);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})();

/* ════════════════════════════════════════════════════════════
   Brands marquee — continuous, smooth auto-scroll. Items are
   wrapped in a track and duplicated so the loop is seamless.
   ════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  function initMarquee() {
    var grid = document.querySelector(".brands-collection-home-grid");
    if (!grid || grid.querySelector(".brands-marquee-track")) return;

    var items = Array.prototype.slice.call(grid.querySelectorAll(".brand-item"));
    if (!items.length) return;

    var track = document.createElement("div");
    track.className = "brands-marquee-track";
    items.forEach(function (item) { track.appendChild(item); });

    // Duplicate the set so translateX(-50%) loops without a visible jump.
    items.forEach(function (item) {
      var clone = item.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      clone.setAttribute("tabindex", "-1");
      track.appendChild(clone);
    });

    grid.textContent = "";
    grid.appendChild(track);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMarquee);
  } else {
    initMarquee();
  }
})();

/* ============================================================
   UNIFIED PRODUCT SHELF — desktop drag-slider
   ------------------------------------------------------------
   Turns any .bs-shelf into a click-and-drag slider for mouse
   users. Touch devices keep native swipe + momentum, so we only
   hijack the mouse pointer. A drag past a small threshold marks
   the shelf .is-dragging (CSS disables snap + suppresses clicks)
   and the trailing click is cancelled so cards don't fire.
   ============================================================ */
(function () {
  "use strict";

  var DRAG_THRESHOLD = 6; // px before a press becomes a drag

  function enhance(shelf) {
    if (shelf.dataset.shelfReady) return;
    shelf.dataset.shelfReady = "1";

    var down = false, moved = 0, startX = 0, startLeft = 0;

    shelf.addEventListener("pointerdown", function (e) {
      if (e.pointerType !== "mouse" || e.button !== 0) return; // let touch scroll natively
      down = true;
      moved = 0;
      startX = e.clientX;
      startLeft = shelf.scrollLeft;
      // Don't capture the pointer yet: capturing on press retargets the
      // trailing pointerup/click to the shelf, so a plain click on a card
      // control (e.g. "Add to cart") never reaches the button. Capture only
      // once a real drag begins — see pointermove.
    });

    shelf.addEventListener("pointermove", function (e) {
      if (!down) return;
      var dx = e.clientX - startX;
      if (Math.abs(dx) > moved) moved = Math.abs(dx);
      if (moved > DRAG_THRESHOLD && !shelf.classList.contains("is-dragging")) {
        shelf.classList.add("is-dragging");
        try { shelf.setPointerCapture(e.pointerId); } catch (err) {}
      }
      if (moved > DRAG_THRESHOLD) shelf.scrollLeft = startLeft - dx;
    });

    function release(e) {
      if (!down) return;
      down = false;
      try { shelf.releasePointerCapture(e.pointerId); } catch (err) {}
      // Drop the dragging flag next frame so the trailing click is caught below.
      requestAnimationFrame(function () { shelf.classList.remove("is-dragging"); });
    }
    shelf.addEventListener("pointerup", release);
    shelf.addEventListener("pointercancel", release);

    // Cancel the click that follows a real drag (capture phase, before card handlers).
    shelf.addEventListener("click", function (e) {
      if (moved > DRAG_THRESHOLD) {
        e.stopPropagation();
        e.preventDefault();
      }
    }, true);

    buildArrows(shelf);
  }

  function arrowBtn(dir) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "bs-shelf-arrow bs-shelf-arrow-" + dir;
    b.setAttribute("aria-label", dir === "prev" ? "Previous" : "Next");
    b.innerHTML = dir === "prev"
      ? '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>'
      : '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>';
    return b;
  }

  /* Thin prev/next handles inside a positioned wrapper — hidden until
     the rail is hovered, auto-hidden at the ends and on touch. */
  function buildArrows(shelf) {
    var parent = shelf.parentNode;
    if (!parent) return;

    var wrap = document.createElement("div");
    wrap.className = "bs-shelf-nav";
    parent.insertBefore(wrap, shelf);
    wrap.appendChild(shelf);

    var prev = arrowBtn("prev");
    var next = arrowBtn("next");
    wrap.appendChild(prev);
    wrap.appendChild(next);

    function step(dir) {
      var amount = Math.max(240, Math.round(shelf.clientWidth * 0.8));
      shelf.scrollBy({ left: dir * amount, behavior: "smooth" });
    }
    prev.addEventListener("click", function (e) { e.preventDefault(); step(-1); });
    next.addEventListener("click", function (e) { e.preventDefault(); step(1); });

    function update() {
      var max = shelf.scrollWidth - shelf.clientWidth;
      wrap.classList.toggle("bs-shelf-noscroll", max <= 2);
      prev.disabled = shelf.scrollLeft <= 2;
      next.disabled = shelf.scrollLeft >= max - 2;
    }
    shelf.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    // Recheck after async content / images settle.
    setTimeout(update, 300);
    setTimeout(update, 900);
  }

  function scan() {
    var shelves = document.querySelectorAll(".bs-shelf");
    for (var i = 0; i < shelves.length; i++) enhance(shelves[i]);
  }

  window.BSEnhanceShelves = scan;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scan);
  } else {
    scan();
  }
  // Shelves are filled asynchronously by other scripts — re-scan shortly after.
  setTimeout(scan, 0);
  setTimeout(scan, 400);
})();
