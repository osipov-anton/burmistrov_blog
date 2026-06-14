import { generateSlots } from "@/lib/slots";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({ slots: generateSlots() });
}
