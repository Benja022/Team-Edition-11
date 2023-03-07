import CardWrapper from "./CardWrapper";
import CardImg from "./CardImg";
import CardInfo from "./CardInfo";
//import { freelancers } from "../db/freelancers";
import CardsContainer from "./CardsContainer";
import { Switcher } from "./Switcher";
import { Pagination } from "./Pagination";
import { useState, useEffect } from "react";

function CandidateList() {
  const [candidates, setCandidates] = useState([]); // principal state
  // const [loading, setLoading] = useState(false); //loading to be used with spinner
  const [currentPage, setCurrentPage] = useState(1); //pagination
  const [candidatesPerPage /*setCandidatesPerPage*/] = useState(12); //number of candidates per page

  // sessionStorage.token =
  //   "https://codejob.nel386.repl.co/candidate/all-candidates";

  //making the fetch request
  useEffect(() => {
    const fetchCandidates = async () => {
      // setLoading(true);
      const res = await fetch(
        "https://codejob.nel386.repl.co/candidate/all-candidates",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJpZCI6IjYzZjQ3NjY4MGEwMmU0NTJlMThjMzJiNCIsImVtYWlsIjoiZW1wbG95ZXJAZXhhbXBsZS5jb20iLCJyb2xlIjoiZW1wbG95ZXIifSwiaWF0IjoxNjc4MjI0MDAyLCJleHAiOjE2NzgyMjUyMDJ9.lEulZTgpDI6gDRxLSDfzno0rPyrPH717rqRDxxsFa_4",
          },
        }
      );
      const info = await res.json();
      setCandidates(info.data);
      // setLoading(false);
    };
    fetchCandidates();
  }, []);

  //console.log(candidates);

  //order candidates by date descendant FUNCIONA
  // candidates.data?.sort((a, b) => {
  //     return new Date(b.registerAt) - new Date(a.registerAt);
  //   });

  // const orderDesc = () => {
  //   candidates.sort((a, b) => {
  //     setCandidates(new Date(b.registerAt) - new Date(a.registerAt));
  //   });
  // };

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
        <Switcher /*orderDesc={orderDesc} */ />
        {currentCandidates.map((candidate) => {
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
