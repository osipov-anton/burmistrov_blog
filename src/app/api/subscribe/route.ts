import { Resend } from "resend";
import { TELEGRAM_CHANNEL_URL } from "@/screens/post/data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Sender must be on a domain verified in Resend. */
const FROM = "Виктор Бурмистров <viktor@email.burmistrov.link>";
const NOTIFY_TO =
  process.env.SUBSCRIBE_NOTIFY_EMAIL ?? "viktor@email.burmistrov.link";
/**
 * Resend Segment id (formerly "Audience"). When set, every subscriber is added
 * as a contact so the list can be reused for broadcasts.
 */
const SEGMENT_ID = process.env.RESEND_SEGMENT_ID;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubscribeBody = {
  email?: string;
  /** Slug of the post the visitor subscribed from — for context only. */
  source?: string;
};

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

  let body: SubscribeBody;
  try {
    body = (await request.json()) as SubscribeBody;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = (body.email ?? "").trim();
  const source = (body.source ?? "").trim();

  if (!EMAIL_RE.test(email)) {
    return Response.json({ error: "Invalid email." }, { status: 400 });
  }

  const safeEmail = escapeHtml(email);
  const safeSource = escapeHtml(source || "—");

  const clientHtml = `
    <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#0c0c0d;line-height:1.6">
      <p>Спасибо за подписку!</p>
      <p>Теперь вы будете получать новые статьи Виктора Бурмистрова на эту почту, как только они выходят.</p>
      <p style="color:#666">Не хотите ждать письма — заходите в Telegram: <a href="${TELEGRAM_CHANNEL_URL}">@Pradazhizny</a></p>
    </div>
  `;

  const notifyHtml = `
    <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#0c0c0d;line-height:1.6">
      <p><strong>Новая подписка на рассылку</strong></p>
      <table style="border-collapse:collapse">
        <tr><td style="padding:2px 12px 2px 0;color:#666">Почта</td><td>${safeEmail}</td></tr>
        <tr><td style="padding:2px 12px 2px 0;color:#666">Откуда</td><td>${safeSource}</td></tr>
      </table>
    </div>
  `;

  const resend = new Resend(apiKey);

  if (SEGMENT_ID) {
    try {
      const contactRes = await resend.contacts.create({
        email,
        unsubscribed: false,
        segments: [{ id: SEGMENT_ID }],
      });
      // A duplicate email is not an error for us — the visitor is already on the list.
      if (contactRes.error && contactRes.error.name !== "invalid_parameter") {
        console.error("Resend contact create error", contactRes.error);
      }
    } catch (err) {
      console.error("Resend contact create failed", err);
    }
  }

  try {
    const [clientRes, notifyRes] = await Promise.all([
      resend.emails.send({
        from: FROM,
        to: [email],
        subject: "Вы подписались на статьи Виктора Бурмистрова",
        html: clientHtml,
      }),
      resend.emails.send({
        from: FROM,
        to: [NOTIFY_TO],
        replyTo: email,
        subject: `Новая подписка — ${email}`,
        html: notifyHtml,
      }),
    ]);

    if (clientRes.error || notifyRes.error) {
      console.error("Resend error", clientRes.error, notifyRes.error);
      return Response.json({ error: "Failed to send email." }, { status: 502 });
    }
  } catch (err) {
    console.error("Subscribe send failed", err);
    return Response.json({ error: "Failed to send email." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
