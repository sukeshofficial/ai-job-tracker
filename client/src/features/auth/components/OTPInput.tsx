import React, { memo, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

const OTP_LENGTH = 6;

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const OTPInput: React.FC<OTPInputProps> = ({
  value = "",
  onChange = () => { },
  disabled = false,
}) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const otpInputs = Array.from({ length: OTP_LENGTH });

  const focusInput = useCallback((index: number) => {
    inputsRef.current[index]?.focus();
  }, []);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const inputValue = event.target.value;
    if (!/^\d*$/.test(inputValue)) return;

    const updatedValue = value.padEnd(OTP_LENGTH, "").split("");
    updatedValue[index] = inputValue.slice(-1);

    onChange(updatedValue.join("").trim());

    if (inputValue && index < OTP_LENGTH - 1) {
      focusInput(index + 1);
    }
  }, [focusInput, onChange, value]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === "Backspace" && !value[index] && index > 0) {
      focusInput(index - 1);
    }
  }, [focusInput, value]);

  const handlePaste = useCallback((event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const pastedValue = event.clipboardData.getData("text").slice(0, OTP_LENGTH);
    if (!/^\d+$/.test(pastedValue)) return;

    onChange(pastedValue);
    focusInput(Math.min(pastedValue.length, OTP_LENGTH - 1));
  }, [focusInput, onChange]);

  return (
    <div
      role="group"
      aria-label="One-time password input"
      className="flex justify-between gap-2 md:gap-4"
      onPaste={handlePaste}
    >
      {otpInputs.map((_, index) => {
        const inputValue = value[index] || "";
        return (
          <input
            key={index}
            ref={(el) => { inputsRef.current[index] = el; }}
            type="text"
            maxLength={1}
            disabled={disabled}
            value={inputValue}
            inputMode="numeric"
            autoComplete="one-time-code"
            className={cn(
              "h-14 w-12 rounded-xl border border-zinc-800 bg-zinc-950/50 text-center text-2xl font-bold text-white outline-none transition-all duration-300 focus:border-indigo-500 focus:bg-zinc-950 focus:ring-4 focus:ring-indigo-500/10",
              disabled && "cursor-not-allowed opacity-50",
              inputValue && "border-indigo-500/50 bg-zinc-950"
            )}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        );
      })}
    </div>
  );
};

export default memo(OTPInput);
