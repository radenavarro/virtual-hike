import { usePathFinished } from "@/hooks/home/usePathFinished"
import ConfettiAnimation from "../Confetti"
import { useRef } from "react";

export const CheckObjetivo = () => {
  const { success } = usePathFinished();

  const showConfetti = useRef(
    <ConfettiAnimation/>
  ).current

  return (
    <>
      {success === "si" && showConfetti}
    </>
  )
}