import "./App.css";
import CandidateList from "./views/CandidateList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<CandidateList />} />
          <Route path="/candidate/all-candidates" element={<CandidateList />} />
          {/* <Route path="/candidate/:loginId" element={"<DetailCandidate/>"} /> to be implemented */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
