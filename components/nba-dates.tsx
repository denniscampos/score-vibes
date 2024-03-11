"use client";

import { formatDate } from "@/lib/utils";

interface NBADatesProps {
  gameDate: string;
}

export function NBADates({ gameDate }: NBADatesProps) {
  return <p className="text-sm font-semibold">{formatDate(gameDate)}</p>;
}
