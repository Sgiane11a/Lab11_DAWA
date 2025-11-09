import { redirect } from "next/navigation";

export default function Home() {
  // Redirige la raíz al dashboard para que al abrir el proyecto se muestre directamente
  redirect("/dashboard");
}
