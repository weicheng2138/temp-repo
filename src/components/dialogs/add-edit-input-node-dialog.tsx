import { useForm } from "react-hook-form";
import { format, addMinutes, set } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useMemo } from "react";
import { Node } from "@xyflow/react";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useDisclosure } from "@/hooks/use-disclosure";

type Props = {
  children: ReactNode;
  inputNode: Node;
};

export function AddEditEventDialog({ children, inputNode }: Props) {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const isEditing = !!event;

  // const getInitialDates = () => {
  //   if (!startDate)
  //     return { startDate: new Date(), endDate: addMinutes(new Date(), 30) };
  //   const start = startTime
  //     ? set(new Date(startDate), {
  //         hours: startTime.hour,
  //         minutes: startTime.minute,
  //         seconds: 0,
  //       })
  //     : new Date(startDate);
  //   const end = addMinutes(start, 30);
  //   return { startDate: start, endDate: end };
  // };

  // const initialDates = getInitialDates();

  // const parseEventDates = () => {
  //   if (!event) return null;
  //
  //   return {
  //     startDate: new Date(event.startDate),
  //     endDate: new Date(event.endDate),
  //   };
  // };
  //
  // const eventDates = parseEventDates();

  // const onSubmit = (values: TEventFormData) => {
  //   try {
  //     const targetCalendar = calendarOptions.find(
  //       (option) => option.id === values.calendarId,
  //     );
  //     // Format event data for API
  //     const formattedEvent: CalendarEvent = {
  //       ...values,
  //       startDate: format(values.startDate, "yyyy-MM-dd'T'HH:mm:ss"),
  //       endDate: format(values.endDate, "yyyy-MM-dd'T'HH:mm:ss"),
  //       id: isEditing ? event.id : Math.floor(Math.random() * 1000000),
  //       color: values.color,
  //       calendar: targetCalendar || {
  //         id: "",
  //         name: "Default Calendar",
  //         type: "personal",
  //       },
  //     };
  //
  //     if (isEditing) {
  //       updateEvent(formattedEvent);
  //       toast.success("Event updated successfully");
  //     } else {
  //       addEvent(formattedEvent);
  //       toast.success("Event created successfully");
  //     }
  //
  //     onClose();
  //     form.reset();
  //   } catch (error) {
  //     console.error(`Error ${isEditing ? "editing" : "adding"} event:`, error);
  //     toast.error(`Failed to ${isEditing ? "edit" : "add"} event`);
  //   }
  // };

  return (
    <Dialog open={isOpen} onOpenChange={onToggle} modal={false}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? "編輯事件" : "新增事件"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Modify your existing event."
              : "Create a new event for your calendar."}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              取消
            </Button>
          </DialogClose>
          <Button form="event-form" type="submit">
            {isEditing ? "儲存變更" : "建立事件"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
