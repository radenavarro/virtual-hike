import { useState } from "react"
import { usePathActive } from "./usePathActive"

export const usePathFinished = () => {
  const [success, setSuccess] = useState(false)
  const [status, setStatus] = useState<"pending" | "in progress" | "finished">("in progress")

  const { rutaActiva } = usePathActive()

  return { status, success }
}