"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Heart, AlertCircle, MessageCircle, Sparkles } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Question {
  id: string
  type: "single" | "multiple" | "boolean"
  question: string
  options?: string[]
  required?: boolean
}

interface SymptomData {
  [key: string]: string | string[] | boolean
}

const initialQuestions: Question[] = [
  {
    id: "age_group",
    type: "single",
    question: "What is your age group?",
    options: ["Under 18", "18-25", "26-35", "36-45", "46-55", "Over 55"],
    required: true,
  },
  {
    id: "primary_concern",
    type: "single",
    question: "What is your primary health concern today?",
    options: [
      "Irregular or missed periods",
      "Painful periods or cramps",
      "Unusual discharge or infections",
      "Hormonal symptoms (acne, hair growth, mood)",
      "Fatigue or energy issues",
      "Weight changes",
      "Other symptoms",
    ],
    required: true,
  },
]

export default function SymptomChecker() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<SymptomData>({})
  const [questions, setQuestions] = useState<Question[]>(initialQuestions)
  const router = useRouter()

  useEffect(() => {
    // Redirect to FemiBot after a short delay to show the message
    const timer = setTimeout(() => {
      router.push("/femibot")
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  const handleAnswer = (questionId: string, answer: string | string[] | boolean) => {
    const newAnswers = { ...answers, [questionId]: answer }
    setAnswers(newAnswers)

    // Generate next questions based on current answers
    generateNextQuestions(newAnswers)
  }

  const generateNextQuestions = (currentAnswers: SymptomData) => {
    const nextQuestions = [...initialQuestions]

    // Add specific questions based on primary concern
    if (currentAnswers.primary_concern === "Irregular or missed periods") {
      nextQuestions.push(
        {
          id: "period_frequency",
          type: "single",
          question: "How often do you get your period?",
          options: [
            "Every 21-35 days (regular)",
            "Every 36-60 days (irregular)",
            "Less than every 60 days (very irregular)",
            "I haven't had a period in 3+ months",
          ],
        },
        {
          id: "period_symptoms",
          type: "multiple",
          question: "Which symptoms do you experience? (Select all that apply)",
          options: [
            "Excessive hair growth (face, chest, back)",
            "Acne or oily skin",
            "Weight gain or difficulty losing weight",
            "Hair thinning or male-pattern baldness",
            "Dark patches of skin",
            "Mood changes or depression",
          ],
        },
      )
    }

    if (currentAnswers.primary_concern === "Unusual discharge or infections") {
      nextQuestions.push(
        {
          id: "discharge_symptoms",
          type: "multiple",
          question: "What symptoms are you experiencing? (Select all that apply)",
          options: [
            "Burning sensation when urinating",
            "Frequent urination",
            "Urgent need to urinate",
            "Cloudy or strong-smelling urine",
            "Pelvic pain",
            "Unusual vaginal discharge",
          ],
        },
        {
          id: "symptom_duration",
          type: "single",
          question: "How long have you been experiencing these symptoms?",
          options: ["Less than 24 hours", "1-3 days", "4-7 days", "More than a week"],
        },
      )
    }

    if (currentAnswers.primary_concern === "Hormonal symptoms (acne, hair growth, mood)") {
      nextQuestions.push(
        {
          id: "hormonal_symptoms",
          type: "multiple",
          question: "Which hormonal symptoms do you experience? (Select all that apply)",
          options: [
            "Severe acne, especially on jawline",
            "Excessive hair growth on face or body",
            "Hair loss or thinning",
            "Severe mood swings or irritability",
            "Depression or anxiety",
            "Difficulty concentrating",
            "Sleep problems",
          ],
        },
        {
          id: "cycle_relation",
          type: "single",
          question: "Do these symptoms seem related to your menstrual cycle?",
          options: [
            "Yes, they worsen before my period",
            "Yes, they improve after my period",
            "No clear pattern with my cycle",
            "I don't have regular periods",
          ],
        },
      )
    }

    setQuestions(nextQuestions)
  }

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Generate results and navigate
      const results = generateResults(answers)
      localStorage.setItem("symptomResults", JSON.stringify(results))
      router.push("/results")
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const generateResults = (answers: SymptomData) => {
    // Rule-based logic for generating results
    const results = {
      condition: "",
      confidence: 0,
      explanation: "",
      recommendations: [] as string[],
      nextSteps: [] as string[],
    }

    // PCOS Rule
    if (
      answers.primary_concern === "Irregular or missed periods" &&
      answers.period_frequency?.includes("irregular") &&
      Array.isArray(answers.period_symptoms) &&
      answers.period_symptoms.includes("Excessive hair growth (face, chest, back)") &&
      answers.period_symptoms.includes("Acne or oily skin") &&
      answers.period_symptoms.includes("Weight gain or difficulty losing weight")
    ) {
      results.condition = "Possible PCOS (Polycystic Ovary Syndrome)"
      results.confidence = 75
      results.explanation =
        "Based on your symptoms of irregular periods, excessive hair growth, acne, and weight changes, you may have PCOS. This is a common hormonal disorder affecting 1 in 10 women of reproductive age."
      results.recommendations = [
        "Track your menstrual cycle and symptoms",
        "Maintain a balanced diet with low glycemic index foods",
        "Regular exercise can help manage symptoms",
        "Consider stress management techniques",
      ]
      results.nextSteps = [
        "Consult a gynecologist or endocrinologist",
        "Request hormone testing (testosterone, insulin, LH/FSH)",
        "Consider a pelvic ultrasound",
        "Discuss treatment options like birth control or metformin",
      ]
    }

    // UTI Rule
    else if (
      answers.primary_concern === "Unusual discharge or infections" &&
      Array.isArray(answers.discharge_symptoms) &&
      answers.discharge_symptoms.includes("Burning sensation when urinating") &&
      answers.discharge_symptoms.includes("Frequent urination")
    ) {
      results.condition = "Possible Urinary Tract Infection (UTI)"
      results.confidence = 80
      results.explanation =
        "Your symptoms of burning during urination and frequent urination are classic signs of a UTI. This is a common bacterial infection that affects the urinary system."
      results.recommendations = [
        "Drink plenty of water to help flush bacteria",
        "Urinate frequently and completely empty your bladder",
        "Avoid irritants like caffeine and alcohol",
        "Practice good hygiene",
      ]
      results.nextSteps = [
        "See a healthcare provider for urine testing",
        "Get prescribed antibiotics if confirmed",
        "Follow up if symptoms don't improve in 2-3 days",
        "Consider preventive measures for recurrent UTIs",
      ]
    }

    // PMDD Rule
    else if (
      answers.primary_concern === "Hormonal symptoms (acne, hair growth, mood)" &&
      Array.isArray(answers.hormonal_symptoms) &&
      answers.hormonal_symptoms.includes("Severe mood swings or irritability") &&
      answers.hormonal_symptoms.includes("Depression or anxiety") &&
      answers.cycle_relation === "Yes, they worsen before my period"
    ) {
      results.condition = "Possible PMDD (Premenstrual Dysphoric Disorder)"
      results.confidence = 70
      results.explanation =
        "Your severe mood symptoms that worsen before your period may indicate PMDD, a severe form of PMS that significantly impacts daily life."
      results.recommendations = [
        "Track your symptoms and menstrual cycle",
        "Regular exercise and stress management",
        "Maintain consistent sleep schedule",
        "Consider dietary changes (reduce caffeine, sugar)",
      ]
      results.nextSteps = [
        "Consult with a gynecologist or psychiatrist",
        "Keep a detailed symptom diary for 2-3 cycles",
        "Discuss treatment options (SSRIs, birth control)",
        "Consider therapy or support groups",
      ]
    }

    // Default case
    else {
      results.condition = "General Women's Health Concern"
      results.confidence = 50
      results.explanation =
        "Based on your symptoms, we recommend consulting with a healthcare provider for a proper evaluation. Your symptoms may require professional assessment."
      results.recommendations = [
        "Keep a symptom diary",
        "Note any patterns with your menstrual cycle",
        "Maintain a healthy lifestyle",
        "Don't ignore persistent symptoms",
      ]
      results.nextSteps = [
        "Schedule an appointment with your healthcare provider",
        "Prepare a list of all symptoms and their duration",
        "Bring any relevant medical history",
        "Ask about appropriate tests or screenings",
      ]
    }

    return results
  }

  const currentQuestion = questions[currentStep]
  const progress = ((currentStep + 1) / questions.length) * 100

  if (!currentQuestion) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50 py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center text-rose-600 hover:text-rose-700">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center space-x-2">
            <Heart className="w-6 h-6 text-rose-600" />
            <span className="font-semibold text-gray-800">FemiVerse</span>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              Question {currentStep + 1} of {questions.length}
            </span>
            <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
            {currentQuestion.required && (
              <CardDescription className="flex items-center text-orange-600">
                <AlertCircle className="w-4 h-4 mr-1" />
                This question is required
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {currentQuestion.type === "single" && (
              <RadioGroup
                value={(answers[currentQuestion.id] as string) || ""}
                onValueChange={(value) => handleAnswer(currentQuestion.id, value)}
              >
                {currentQuestion.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`${currentQuestion.id}-${index}`} />
                    <Label htmlFor={`${currentQuestion.id}-${index}`} className="cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {currentQuestion.type === "multiple" && (
              <div className="space-y-3">
                {currentQuestion.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${currentQuestion.id}-${index}`}
                      checked={
                        Array.isArray(answers[currentQuestion.id]) &&
                        (answers[currentQuestion.id] as string[]).includes(option)
                      }
                      onCheckedChange={(checked) => {
                        const currentAnswers = (answers[currentQuestion.id] as string[]) || []
                        if (checked) {
                          handleAnswer(currentQuestion.id, [...currentAnswers, option])
                        } else {
                          handleAnswer(
                            currentQuestion.id,
                            currentAnswers.filter((a) => a !== option),
                          )
                        }
                      }}
                    />
                    <Label htmlFor={`${currentQuestion.id}-${index}`} className="cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center bg-transparent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button
            onClick={nextStep}
            disabled={
              currentQuestion.required &&
              (!answers[currentQuestion.id] ||
                (Array.isArray(answers[currentQuestion.id]) && (answers[currentQuestion.id] as string[]).length === 0))
            }
            className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white flex items-center"
          >
            {currentStep === questions.length - 1 ? "Get Results" : "Next"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Redirect Message */}
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
            <MessageCircle className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-3xl text-rose-800 font-bold gradient-text">
            Symptom Checking with FemiBot
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="animate-fade-in-up">
            <p className="text-rose-600 text-lg leading-relaxed mb-6">
              We've enhanced your experience! Symptom checking is now integrated directly into FemiBot for a more
              conversational and personalized approach.
            </p>

            <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-6 mb-6 border border-rose-200">
              <h3 className="font-bold text-rose-800 mb-3 text-xl">✨ What's New:</h3>
              <ul className="text-left space-y-2 text-rose-700">
                <li className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-rose-500" />
                  <span>Conversational symptom analysis</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-rose-500" />
                  <span>AI-powered personalized guidance</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-rose-500" />
                  <span>Real-time medical insights</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-rose-500" />
                  <span>Natural, empathetic interaction</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-4 animate-fade-in-up animate-stagger-1">
            <p className="text-sm text-rose-600 font-medium">Redirecting you to FemiBot in a moment...</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/femibot">
                <Button className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-8 py-3 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Go to FemiBot Now
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
