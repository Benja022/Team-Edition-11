import CardWrapper from "./CardWrapper";
import CardImg from "./CardImg";
import CardInfo from "./CardInfo";
import { freelancers } from "../db/freelancers";
import CardsContainer from "./CardsContainer";
import { Switcher } from "./Switcher";
import { Pagination } from "./Pagination";
import { useState, useEffect } from "react";

function CandidateList() {
  const [candidates, setCandidates] = useState({}); // principal state
  const [loading, setLoading] = useState(false); //loading to be used with spinner
  const [currentPage, setCurrentPage] = useState(1); //pagination
  const [candidatesPerPage, setCandidatesPerPage] = useState(6); //number of candidates per page

  sessionStorage.token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

  //making the fetch request
  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      const res = await fetch(
        "https://codejob.nel386.repl.co/candidate/all-candidates",
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJpZCI6IjYzZjQ3NjY4MGEwMmU0NTJlMThjMzJiNCIsImVtYWlsIjoiZW1wbG95ZXJAZXhhbXBsZS5jb20iLCJyb2xlIjoiZW1wbG95ZXIifSwiaWF0IjoxNjc3NTE2OTA0LCJleHAiOjE2Nzc1MTgxMDR9.S2I8uB4KPmnTqdMPcuxw37FZTVNUbVBjKSYDj4LkOds",
          },
        }
      );
      const data = await res.json();
      setCandidates(data);
      setLoading(false);
    };
    console.log(candidates.data);
    fetchCandidates();
  }, []);

  // useEffect(() => {
  // const fetchCandidates = async () => {
  //   setLoading(true);
  //const candidates = freelancers; //mientras no se conecta a la base de datos
  // const res = await fetch("/candidate/all-candidates");//future fetch request
  //     setCandidates(freelancers);
  //     setLoading(false);
  // console.log(res);
  //   };
  //   fetchCandidates();
  // }, []);

  //get current candidates
  const indexOfLastCandidate = currentPage * candidatesPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage; 
  const currentCandidates = candidates.data?.slice(
    indexOfFirstCandidate,
    indexOfLastCandidate
  );
  const totalPages = Math.ceil(candidates.length / candidatesPerPage);

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
        <Switcher />
        {currentCandidates?.map((candidate, index) => {
          return (
            <CardWrapper key={index} candidates={candidate} loading={loading}>
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
