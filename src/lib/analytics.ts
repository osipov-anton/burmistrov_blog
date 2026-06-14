export const YANDEX_METRIKA_ID = 109843413;

type YandexMetrika = (
  id: number,
  action: string,
  ...args: unknown[]
) => void;

declare global {
  interface Window {
    ym?: YandexMetrika;
  }
}

export function reachGoal(goal: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.ym !== "function") {
    return;
  }

  window.ym(YANDEX_METRIKA_ID, "reachGoal", goal, params);
}
