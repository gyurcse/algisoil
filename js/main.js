document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Sticky header ---------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  const closeMenu = () => {
    menuToggle.classList.remove('active');
    mobileMenu.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  menuToggle.addEventListener('click', () => {
    const isActive = menuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active', isActive);
    menuToggle.setAttribute('aria-expanded', String(isActive));
    document.body.style.overflow = isActive ? 'hidden' : '';
  });

  document.querySelectorAll('[data-nav]').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  /* ---------- Auto year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.01, rootMargin: '0px 0px -10% 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Vision root-line trigger (separate, has its own inner animation) ---------- */
  const visionVisual = document.querySelector('.vision-visual');
  if (visionVisual) {
    const rootObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          rootObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -10% 0px' });
    rootObserver.observe(visionVisual);
  }

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll('.count');
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.target);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = decimals ? value.toFixed(decimals) : Math.round(value);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -10% 0px' });

  counters.forEach(el => counterObserver.observe(el));

  /* ---------- Smooth-scroll offset for sticky header ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  /* ---------- Language switcher ---------- */
  const translations = {
    hu: {
      'nav.vision': 'Jövőkép',
      'nav.story': 'Történetünk',
      'nav.team': 'Csapat',
      'nav.alginite': 'Alginit',
      'nav.approach': 'Megközelítés',
      'nav.science': 'Tudomány',
      'nav.join': 'Csatlakozz',

      'hero.eyebrow': 'Bio-alapú talajtechnológia',
      'hero.title': 'A vízhiány és az aszály egyre nagyobb kihívást jelent a mezőgazdaság számára.',
      'hero.sub': 'Az AlgiSoil fosszilis alginitre épülő, bio-alapú megoldása javítja a talaj vízmegtartó képességét, támogatja a gyökérfejlődést, és növeli a növények ellenálló képességét.',
      'hero.cta.primary': 'Csatlakozz közösségünkhöz',
      'hero.cta.secondary': 'Jövőképünk ↓',
      'hero.scroll': '<span></span>Görgess',

      'partners.label': 'Tudományra épül. Gazdálkodókkal tesztelve.',

      'statement.text': 'A mezőgazdaság jövőjét nem <em>a gyorsabb gépek</em> határozzák meg, hanem <span class="hl">az egészségesebb talajok.</span>',

      'why.tag': 'Miért számít',
      'why.title': 'A szárazabbá váló éghajlat már most átalakítja a mezőgazdaságot.',
      'why.stat1.title': 'Egyre több szélsőséges hőség',
      'why.stat1.desc': 'A hőségnapok száma Magyarországon több mint duplájára nőtt 2016 és 2025 között.',
      'why.stat1.unit': 'nap',
      'why.stat2.title': 'Kevesebb esős nap',
      'why.stat2.desc': 'Ugyanebben az időszakban a csapadékos napok száma 144-ről 121-re csökkent.',
      'why.stat2.unit': 'nap',
      'why.stat3.title': 'A gazdasági kár már most is jelen van',
      'why.stat3.desc': '2022 és 2025 között legalább 113,5 milliárd forintnyi aszálykár-kompenzációt fizettek ki Magyarországon.',
      'why.stat3.unit': 'milliárd Ft',
      'why.stat4.title': 'Egyetlen év alatt',
      'why.stat4.desc': 'Önmagában 2022-ben 49,7 milliárd forintot tett ki az aszálykár-kompenzáció.',
      'why.stat4.unit': 'milliárd Ft',
      'why.p1': 'Az aszály nem csupán környezeti probléma. Gazdasági probléma is. Több hőség. Kiszámíthatatlanabb csapadék. Egyre nagyobb nyomás a terményeken, a talajokon és a gazdálkodókon.',
      'why.p2': 'A kérdés már nem csak az, mennyi vizünk van — hanem az, mennyit tud ebből megtartani a talaj. Itt lép be a képbe az AlgiSoil.',
      'why.p3': 'Olyan bio-alapú talajtechnológiákat fejlesztünk, amelyek javítják a vízmegtartást, erősítik a gyökérzónát, és segítik a növényeket az egyre szárazabb körülmények elviselésében.',
      'why.leadout': 'Ellenállóbb talajok. Ellenállóbb mezőgazdaság.',

      'vision.tag': 'Jövőképünk',
      'vision.title': 'Új korszak a mezőgazdaságban',
      'vision.p1': 'A mezőgazdaság változik, és ez a változás gyakran a talajban válik először láthatóvá. A hosszabb száraz időszakok, a magasabb hőmérséklet és a kiszámíthatatlanabb csapadék miatt egyre nehezebb a vizet ott tartani, ahol a növényeknek a legnagyobb szükségük van rá. Eközben sok talaj veszít szerkezetéből, szerves anyagából és biológiai aktivitásából — pontosan azokból a tulajdonságokból, amelyek segítenék a nehéz körülmények átvészelését.',
      'vision.p2': 'A termelők számára ez nagyon is gyakorlati kérdés. A fiatal növények lassabban erednek meg, a gyökerek nagyobb stressznek vannak kitéve, az öntözés felértékelődik, és minden meghiúsult ültetésnek ára van.',
      'vision.p3': 'Hisszük, hogy a válasz egy része már most is a lábunk alatt van. Az AlgiSoil-nál összekapcsoljuk a gazdálkodók tapasztalatát a tudományos kutatással, hogy megértsük, mire van szüksége a talajnak valós termesztési körülmények között. Olyan bio-alapú megoldásokat fejlesztünk, amelyek a gyökérzónában fejtik ki hatásukat, segítve a talajt a vízmegtartásban, és jobb esélyt adva a fiatal növényeknek vízhiányos időszakban.',
      'vision.p4': 'Az ellenálló képesség ugyanis nem elvont fogalom. Azon múlik, hogy megered-e egy növény, hogy egy gazdálkodónak újra öntöznie kell-e, és hogy egy tábla termékeny marad-e egy újabb száraz szezonon át.',
      'vision.leadout': 'Olyan termékek, amikre a talajnak szüksége van. Olyan megoldások, amikre a gazdálkodók számíthatnak.',
      'vision.microquote': 'A talaj Európa legnagyobb — mégis legkevésbé nyomon követett — ökoszisztémája.',

      'story.tag': 'Történetünk',
      'story.title': 'Az AlgiSoil a lényegét tekintve egy baráti történet.',
      'story.p1': 'Más-más irányból érkeztünk a mezőgazdasághoz, de hamar kiderült, hogy ugyanazokról a dolgokról beszélünk. Gyakran egy pohár bor mellett: mi változik körülöttünk, mivel szembesülnek már most is a gazdálkodók, és vajon tudnánk-e építeni valami valóban hasznosat erre válaszul.',
      'story.p2': 'Az aszály, a vízhiány és a talaj állapotának romlása újra és újra visszatért ezekben a beszélgetésekben. Nem távoli problémaként, hanem olyasmiként, amit már a szemünkkel is láttunk a táblákon.',
      'story.p3': 'Sosem az érdekelt minket, hogy valami csak elméletben működjön. Olyan gyakorlati megoldást akartunk létrehozni, amely tudományos alapokon nyugszik, valós körülmények között kipróbált, és hasznos azoknak, akik nap mint nap a talajjal dolgoznak.',
      'story.p4': 'Így indult az AlgiSoil.',
      'story.leadout': 'A talajjal kezdjük, mert ott kezdődik az ellenálló képesség.',

      'team.tag': 'A csapatról',
      'team.title': 'Az AlgiSoil mögött álló emberek',
      'team.role1': 'Alapító és ügyvezető (CEO)',
      'team.bio1': 'Gazdálkodó családban nőttem fel — ez a háttér alakította azt, ahogyan a mezőgazdaságra tekintek: nem optimalizálandó iparágként, hanem megértendő rendszerként. Az éghajlatváltozás sürgetővé tette a talaj egészségének kérdését. Lucával és csapatunkkal együtt kutatókkal és gazdálkodókkal dolgozunk azon, hogy tudományosan megalapozott, alginit-alapú talajjavító megoldásokkal helyreállítsuk azt, amit a modern mezőgazdaság lassan kimerített. A regeneratív mezőgazdaság számunkra nem csupán terméskategória. Ez a küldetésünk.',
      'team.role2': 'Alapító és operatív igazgató (COO)',
      'team.bio2': 'Szőlész-borászként végzett szakemberként a mezőgazdaság sosem csak a munkám része volt, hanem szorosan összefonódott az életemmel. Első kézből láttam, milyen gyorsan változnak azok a körülmények, amelyek között a gazdálkodók dolgoznak. Fontos számomra, hogy ne csak azt építsük fel, amit létrehozunk, hanem azt is, ahogyan létrehozzuk — a gondolkodásmódunkat, a csapatunk kultúráját és a döntéseinket vezérlő értékeket.',
      'team.role3': 'Alapító és pénzügyi igazgató (CFO)',
      'team.bio3': 'A jó talaj nem csupán erőforrás — minden alapja. A magán- és a közszférában egyaránt dolgozva komplex szervezeti struktúrák kezelésére, valamint uniós pályázatok és finanszírozási rendszerek eligazítására specializálódtam. A küldetésem, hogy a regeneratív mezőgazdaságról alkotott jövőképünket szilárd pénzügyi stratégia támogassa.',
      'team.role4': 'Technológiai igazgató (CTO) — Termékfejlesztés és terepi validáció',
      'team.bio4': 'Vegyész- és biomérnökként azzal foglalkozom, hogyan válthatók ki a szintetikus kémiai eljárások biotechnológiával és természetes élő rendszerekkel. Célunk nem az, hogy agresszív vegyszerekkel kimerítsük a talaj összetett biológiai ökoszisztémáját, hanem hogy kiegészítsük, tápláljuk és támogassuk annak regenerálódását.',
      'team.role5': 'Logisztika és értékesítés — Kertészeti koordinátor',
      'team.bio5': 'Jelenleg kereskedelem és marketing szakon tanulok, emellett a családi gazdaságunkban dolgozom, harmadik generációként a gyümölcstermesztésben. Személyes célom, hogy összekapcsoljam a gazdálkodók gyakorlati tudását a tudományos szakértelemmel, hogy hatékony megoldásokat találjunk a mai mezőgazdasági kihívásokra.',
      'team.microquote': 'Amit a talajjal teszünk, azt saját magunkkal tesszük.',

      'alginite.tag': 'Miért az alginit?',
      'alginite.title': 'A természet rejtett talajregenerátora',
      'alginite.p1': 'Számunkra az alginit nem csupán alapanyag — kiindulópont. Egy természetes, sokoldalú közeg, amely helyreállítja a talaj szerkezetét, megtartja a vizet, és életet visz vissza a rendszerbe.',
      'alginite.p2': 'Az alginit a természet egyik rejtett tartaléka: fosszilis algák és vulkáni agyag egyedülálló kombinációja, amely erőteljes talajregeneráló anyagot alkot. Javítja a szerkezetet, megtartja a vizet, és újraaktiválja a talaj biológiai életét.',
      'alginite.p3': 'Nem ígéretekben hiszünk — hanem eredményekben. Mert minden a talajjal kezdődik.',
      'alginite.leadout': 'A talaj regenerálása a jövő regenerálása.',

      'approach.tag': 'Megközelítésünk',
      'approach.title': 'A bányától a szántóföldig — tudomány köti össze',
      'approach.intro': 'A legtöbb talajkezelő termék azért vall kudarcot, mert túl általános, túl drága, vagy egyszerűen nincs a valós gazdálkodási körülményekhez igazítva. Az AlgiSoil más utat választ.',
      'approach.step1.title': 'Meghallgatjuk a terepet',
      'approach.step1.desc': 'Közvetlenül a gazdálkodókkal dolgozunk együtt, hogy megértsük a valós kihívásokat.',
      'approach.step2.title': 'Közösen fejlesztünk a tudománnyal',
      'approach.step2.desc': 'Tudományos partnereinkkel közösen fejlesztjük megoldásainkat, és talajtani vizsgálatokkal validáljuk az eredményeket.',
      'approach.step3.title': 'Valós körülmények között teszteljük',
      'approach.step3.desc': 'Minden megoldást valós terepi körülmények között tesztelünk, mielőtt egy gazdálkodóhoz eljutna.',
      'approach.leadout': 'Nincs zöldremosás. Nincsenek fekete doboz termékek.<br>Csak átlátható, regeneratív innováció, amely a gyakorlatban is működik.',

      'partnership.tag': 'Tudományos partnerség',
      'partnership.title': 'Tudomány, amiben megbízhatsz',
      'partnership.card1.sub': 'Magyar Agrár- és Élettudományi Egyetem',
      'partnership.card1.desc': 'Megoldásainkat talajtani vizsgálatokkal, terepi kísérletekkel és hosszú távú monitorozással validáljuk.',
      'partnership.card2.sub': 'Budapesti Műszaki és Gazdaságtudományi Egyetem',
      'partnership.card2.desc': 'Megoldásaink mögötti technológiát fejlesztjük — az aktiválástól a formulázásig.',
      'partnership.leadout': 'Két tudományos nézőpont, egy cél: a kutatást a valós mezőgazdaságban is működő megoldásokká alakítani.',

      'join.title': 'Természet által hajtott. Gazdálkodók által vezérelt. Tudomány által igazolt.',
      'join.copy': 'A talaj regenerálása korunk egyik legnagyobb kihívása. Azért vagyunk itt, hogy ezt gyakorlativá, elérhetővé és valóssá tegyük — olyan megoldásokkal, amelyek a gyakorlatban is működnek. Egyszerre egy táblán.',
      'join.cta': '🌱 Csatlakozz közösségünkhöz',
      'join.microquote': 'A mezőgazdaság legnagyobb kockázata a talaj figyelmen kívül hagyása.',

      'articles.tag': 'Cikkek és kutatások',
      'articles.badge': 'Hamarosan',
      'articles.title': 'Itt fogjuk megosztani, min dolgozunk',
      'articles.p': 'Tudományos eredmények, terepi tapasztalatok és valós kísérletek tanulságai. Nem csak beszélünk róla — megmutatjuk, hogyan működik.',

      'footer.tagline': 'A talaj több, mint gyökereket tart — a jövőt is tartja.',
      'footer.rights': 'Minden jog fenntartva.',

      'meta.title': 'AlgiSoil — Természet-alapú talajregeneráció',
      'meta.description': 'Az AlgiSoil bio-alapú, alginit-alapú talajtechnológiákat fejleszt, amelyek javítják a vízmegtartást, erősítik a gyökérzónát, és segítik a mezőgazdaságot az aszály elviselésében.'
    }
  };

  const i18nEls = Array.from(document.querySelectorAll('[data-i18n]'));
  const originalHtml = new Map(i18nEls.map(el => [el, el.innerHTML]));
  const metaDescEl = document.querySelector('meta[name="description"]');
  const originalTitle = document.title;
  const originalDesc = metaDescEl ? metaDescEl.getAttribute('content') : '';
  const langButtons = document.querySelectorAll('[data-lang-btn]');

  const applyLang = (lang) => {
    document.documentElement.lang = lang;

    i18nEls.forEach(el => {
      const key = el.dataset.i18n;
      const dict = translations[lang];
      el.innerHTML = (dict && dict[key] !== undefined) ? dict[key] : originalHtml.get(el);
    });

    if (metaDescEl) {
      const dict = translations[lang];
      metaDescEl.setAttribute('content', (dict && dict['meta.description']) || originalDesc);
    }
    document.title = (translations[lang] && translations[lang]['meta.title']) || originalTitle;

    langButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.langBtn === lang));
    localStorage.setItem('algisoil-lang', lang);
  };

  langButtons.forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.dataset.langBtn));
  });

  const savedLang = localStorage.getItem('algisoil-lang');
  const browserLang = (navigator.language || '').toLowerCase().startsWith('hu') ? 'hu' : 'en';
  applyLang(savedLang || browserLang);

});
