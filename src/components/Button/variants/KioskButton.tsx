import { ButtonColorType } from '../button.types'
import { buttonColors, DEFAULT_BUTTON_COLOR } from '../buttonStyles'

interface ButtonProps {
  label: string
  color?: ButtonColorType
  disabled?: boolean
  fullWidth?: boolean
  onClick: () => void
}

export const KioskButton = ({
  label,
  color = DEFAULT_BUTTON_COLOR,
  onClick,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={`text-2xl py-6 text-white w-full flex justify-center font-semibold disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed ${buttonColors[color]}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span>{label}</span>
    </button>
  )
}
