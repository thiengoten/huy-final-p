import { Button } from "@/components/ui/button"
import { XCircle } from "lucide-react"
import { Link } from "react-router-dom"

export default function ErrorPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg max-w-md w-full">
        <div className="text-center">
          <XCircle className="mx-auto h-16 w-16 text-red-500" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            Payment Failed
          </h2>
          <p className="mt-2 text-gray-600">
            We're sorry, but there was an error processing your payment. Please
            try again or contact support if the problem persists.
          </p>
          <div className="mt-6 space-y-2">
            <Link to="/">
              <Button className="w-full">Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
