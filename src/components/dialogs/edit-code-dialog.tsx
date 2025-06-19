import { ReactNode, useId, useMemo, useState } from "react";
import { Node, useNodeId, useReactFlow } from "@xyflow/react";
import { AnyFieldApi, useForm, useStore } from "@tanstack/react-form";

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
import { z, ZodError } from "zod";
import CodeEditor from "@/components/code-editor";

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

const inputSchema = z.object({
  code: z.string(),
});
type Props = {
  children: ReactNode;
  inputNode?: Node;
};

export function EditCodeDialog({ children }: Props) {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const formId = useId();
  const id = useNodeId();
  const { updateNode, getNode } = useReactFlow();
  const data = id ? getNode(id)?.data : null;

  const form = useForm({
    defaultValues: {
      code: data ? atob(data["code"] as string) : "",
    } satisfies z.infer<typeof inputSchema>,
    validators: {
      onChange: inputSchema,
    },
    onSubmit: async ({ value }) => {
      if (id) {
        updateNode(id, (node) => {
          return {
            ...node,
            data: {
              ...node.data,
              code: btoa(value.code),
            },
          };
        });
        onClose();
      } else {
        console.error("There is no node id to update...");
      }
    },
  });

  const handleOpenChanged = () => {
    form.reset();
    onToggle();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChanged}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{"Edit Code"}</DialogTitle>
          <DialogDescription>
            {"Edit the logic for the calculation"}
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
          <div className="flex flex-col gap-1">
            <form.Field
              name="code"
              children={(field) => {
                return (
                  <div className="flex flex-col">
                    <CodeEditor
                      code={field.state.value}
                      onChange={(value) => field.handleChange(value ?? "")}
                    />
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
                  {"Save Changes"}
                </Button>
              </>
            )}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
