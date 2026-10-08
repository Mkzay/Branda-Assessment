type ButtonVariant = 'primary' | 'outline' | 'dark';
const variants: Record<ButtonVariant, string> = {
  primary: 'border-transparent bg-brand text-white hover:bg-brand-dark',
  outline: 'border-line bg-white text-ink hover:border-ink',
  dark: 'border-transparent bg-ink text-white hover:bg-green',
};
export function buttonClass(variant: ButtonVariant = 'primary') {
  return `button inline-flex min-h-12 items-center justify-center gap-2.5 whitespace-nowrap rounded-full border px-[23px] py-[15px] font-bold transition-[background-color,color,transform] duration-150 ease-out active:scale-[.97] disabled:cursor-default disabled:opacity-45 motion-reduce:transition-none ${variants[variant]}`;
}
