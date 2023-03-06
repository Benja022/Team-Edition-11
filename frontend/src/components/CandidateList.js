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
  const [candidatesPerPage, setCandidatesPerPage] = useState(12); //number of candidates per page

  sessionStorage.token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJpZCI6IjYzZjQ3NjY4MGEwMmU0NTJlMThjMzJiNCIsImVtYWlsIjoiZW1wbG95ZXJAZXhhbXBsZS5jb20iLCJyb2xlIjoiZW1wbG95ZXIifSwiaWF0IjoxNjc4MTI1NzAyLCJleHAiOjE2NzgxMjY5MDJ9.VYAZJTeUfD-USmRtKST8jX5I5vKWdzW5cSHDcBOfnNs";

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
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJpZCI6IjYzZjQ3NjY4MGEwMmU0NTJlMThjMzJiNCIsImVtYWlsIjoiZW1wbG95ZXJAZXhhbXBsZS5jb20iLCJyb2xlIjoiZW1wbG95ZXIifSwiaWF0IjoxNjc4MTMxNjA2LCJleHAiOjE2NzgxMzI4MDZ9.Ir59Eq2c2ZJToCuQi1ODS1ib2aEJuyHoP9iVT_OBpdI",
          },
        }
      );
      const data = await res.json();
      setCandidates(data);
      setLoading(false);
    };
    //console.log(candidates.data);
    fetchCandidates();
  }, []);
  // sort by date
  const sortByDate = () => {
    const sorted = candidates.data.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    setCandidates({ data: sorted });
  };
console.log(candidates.data?.sort(sortByDate));
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
  const totalPages = Math.ceil(candidates.data?.length / candidatesPerPage);

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
        totalCandidates={candidates.data?.length}
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
