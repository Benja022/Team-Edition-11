import CardWrapper from "./CardWrapper";
import CardImg from "./CardImg";
import CardInfo from "./CardInfo";
import CardsContainer from "./CardsContainer";
import { Pagination } from "./Pagination";
import { useState, useEffect } from "react";
import classes from "./CandidateList.module.css";

function CandidateList() {
  const [order, setOrder] = useState("default");
  const [candidates, setCandidates] = useState([]); // principal state
  // const [loading, setLoading] = useState(false); //loading to be used with spinner
  const [currentPage, setCurrentPage] = useState(1); //pagination
  const [candidatesPerPage /*setCandidatesPerPage*/] = useState(12); //number of candidates per page

  // sessionStorage.token =
  //   "https://codejob.nel386.repl.co/candidate/all-candidates";

  //making the fetch request
  useEffect(() => {
    window.scrollTo(0, 0);
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
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJpZCI6IjYzZjQ3NjY4MGEwMmU0NTJlMThjMzJiNCIsImVtYWlsIjoiZW1wbG95ZXJAZXhhbXBsZS5jb20iLCJyb2xlIjoiZW1wbG95ZXIifSwiaWF0IjoxNjc4MzAyMzU5LCJleHAiOjE2NzgzMDM1NTl9.LChvT8takvlYYmpLPbVlIsEL8CoPNugD3KqvbxoTWnA",
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

  return (
    <>
      <CardsContainer>
        <div className={classes["top-filters"]}>
          <div className={classes.switcher}>
            <div className={classes["showing-result"]}></div>
            <div className={classes["sort-by"]}>
            <button className={classes["btn-clear"]}>Clear All</button>
              <select
                onChange={(e) => {
                  if (e.target.value === "desc") {
                    setOrder("desc");
                  } else if (e.target.value === "asc") {
                    setOrder("asc");
                  } else if (e.target.value === "default") {
                    setOrder("default");
                  } else {
                  }
                  setCurrentPage(1);
                }}
                className={classes["form-select"]}
              >
                <option value="default">Sort by (default)</option>
                <option value="desc">Newest</option>
                <option value="asc">Oldest</option>
              </select>
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
