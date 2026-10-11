// Estructura de datos inicial y factores de impacto ecológico

export const INITIAL_WEEKLY_DATA = [
  { day: 'Lun', fullName: 'Lunes', bottles: 0, lastWeek: 0, peakHour: '--:--', isPeak: false, note: '' },
  { day: 'Mar', fullName: 'Martes', bottles: 0, lastWeek: 0, peakHour: '--:--', isPeak: false, note: '' },
  { day: 'Mié', fullName: 'Miércoles', bottles: 0, lastWeek: 0, peakHour: '--:--', isPeak: false, note: '' },
  { day: 'Jue', fullName: 'Jueves', bottles: 0, lastWeek: 0, peakHour: '--:--', isPeak: false, note: '' },
  { day: 'Vie', fullName: 'Viernes', bottles: 0, lastWeek: 0, peakHour: '--:--', isPeak: false, note: '' },
  { day: 'Sáb', fullName: 'Sábado', bottles: 0, lastWeek: 0, peakHour: '--:--', isPeak: false, note: '' },
  { day: 'Dom', fullName: 'Domingo', bottles: 0, lastWeek: 0, peakHour: '--:--', isPeak: false, note: '' }
];

export const INITIAL_MONTH_DATA = Array.from({ length: 31 }, (_, index) => ({
  day: index + 1,
  bottles: 0,
  note: ''
}));

export const IMPACT_FACTORS = {
  co2KgPerBottle: 0.082,      // kg de CO2 evitado por botella PET promedio reciclada
  waterLitersPerBottle: 1.5,  // litros de agua potable ahorrada en manufactura
  energyWhPerBottle: 65,      // vatios-hora ahorrados equivalentes
  plasticWeightGrams: 28,     // peso promedio de botella reciclada (gramos)
  ledMinutesPerBottle: 30     // minutos que una bombilla LED de 10W puede iluminarse con la energía ahorrada
};
