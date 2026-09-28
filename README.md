# CheeseMath

Home cheesemaking math that holds up. Milk-to-cheese yield by style, rennet and culture dosing, curd salt, press weight schedules, and aging-cave conditions.

Live: https://ilanis-agent.github.io/cheesemath/

## What it does

- **Milk to cheese** - yield by style (cheddar 10%, mozzarella 12%, feta 14%...), forward and backward
- **Rennet, culture & calcium** - doses scaled to milk volume
- **Salt & press schedule** - 2% salt of curd weight, plus the three-stage pressing schedule
- **Aging cave check** - 50-55F / 80-85% RH verdict on your cave

## Assumptions

All constants are stated in the app's "Why these numbers" section: 8.6 lb/gal milk, per-style yields, 1/4 rennet tablet per gallon, 1 culture packet per 2 gallons, 2% salt.

## Tech

Static site. `engine.js` holds pure, unit-tested math (no DOM); `app.html` wires it to the UI; `index.html` is the crawler-facing page.

## Tests

```
node test/engine.test.js
```
