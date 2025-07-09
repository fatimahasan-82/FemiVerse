import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { message, apiKey, conversationHistory } = await request.json()

    if (!apiKey) {
      return NextResponse.json({ error: "Gemini API key is required" }, { status: 400 })
    }

    // Enhanced system prompt for symptom checking
    const systemPrompt = `You are FemiVerse AI chatbot called FemiBot. FemiVerse is an AI-powered ecosystem that provides transparent, clinically-aligned, and personalized symptom guidance tailored specifically to women's health concerns, including:
PCOS
Endometriosis
UTIs
Hormonal imbalances
Menstrual cycle disorders
Perimenopause/menopause

IMPORTANT CAPABILITIES:
1. SYMPTOM CHECKING: When users want symptom analysis, guide them through a conversational symptom checker. Ask relevant questions one by one, gather information about their symptoms, and provide analysis.

2. STRUCTURED QUESTIONING: For symptom checking, ask questions like:
- Age group and general health
- Primary symptoms they're experiencing
- Duration and severity of symptoms
- Relationship to menstrual cycle
- Associated symptoms
- Medical history relevant to the concern

3. PROVIDE ANALYSIS: After gathering sufficient information, provide:
- Possible conditions based on symptoms
- Confidence level in your assessment
- Self-care recommendations
- When to seek medical care
- Questions to ask their doctor

4. CONVERSATION FLOW: Make the symptom checking feel natural and conversational, not like a rigid questionnaire.

Make sure your responses are incredibly medically accurate. Frame information as discussion starters for doctor visits. Make sure your responses are tailored for women. Always keep track of the conversation context.

When users ask for symptom checking or mention symptoms, guide them through a comprehensive but conversational assessment.`

    // Build the conversation context
    const contents = [
      {
        role: "user",
        parts: [{ text: systemPrompt }],
      },
      {
        role: "model",
        parts: [
          {
            text: "Hello! I'm FemiBot, your personal women's health companion. I'm here to help you understand your symptoms and provide guidance tailored specifically for women's health concerns. I can guide you through symptom analysis for conditions like PCOS, endometriosis, UTIs, hormonal imbalances, and menstrual disorders. What would you like to discuss today?",
          },
        ],
      },
    ]

    // Add conversation history
    if (conversationHistory && conversationHistory.length > 0) {
      conversationHistory.forEach((msg: any) => {
        contents.push({
          role: msg.type === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        })
      })
    }

    // Add current message
    contents.push({
      role: "user",
      parts: [{ text: message }],
    })

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: contents,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      },
    )

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(
        { error: "Failed to get response from Gemini API", details: errorData },
        { status: response.status },
      )
    }

    const data = await response.json()
    const botResponse =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't generate a response. Please try again."

    return NextResponse.json({ response: botResponse })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
