import classes from "./Pagination.module.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export const Pagination = ({
  candidatesPerPage,
  totalCandidates,
  paginate,
  nextPage,
  prevPage,
  currentPage,
  totalPages,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCandidates / candidatesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={classes.pagination}>
      <ul className={classes.ul}>
        <li
          currentpage={currentPage}
          className={currentPage === 1 ? classes["prev-hidden"] : classes.prev}
          onClick={() => prevPage()}
        >
          <span>
            <FontAwesomeIcon icon={faArrowLeft} />
          </span>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className={classes["number-container"]}>
            <span onClick={() => paginate(number)} className={currentPage === number ? classes["number-active"] :
              classes.number}>
              {number}
            </span>
          </li>
        ))}
        <li
          className={currentPage === totalPages ? classes["prev-hidden"] : classes.prev}
          currentpage={currentPage}
          onClick={() => nextPage()}
        >
          <span>
            <FontAwesomeIcon icon={faArrowRight} />
          </span>
        </li>
      </ul>
    </div>
  );
};
