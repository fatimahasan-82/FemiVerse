"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Heart,
  ArrowLeft,
  Send,
  Bot,
  User,
  Clock,
  Key,
  Eye,
  EyeOff,
  AlertCircle,
  Sparkles,
  MessageCircle,
  Download,
  FileText,
} from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
}

export default function FemiBotPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [apiKey, setApiKey] = useState("")
  const [showApiKey, setShowApiKey] = useState(false)
  const [isApiKeySet, setIsApiKeySet] = useState(false)
  const [error, setError] = useState("")
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    // Check if API key is stored in localStorage
    const storedApiKey = localStorage.getItem("gemini_api_key")
    if (storedApiKey) {
      setApiKey(storedApiKey)
      setIsApiKeySet(true)
      initializeChat()
    }
  }, [])

  const initializeChat = () => {
    const welcomeMessage: Message = {
      id: "1",
      type: "bot",
      content:
        "Hello! I'm FemiBot, your personal women's health companion. I'm here to help you understand your symptoms and provide guidance tailored specifically for women's health concerns.\n\n✨ I can help you with:\n• Symptom analysis and checking\n• PCOS, endometriosis, UTIs\n• Hormonal imbalances\n• Menstrual disorders\n• Perimenopause/menopause guidance\n\nWhat would you like to discuss today? You can simply describe your symptoms or ask me to guide you through a symptom check!",
      timestamp: new Date(),
    }
    setMessages([welcomeMessage])
  }

  const handleApiKeySubmit = () => {
    if (!apiKey.trim()) {
      setError("Please enter your Gemini API key")
      return
    }

    // Store API key in localStorage
    localStorage.setItem("gemini_api_key", apiKey)
    setIsApiKeySet(true)
    setError("")
    initializeChat()
  }

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || !isApiKeySet) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: content.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)
    setError("")

    try {
      // Prepare conversation history (excluding the current message)
      const conversationHistory = messages.map((msg) => ({
        type: msg.type,
        content: msg.content,
      }))

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: content,
          apiKey: apiKey,
          conversationHistory: conversationHistory,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response")
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: data.response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      setError("Failed to get response. Please check your API key and try again.")

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content:
          "I'm sorry, I encountered an error while processing your message. Please check your API key and try again.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (isApiKeySet) {
        handleSendMessage(inputValue)
      } else {
        handleApiKeySubmit()
      }
    }
  }

  const resetApiKey = () => {
    localStorage.removeItem("gemini_api_key")
    setApiKey("")
    setIsApiKeySet(false)
    setMessages([])
    setError("")
  }

  const generateHealthReport = async () => {
    if (messages.length <= 1) {
      setError("Please have a conversation with FemiBot before generating a report.")
      return
    }

    setIsGeneratingReport(true)

    try {
      // Dynamic import of jsPDF to avoid SSR issues
      const { jsPDF } = await import("jspdf")

      const doc = new jsPDF()
      const pageWidth = doc.internal.pageSize.width
      const pageHeight = doc.internal.pageSize.height
      const margin = 20
      const maxWidth = pageWidth - 2 * margin

      // Add watermark
      doc.setGState(new doc.GState({ opacity: 0.1 }))
      doc.setFontSize(50)
      doc.setTextColor(236, 90, 90) // Rose color
      doc.text("FemiVerse", pageWidth / 2, pageHeight / 2, {
        align: "center",
        angle: 45,
      })

      // Reset opacity for main content
      doc.setGState(new doc.GState({ opacity: 1 }))

      // Header
      doc.setFontSize(24)
      doc.setTextColor(236, 90, 90) // Rose color
      doc.text("FemiVerse Health Report", margin, 30)

      doc.setFontSize(12)
      doc.setTextColor(100, 100, 100)
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, margin, 45)
      doc.text(`Time: ${new Date().toLocaleTimeString()}`, margin, 55)

      // Add a line separator
      doc.setDrawColor(236, 90, 90)
      doc.line(margin, 65, pageWidth - margin, 65)

      // Disclaimer
      doc.setFontSize(10)
      doc.setTextColor(150, 150, 150)
      const disclaimerText =
        "DISCLAIMER: This report is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider."
      const disclaimerLines = doc.splitTextToSize(disclaimerText, maxWidth)
      doc.text(disclaimerLines, margin, 75)

      let yPosition = 95

      // Conversation Summary
      doc.setFontSize(16)
      doc.setTextColor(0, 0, 0)
      doc.text("Conversation Summary", margin, yPosition)
      yPosition += 15

      // Filter out the welcome message and process conversation
      const conversationMessages = messages.slice(1)

      for (let i = 0; i < conversationMessages.length; i++) {
        const message = conversationMessages[i]

        // Check if we need a new page
        if (yPosition > pageHeight - 40) {
          doc.addPage()
          yPosition = 30

          // Add watermark to new page
          doc.setGState(new doc.GState({ opacity: 0.1 }))
          doc.setFontSize(50)
          doc.setTextColor(236, 90, 90)
          doc.text("FemiVerse", pageWidth / 2, pageHeight / 2, {
            align: "center",
            angle: 45,
          })
          doc.setGState(new doc.GState({ opacity: 1 }))
        }

        // Message header
        doc.setFontSize(12)
        if (message.type === "user") {
          doc.setTextColor(236, 90, 90) // Rose for user
          doc.text("You:", margin, yPosition)
        } else {
          doc.setTextColor(168, 116, 255) // Lavender for bot
          doc.text("FemiBot:", margin, yPosition)
        }

        doc.setTextColor(100, 100, 100)
        doc.text(
          message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          margin + 100,
          yPosition,
        )
        yPosition += 10

        // Message content
        doc.setFontSize(10)
        doc.setTextColor(0, 0, 0)
        const messageLines = doc.splitTextToSize(message.content, maxWidth)
        doc.text(messageLines, margin, yPosition)
        yPosition += messageLines.length * 5 + 10
      }

      // Add footer with FemiVerse branding
      const totalPages = doc.getNumberOfPages()
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i)
        doc.setFontSize(8)
        doc.setTextColor(150, 150, 150)
        doc.text(`FemiVerse - Empowering Women's Health | Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 10, {
          align: "center",
        })
      }

      // Generate filename with timestamp
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-")
      const filename = `FemiVerse-Health-Report-${timestamp}.pdf`

      // Save the PDF
      doc.save(filename)
    } catch (error) {
      console.error("Error generating PDF:", error)
      setError("Failed to generate report. Please try again.")
    } finally {
      setIsGeneratingReport(false)
    }
  }

  const quickStartOptions = [
    "I want to check my symptoms",
    "I have irregular periods",
    "I'm experiencing unusual discharge",
    "I have hormonal symptoms like acne",
    "I'm feeling very tired lately",
    "I have painful periods",
  ]

  if (!isApiKeySet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-rose-200/20 to-pink-200/20 rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-pink-200/15 to-fuchsia-200/15 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <Card className="w-full max-w-md border-rose-200 shadow-2xl hover:shadow-3xl transition-all duration-500 animate-scale-in bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-float">
              <Bot className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-3xl text-rose-800 font-bold gradient-text">Welcome to FemiBot</CardTitle>
            <CardDescription className="text-rose-600 text-lg leading-relaxed">
              To get started, please enter your Gemini API key. This key will be stored locally and used to power our AI
              conversations.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <Alert className="border-red-200 bg-red-50 animate-fade-in">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-3">
              <label htmlFor="apiKey" className="text-sm font-semibold text-rose-700">
                Gemini API Key
              </label>
              <div className="relative">
                <Input
                  id="apiKey"
                  type={showApiKey ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your Gemini API key..."
                  className="pr-12 border-rose-200 focus:border-rose-400 text-lg py-3 transition-all duration-300"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? (
                    <EyeOff className="h-5 w-5 text-rose-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-rose-500" />
                  )}
                </Button>
              </div>
            </div>

            <Button
              onClick={handleApiKeySubmit}
              className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white py-3 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              disabled={!apiKey.trim()}
            >
              <Key className="w-5 h-5 mr-2" />
              Start Chatting with FemiBot
            </Button>

            <div className="text-center space-y-3">
              <p className="text-sm text-rose-600 font-medium">Don't have a Gemini API key?</p>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm text-rose-700 hover:text-rose-800 underline font-semibold transition-colors duration-300"
              >
                Get your free API key from Google AI Studio →
              </a>
            </div>

            <div className="text-center">
              <Link
                href="/"
                className="flex items-center justify-center text-rose-600 hover:text-rose-700 text-sm font-medium transition-colors duration-300"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-rose-200/10 to-pink-200/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-pink-200/10 to-fuchsia-200/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <div className="container mx-auto max-w-5xl h-screen flex flex-col relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between p-6 glass-effect border-b border-rose-200 animate-fade-in">
          <Link
            href="/"
            className="flex items-center text-rose-600 hover:text-rose-700 transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="font-semibold">Back to Home</span>
          </Link>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg animate-pulse-soft">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-bold text-rose-800 text-xl">FemiBot</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-rose-600 font-medium">Online & Ready</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {messages.length > 1 && (
              <Button
                variant="outline"
                size="sm"
                onClick={generateHealthReport}
                disabled={isGeneratingReport}
                className="text-rose-600 hover:text-rose-700 hover:bg-rose-100 border-rose-300 transition-all duration-300 bg-transparent"
              >
                {isGeneratingReport ? (
                  <>
                    <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-rose-300 border-t-rose-600"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </>
                )}
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={resetApiKey}
              className="text-rose-600 hover:text-rose-700 hover:bg-rose-100 transition-all duration-300"
            >
              <Key className="w-4 h-4 mr-1" />
              Change API Key
            </Button>
            <div className="flex items-center space-x-2">
              <Heart className="w-6 h-6 text-rose-600 animate-pulse-soft" />
              <span className="font-bold text-rose-800 text-xl gradient-text">FemiVerse</span>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert className="m-4 border-red-200 bg-red-50 animate-fade-in">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        {/* Chat Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
            <div className="space-y-6">
              {messages.length === 0 && (
                <div className="text-center py-12 animate-fade-in-up">
                  <div className="w-24 h-24 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-float">
                    <MessageCircle className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-rose-800 mb-4">Start Your Health Journey</h3>
                  <p className="text-rose-600 text-lg mb-8 max-w-2xl mx-auto">
                    I'm here to help you understand your symptoms and provide personalized guidance for women's health
                    concerns.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                    {quickStartOptions.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        onClick={() => handleSendMessage(option)}
                        className="text-left justify-start border-rose-200 text-rose-700 hover:bg-rose-50 transition-all duration-300 hover:scale-105 animate-fade-in-up"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <Sparkles className="w-4 h-4 mr-2 text-rose-500" />
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"} animate-fade-in-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`flex items-start space-x-3 max-w-[85%] ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${
                        message.type === "user"
                          ? "bg-gradient-to-r from-rose-500 to-pink-600"
                          : "bg-gradient-to-r from-pink-500 to-fuchsia-600"
                      }`}
                    >
                      {message.type === "user" ? (
                        <User className="w-5 h-5 text-white" />
                      ) : (
                        <Bot className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div
                      className={`rounded-2xl p-4 shadow-lg ${
                        message.type === "user"
                          ? "bg-gradient-to-r from-rose-500 to-pink-600 text-white"
                          : "bg-white border border-rose-100 text-gray-800"
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">{message.content}</p>
                      <div className="flex items-center space-x-1 mt-2 opacity-70">
                        <Clock className="w-3 h-3" />
                        <span className="text-xs">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start animate-fade-in">
                  <div className="flex items-start space-x-3 max-w-[85%]">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-600 flex items-center justify-center shadow-lg">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-white border border-rose-100 shadow-lg rounded-2xl p-4">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-rose-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-rose-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Download Report Suggestion */}
              {messages.length > 3 && !isGeneratingReport && (
                <div className="flex justify-center animate-fade-in">
                  <Card className="max-w-md border-rose-200 bg-gradient-to-r from-rose-50 to-pink-50">
                    <CardContent className="p-4 text-center">
                      <FileText className="w-8 h-8 text-rose-500 mx-auto mb-2" />
                      <p className="text-sm text-rose-700 mb-3">
                        Ready to save your health insights? Download a comprehensive report of your conversation.
                      </p>
                      <Button
                        onClick={generateHealthReport}
                        size="sm"
                        className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Generate Report
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-6 glass-effect border-t border-rose-200">
            <div className="flex space-x-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about your symptoms or health concerns..."
                className="flex-1 border-rose-200 focus:border-rose-400 text-lg py-3 rounded-xl transition-all duration-300 focus:shadow-lg"
                disabled={isTyping}
              />
              <Button
                onClick={() => handleSendMessage(inputValue)}
                disabled={!inputValue.trim() || isTyping}
                className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-xs text-rose-600 mt-3 text-center font-medium">
              FemiBot provides educational information and is not a substitute for professional medical advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
