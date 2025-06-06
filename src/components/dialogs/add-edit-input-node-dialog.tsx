import { format, addMinutes, set } from "date-fns";
import { ReactNode, useMemo } from "react";
import { Node } from "@xyflow/react";
import { toast } from "sonner";
import { useForm, useStore } from "@tanstack/react-form";

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
  DialogOverlay,
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
import { z } from "zod";
import { Label } from "../ui/label";

const inputNodeSchema = z.object({
  version: z.string().min(1),
  // productNames: z.array(z.string().min(1)).min(1),
});
type Props = {
  children: ReactNode;
  inputNode?: Node;
};

export function AddEditInputNodeDialog({ children, inputNode }: Props) {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const isEditing = !!inputNode;

  const form = useForm({
    defaultValues: {
      version: "",
      // productNames: [] as string[],
    },
    validators: {
      onChange: inputNodeSchema,
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value);
      onClose();
    },
  });
  const version = useStore(form.store, (state) => state.values.version);

  const handleOpenChanged = () => {
    form.reset();
    onToggle();
  };

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
    <Dialog open={isOpen} onOpenChange={handleOpenChanged}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Input Node" : "Add Input Node"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Modify your existing input node -> " + inputNode.data["value"]
              : "Create a new input node."}
          </DialogDescription>
        </DialogHeader>

        <form
          id="input-node-form"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div>
            <form.Field
              name="version"
              children={(field) => {
                return (
                  <>
                    <Select
                      value={field.state.value}
                      onValueChange={(value) => field.handleChange(value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={"Version"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>{"version"}</SelectLabel>
                          {["20240612", "20250103"].map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </>
                );
              }}
            />
          </div>
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <>
                <Button
                  type="submit"
                  form="input-node-form"
                  disabled={!canSubmit}
                  // onClick={() => form.handleSubmit()}
                >
                  {isEditing ? "儲存變更" : "建立"}
                </Button>
              </>
            )}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
