import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Shield,
  Brain,
  Users,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Star,
  Target,
  Zap,
  Lock,
  Globe,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-peach-50 to-lavender-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-rose-100/40 to-peach-100/40 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-lavender-100/30 to-mint-100/30 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-pink-100/35 to-cream-100/35 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Header */}
      <header className="glass-effect sticky top-0 z-50 animate-fade-in">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3 animate-slide-in-left">
            <div className="w-10 h-10 bg-gradient-to-r from-rose-400 to-peach-400 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
              <Heart className="w-6 h-6 text-white animate-pulse-soft" />
            </div>
            <span className="text-2xl font-bold gradient-text">FemiVerse</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8 animate-slide-in-right">
            <Link
              href="#about"
              className="text-gray-600 hover:text-rose-500 transition-all duration-300 hover:scale-105 font-medium"
            >
              About
            </Link>
            <Link
              href="#features"
              className="text-gray-600 hover:text-peach-500 transition-all duration-300 hover:scale-105 font-medium"
            >
              Features
            </Link>
            <Link
              href="/privacy"
              className="text-gray-600 hover:text-lavender-500 transition-all duration-300 hover:scale-105 font-medium"
            >
              Privacy
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-4 relative">
        <div className="container mx-auto text-center max-w-5xl">
          <div className="animate-fade-in-up">
            <Badge className="mb-8 bg-gradient-to-r from-rose-100 to-peach-100 text-rose-600 hover:from-rose-200 hover:to-peach-200 transition-all duration-300 px-6 py-2 text-lg font-medium shadow-lg border-0">
              🌸 The Future of Women's Health
            </Badge>
          </div>

          <div className="animate-fade-in-up animate-stagger-1">
            <h1 className="text-6xl md:text-8xl font-bold mb-8 gradient-text leading-tight">FemiVerse</h1>
          </div>

          <div className="animate-fade-in-up animate-stagger-2">
            <p className="text-2xl md:text-3xl text-gray-700 mb-6 font-medium italic">
              "The Future of Women's Health Begins at the Core."
            </p>
          </div>

          <div className="animate-fade-in-up animate-stagger-3">
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              An AI-powered, explainable ecosystem for women's health — built with logic, not guesses — empowering women
              with clarity, care, and control.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up animate-stagger-4">
            <Link href="/femibot">
              <Button
                size="lg"
                className="bg-gradient-to-r from-rose-400 to-peach-400 hover:from-rose-500 hover:to-peach-500 text-white px-10 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 border-0"
              >
                <Sparkles className="mr-3 w-6 h-6" />
                Start with FemiBot
                <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
            </Link>
            <Link href="#about">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-lavender-300 text-lavender-600 hover:bg-lavender-50 px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 bg-white/80 backdrop-blur-sm"
              >
                <Heart className="mr-3 w-6 h-6" />
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About FemiVerse Section */}
      <section id="about" className="py-20 px-4 glass-effect relative">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">🌸 About FemiVerse</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              FemiVerse is an AI-powered health tech platform built to revolutionize women's healthcare through clarity,
              personalization, and accessibility.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <Card className="hover-lift animate-slide-in-left shadow-xl bg-gradient-to-br from-white to-rose-50/50 border-rose-100">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800 mb-4">Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Unlike traditional symptom checkers that rely on black-box machine learning models trained on generic
                  datasets, FemiVerse uses a rule-based AI engine designed specifically for female physiology, hormones,
                  and reproductive health.
                </p>
                <p>
                  Whether it's navigating irregular cycles, managing PCOS symptoms, or understanding hormonal changes,
                  FemiVerse guides users step-by-step with empathy, transparency, and precision. Our system speaks with
                  women, not over them.
                </p>
                <p className="font-semibold text-rose-600">
                  By centering the female experience and stripping out the guesswork, FemiVerse empowers women to take
                  control of their health journey with tools they can trust.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift animate-slide-in-right shadow-xl bg-gradient-to-br from-white to-lavender-50/50 border-lavender-100">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <Brain className="w-8 h-8 text-lavender-500 mr-3" />
                  What Makes FemiVerse Different?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Target className="w-6 h-6 text-rose-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Female-first focus</h4>
                    <p className="text-gray-600">Built only for women's health</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Zap className="w-6 h-6 text-peach-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Explainable AI</h4>
                    <p className="text-gray-600">No black-box predictions, just clear reasoning</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Lock className="w-6 h-6 text-mint-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Privacy-conscious</h4>
                    <p className="text-gray-600">Zero-data by default, opt-in health tracking</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Globe className="w-6 h-6 text-lavender-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Accessible by design</h4>
                    <p className="text-gray-600">Intuitive UI, non-medical language</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center animate-fade-in-up">
            <Card className="max-w-4xl mx-auto shadow-xl bg-gradient-to-br from-white to-cream-50/50 border-cream-200">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800 mb-4">🩺 Built For:</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 text-left">
                  <div className="space-y-2">
                    <div className="w-12 h-12 bg-gradient-to-r from-rose-100 to-peach-100 rounded-full flex items-center justify-center mb-3">
                      <Heart className="w-6 h-6 text-rose-500" />
                    </div>
                    <h4 className="font-semibold text-gray-800">Teen girls</h4>
                    <p className="text-gray-600 text-sm">Confused about irregular periods</p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-12 h-12 bg-gradient-to-r from-lavender-100 to-mint-100 rounded-full flex items-center justify-center mb-3">
                      <Users className="w-6 h-6 text-lavender-500" />
                    </div>
                    <h4 className="font-semibold text-gray-800">Women facing symptoms</h4>
                    <p className="text-gray-600 text-sm">Like fatigue, cramps, or bloating</p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-12 h-12 bg-gradient-to-r from-peach-100 to-cream-100 rounded-full flex items-center justify-center mb-3">
                      <Shield className="w-6 h-6 text-peach-500" />
                    </div>
                    <h4 className="font-semibold text-gray-800">Anyone underserved</h4>
                    <p className="text-gray-600 text-sm">By vague searches or rushed visits</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12 animate-fade-in-up animate-stagger-1">
            <p className="text-xl text-gray-700 font-medium italic max-w-3xl mx-auto">
              FemiVerse isn't just a tool. It's a movement — toward health autonomy, medically literate choices, and
              tech that finally sees women at the center.
            </p>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">🚨 The Problem We're Solving</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Women's health is consistently underserved by generic health platforms
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            <Card className="border-red-200 bg-gradient-to-br from-red-50 to-rose-50 hover-lift animate-slide-in-left shadow-xl">
              <CardHeader>
                <CardTitle className="text-red-600 text-2xl font-bold">Current Health Platforms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-3 h-3 bg-red-400 rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
                  <p className="text-gray-700 text-lg">Not tailored to female-specific conditions</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-3 h-3 bg-red-400 rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
                  <p className="text-gray-700 text-lg">Overlook menstrual, hormonal, and reproductive health</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-3 h-3 bg-red-400 rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
                  <p className="text-gray-700 text-lg">Use opaque ML black-box systems</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-3 h-3 bg-red-400 rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
                  <p className="text-gray-700 text-lg">Don't account for unique female symptoms or cycles</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-gradient-to-br from-mint-50 to-green-50 hover-lift animate-slide-in-right shadow-xl">
              <CardHeader>
                <CardTitle className="text-mint-600 text-2xl font-bold">FemiVerse Solution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-mint-500 mt-0.5 flex-shrink-0 animate-pulse-soft" />
                  <p className="text-gray-700 text-lg">Tailored specifically to women's health</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-mint-500 mt-0.5 flex-shrink-0 animate-pulse-soft" />
                  <p className="text-gray-700 text-lg">Focuses on hormonal and reproductive health</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-mint-500 mt-0.5 flex-shrink-0 animate-pulse-soft" />
                  <p className="text-gray-700 text-lg">Transparent rule-based logic</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-mint-500 mt-0.5 flex-shrink-0 animate-pulse-soft" />
                  <p className="text-gray-700 text-lg">Understands female-specific language and cycles</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section id="features" className="py-20 px-4 glass-effect">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">🔧 Key Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools designed specifically for women's health
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            <Card className="hover-lift animate-fade-in-up shadow-xl bg-gradient-to-br from-white to-rose-50/50 border-rose-100">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-rose-100 to-peach-100 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Brain className="w-8 h-8 text-rose-500 animate-pulse-soft" />
                </div>
                <CardTitle className="text-2xl font-bold">AI-Powered Symptom Analysis</CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  FemiBot uses advanced AI to understand your symptoms and provide personalized guidance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-rose-400" />
                    <span>Conversational symptom checking</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-rose-400" />
                    <span>Covers PCOS, PMDD, UTI, endometriosis</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-rose-400" />
                    <span>Personalized health insights</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover-lift animate-fade-in-up animate-stagger-1 shadow-xl bg-gradient-to-br from-white to-lavender-50/50 border-lavender-100">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-lavender-100 to-mint-100 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Sparkles className="w-8 h-8 text-lavender-500 animate-pulse-soft" />
                </div>
                <CardTitle className="text-2xl font-bold">Personalized Health Reports</CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Clear explanations in non-medical language with actionable insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-lavender-400" />
                    <span>Easy-to-understand explanations</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-lavender-400" />
                    <span>Actionable next steps</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-lavender-400" />
                    <span>Track your cycle recommendations</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover-lift animate-fade-in-up animate-stagger-2 shadow-xl bg-gradient-to-br from-white to-mint-50/50 border-mint-100">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-mint-100 to-peach-100 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Users className="w-8 h-8 text-mint-500 animate-pulse-soft" />
                </div>
                <CardTitle className="text-2xl font-bold">FemiBot Chat Interface</CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Conversational AI that guides you with empathy and medical accuracy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-mint-400" />
                    <span>Empathetic conversation flow</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-mint-400" />
                    <span>Medical accuracy guaranteed</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-mint-400" />
                    <span>Clear, supportive guidance</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Conditions Covered */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-12">Conditions We Cover</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: "PCOS", color: "rose" },
                { name: "Endometriosis", color: "peach" },
                { name: "UTIs", color: "lavender" },
                { name: "Hormonal Imbalances", color: "mint" },
                { name: "Menstrual Disorders", color: "cream" },
                { name: "PMDD", color: "rose" },
                { name: "Perimenopause", color: "peach" },
                { name: "Menopause", color: "lavender" },
                { name: "Thyroid Disorders", color: "mint" },
                { name: "Anemia", color: "cream" },
                { name: "Reproductive Health", color: "rose" },
              ].map((condition, index) => (
                <Badge
                  key={condition.name}
                  variant="secondary"
                  className={`bg-gradient-to-r from-${condition.color}-100 to-${condition.color}-200 text-${condition.color}-700 hover:from-${condition.color}-200 hover:to-${condition.color}-300 px-6 py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in-up border-0`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {condition.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Rule-Based */}
      <section className="py-20 px-4 glass-effect">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">🧠 Why AI-Powered Excellence?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            <Card className="text-center hover-lift animate-fade-in-up shadow-xl bg-gradient-to-br from-white to-mint-50/50 border-mint-100">
              <CardHeader>
                <Shield className="w-16 h-16 text-mint-500 mx-auto mb-6 animate-float" />
                <CardTitle className="text-2xl font-bold">Transparency Matters</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Users want to know why they're getting a suggestion. Our AI provides clear, explainable guidance you
                  can trust.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift animate-fade-in-up animate-stagger-1 shadow-xl bg-gradient-to-br from-white to-peach-50/50 border-peach-100">
              <CardHeader>
                <Brain
                  className="w-16 h-16 text-peach-500 mx-auto mb-6 animate-float"
                  style={{ animationDelay: "1s" }}
                />
                <CardTitle className="text-2xl font-bold">Medical Accuracy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Healthcare needs precision and reliability. Our AI is trained specifically for women's health
                  concerns.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift animate-fade-in-up animate-stagger-2 shadow-xl bg-gradient-to-br from-white to-lavender-50/50 border-lavender-100">
              <CardHeader>
                <Heart
                  className="w-16 h-16 text-lavender-500 mx-auto mb-6 animate-float"
                  style={{ animationDelay: "2s" }}
                />
                <CardTitle className="text-2xl font-bold">Empathetic & Accessible</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Designed with empathy and understanding, making quality healthcare guidance accessible to all women.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-rose-400 via-peach-400 to-lavender-400 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-400/90 via-peach-400/90 to-lavender-400/90"></div>
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <div className="animate-fade-in-up">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
              Ready to Take Control of Your Health?
            </h2>
            <p className="text-2xl text-white/90 mb-12 font-medium">
              Start your personalized health journey with FemiVerse today
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/femibot">
                <Button
                  size="lg"
                  className="bg-white text-rose-600 hover:bg-gray-100 px-12 py-4 text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 border-0"
                >
                  <Sparkles className="mr-3 w-6 h-6" />
                  Start with FemiBot
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
              </Link>
              <Link href="/privacy">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 px-12 py-4 text-xl font-bold bg-transparent backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2"
                >
                  <Shield className="mr-3 w-6 h-6" />
                  Privacy First
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4 relative">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-10">
            <div className="animate-fade-in-up">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-rose-400 to-peach-400 rounded-full flex items-center justify-center shadow-lg">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold gradient-text">FemiVerse</span>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed">
                Empowering women with transparent, personalized health guidance through advanced AI technology.
              </p>
            </div>
            <div className="animate-fade-in-up animate-stagger-1">
              <h3 className="font-bold mb-6 text-xl">Features</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="/femibot" className="hover:text-white transition-colors duration-300 text-lg">
                    FemiBot AI Chat
                  </Link>
                </li>
                <li>
                  <Link href="/femibot" className="hover:text-white transition-colors duration-300 text-lg">
                    Symptom Analysis
                  </Link>
                </li>
                <li>
                  <Link href="/reports" className="hover:text-white transition-colors duration-300 text-lg">
                    Health Reports
                  </Link>
                </li>
              </ul>
            </div>
            <div className="animate-fade-in-up animate-stagger-2">
              <h3 className="font-bold mb-6 text-xl">Company</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="#about" className="hover:text-white transition-colors duration-300 text-lg">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors duration-300 text-lg">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors duration-300 text-lg">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="animate-fade-in-up animate-stagger-3">
              <h3 className="font-bold mb-6 text-xl">Support</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white transition-colors duration-300 text-lg">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white transition-colors duration-300 text-lg">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="hover:text-white transition-colors duration-300 text-lg">
                    Resources
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 animate-fade-in-up">
            <p className="text-lg">
              &copy; 2025 FemiVerse. All rights reserved. Built with transparency and care for women's health.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
