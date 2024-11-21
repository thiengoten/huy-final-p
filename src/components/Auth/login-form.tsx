import {
  initValues,
  loginFormSchema,
} from "@/components/Auth/login-form.helpers"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authPaths } from "@/modules/auth"
import { useLogin } from "@/queries/login"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { z } from "zod"

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const { onLoginUser } = useLogin({
    onSuccess: (data) => {
      console.log("User logged in", data)
    },
    onError: (error) => {
      console.error("Error logging in", error)
    },
  })

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: initValues,
  })
  const { control, handleSubmit } = form
  const onSubmit = (values: z.infer<typeof loginFormSchema>) => {
    onLoginUser(values)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Form {...form}>
      <div className="flex h-[80vh] w-full items-center justify-center">
        <Card className="flex w-full max-w-4xl overflow-hidden">
          <div className="flex-1 p-6 flex flex-col items-stretch justify-center">
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <FormField
                    control={control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="m@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      to=""
                      className="ml-auto inline-block text-sm underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <div className="relative">
                    <FormField
                      control={control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showPassword ? "text" : "password"}
                                {...field}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={togglePasswordVisibility}
                                aria-label={
                                  showPassword
                                    ? "Hide password"
                                    : "Show password"
                                }
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link to={authPaths.signup} className="underline">
                    Sign up
                  </Link>
                </div>
              </form>
            </CardContent>
          </div>
          <div className="hidden flex-1 md:block">
            <img
              src="https://i.pinimg.com/736x/fe/37/3e/fe373e1d755f8f596ce33829b764e6c0.jpg"
              alt="Login image"
              width={600}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>
        </Card>
      </div>
    </Form>
  )
}
