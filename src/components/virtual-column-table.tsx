import { flexRender, Table as TableProps } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type Props = {
  table: TableProps<Record<string, unknown>>;
  className?: string;
};
function VirtualColumnTable({ table, className }: Props) {
  const visibleColumns = table.getVisibleLeafColumns();
  //The virtualizers need to know the scrollable container element
  const tableContainerRef = useRef<HTMLDivElement>(null);

  //we are using a slightly different virtualization strategy for columns (compared to virtual rows) in order to support dynamic row heights
  const columnVirtualizer = useVirtualizer<
    HTMLDivElement,
    HTMLTableCellElement
  >({
    count: visibleColumns.length,
    estimateSize: (index) => visibleColumns[index].getSize(), //estimate width of each column for accurate scrollbar dragging
    getScrollElement: () => tableContainerRef.current,
    horizontal: true,
    overscan: 3, //how many columns to render on each side off screen each way (adjust this for performance)
  });

  const virtualColumns = columnVirtualizer.getVirtualItems();

  //different virtualization strategy for columns - instead of absolute and translateY, we add empty columns to the left and right
  let virtualPaddingLeft: number | undefined;
  let virtualPaddingRight: number | undefined;

  if (columnVirtualizer && virtualColumns.length > 0) {
    virtualPaddingLeft = virtualColumns[0].start ?? 0;
    virtualPaddingRight =
      columnVirtualizer.getTotalSize() -
      (virtualColumns[virtualColumns.length - 1].end ?? 0);
  }

  return (
    <div
      ref={tableContainerRef}
      className={cn(
        "relative w-full overflow-x-auto border rounded-md",
        className,
      )}
    >
      <Table className="grid">
        <TableHeader className="grid sticky top-0">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="flex w-full">
              {virtualPaddingLeft ? (
                //fake empty column to the left for virtualization scroll padding
                <th style={{ display: "flex", width: virtualPaddingLeft }} />
              ) : null}
              {virtualColumns.map((virtualColumn) => {
                const header = headerGroup.headers[virtualColumn.index];
                return (
                  <TableHead
                    key={header.id}
                    className={cn("flex justify-start items-center")}
                    style={{
                      width: header.getSize(),
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
              {virtualPaddingRight ? (
                //fake empty column to the right for virtualization scroll padding
                <th style={{ display: "flex", width: virtualPaddingRight }} />
              ) : null}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="grid">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="flex w-full"
              >
                {virtualPaddingLeft ? (
                  //fake empty column to the left for virtualization scroll padding
                  <th style={{ display: "flex", width: virtualPaddingLeft }} />
                ) : null}
                {virtualColumns.map((virtualColumn) => {
                  const cell = row.getVisibleCells()[virtualColumn.index];
                  return (
                    <TableCell
                      key={cell.id}
                      className={cn("flex justify-start items-center")}
                      style={{
                        width: cell.column.getSize(),
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  );
                })}
                {virtualPaddingRight ? (
                  //fake empty column to the right for virtualization scroll padding
                  <th style={{ display: "flex", width: virtualPaddingRight }} />
                ) : null}
              </TableRow>
            ))
          ) : (
            <TableRow className="flex w-full justify-center">
              <TableCell
                colSpan={virtualColumns.length}
                className="h-24 text-center flex items-center text-slate-400"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default VirtualColumnTable;
