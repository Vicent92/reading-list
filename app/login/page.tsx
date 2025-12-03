import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LoginForm } from "@/components/login-form"
import { BookOpen, ArrowLeft } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="container mx-auto px-4 py-8 max-w-md">

        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Mi Lista de Lectura</h1>
          </div>
          <p className="text-muted-foreground">Accede a tu cuenta para continuar</p>
        </div>

        <LoginForm />

        <div className="mt-6 text-center">
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio
            </Button>
          </Link>
        </div>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>¿No tienes una cuenta? <Link href="/registro" className="text-primary hover:underline">Regístrate aquí</Link></p>
        </div>
      </div>
    </div>
  )
}
