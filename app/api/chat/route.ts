// NO_BACKTICKS_VERSION_PROMPT_v5_CONCISE
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);

const RYNGO_SYSTEM_PROMPT = "You are Ryngo AI. official Ryngo helpdesk. Be CONCISE, HELPFUL, & DIRECT.\n" +
"CONTEXT: We provide premium vehicle booking (Auto, Mini, Sedan, XL, Prime) in Mumbai and Maharashtra.\n" +
"KNOWLEDGE BASE:\n" +
"- Ride Booking: Users can book via 'Request Now'. ETA depends on driver distance. Cancellation charges may apply after 5 mins. Advance booking and Airport drops (T1/T2) are available.\n" +
"- Mumbai Routes: Expert in BKC, WEH, Marine Drive, Andheri-Powai, Navi Mumbai. Mumbai traffic-aware advice (Local trains vs. Cabs). Metro/Local station pickups are common.\n" +
"- Safety: GPS tracked, verified drivers, SOS button in app, trip sharing available. Night rides are safe. Verified Driver IDs are mandatory.\n" +
"- Fare & Payments: Cash, UPI, Paytm, GPay supported. Base fares: Mini/Taxi (₹22.70/km), Sedan (₹25.70/km), XL (₹32/km), Prime (₹22.70 - ₹32 /km range). Tolls, surge, and night charges (11 PM-5 AM) may apply.\n" +
"- Driver Support: Assistance with cancellations, fare disputes, and behavior. Support email: support@ryngo.in.\n" +
"- Driver Onboarding: Join via website portal. Needs: RC, Insurance, License, Aadhaar. Paid on commission basis with daily/weekly payouts and incentives.\n" +
"- Corporate: Subscriptions, monthly packages, and GST/Office reimbursement invoices available.\n" +
"RULE: CRITICAL - YOU MUST ALWAYS RESPOND IN THE EXACT SAME LANGUAGE AND SCRIPT (English, Hindi, Marathi, Hinglish, etc.) AS THE USER'S MESSAGE.\n" +
"STYLE: End responses with related follow-up like 'Should I assist further?'.";


export async function POST(req: NextRequest) {
  const modelsToTry = [
    "gemini-2.0-flash", 
    "gemini-1.5-flash", 
    "gemini-1.5-flash-8b",
    "gemini-2.5-flash", 
    "gemini-2.0-flash-lite"
  ];
  let lastError: any = null;

  try {
    const { message, history, weather, metadata } = await req.json();
    if (!message) return NextResponse.json({ error: "Message is required" }, { status: 400 });

    const chatHistory = (history || []).map((msg: { role: string; text: string }) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    const operationalContext = 
      `### LIVE MAP DATA\n` +
      `- Pickup Location: ${metadata?.pickup || "Not set"}\n` +
      `- Destination: ${metadata?.destination || "Not set"}\n` +
      `- Available Cars on Map: ${metadata?.availableCars || 0}\n` +
      `- Calculated Trip Distance: ${metadata?.distance || "Calculating..."}\n` +
      `- Surge Status: ${metadata?.surge ? "ACTIVE (High Demand)" : "NORMAL"}\n\n`;

    for (const modelName of modelsToTry) {
      try {
        const weatherCondition = weather || "Sunny ☀️";
        const systemInstruction = 
          RYNGO_SYSTEM_PROMPT.replace("{{WEATHER_CONDITION}}", weatherCondition) + 
          "\n\n" + operationalContext;

        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction: systemInstruction,
        });

        const chat = model.startChat({ history: chatHistory });
        const result = await chat.sendMessage(message);
        const response = result.response.text();

        return NextResponse.json({ reply: response });
      } catch (err: any) {
        lastError = err;
        console.warn(`Model ${modelName} failed, trying next...`);
      }
    }

    throw lastError;

  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : String(error);
    if (errMsg.includes("429") || errMsg.includes("quota")) {
      return NextResponse.json(
        { reply: "Dost, Ryngo AI abhi thoda rest kar raha hai. Bas 15-20 seconds baad message bhejiye!" },
        { status: 200 }
      );
    }
    return NextResponse.json({ error: `Error: ${errMsg}` }, { status: 500 });
  }
}
