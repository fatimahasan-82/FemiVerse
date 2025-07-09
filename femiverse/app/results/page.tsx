"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MessageCircle, Sparkles, Heart } from "lucide-react"
import Link from "next/link"

export default function ResultsRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to FemiBot after a short delay
    const timer = setTimeout(() => {
      router.push("/femibot")
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

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

      <Card className="max-w-lg border-rose-200 shadow-2xl hover:shadow-3xl transition-all duration-500 animate-scale-in bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-float">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-3xl text-rose-800 font-bold gradient-text">Enhanced Results Experience</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="animate-fade-in-up">
            <p className="text-rose-600 text-lg leading-relaxed mb-6">
              Get your personalized health insights and results directly through FemiBot's conversational interface for
              a more interactive and comprehensive experience.
            </p>

            <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-6 mb-6 border border-rose-200">
              <h3 className="font-bold text-rose-800 mb-3 text-xl">🎯 Better Results with FemiBot:</h3>
              <ul className="text-left space-y-2 text-rose-700">
                <li className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-rose-500" />
                  <span>Interactive result explanations</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-rose-500" />
                  <span>Follow-up questions and clarifications</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-rose-500" />
                  <span>Personalized recommendations</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-rose-500" />
                  <span>Continuous support and guidance</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-4 animate-fade-in-up animate-stagger-1">
            <p className="text-sm text-rose-600 font-medium">Taking you to FemiBot for your results...</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/femibot">
                <Button className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-8 py-3 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat with FemiBot
                </Button>
              </Link>

              <Link href="/">
                <Button
                  variant="outline"
                  className="border-rose-300 text-rose-600 hover:bg-rose-50 px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 bg-white/80"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>

          <div className="text-center animate-fade-in-up animate-stagger-2">
            <div className="flex items-center justify-center space-x-2 text-rose-600">
              <Heart className="w-5 h-5 animate-pulse-soft" />
              <span className="font-semibold">Powered by FemiVerse</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
