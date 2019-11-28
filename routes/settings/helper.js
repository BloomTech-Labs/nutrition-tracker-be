//Converts cm to feet and inches.
function heightToImperial(n){
	var realFeet = ((n*0.393700) / 12);
	var convFeet = Math.floor(realFeet);
	var convInches = Math.round((realFeet - convFeet) * 12);
	return {
		feet: convFeet,
		inches: convInches
	}
}

//Converts kg to lbs
function kgToLbs(kg) {
    var nearExact = kg/0.45359237;
    var lbs = Math.floor(nearExact);
    return lbs
}

function macroRatiosToGrams(
	caloric_budget,
	fat_ratio,
	protein_ratio,
	carb_ratio
  ) {
	const fatBudget = Math.round(caloric_budget * fat_ratio / 9);
	const proteinBudget = Math.round(caloric_budget * protein_ratio / 4);
	const carbBudget = Math.round(caloric_budget * carb_ratio / 4);
  
	return { fatBudget, proteinBudget, carbBudget };
  }
  
  // consider refactoring  with moment-js
  function applyLocalOffset(dailyLog) {
	dailyLog.forEach(log => { 
	  let time_consumed_at_utc;
	  let time_consumed_at_local;
	  let time_consumed_at_local_hour;
	  let time_consumed_at_local_minute;
	  let time_consumed_at_local_period;
  
	  time_consumed_at_utc = new Date(log.time_consumed_at);
  
	  time_consumed_at_local = time_consumed_at_utc.setSeconds(
		time_consumed_at_utc.getSeconds() + log.utc_offset_seconds * -1
	  );
  
	  time_consumed_at_local = new Date(time_consumed_at_local);
	  time_consumed_at_local_hour = Number(time_consumed_at_local .getHours()) + 1;
	  time_consumed_at_local_minute = Number(time_consumed_at_local .getMinutes());
	  time_consumed_at_local_period;
  
	  if (time_consumed_at_local_hour >= 12) {
		time_consumed_at_local_hour = time_consumed_at_local_hour % 12;
		time_consumed_at_local_period = "pm";
	  } else {
		time_consumed_at_local_period = "am";
	  }
  
	  if (time_consumed_at_local_minute < 10) {
		time_consumed_at_local_minute = `0${time_consumed_at_local_minute}`;
	  }
  
	  log.time_consumed_at = `${time_consumed_at_local_hour}:${time_consumed_at_local_minute}${time_consumed_at_local_period}`;
	});
  
	return dailyLog;
  }
  
  function calculateConsumption(dailyLog) {
	let caloriesConsumed = 0;
	let fatsConsumed = 0;
	let carbsConsumed = 0;
	let proteinConsumed = 0;
  
	dailyLog.forEach(log => {
	  caloriesConsumed += Number(log.calories_kcal) * Number(log.quantity);
	  fatsConsumed += Number(log.fat_g) * Number(log.quantity);
	  carbsConsumed += Number(log.carbs_g) * Number(log.quantity);
	  proteinConsumed += Number(log.protein_g) * Number(log.quantity);
	})
  
	return {
	  caloriesConsumed: Math.round(caloriesConsumed),
	  fatsConsumed: Math.round(fatsConsumed),
	  carbsConsumed: Math.round(carbsConsumed),
	  proteinConsumed: Math.round(proteinConsumed)
	}
  }
  

module.exports = {heightToImperial, kgToLbs, macroRatiosToGrams, applyLocalOffset, calculateConsumption}