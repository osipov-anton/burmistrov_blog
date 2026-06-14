import { Resend } from "resend";
import { buildIcs } from "@/lib/ics";
import { consultationVisitTypes } from "@/screens/post/data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Sender must be on a domain verified in Resend. */
const FROM = "Виктор Бурмистров <viktor@email.burmistrov.link>";
const ORGANIZER_NAME = "Виктор Бурмистров";
const ORGANIZER_EMAIL = "viktor@email.burmistrov.link";
const NOTIFY_TO = process.env.BOOKING_NOTIFY_EMAIL ?? "viktor@email.burmistrov.link";
const MEETING_MINUTES = 60;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type BookingBody = {
  name?: string;
  age?: string;
  role?: string;
  visit?: string;
  email?: string;
  slot?: string;
};

function formatMoscow(d: Date): string {
  const formatted = new Intl.DateTimeFormat("ru-RU", {
    timeZone: "Europe/Moscow",
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
  return `${formatted} (МСК)`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Email sending is not configured." },
      { status: 500 },
    );
  }

  let body: BookingBody;
  try {
    body = (await request.json()) as BookingBody;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const role = (body.role ?? "").trim();
  const visit = (body.visit ?? "").trim();
  const age = (body.age ?? "").trim();
  const slot = (body.slot ?? "").trim();

  const start = new Date(slot);
  if (
    name.length < 2 ||
    !EMAIL_RE.test(email) ||
    Number.isNaN(start.getTime()) ||
    start.getTime() < Date.now()
  ) {
    return Response.json({ error: "Invalid form data." }, { status: 400 });
  }

  const visitType = consultationVisitTypes.find((v) => v.id === visit);
  const visitLabel = visitType?.label ?? "Консультация";
  const priceLabel = visitType?.price ?? "";
  const whenLabel = formatMoscow(start);

  const summary = "Консультация с Виктором Бурмистровым";
  const description = [
    `${visitLabel}${priceLabel ? ` — ${priceLabel}` : ""}`,
    "Онлайн-встреча. Ссылку пришлём отдельно.",
    "Связь: @Pradazhizny",
  ].join("\n");

  const ics = buildIcs({
    uid: `consult-${start.getTime()}-${Buffer.from(email).toString("hex").slice(0, 12)}@burmistrov.link`,
    start,
    durationMinutes: MEETING_MINUTES,
    summary,
    description,
    organizerName: ORGANIZER_NAME,
    organizerEmail: ORGANIZER_EMAIL,
    attendeeName: name,
    attendeeEmail: email,
  });

  const icsAttachment = {
    filename: "consultation.ics",
    content: Buffer.from(ics, "utf-8").toString("base64"),
    contentType: "text/calendar; method=REQUEST; charset=utf-8",
  };

  const firstName = escapeHtml(name.split(" ")[0]);
  const safeWhen = escapeHtml(whenLabel);
  const safeVisit = escapeHtml(visitLabel);
  const safePrice = escapeHtml(priceLabel);

  const clientHtml = `
    <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#0c0c0d;line-height:1.6">
      <p>${firstName}, спасибо за заявку!</p>
      <p>Вы записаны на консультацию с Виктором Бурмистровым.</p>
      <p>
        <strong>Когда:</strong> ${safeWhen}<br/>
        <strong>Формат:</strong> ${safeVisit}${safePrice ? ` — ${safePrice}` : ""}
      </p>
      <p>Во вложении — приглашение для календаря. Подтвердите его, чтобы добавить встречу.</p>
      <p style="color:#666">Если планы изменятся — напишите в Telegram: @Pradazhizny</p>
    </div>
  `;

  const notifyHtml = `
    <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#0c0c0d;line-height:1.6">
      <p><strong>Новая заявка на консультацию</strong></p>
      <table style="border-collapse:collapse">
        <tr><td style="padding:2px 12px 2px 0;color:#666">Имя</td><td>${escapeHtml(name)}</td></tr>
        <tr><td style="padding:2px 12px 2px 0;color:#666">Почта</td><td>${escapeHtml(email)}</td></tr>
        <tr><td style="padding:2px 12px 2px 0;color:#666">Возраст</td><td>${escapeHtml(age || "—")}</td></tr>
        <tr><td style="padding:2px 12px 2px 0;color:#666">Роль</td><td>${escapeHtml(role || "—")}</td></tr>
        <tr><td style="padding:2px 12px 2px 0;color:#666">Тип</td><td>${safeVisit}${safePrice ? ` — ${safePrice}` : ""}</td></tr>
        <tr><td style="padding:2px 12px 2px 0;color:#666">Слот</td><td>${safeWhen}</td></tr>
      </table>
    </div>
  `;

  const resend = new Resend(apiKey);

  try {
    const [clientRes, notifyRes] = await Promise.all([
      resend.emails.send({
        from: FROM,
        to: [email],
        subject: "Консультация с Виктором Бурмистровым",
        html: clientHtml,
        attachments: [icsAttachment],
      }),
      resend.emails.send({
        from: FROM,
        to: [NOTIFY_TO],
        replyTo: email,
        subject: `Новая заявка — ${name} (${whenLabel})`,
        html: notifyHtml,
        attachments: [icsAttachment],
      }),
    ]);

    if (clientRes.error || notifyRes.error) {
      console.error("Resend error", clientRes.error, notifyRes.error);
      return Response.json({ error: "Failed to send email." }, { status: 502 });
    }
  } catch (err) {
    console.error("Booking send failed", err);
    return Response.json({ error: "Failed to send email." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
