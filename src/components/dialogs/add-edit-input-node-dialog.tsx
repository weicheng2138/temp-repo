import { ReactNode, useEffect, useId, useMemo, useState } from "react";
import { Node, useNodeId, useReactFlow, useNodesData } from "@xyflow/react";
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
import { useDisclosure } from "@/hooks/use-disclosure";
import { unknown, z, ZodError, ZodOptional, ZodTypeAny } from "zod";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ListMinus, ListPlus, Loader } from "lucide-react";
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
import { Switch } from "@/components/ui/switch";
import { DropdownMenu } from "@/components/ui/dropdown-menu";

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

const productNamesOptions: Option[] = Array(2000)
  .fill(0)
  .map((_, index) => {
    if (index % 3 === 0) {
      return {
        label: "PRCT_TTO_" + index,
        value: "PRCT_TTO_" + index,
      };
    }
    if (index % 3 === 1) {
      return {
        label: "PRCT_KKE_" + index,
        value: "PRCT_KKE_" + index,
      };
    }
    return {
      label: "PRCT_CCL_" + index,
      value: "PRCT_CCL_" + index,
    };
  });
const initialVersion = ["20240612", "20250103", "20250505"];

const inputNodeSchema = z.object({
  // name: z.string().min(1),
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
type InputInfoData = z.infer<typeof inputNodeSchema>;

type Props = {
  children?: ReactNode;
  dropdownNode?: ReactNode;
  mode: "add" | "edit";
};

export function AddEditInputNodeDialog({
  children,
  dropdownNode,
  mode,
}: Props) {
  const trigger = dropdownNode || children;
  if (!trigger) {
    throw "[add-edit-input-node-dialog]: There is no trigger component pass in";
  }

  const { isOpen, onClose, onToggle } = useDisclosure();
  const formId = useId();
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [currentVersion, setCurrentVersion] = useState("");
  const [currentProductNames, setCurrentProductNames] = useState<Option[]>([]);
  const id = useNodeId();
  const { updateNodeData, getNode } = useReactFlow();

  const form = useForm({
    defaultValues: {
      // name: inputNode ? (inputNode.data["label"] as string) : "",
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
      if (id) {
        updateNodeData(id, value);
      }
      onClose();
    },
  });
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

  const handleOpenChanged = (open: boolean) => {
    form.reset();
    onToggle();
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setIsSelectAll(checked);
      setCurrentProductNames([]);
      return;
    }
    setIsSelectAll(false);
  };

  const canAdd = useMemo(() => {
    if (currentVersion === "") {
      return false;
    }
    if (isSelectAll) {
      return true;
    }
    return currentProductNames.length > 0;
  }, [isSelectAll, currentVersion, currentProductNames]);

  useEffect(() => {
    if (mode === "edit" && id) {
      const node = getNode(id);
      if (!node) {
        return;
      }
      const parsedData = inputNodeSchema.safeParse(node.data);
      if (!parsedData.success) {
        return;
      }
      form.setFieldValue("inputProperties", parsedData.data.inputProperties);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChanged}>
      {dropdownNode ? (
        dropdownNode
      ) : (
        <DialogTrigger asChild>{children}</DialogTrigger>
      )}
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Edit Input Node" : "Add Input Node"}
          </DialogTitle>
          <DialogDescription>
            {mode === "edit"
              ? "Modify your existing input node"
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
            {/* <form.Field */}
            {/*   name="name" */}
            {/*   children={(field) => { */}
            {/*     return ( */}
            {/*       <div className="flex flex-col col-span-2"> */}
            {/*         <Label className="pb-1" htmlFor={field.name}> */}
            {/*           Name */}
            {/*           {requiredFields.includes(field.name) && ( */}
            {/*             <span className="text-destructive">*</span> */}
            {/*           )} */}
            {/*         </Label> */}
            {/*         <Input */}
            {/*           id={field.name} */}
            {/*           isValid={ */}
            {/*             !field.state.meta.isTouched || field.state.meta.isValid */}
            {/*           } */}
            {/*           placeholder="Name" */}
            {/*           value={field.state.value} */}
            {/*           onChange={(e) => field.handleChange(e.target.value)} */}
            {/*         /> */}
            {/*         <FieldInfo field={field} /> */}
            {/*       </div> */}
            {/*     ); */}
            {/*   }} */}
            {/* /> */}

            <form.Field
              name="inputProperties"
              children={(field) => {
                return (
                  <div className="flex flex-col col-span-2 gap-1">
                    <Label className="pb-1" htmlFor={field.name}>
                      Version & Product Names
                      {requiredFields.includes(field.name) && (
                        <span className="text-destructive">*</span>
                      )}
                    </Label>
                    <section className="flex gap-1 items-center">
                      <Button
                        variant="secondary"
                        disabled={!canAdd}
                        onClick={() => {
                          field.pushValue({
                            version: currentVersion,
                            productNames: currentProductNames,
                          });
                          setCurrentProductNames([]);
                          setCurrentVersion("");
                          setIsSelectAll(false);
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
                        disabled={isSelectAll || currentVersion === ""}
                        isVirtualized
                        value={currentProductNames}
                        onChange={(options) => setCurrentProductNames(options)}
                        loadingIndicator={
                          <div className="flex w-full justify-center">
                            <Loader className="animate-spin my-3" />
                          </div>
                        }
                        commandProps={{
                          label: "Select Product Names",
                        }}
                        options={productNamesOptions}
                        placeholder="Select Product Names"
                        emptyIndicator={
                          <p className="text-center text-sm">
                            No results found
                          </p>
                        }
                      />
                    </section>

                    <Label
                      htmlFor="select-all-switch"
                      className="flex flex-row items-center justify-between rounded-lg border p-3 gap-2 hover:cursor-pointer hover:border-ring"
                    >
                      <div className="flex flex-col gap-1">
                        <span>Select All Products</span>
                        <p className="text-muted-foreground text-sm">
                          You will select all products in this version for this
                          master process
                        </p>
                      </div>
                      <Switch
                        id="select-all-switch"
                        checked={isSelectAll}
                        onCheckedChange={(checked) => handleSelectAll(checked)}
                      />
                    </Label>
                    <ScrollArea
                      className="h-40 w-full rounded-md border"
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
                                  {el.productNames.length > 0
                                    ? el.productNames
                                        .map((option) => option.value)
                                        .join(", ")
                                    : "ALL"}
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
                  </div>
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
                  {mode === "edit" ? "Save Changes" : "Create"}
                </Button>
              </>
            )}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
