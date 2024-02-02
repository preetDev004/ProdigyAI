import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// stripe needs an absolte path or url to redirect user back to the web page.
export function absoluteUrl(path:string){
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}