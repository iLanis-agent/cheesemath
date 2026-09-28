/* CheeseMath engine - honest home cheesemaking math. Pure functions, no DOM. */
var CheeseEngine = (function () {
  var LB_PER_GAL_MILK = 8.6; /* a gallon of milk weighs about 8.6 lb */
  function r2(x) { return Math.round(x * 100) / 100; }
  function r1(x) { return Math.round(x * 10) / 10; }

  /* yield: what a gallon of milk becomes, by style (percent of milk weight) */
  var YIELD_PCT = { cheddar: 10, mozzarella: 12, feta: 14, ricotta: 8, paneer: 15, gouda: 10 };
  function milkToCheeseLb(milkGal, yieldPct) {
    return r2(milkGal * LB_PER_GAL_MILK * yieldPct / 100);
  }
  function yieldPctFor(style) { return YIELD_PCT[style] || 10; }
  function milkGalForCheese(targetLb, yieldPct) {
    var per = LB_PER_GAL_MILK * yieldPct / 100;
    if (per <= 0) return null;
    return r2(targetLb / per);
  }

  /* rennet: a common working rate is 1/4 tablet per gallon of milk */
  function rennetTablets(milkGal) { return r2(milkGal / 4); }
  /* DVI culture packets: one packet covers about 2 gallons */
  function culturePackets(milkGal) { return Math.ceil(milkGal / 2); }
  /* calcium chloride for store-bought pasteurized milk: 1/4 tsp per gallon */
  function cacl2Tsp(milkGal) { return r2(milkGal / 4); }

  /* salt: about 2% of curd weight for dry-salting */
  function saltOz(curdLb) { return r2(curdLb * 16 * 0.02); }

  /* pressing: pounds of press weight per pound of curd, by stage */
  var PRESS_STAGES = [
    { stage: 'first press', mult: 2, minutes: 15 },
    { stage: 'second press', mult: 5, minutes: 30 },
    { stage: 'final press', mult: 10, minutes: 720 }
  ];
  function pressWeightLb(curdLb, mult) { return r1(curdLb * mult); }
  function pressSchedule(curdLb) {
    return PRESS_STAGES.map(function (s) {
      return { stage: s.stage, weightLb: pressWeightLb(curdLb, s.mult), minutes: s.minutes };
    });
  }

  /* aging cave conditions: 50-55F and 80-85% humidity */
  function agingVerdict(tempF, humidityPct) {
    if (tempF < 45) return 'too cold - under 45F the cultures sleep and the rind stalls';
    if (tempF > 58) return 'too warm - over 58F invites the wrong molds and a soft rind';
    if (humidityPct < 75) return 'too dry - under 75% humidity the rind cracks and the wheel dries out';
    if (humidityPct > 90) return 'too wet - over 90% humidity turns the rind slimy';
    return 'in range - 50-55F and 80-85% humidity is where cheese grows up properly';
  }

  return {
    YIELD_PCT: YIELD_PCT, PRESS_STAGES: PRESS_STAGES,
    milkToCheeseLb: milkToCheeseLb, yieldPctFor: yieldPctFor, milkGalForCheese: milkGalForCheese,
    rennetTablets: rennetTablets, culturePackets: culturePackets, cacl2Tsp: cacl2Tsp,
    saltOz: saltOz, pressWeightLb: pressWeightLb, pressSchedule: pressSchedule,
    agingVerdict: agingVerdict
  };
})();
if (typeof module !== 'undefined' && module.exports) module.exports = CheeseEngine;
