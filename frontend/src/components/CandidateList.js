import CardWrapper from "./CardWrapper";
import CardImg from "./CardImg";
import CardInfo from "./CardInfo";
import { freelancers } from "../db/freelancers";
import CardsContainer from "./CardsContainer";
import { Switcher } from "./Switcher";
import { Pagination } from "./Pagination";
import { useState, useEffect } from "react";

function CandidateList() {
  // const [candidates, setCandidates] = useState({}); // principal state
  const [loading, setLoading] = useState(false); //loading to be used with spinner
  const [currentPage, setCurrentPage] = useState(1); //pagination
  const [candidatesPerPage, setCandidatesPerPage] = useState(6); //number of candidates per page

  //making the fetch request

  //useEffect(() => {
  // const fetchCandidates = async () => {
  //   setLoading(true);
  const candidates = freelancers; //mientras no se conecta a la base de datos
  //const res = await fetch("../db/freelancers.json");//future fetch request
  //     setCandidates(freelancers);
  //     setLoading(false);
  // console.log(candidates);
  //   };
  //   fetchCandidates();
  // }, []);

  //get current candidates
  const indexOfLastCandidate = currentPage * candidatesPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
  const currentCandidates = candidates.slice(
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
        {currentCandidates.map((candidate, index) => {
          <Switcher />;
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
