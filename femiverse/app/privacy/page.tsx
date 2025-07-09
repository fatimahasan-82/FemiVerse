import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock, Eye, Database, ArrowLeft, Heart } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center text-rose-600 hover:text-rose-700">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center space-x-2">
            <Heart className="w-6 h-6 text-pink-600" />
            <span className="font-semibold text-gray-800">FemiVerse</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-green-100 text-green-700 hover:bg-green-200">🔒 Privacy-First Approach</Badge>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Your Privacy Matters</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            At FemiVerse, we believe your health data should remain private and secure. Here's how we protect your
            information.
          </p>
        </div>

        {/* Privacy Principles */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="border-green-200 bg-green-50/50">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-green-800">No Data Storage by Default</CardTitle>
              <CardDescription>
                Your health information is processed locally and not stored on our servers unless you explicitly opt-in.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-green-700">
                <li>• Anonymous usage by default</li>
                <li>• Local processing of symptom data</li>
                <li>• No tracking cookies or analytics</li>
                <li>• You control what gets saved</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50/50">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-blue-800">Encrypted & Secure</CardTitle>
              <CardDescription>
                When you do choose to save data, it's encrypted and protected with industry-standard security measures.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-blue-700">
                <li>• End-to-end encryption</li>
                <li>• Secure data transmission</li>
                <li>• Regular security audits</li>
                <li>• HIPAA-compliant practices</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* How We Handle Your Data */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="w-5 h-5 text-purple-600 mr-2" />
              How We Handle Your Data
            </CardTitle>
            <CardDescription>Transparency about our data practices and your rights</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Symptom Checker Data</h3>
              <p className="text-gray-600 mb-2">
                Your symptom checker responses are processed locally in your browser. Results are temporarily stored in
                your browser's local storage and automatically deleted when you close the session.
              </p>
              <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                Local Processing Only
              </Badge>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">FemiBot Conversations</h3>
              <p className="text-gray-600 mb-2">
                Chat conversations with FemiBot are processed using rule-based logic and are not stored permanently. No
                conversation history is maintained across sessions unless you explicitly save it.
              </p>
              <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                Session-Based Only
              </Badge>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Optional Account Features</h3>
              <p className="text-gray-600 mb-2">
                If you choose to create an account for symptom tracking or report saving, you have full control over
                what data is stored and can delete it at any time.
              </p>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                Opt-In Only
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Your Rights */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Eye className="w-5 h-5 text-indigo-600 mr-2" />
              Your Privacy Rights
            </CardTitle>
            <CardDescription>You have complete control over your health data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Right to Access</h4>
                <p className="text-sm text-gray-600">
                  View all data we have about you (if any) at any time through your account dashboard.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Right to Delete</h4>
                <p className="text-sm text-gray-600">
                  Permanently delete all your data with a single click. No questions asked.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Right to Export</h4>
                <p className="text-sm text-gray-600">
                  Download all your data in a portable format to use with other health apps.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Right to Correct</h4>
                <p className="text-sm text-gray-600">
                  Update or correct any information in your profile or health records.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technical Details */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Technical Privacy Measures</CardTitle>
            <CardDescription>The technology behind our privacy-first approach</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-gray-800">Client-Side Processing</h4>
                  <p className="text-sm text-gray-600">
                    Our rule-based AI runs entirely in your browser, meaning your health data never leaves your device
                    during analysis.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-gray-800">No Third-Party Tracking</h4>
                  <p className="text-sm text-gray-600">
                    We don't use Google Analytics, Facebook Pixel, or any other tracking services that could compromise
                    your privacy.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-gray-800">Minimal Data Collection</h4>
                  <p className="text-sm text-gray-600">
                    We only collect the absolute minimum data necessary to provide our services, and only with your
                    explicit consent.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-gray-800">Open Source Transparency</h4>
                  <p className="text-sm text-gray-600">
                    Our privacy practices are backed by open-source code that you can review and verify yourself.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact & Questions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Questions About Privacy?</CardTitle>
            <CardDescription>We're here to help and answer any privacy-related questions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              If you have any questions about our privacy practices, want to exercise your privacy rights, or need
              clarification about how we handle your data, please don't hesitate to reach out.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white">
                Contact Privacy Team
              </Button>
              <Button variant="outline">View Full Privacy Policy</Button>
            </div>
          </CardContent>
        </Card>

        {/* Last Updated */}
        <div className="text-center text-sm text-gray-500">
          <p>This privacy notice was last updated on January 2025</p>
          <p className="mt-2">
            We believe in transparency and will notify you of any changes to our privacy practices.
          </p>
        </div>
      </div>
    </div>
  )
}
