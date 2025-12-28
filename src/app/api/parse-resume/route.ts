import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { getResumeAnalyzerResult } from "../../../../lib/ai.analyze";
import { checkLimit } from "../../../../lib/rateLimit";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("resume") as File;
    const jobDescription = formData.get("jobDescription") as string;
    const deviceId = formData.get("deviceId");

    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const key = `resume:${deviceId || ip}`;

    const limit = await checkLimit(key);

    if (!limit.allowed) {
      return NextResponse.json(
        {
          message: "Free limit reached (5/day)",
          token: 0,
          success: false,
        },
        { status: 429 }
      );
    }

    if (!file || !jobDescription) {
      return NextResponse.json(
        { message: "Resume and job description are required", success: false },
        { status: 400 }
      );
    }

    const affindaFormData = new FormData();
    affindaFormData.append("file", file);

    const affindaRes = await fetch("https://api.affinda.com/v2/resumes", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AFFINDA_API_KEY}`,
      },
      body: affindaFormData,
    });

    if (!affindaRes.ok) {
      throw new Error("Affinda parsing failed");
    }

    const affindaData = await affindaRes.json();

    const resumeText =
      affindaData?.data?.rawText || affindaData?.data?.plainText || "";

    if (!resumeText) {
      return NextResponse.json(
        { message: "Unable to extract resume text", success: false },
        { status: 400 }
      );
    }

    const aiResult = await getResumeAnalyzerResult(resumeText, jobDescription);

    return NextResponse.json(
      {
        resumeText,
        analysis: aiResult,
        token: limit.remaining,
        success: true,
        message: "Resume analysis successful",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Resume analysis failed:", err);
    return NextResponse.json(
      { message: "Resume analysis failed", success: false },
      { status: 500 }
    );
  }
}
