import { ReactNode, useId, useMemo, useState } from "react";
import { Node } from "@xyflow/react";
import { toast } from "sonner";
import { AnyFieldApi, useForm, useStore } from "@tanstack/react-form";
import MultipleSelector, { Option } from "@/components/ui/multiselect";

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
import { unknown, z, ZodError, ZodOptional, ZodTypeAny } from "zod";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ListMinus, ListPlus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { version } from "react-dom";

function FieldInfo({ field }: { field: AnyFieldApi }) {
  const zodErrors = field.state.meta.errors as ZodError[];
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em className="text-red-400 text-xs">
          {zodErrors.map((error) => error.message).join(",")}
        </em>
      ) : (
        <span className="text-xs invisible">spear</span>
      )}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

const productNamesOptions: Option[] = [
  {
    label: "PRCT_243",
    value: "PRCT_243",
  },
  { label: "PRCT_244", value: "PRCT_244" },
  { label: "PRCT_245", value: "PRCT_245" },
];
const initialVersion = ["20240612", "20250103", "20250505"];

const inputNodeSchema = z.object({
  version: z.string().min(1, "At least pick one"),
  age: z.number().int().positive(),
  name: z.string(),
  inputProperties: z
    .array(
      z.object({
        version: z.string(),
        productNames: z.array(
          z.object({
            label: z.string(),
            value: z.string(),
          }),
        ),
      }),
    )
    .min(1),
});
type Props = {
  children: ReactNode;
  inputNode?: Node;
};

export function AddEditTestDialog({ children, inputNode }: Props) {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const isEditing = !!inputNode;
  const formId = useId();
  const [currentVersion, setCurrentVersion] = useState("");
  const [currentProductNames, setCurrentProductNames] = useState<Option[]>([]);

  const form = useForm({
    defaultValues: {
      version: "",
      age: NaN,
      name: "",
      inputProperties: [] as {
        version: string;
        productNames: Option[];
      }[],
    } satisfies z.infer<typeof inputNodeSchema>,
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
  const inputProperties = useStore(
    form.store,
    (state) => state.values.inputProperties,
  );
  const requiredFields = useMemo(() => {
    const paredResult = inputNodeSchema.safeParse(form.state.values);
    if (paredResult.success) {
      return [];
    }
    // Currently only deal with the first level field
    return paredResult.error.issues.map((error) => error.path[0]);
  }, []);
  const versionOptions = useMemo(() => {
    const restrictVersions = inputProperties.map((el) => el.version);
    return initialVersion.filter(
      (version) => !restrictVersions.includes(version),
    );
  }, [inputProperties]);

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
      <DialogContent className="sm:max-w-2xl">
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
          id={formId}
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className="grid grid-cols-2 gap-1">
            <form.Field
              name="version"
              children={(field) => {
                return (
                  <div className="flex flex-col">
                    <Label className="pb-1" htmlFor={field.name}>
                      Version
                      {requiredFields.includes(field.name) && (
                        <span className="text-destructive">*</span>
                      )}
                    </Label>
                    <Select
                      value={field.state.value}
                      onValueChange={(value) => field.handleChange(value)}
                    >
                      <SelectTrigger
                        className="w-full"
                        id={field.name}
                        isValid={
                          !field.state.meta.isTouched ||
                          field.state.meta.isValid
                        }
                      >
                        <SelectValue placeholder={"Version"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>{"version"}</SelectLabel>
                          {versionOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FieldInfo field={field} />
                  </div>
                );
              }}
            />
            <form.Field
              name="age"
              children={(field) => {
                return (
                  <div className="flex flex-col">
                    <Label className="pb-1" htmlFor={field.name}>
                      Age
                      {requiredFields.includes(field.name) && (
                        <span className="text-destructive">*</span>
                      )}
                    </Label>
                    <Input
                      id={field.name}
                      isValid={
                        !field.state.meta.isTouched || field.state.meta.isValid
                      }
                      type="number"
                      placeholder="Age"
                      value={isNaN(field.state.value) ? "" : field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                    />
                    <FieldInfo field={field} />
                  </div>
                );
              }}
            />

            <form.Field
              name="name"
              children={(field) => {
                return (
                  <div className="flex flex-col col-span-2">
                    <Label className="pb-1" htmlFor={field.name}>
                      Name
                      {requiredFields.includes(field.name) && (
                        <span className="text-destructive">*</span>
                      )}
                    </Label>
                    <Input
                      id={field.name}
                      isValid={
                        !field.state.meta.isTouched || field.state.meta.isValid
                      }
                      placeholder="Name"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldInfo field={field} />
                  </div>
                );
              }}
            />

            <form.Field
              name="inputProperties"
              children={(field) => {
                return (
                  <>
                    <section className="flex gap-1 col-span-2">
                      <Button
                        variant="secondary"
                        disabled={
                          currentVersion === "" ||
                          currentProductNames.length === 0
                        }
                        onClick={() => {
                          field.pushValue({
                            version: currentVersion,
                            productNames: currentProductNames,
                          });
                          setCurrentProductNames([]);
                          setCurrentVersion("");
                        }}
                      >
                        <ListPlus />
                        Add
                      </Button>
                      <Select
                        value={currentVersion}
                        onValueChange={(value) => setCurrentVersion(value)}
                      >
                        <SelectTrigger className="w-1/3">
                          <SelectValue placeholder={"Version"} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>{"version"}</SelectLabel>
                            {versionOptions.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>

                      <MultipleSelector
                        className="w-full"
                        value={currentProductNames}
                        onChange={(options) => setCurrentProductNames(options)}
                        commandProps={{
                          label: "Select frameworks",
                        }}
                        defaultOptions={productNamesOptions}
                        placeholder="Select frameworks"
                        emptyIndicator={
                          <p className="text-center text-sm">
                            No results found
                          </p>
                        }
                      />
                    </section>

                    <ScrollArea
                      className="h-40 w-full rounded-md border col-span-2"
                      isValid={
                        !field.state.meta.isTouched || field.state.meta.isValid
                      }
                    >
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Action</TableHead>
                            <TableHead>Version</TableHead>
                            <TableHead>Product Names</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {field.state.value.map((el, index) => {
                            return (
                              <TableRow key={el.version}>
                                <TableCell>
                                  <Button
                                    variant="delete"
                                    size="icon"
                                    onClick={() => {
                                      field.removeValue(index);
                                    }}
                                  >
                                    <ListMinus />
                                  </Button>
                                </TableCell>
                                <TableCell>{el.version}</TableCell>
                                <TableCell>
                                  {el.productNames
                                    .map((option) => option.value)
                                    .join(", ")}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                          {field.state.value.length === 0 && (
                            <TableRow>
                              <TableCell colSpan={3}>
                                <div className="flex justify-center text-foreground/50">
                                  Empty
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                    <FieldInfo field={field} />
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
                  form={formId}
                  disabled={!canSubmit}
                  // onClick={() => form.handleSubmit()}
                >
                  {isEditing ? "Save Changes" : "Create"}
                </Button>
              </>
            )}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
