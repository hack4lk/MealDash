import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useNavigate } from 'react-router-dom'
import { loginWithEmail } from '@/lib/auth/login' // tu función que hace signInWithEmailAndPassword
import { useAuth } from '@/contexts/AuthProvider'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  )
  const [errorMessage, setErrorMessage] = useState('')
  useEffect(() => {
    if (user) {
      navigate('/predict')
    }
  }, [user, navigate])

  function validate() {
    const newErrors: typeof errors = {}
    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Enter a valid email'
    }
    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    return newErrors
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrorMessage('')
    const validationErrors = validate()
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    try {
      await loginWithEmail(email, password)
      navigate('/predict')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.code === 'auth/invalid-credential') {
        return toast.error('Invalid email or password.')
      }
      toast('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/background_image.png')`,
        }}
      />
      <div className="absolute inset-0 bg-black/60" />
      <Card className="relative z-10 w-full max-w-md bg-black/40 backdrop-blur-sm border-white/20 shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold text-white">
            Welcome Back
          </CardTitle>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </CardHeader>
        <CardContent className="space-y-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/90 font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40 focus:ring-white/20"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/90 font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40 focus:ring-white/20"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-red-500 hover:bg-white/90 font-semibold py-2.5 transition-colors text-white"
            >
              Login
            </Button>
            <div className="flex items-center justify-center mt-0 text-white gap-1">
              Don't have an account?{' '}
              <span
                onClick={() => navigate('/register')}
                className="underline cursor-pointer"
              >
                Register here
              </span>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
