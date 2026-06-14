export type Slot = {
  /** ISO 8601 datetime (UTC) of the slot start — used as a stable value. */
  id: string;
  /** Human-readable label in Russian, e.g. "Завтра · 11:00". */
  label: string;
};

/** Moscow is a fixed UTC+3 offset (no DST), so we can hardcode it. */
const MSK_OFFSET_HOURS = 3;
/** Short and long timezone labels for the UI. */
export const SLOT_TIMEZONE = "МСК";
export const SLOT_TIMEZONE_HINT = "Время по Москве (UTC+3)";
const WORKING_HOURS = [11, 15, 18];
/** Don't offer slots that start sooner than this from now. */
const LEAD_TIME_MS = 2 * 60 * 60 * 1000;
const DAYS_AHEAD = 14;
const MAX_SLOTS = 6;

const WEEKDAYS = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
const MONTHS = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

type MskParts = { year: number; month: number; date: number; weekday: number };

/** Read the Moscow wall-clock parts of a given instant. */
function mskParts(instant: Date): MskParts {
  const shifted = new Date(instant.getTime() + MSK_OFFSET_HOURS * 3_600_000);
  return {
    year: shifted.getUTCFullYear(),
    month: shifted.getUTCMonth(),
    date: shifted.getUTCDate(),
    weekday: shifted.getUTCDay(),
  };
}

/** Build the UTC instant for a Moscow wall-clock time. */
function mskInstant(year: number, month: number, date: number, hour: number): Date {
  return new Date(Date.UTC(year, month, date, hour - MSK_OFFSET_HOURS, 0, 0, 0));
}

function formatLabel(parts: MskParts, hour: number, dayOffset: number): string {
  const time = `${String(hour).padStart(2, "0")}:00`;
  let prefix: string;
  if (dayOffset === 0) prefix = "Сегодня";
  else if (dayOffset === 1) prefix = "Завтра";
  else prefix = `${WEEKDAYS[parts.weekday]}, ${parts.date} ${MONTHS[parts.month]}`;
  return `${prefix} · ${time}`;
}

/**
 * Generate real upcoming consultation slots in Moscow time, skipping weekends
 * and any time that's already in the past (within the lead-time buffer).
 */
export function generateSlots(now: Date = new Date()): Slot[] {
  const today = mskParts(now);
  const earliest = now.getTime() + LEAD_TIME_MS;
  const slots: Slot[] = [];

  for (let offset = 0; offset < DAYS_AHEAD && slots.length < MAX_SLOTS; offset++) {
    // Resolve the Moscow calendar day at `offset` days from today.
    const dayParts = mskParts(mskInstant(today.year, today.month, today.date + offset, 12));
    if (dayParts.weekday === 0 || dayParts.weekday === 6) continue;

    for (const hour of WORKING_HOURS) {
      if (slots.length >= MAX_SLOTS) break;
      const instant = mskInstant(dayParts.year, dayParts.month, dayParts.date, hour);
      if (instant.getTime() < earliest) continue;
      slots.push({ id: instant.toISOString(), label: formatLabel(dayParts, hour, offset) });
    }
  }

  return slots;
}
