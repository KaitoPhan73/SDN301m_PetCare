"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

type PaginationProps = {
  totalPage: number;
  page: number;
};

const PaginationFilter = ({ totalPage, page }: PaginationProps) => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);

    // Update the page parameter
    params.set("page", newPage.toString());

    // Update the URL
    replace(`${pathname}?${params.toString()}`);
  };

  // Generate pagination items based on totalPage
  const generatePaginationItems = () => {
    const items = [];
    for (let i = 1; i <= totalPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={i === page}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return items;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => handlePageChange(Math.max(page - 1, 1))}
          />
        </PaginationItem>
        {generatePaginationItems()}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => handlePageChange(Math.min(page + 1, totalPage))}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationFilter;
