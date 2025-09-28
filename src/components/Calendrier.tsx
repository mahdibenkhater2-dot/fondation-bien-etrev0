import * as React from "react"
import { Calendar } from "@/components/ui/calendar"

export default function Calendrier() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <div className="flex flex-col items-center space-y-4">
      <h3 className="text-xl font-semibold text-wellness-sage">
        Choisissez une date
      </h3>

      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border shadow"
      />

      {date && (
        <p className="text-muted-foreground">
          Vous avez choisi :{" "}
          <span className="font-semibold">
            {date.toLocaleDateString("fr-FR")}
          </span>
        </p>
      )}
    </div>
  )
}
