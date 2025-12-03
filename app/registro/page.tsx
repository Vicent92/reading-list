import Link from "next/link"
import { Button } from "@/components/ui/button"
import { RegisterForm } from "@/components/register-form"
import { BookOpen, ArrowLeft } from "lucide-react"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="container mx-auto px-4 py-8 max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Mi Lista de Lectura</h1>
          </div>
          <p className="text-muted-foreground">Crea tu cuenta y comienza a guardar artículos</p>
        </div>

        {/* Register Form */}
        <RegisterForm />

        {/* Back to Login */}
        <div className="mt-6 text-center">
          <Link href="/login">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio de sesión
            </Button>
          </Link>
        </div>

        {/* Additional Links */}
        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>¿Ya tienes una cuenta? <Link href="/login" className="text-primary hover:underline">Inicia sesión aquí</Link></p>
        </div>
      </div>
    </div>
  )
}
