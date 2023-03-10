// Description: This component is the main component of the candidates list page. It contains the main logic of the page and the components that are used in the page.

//components used: CardWrapper, CardImg, CardInfo, Pagination, Switcher
import CardWrapper from "../components/candidatesList/CardWrapper";
import CardImg from "../components/candidatesList/CardImg";
import CardInfo from "../components/candidatesList/CardInfo";
import CardsContainer from "../components/candidatesList/CardsContainer";
import Pagination from "../components/candidatesList/Pagination";
import Switcher from "../components/candidatesList/Switcher";
import ButtonClear from "../components/candidatesList/ButtonClear";

//import classes from "./CandidateList.module.css";
import classes from "./CandidateList.module.css";

//hooks
import { useState, useEffect } from "react";

function CandidateList() {
  const [selectedOrder, setSelectedOrder] = useState("default"); //to keep the selected option in the select
  const [order, setOrder] = useState("default");
  const [candidates, setCandidates] = useState([]); // principal state
  // const [loading, setLoading] = useState(false); //loading to be used with spinner
  const [currentPage, setCurrentPage] = useState(1); //pagination
  const [candidatesPerPage /*setCandidatesPerPage*/] = useState(12); //number of candidates per page

  //making the fetch request
  useEffect(() => {
    window.scrollTo(0, 0); //to send the user back to the top of the page
    const fetchCandidates = async () => {
      // setLoading(true);
      const res = await fetch(
        "https://codejob.nel386.repl.co/candidate/all-candidates",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token":
              /*sessionStorage.token*/
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJpZCI6IjYzZjQ3NjY4MGEwMmU0NTJlMThjMzJiNCIsImVtYWlsIjoiZW1wbG95ZXJAZXhhbXBsZS5jb20iLCJyb2xlIjoiZW1wbG95ZXIifSwiaWF0IjoxNjc4NDUxMDMxLCJleHAiOjE2Nzg0NTIyMzF9.DU2-7qKMeEE_8rNZlGLccmwBGeJjmcjp4Un-ZrXzce8",
          },
        }
      );
      const info = await res.json();
      if (order === "desc") {
        info.data.sort((a, b) => {
          return new Date(b.registerAt) - new Date(a.registerAt);
        });
      } else if (order === "asc") {
        info.data.sort((a, b) => {
          return new Date(a.registerAt) - new Date(b.registerAt);
        });
      }
      setCandidates(info.data);
      // setLoading(false);
    };
    fetchCandidates();
  }, [currentPage, order]);

  // console.log(candidates);

  //get current candidates
  const indexOfLastCandidate = currentPage * candidatesPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
  const currentCandidates = candidates.slice(
    indexOfFirstCandidate,
    indexOfLastCandidate
  );
  const totalPages = Math.ceil(candidates.length / candidatesPerPage);
  //console.log(currentCandidates);

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

  //handle button clear
  const handlerClear = (e) => {
    setCurrentPage(1); //to send the user back to the first page
    setSelectedOrder("default");
    setOrder("default");
  };

  //handle select
  const handlerSelect = (e) => {
    if (e.target.value === "desc") {
      setOrder("desc");
    } else if (e.target.value === "asc") {
      setOrder("asc");
    } else {
      setOrder("default");
    }
    setCurrentPage(1); //to send the user back to the first page
    setSelectedOrder(); // to reset the selected option in the select
  };

  return (
    <>
      <CardsContainer>
        <div className={classes["top-filters"]}>
          <div className={classes.switcher}>
            <div className={classes["showing-result"]}></div>
            <div className={classes["sort-by"]}>
              {/* <button
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
              </button> */}
              <ButtonClear

                handlerClear={handlerClear}
                order={order}
              />
              <Switcher
                value={selectedOrder}
                handlerSelect={handlerSelect}
                selectedOrder={selectedOrder}
              />
            </div>
          </div>
        </div>
        {currentCandidates?.map((candidate) => {
          return (
            <CardWrapper
              key={candidate._id}
              candidates={candidate} /*loading={loading}*/
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
  );
}
export default CandidateList;
