import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (secret) {
    const providedSecret = request.headers.get("x-sanity-secret");

    if (providedSecret !== secret) {
      return NextResponse.json({ ok: false, message: "Invalid secret" }, { status: 401 });
    }
  }

  revalidatePath("/");

  return NextResponse.json({ ok: true, revalidated: "/" });
}
