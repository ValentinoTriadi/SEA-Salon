import { Separator } from "../ui/separator";

interface ReservationDetailProps {
  userId: string;
}

export const ReservationDetail = ({userId} : ReservationDetailProps) => {
  return (
    <div className="w-full lg:pt-15 md:pt-10 pt-5">
      <div className="flex flex-col w-fit gap-2">
        <h1 className="text-xl md:text-2xl xl:text-4xl font-semibold text-start text-primary-foreground">Reservation Detail</h1>
        <Separator className="h-1 bg-accent rounded-md"/>
      </div>
      
    </div>
  )
}