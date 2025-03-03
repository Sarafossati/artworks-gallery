import { JSX, useState } from "react"
import { IPaginationProps } from "./pagination.interface"
import { ReactComponent as ChevronRight } from "../../icons/chevron_forward.svg";
import { ReactComponent as ChevronLeft } from "../../icons/chevron_backward.svg";
import './pagination.style.scss';

const Pagination = ({ totalPages, handleChangePage }: IPaginationProps): JSX.Element => {
    const [currentPage, setCurrentPage] = useState<number>(1);
  
    const changePage = (newPage: number) => {
      setCurrentPage(newPage);
      handleChangePage?.(newPage);
    };
  
    if (totalPages === 0) return <></>;
    return (
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => changePage(currentPage - 1)}
          className="pagination__buttons"
        >
          <ChevronLeft className="chevron-left" />
          <span>Back</span>
        </button>
  
        <div className="pagination__pages">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={page === currentPage ? "active" : ""}
              onClick={() => changePage(page)}
            >
              {page}
            </button>
          ))}
        </div>
  
        <button
          disabled={currentPage === totalPages}
          onClick={() => changePage(currentPage + 1)}
          className="pagination__buttons"
        >
          <span>Next</span>
          <ChevronRight className="chevron-right" />
        </button>
      </div>
    );
  };
  

export default Pagination