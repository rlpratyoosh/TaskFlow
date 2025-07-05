"use client";

type CheckboxButtonProps = {
  checked: boolean;
  onToggle: () => void;
};

export default function CheckboxButton({ checked, onToggle }: CheckboxButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`w-6 h-6 flex items-center justify-center rounded-md border-2 ${
        checked ? "bg-[var(--success)] border-[var(--success)]" : "border-gray-400"
      }`}
      aria-pressed={checked}
      aria-label="Toggle Complete"
    >
      {checked && (
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      )}
    </button>
  );
}