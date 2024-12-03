import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { Link } from "react-router-dom"

export default function SuccessPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg max-w-md w-full">
        <div className="text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            Payment Successful!
          </h2>
          <p className="mt-2 text-gray-600">
            Thank you for your purchase. Your payment has been processed
            successfully.
          </p>
          <div className="mt-6">
            <Link to="/">
              <Button>Return to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
