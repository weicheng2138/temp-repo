import { useRef, Fragment } from "react";
import { cn } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useVirtualizer } from "@tanstack/react-virtual";

export const Route = createFileRoute("/_authenticated/modified-virtual-table")({
  component: RouteComponent,
});

const row = new Array(1000)
  .fill(true)
  .map((el, index) => (index % 3 == 0 ? "Three" : "NOOO"));
const columns = new Array(1000)
  .fill(true)
  .map((_el, index) => "Header" + index);
const data = gernerateData();
function gernerateData() {
  const result = [];
  for (let i = 0; i < 1000; i++) {
    result.push([...row]);
  }
  return result;
}

function RouteComponent() {
  // console.log(data, columns);
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (i) => 50,
    overscan: 5,
  });

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: columns.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (i) => 100,
    overscan: 5,
  });

  return (
    <div>
      <p>Hello "/_authenticated/modified-virtual-table"!</p>
      <div ref={parentRef} className="overflow-auto w-[300px] h-[300px]">
        <div
          className={cn(`h-full relative`)}
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: `${columnVirtualizer.getTotalSize()}px`,
          }}
        >
          {/* {columnVirtualizer.getVirtualItems().map((header) => ( */}
          {/*   <div */}
          {/*     key={header.index} */}
          {/*     className={cn(`absolute top-0 left-0 h-full`)} */}
          {/*     style={{ */}
          {/*       width: `${header.size}px`, */}
          {/*       transform: `translateX(${header.start}px)`, */}
          {/*     }} */}
          {/*   > */}
          {/*     {columns[header.index]} */}
          {/*   </div> */}
          {/* ))} */}

          {rowVirtualizer.getVirtualItems().map((virtualRow) => (
            <Fragment key={virtualRow.index}>
              {columnVirtualizer.getVirtualItems().map((virtualColumn) => (
                <div
                  key={virtualColumn.index}
                  className={
                    virtualColumn.index % 2
                      ? virtualRow.index % 2 === 0
                        ? "ListItemOdd"
                        : "ListItemEven"
                      : virtualRow.index % 2
                        ? "ListItemOdd"
                        : "ListItemEven"
                  }
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: `${virtualColumn.size}px`,
                    height: `${virtualRow.size}px`,
                    transform: `translateX(${virtualColumn.start}px) translateY(${virtualRow.start}px)`,
                  }}
                >
                  Cell {data[virtualRow.index][virtualColumn.index]}
                </div>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
      <Table>
        <TableHeader></TableHeader>
        <TableBody>
          {/* {data.map((row, index) => ( */}
          {/*   <TableRow key={index}> */}
          {/*     {row.map((cell, cellIndex) => ( */}
          {/*       <TableCell key={cellIndex + "row" + index}>{cell}</TableCell> */}
          {/*     ))} */}
          {/*   </TableRow> */}
          {/* ))} */}
        </TableBody>
      </Table>
    </div>
  );
}
