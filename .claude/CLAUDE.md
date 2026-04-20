# Japan Trip 2026 — Claude Context

Always read this before helping with any task in this project.

## Trip Overview
- **Travelers:** Couple (husband + wife)
- **Dates:** October 5–16, 2026 (12 days)
- **Origin:** San Francisco (SFO)
- **Route:** Tokyo (3 nights) → Yamanashi/Fuji-Q (2) → Hakone (2) → Kyoto (3) → Osaka (2)
- **Budget:** $6,000 USD total for 2 people (¥895,500 at ¥149.45/USD)

## Interests
- **Wife:** Demon Slayer (main passion), culture, food, shopping
- **Husband:** Naruto, Bleach, hidden gems, nature
- **Both:** Balanced pace, authentic experiences, anime pilgrimage spots
- **Must-haves:** Ryokan with private onsen (Hakone), Mt. Fuji views, anime spots

## Data Files (src/data/)
| File | Contents |
|---|---|
| `trip.json` | Metadata, cities, exchange rate, next actions |
| `itinerary.json` | 12 days, each with activities + coordinates + images |
| `bookings.json` | Flights, hotels, ryokan, activity tickets |
| `budget.json` | Categories + planned amounts |
| `expenses.json` | Actual spending log (starts empty) |
| `anime.json` | Demon Slayer, Naruto, Bleach pilgrimage spots |
| `links.json` | Curated resource links by category |
| `packing.json` | Packing list by category |

## Data Conventions
- All costs stored in **JPY** (yen). Exchange rate: `trip.json → exchangeRate`
- Coordinates: `[latitude, longitude]` (Leaflet format)
- Image URLs: Unsplash format `https://images.unsplash.com/photo-{id}?w=800&q=80`
- Activity types: `sightseeing | food | transport | accommodation | anime`
- Anime tags: `demon-slayer | naruto | bleach | all | null`
- Booking status: `candidate` (researched, not booked) or `confirmed` (booked)

## What Claude Can Help With
- Add new itinerary activities or days to `itinerary.json`
- Add bookings with real confirmation numbers to `bookings.json`
- Add new anime pilgrimage spots to `anime.json`
- Add curated links to `links.json`
- Add packing items to `packing.json`
- Look up current JPY/USD rate and update `trip.json`
- Suggest restaurants, activities, or hidden gems for any city on the route
- Generate packing list items for October Japan weather

## Key Reminders
- October in Japan: 12–22°C, occasional showers, peak autumn foliage starts late October
- Hakone ryokan books out fast — flag if not yet confirmed
- Rurikō-in Temple only open in autumn — limited slots, must book 3 months ahead
- JR Pass must be purchased BEFORE leaving the US
- Fuji-Q Hidden Leaf Village is Day 4 (Oct 8) — Naruto theme park near Mt. Fuji
