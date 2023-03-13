export const fetchCandidates = async () => {
  const url = "https://codejob.nel386.repl.co/candidate/all-candidates";

  const request = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token": sessionStorage.getItem("auth-token"),
    },
  });

  const info = await request.json().catch((error) => {
    //console.log(error);
    if (
      error.message === "Expired token" ||
      sessionStorage.token === undefined
    ) {
      window.location.href = "/login";
    }
  });

  return {
    info,
  };
};
