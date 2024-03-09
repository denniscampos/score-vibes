import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (
  dateString: string,
  timeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone
) => {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone,
  };

  const formattedDateTime = new Intl.DateTimeFormat("en-US", options).format(
    date
  );

  return formattedDateTime;
};
