// Description: This component is the main component of the candidates list page. It contains the main logic of the page and the components that are used in the page.

//components used: CardWrapper, CardImg, CardInfo, Pagination, Switcher
import CardWrapper from "../components/candidatesList/CardWrapper";
import CardImg from "../components/candidatesList/CardImg";
import CardInfo from "../components/candidatesList/CardInfo";
import CardsContainer from "../components/candidatesList/CardsContainer";
import Pagination from "../components/candidatesList/Pagination";
import Switcher from "../components/candidatesList/Switcher";
//import ButtonClear from "../components/candidatesList/ButtonClear";

//import classes from "./CandidateList.module.css";
import classes from "./CandidateList.module.css";

//hooks
import { useState, useEffect } from "react";

function CandidateList() {
  const [selectedOrder, setSelectedOrder] = useState("default"); //to keep the selected option in the select
  const [order, setOrder] = useState("default"); //to keep the order of the candidates
  const [candidates, setCandidates] = useState([]); // principal state
  const [candidatesCopy, setCandidatesCopy] = useState([]); //copy of the principal state
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
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJpZCI6IjYzZjQ3NjY4MGEwMmU0NTJlMThjMzJiNCIsImVtYWlsIjoiZW1wbG95ZXJAZXhhbXBsZS5jb20iLCJyb2xlIjoiZW1wbG95ZXIifSwiaWF0IjoxNjc4NDg1OTE2LCJleHAiOjE2Nzg0ODcxMTZ9.Y86aC532Hb0EXyOm6r90C2skKNRyhJn60YYbZp58hHc",
          },
        }
      );
      const info = await res.json();
      setCandidatesCopy(info.data);
      orderCandites();//calling the function to order the candidates by default
    };
    fetchCandidates();
  }, [currentPage,order]);
  
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
      //handle select
      const handlerSelect = (e) => {
        if (e.target.value === "desc") {
          setOrder("desc");
          setSelectedOrder("desc")
        } else if (e.target.value === "asc") {
          setOrder("asc");
          setSelectedOrder("asc")
        } else {
          setOrder("default");
          setSelectedOrder("default")
        }
        orderCandites();
        setCurrentPage(1); //to send the user back to the first page
        //setSelectedOrder(); // to reset the selected option in the select
      };
      
      //funtion to order the candidates
      const orderCandites = () => {
        if (selectedOrder === "desc") {
          candidatesCopy.sort((a, b) => {
            return new Date(b.registerAt) - new Date(a.registerAt);
          });
          setCandidates(candidatesCopy);
        } else if (selectedOrder === "asc") {
          candidatesCopy.sort((a, b) => {
            return new Date(a.registerAt) - new Date(b.registerAt);
          });
          setCandidates(candidatesCopy);
        }else {
          setCandidates(candidatesCopy);
        }
      };


  return (
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
                  //setOrder("default");
                }}
              >
                Clear All
              </button>
              <Switcher
                value={selectedOrder}
                handlerSelect={handlerSelect}
                selectedOrder={selectedOrder}
              />
            </div>
          </div>
        </div>
        {currentCandidates.map((candidate, key) => {
          return (
            <CardWrapper
              key={key}
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
