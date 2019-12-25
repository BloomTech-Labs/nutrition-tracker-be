//Converts cm to feet and inches.
function heightToImperial(n) {
  var realFeet = (n * 0.3937) / 12;
  var convFeet = Math.floor(realFeet);
  var convInches = Math.round((realFeet - convFeet) * 12);
  return {
    feet: convFeet,
    inches: convInches
  };
}

//Converts kg to lbs
function kgToLbs(kg) {
  var nearExact = kg / 0.45359237;
  var lbs = Math.floor(nearExact);
  return lbs;
}

module.exports = {
  heightToImperial,
  kgToLbs
};
