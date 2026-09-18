import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";

type ContactBody = {
  name?: string;
  email?: string;
  message?: string;
  locale?: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: ContactBody;

  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (name.length < 2 || !isValidEmail(email) || message.length < 12) {
    return NextResponse.json({ error: "Invalid fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email is not configured" },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const to = process.env.CONTACT_TO_EMAIL || site.email;
  const from =
    process.env.RESEND_FROM || "bkrojas.dev <onboarding@resend.dev>";

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `bkrojas.dev · ${name}`,
    text: [`Name: ${name}`, `Email: ${email}`, "", message].join("\n"),
  });

  if (error) {
    return NextResponse.json({ error: "Send failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
