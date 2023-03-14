// Description: This component is the main component of the candidates list page. It contains the main logic of the page and the components that are used in the page.

//components used: CardWrapper, CardImg, CardInfo, Pagination, Switcher
import CardWrapper from "../components/candidatesList/CardWrapper";
import CardImg from "../components/candidatesList/CardImg";
import CardInfo from "../components/candidatesList/CardInfo";
import CardsContainer from "../components/candidatesList/CardsContainer";
import Pagination from "../components/candidatesList/Pagination";
import Switcher from "../components/candidatesList/Switcher";
import DualRing from "../components/candidatesList/Spinners/DualRing";

//import classes from "./CandidateList.module.css";
import classes from "./CandidateList.module.css";

//hooks
import { useState, useEffect } from "react";

//utils and services
import { paginationUtils } from "../utils/pagination.utils";
import { orderByDate } from "../utils/orderByDate.utils";
import { fetchCandidates } from "../services/fetchCandidates.service";

function CandidateList() {
  const [selectedOrder, setSelectedOrder] = useState("default"); //to keep the selected option in the select
  const [order, setOrder] = useState("default"); //to keep the order of the candidates
  const [candidates, setCandidates] = useState([]); // principal state
  const [currentPage, setCurrentPage] = useState(1); //pagination
  const [candidatesPerPage /*setCandidatesPerPage*/] = useState(12); //number of candidates per page
  const [loading, setLoading] = useState(false); //loading to be used with spinner

  //useEffect to fetch the candidates and sort them
  useEffect(() => {
    window.scrollTo(0, 0); //to send the user back to the top of the page
    setLoading(true);
    candidatesList();
  }, [currentPage, order]);

  //sorting the candidates by register date
  const candidatesList = async () => {
    //setLoading(true);
    const { info } = await fetchCandidates();
    const sortedCandidates = orderByDate(info, order);
    setCandidates(sortedCandidates);
    setLoading(false);
  };

  //pagination
  const { currentCandidates, totalPages } = paginationUtils(
    currentPage,
    candidatesPerPage,
    candidates
  );

  //change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //change page from arrow buttons
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  //handler select
  const handlerSelect = (e) => {
    if (e.target.value === "desc") {
      setOrder("desc");
      setSelectedOrder("desc");
    } else if (e.target.value === "asc") {
      setOrder("asc");
      setSelectedOrder("asc");
    } else {
      setOrder("default");
      setSelectedOrder("default");
    }
    setCurrentPage(1); //to send the user back to the first page
  };

  return (
    <>
      {loading ? (
        <DualRing />
      ) : (
        <>
          <CardsContainer>
            <div className={classes["top-filters"]}>
              <div className={classes.switcher}>
                <div className={classes["showing-result"]}></div>
                <div className={classes["sort-by"]}>
                  <button
                    className={
                      order === "desc" || order === "asc"
                        ? classes["btn-clear"]
                        : classes["btn-clear-disabled"]
                    }
                    onClick={(e) => {
                      setCurrentPage(1); //to send the user back to the first page
                      setSelectedOrder("default");
                      setOrder("default");
                    }}
                  >
                    Clear All
                  </button>
                  <Switcher
                    value={selectedOrder}
                    handlerSelect={handlerSelect}
                    selectedOrder={selectedOrder}
                    order={order}
                  />
                </div>
              </div>
            </div>
            {currentCandidates.map((candidate, key) => {
              return (
                <CardWrapper
                  key={key}
                  candidates={candidate}
                >
                  <CardImg candidate={candidate} />
                  <CardInfo candidate={candidate} />
                </CardWrapper>
              );
            })}
          </CardsContainer>
          <Pagination
            candidatesPerPage={candidatesPerPage}
            totalCandidates={candidates.length}
            paginate={paginate}
            nextPage={nextPage}
            prevPage={prevPage}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </>
      )}
    </>
  );
}
export default CandidateList;
