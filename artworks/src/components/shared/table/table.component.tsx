import { JSX, useState } from "react";
import { ReactComponent as ChevronRight } from "../../icons/chevron_forward.svg";
import { ITableProps } from "./table.interface";
import "./table.style.scss";
import Pagination from "../pagination/pagination.component";

const Table = ({
  data,
  hasPagination,
  handleArrowClick,
}: ITableProps): JSX.Element => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState<number>(1)

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleData = data.slice(startIndex, endIndex);

  return (
    <div>
      <table className="table">
        <tbody>
          {visibleData?.map((el) => (
            <tr key={el.id} className="table__row" onClick={() => handleArrowClick?.(el.id)} >
              <td>{el.title}</td>
              <td>
                <button
                  onClick={() => handleArrowClick?.(el.id)}
                  className="table__chevron"
                >
                  <ChevronRight className="chevron-right" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {visibleData && hasPagination &&  (
        <Pagination totalPages={totalPages} handleChangePage={setCurrentPage}/>
      )}
    </div>
  );
};

export default Table;
