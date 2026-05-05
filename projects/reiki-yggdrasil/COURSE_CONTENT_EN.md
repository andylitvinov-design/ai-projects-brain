# Reiki Yggdrasil — English course content memory

Updated: 2026-05-05
Status: extracted from user-provided English legacy `.doc` course material plus prior RU course-content memory.
Scope: English-language project/course structure for the Reiki Yggdrasil website, knowledge base, and future Codex prompts.

## Source files

Primary English source parsed in ChatGPT conversation:

- `Magister Program Description-cor.doc`

Related RU sources already summarized in:

- `projects/reiki-yggdrasil/COURSE_CONTENT.md`

Important: the English source contains legacy marketing/training language with strong esoteric and healing claims. Do not paste it verbatim into the public website without review. Use this memory as a structured map and rewrite into clear, modern, safe English copy.

## English brand frame

Possible English umbrella name from the source:

- `Temple Arts Academy`
- `Holistic Therapies & Arts Studies`

Reiki Yggdrasil can be presented in English as a holistic/esoteric training system combining:

- Reiki Yggdrasil attunements;
- holistic health and energy practices;
- temple arts;
- archetypal and mythological traditions;
- runes and Yggdrasil worlds;
- Tarot / Kabbalah / Sephiroth;
- Taoist and Chinese medicine principles;
- shamanic and transformational traditions;
- personal potential, relationship, money, and spiritual development tracks.

Recommended public positioning:

> Reiki Yggdrasil is a structured system of holistic and esoteric education based on energy practices, archetypal work, mythological traditions, personal development, and symbolic healing arts.

Avoid public phrasing that promises guaranteed healing, money, control over people, or supernatural abilities. Use educational language: `explores`, `supports`, `trains`, `develops symbolic perception`, `works with archetypal models`, `energy practice in the tradition`.

## English site language strategy

The existing product is RU-default. English should be added as a parallel language layer, not as a replacement.

Recommended language structure:

- `/` remains RU default.
- English routes can be `/en`, `/en/profile`, `/en/masters`, `/en/profile/admin`, or a locale switch depending on current router architecture.
- Do not break existing RU routes.
- Keep content model bilingual: `ru` and `en` fields for public course cards, tracks, titles, descriptions, disclaimers, and CTA labels.

Suggested content model fields:

```js
{
  id: 'base-level-1',
  slug: 'healing-and-protection',
  visibility: 'public',
  title: {
    ru: 'Основы целительства и защиты',
    en: 'Basics of Healing & Protection'
  },
  summary: {
    ru: '...',
    en: '...'
  },
  track: 'bachelor-holistic-health',
  sourceStatus: 'legacy-summary',
  needsVerification: true
}
```

## Program architecture from English source

The English source describes a three-level educational structure:

1. `Bachelor of Holistic Health`
2. `Magister Programs`
3. `Grand-Magister Studies`

This should be treated as legacy naming until current certification/legal wording is verified.

### Level 1 — Bachelor of Holistic Health

Source name:

- `BACHELOR OF HOLISTIC HEALTH`

Public-safe positioning:

- Foundation training in holistic healing, protection, energy work, relationship/social skills, planetary/archetypal connection, and personal potential activation.

Modules from source:

#### Module 1 — Principles of Holistic Healing

Levels:

- Level 1: Basics of Healing & Protection.
- Level 2: In-depth Healing & Money Stream Activation.
- Level 3: Managing Social Efficiency.

Recommended public copy:

- Introduces Reiki Yggdrasil foundations, energetic self-regulation, protective practices, intuitive perception, and practical work with life situations.

#### Module 2 — Advanced Healing & Temple Therapy

Levels:

- Level 4: In-depth Extrasensory Development.
- Level 5: Connection with Planet & Gods.

Recommended public copy:

- Develops symbolic perception, archetypal work, connection with the image of the living world, and Norse deity/archetype practices.

#### Module 3 — Specialized Therapy

Levels:

- Comprehensive Healing.
- Man & Woman / love and relationship skills.

Recommended public copy:

- Advanced work with personal balance, relationship dynamics, communication, and energy-based models of harmony.

#### Module 4 — Specialized Therapy

Levels:

- Life Force / Energies of the Planet.
- Money stream activation / welfare archetypes / planetary wealth streams.

Recommended public copy:

- Resource restoration, life-force practices, and symbolic work with prosperity, value, and social realization.

#### Module 5 — Personal Potential Activation

Levels:

- Personal Energy Management / Fireball.
- Sexual Energy Processing.

Recommended public copy:

- Personal energy management, vitality, embodiment, and safe transformation of creative/life energy.

Certificate signal from source:

- `Instructor of Reiki Yggdrasil & Holistic Health`

Needs verification:

- current certificate name;
- legal validity;
- issuing organization;
- whether `Bachelor` and `Instructor` names should be public.

Legacy duration/pricing from source:

- Usually 1 month per module online or one weekend real-time.
- Complete program lasts 3–6 months.
- One level: 150 USD.
- Complete: 1500 USD.

Do not publish these prices as current without confirmation.

## Level 2 — Magister Programs

Source name:

- `MAGISTER PROGRAMS`

Public-safe positioning:

- Advanced temple arts and esoteric traditions track for experienced students/instructors.

Source says:

- It takes usually 1+ month per module online or two weekends real-time.
- Overall program lasts around 1 year.

Do not publish as current duration without confirmation.

### Module 1 — Temple Therapy

Levels from source:

1. The Beauty of Love / Greek Mysteries / Tantra Reiki.
2. Egregors / Spiritual Healing / Christianity & Buddhism.
3. Greek Heritage / Zodiac / Planetary Magic.
4. Ancient Egyptian Temple Magic & Healing.
5. Indian Heritage / Kundalini Awakening.

Recommended public copy:

- A temple-arts track exploring love, beauty, spiritual egregores, planetary archetypes, Egyptian subtle-body symbolism, and Indian/Kundalini traditions.

#### Level 1 — The Beauty of Love / Greek Mysteries / Tantra Reiki

Themes:

- Ancient Greek mysteries;
- sensuality and beauty of emotions/body/mind/soul;
- Dionysian and Tantric Reiki framing;
- heart and life-energy opening.

Public-safe wording:

- `A symbolic and embodied exploration of love, beauty, emotional vitality, and sacred sensuality through Greek and tantric archetypes.`

Keep mature and non-explicit. May belong in closed course pages rather than public landing.

#### Level 2 — Egregors

Settings from source:

- Egregors;
- Exorcism;
- Guardian Angel;
- Healer.

Public-safe wording:

- `Training in working with collective symbolic fields, spiritual traditions, protective imagery, and healing archetypes.`

Avoid claims about expelling entities in public copy; frame as traditional/esoteric model.

#### Level 3 — Zodiac / Greek Heritage / Planetary Magic

Settings from source:

- Planets;
- Constellations;
- Adam Kadmon;
- Geniuses;
- Ophanim / Homonyms in source translation.

Public-safe wording:

- `A study of planetary and zodiac archetypes as symbolic maps for personal potential, timing, and self-realization.`

Needs terminology verification: source has likely translation errors: `Homonyms` probably `Ophanim`/`Ofanim`.

#### Level 4 — Ancient Egyptian Temple Magic & Healing

Settings/subtle bodies from source:

- HAT;
- KA;
- BA;
- EB / AB;
- KHAYBIT;
- HU;
- SAHU;
- SEKHEM;
- REN.

Public-safe wording:

- `A symbolic study of Egyptian subtle-body models, initiation mythology, heart purification, and integration of body, soul, name, and spiritual potential.`

Avoid promises of rejuvenation/healing as guaranteed outcomes.

#### Level 5 — Indian Heritage & Kundalini Awakening

Settings from source:

- Kundalini;
- Burning inserts;
- Tatwa;
- Gods.

Public-safe wording:

- `A study of Indian and Tibetan-inspired models of vital energy, chakras, elements, and divine archetypes.`

Avoid unsafe claims about forced Kundalini activation. Use cautious framing.

### Module 2 — Northern Therapy / Scandinavian Runes Magic

Source module name:

- `The Power of the North. Scandinavian Runes Magic`

Program blocks:

- Runes and runic tradition;
- Worlds of the Yggdrasil Tree;
- Circle of Power;
- Runic prediction.

#### Sixth step — Runes

Settings:

- Runes;
- Rune groups;
- Combination of runes;
- Runic planning.

Public-safe wording:

- `Runes as symbolic keys for exploring qualities, choices, intuitive perception, and goal architecture.`

#### Seventh step — Worlds of the Tree Yggdrasil

Worlds:

- Hel;
- Svartalfheim;
- Muspelheim;
- Vanaheim;
- Midgard;
- Jotunheim;
- Niflheim;
- Alfheim;
- Asgard.

Public-safe wording:

- `Nine worlds as archetypal states and developmental landscapes.`

#### Eighth step — Circle of Power

Blocks:

- Protection;
- Healing;
- Mansek / connection and attraction.

Public-safe wording:

- `Advanced work with boundaries, resource, symbolic protection, restorative practices, and connection patterns.`

Keep potentially aggressive/protective claims private or carefully rewritten.

### Module 3 — Western European Tradition / Magic of Tarot

Source name:

- `Western European Tradition. The Magic of Tarot. Kabbalah & Tarot.`

Advanced program:

- Level 1: Great Arcana of Tarot.
- Level 2: Strength of 5 Elements.
- Level 3: Sephiroth Tree.
- Level 4: High Arcana Tarot / Court structures in source.
- Level 5: Predictions in Tarot.

Settings / blocks:

- Arcana;
- Angels of the Arcana;
- Glyphs of the Arcana;
- Arcana on chakras;
- Sephira;
- Sephiroth archangels;
- Ranks;
- elements: Fire, Earth, Water, Air;
- page/jack/queen/king/kings as elemental representatives;
- Tarot fortune telling.

Public-safe wording:

- `Tarot and Sephiroth as archetypal maps for coaching, self-knowledge, diagnosis of situations, and symbolic transformation.`

### Module 4 — Taoism / Chinese Heritage

Source name:

- `Taoism. Chinese Heritage. The wisdom of the East. Chinese Medicine.`

Advanced program:

- Level 1: Chinese Medicine 1 / Elements.
- Level 2: Chinese Medicine 2 / Strength.
- Level 3: Chinese Forecasting / I Ching.
- Level 4: Runic Healing & Chinese Medicine.

Blocks:

- Chinese medicine 1: Yin/Yang, organ energies, elements.
- Chinese medicine 2: organ spirits, organ animals, meridian animals.
- Zhou-I / I Ching: Bagua, Bagua protection, Trigrams, Hexagrams, Circle of Change, Zhou-I protection.
- Runic Healing and Chinese Medicine.

Public-safe wording:

- `A symbolic and holistic study of Yin/Yang, five elements, meridians, organ archetypes, and I Ching change cycles.`

Add medical disclaimer: not a substitute for medical care.

### Module 5 — American Shamanism / Magic of Toltecs / Astral Flights

Program areas:

- Machinery Room;
- Clairvoyance / Astral Flight / Teleport;
- Preparing Helpers / Ifritas;
- Toltec Wisdom.

Blocks:

- Toltec Magic: Intention, Second Attention, Wheel of Time, Gates of Dream.
- Machine Room: thought-form structure, terminals, screen, doors, flying platform.
- Teleport: Astral double, Travel, Elements, Hyperspace.
- Ifrit block: protective, natural/elemental, information, conductors, regulators.

Public-safe wording:

- `Advanced shamanic and visionary-symbolic practices for attention, intention, dreamwork, imagination, and inner helper archetypes.`

Keep claims about influencing others/worlds private or heavily reframed.

### Module 6 — Slavic Magic & Shamanism

Source name:

- `Slavic Magic & Shamanism. Transformational Therapy.`

Submodules:

- Slavic shamanism 1: Slavic Magic.
- Slavic shamanism 2: Legends.
- Slavic shamanism 3: Civilizations.

Blocks/settings:

- Cessation / likely Kresenie;
- Conspiracy Word;
- Remove Gevura;
- Requirements and Glorifications;
- Middle World;
- Vedagon;
- Alatyr-stone;
- Dead water;
- Living water;
- Lower World / Bring back the soul;
- Highland World / Ancestors;
- Civilizations;
- Remove automatism;
- Nomenclature of Civilization;
- Sidhi of Civilization.

Public-safe wording:

- `A transformational track based on Slavic myths, ancestral symbolism, fairy tales, legends, and models of social/spiritual development.`

Needs terminology verification: several names are rough machine translations from RU.

### Module 7 — Sufism & Money Activization

Blocks:

- Sufism: Teachers, Dhikr, Light Body.
- Money Magic: Jacob’s Ladder model, sensitivity to financial flows, tracking money flow, money connections, changing the amount of money.

Public-safe wording:

- `Advanced work with spiritual discipline, sacred repetition, symbolic light-body practices, and financial-flow archetypes.`

Avoid guaranteed income claims. Use educational/prosperity mindset/resource language.

## Level 3 — Grand-Magister Studies

Source lists heritage directions:

- Egyptian Heritage;
- Scandinavian Heritage;
- Slavic Heritage;
- Taoist Heritage;
- Greek Heritage;
- Roman Heritage;
- Indian Heritage;
- Afro-Caribbean Heritage.

Public-safe wording:

- `Grand-Magister Studies are an advanced comparative temple-arts research track across major mythological and esoteric civilizations.`

Needs verification:

- whether this level exists in the current offer;
- prerequisites;
- certification name;
- public/private status.

## Recommended English information architecture

English landing / `/en`:

1. Hero:
   - `Reiki Yggdrasil & Temple Arts Academy`
   - subtitle: `Holistic, archetypal and esoteric education for personal transformation.`
2. Program levels:
   - Bachelor of Holistic Health;
   - Magister Programs;
   - Grand-Magister Studies.
3. Base / Bachelor modules:
   - Principles of Holistic Healing;
   - Advanced Healing & Temple Therapy;
   - Specialized Therapy;
   - Life Force & Planetary Energies;
   - Personal Potential Activation.
4. Magister tracks:
   - Temple Therapy;
   - Northern / Runes;
   - Western / Tarot & Kabbalah;
   - Taoism / Chinese Heritage;
   - American Shamanism;
   - Slavic Shamanism;
   - Sufism & Money Magic.
5. Safety/disclaimer block.
6. CTA:
   - `Explore the program`;
   - `Apply for training`;
   - `Find a master`;
   - `Enter student cabinet`.

English course catalog:

- Cards grouped by level and module.
- Each card has:
  - title;
  - short summary;
  - tradition;
  - level;
  - visibility;
  - current status: `available`, `coming soon`, `private`, `needs verification`.

English master profile fields:

- name;
- country/city;
- languages;
- level/certification;
- traditions taught;
- public bio EN/RU;
- verification status.

## Translation / rewrite rules

Use clear modern English, not literal machine translation.

Preferred terms:

- `attunement` for `настройка`;
- `track` for large program direction;
- `module` for course module;
- `level` for ступень / level;
- `archetypal work` for deity/god framing when public;
- `symbolic healing arts` instead of direct medical claims;
- `holistic education` instead of treatment guarantee.

Avoid / rewrite:

- `control other people` → `understand social dynamics and strengthen presence`.
- `change the amount of money` → `work with financial patterns and prosperity archetypes`.
- `treatment` → `support`, `restorative practice`, `holistic practice`.
- `exorcism` public copy → `protective and cleansing symbolism` or keep private.
- `sexual energy` public copy → `vitality, embodiment, sacred intimacy, creative life-force`.

## Legal/safety/content risks

- Legacy text contains medical, supernatural and financial claims. Public EN copy must be softened and framed as educational/esoteric tradition.
- Certification names (`Bachelor`, `Magister`, `Grand-Magister`, `Instructor`) may sound like regulated academic credentials in English-speaking markets. Needs legal/brand review.
- Relationship/sexuality/tantra modules need mature, non-explicit public copy.
- Do not present Reiki Yggdrasil as a substitute for medical care, psychotherapy, legal, financial, or religious guidance.
- Do not paste long legacy text verbatim.

## Needs verification

- Current English brand name: `Temple Arts Academy` vs `Reiki Yggdrasil` vs another name.
- Whether to use `Bachelor/Magister/Grand-Magister` publicly.
- Current certificate names and issuing entity.
- Current prices/duration.
- Which English modules are public, private, paid, coming soon, or archive-only.
- Current live routing and whether `/en` already exists in the app.
- Actual repo implementation: hardcoded copy, i18n system, Supabase-backed content, or planned content model.

## Codex usage note

When implementing EN support in the site:

- Read `projects/reiki-yggdrasil/PROJECT.md`.
- Read `projects/reiki-yggdrasil/COURSE_CONTENT.md`.
- Read this file.
- Inspect the site repo before changing anything.
- Preserve RU default and existing routes.
- Add EN as a minimal safe layer.
- Prefer structured bilingual content data instead of duplicating UI.
- Do not paste full legacy source text into the public UI.
- Run build/tests and report changed files, checks, risks, and what was not verified.
