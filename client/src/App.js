import React, { useState } from "react";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import ParentDashboard from "./ParentDashboard";
import ChildAACBoard from "./ChildAACBoard";
import ParentLogin from "./ParentLogin";
import ChildLogin from "./ChildLogin";
import PracticeMode from "./Practice/PracticeMode";

function App() {
  // Controls which screen is visible
  // login       → main NUDI screen (3 buttons)
  // create      → Create Account form
  // parentLogin → Parent Login form
  // childLogin  → Child Login form
  // parent      → Parent Dashboard
  // child       → Child AAC Board
  const [currentPage, setCurrentPage] = useState("login");
  const [childId, setChildId] = useState(null);

  console.log("Current page:", currentPage);

  return (
    <div>
     {currentPage === "login" && (
  <>
    <Login
      onParentLoginClick={() => setCurrentPage("parentLogin")}
      onChildLoginClick={() => setCurrentPage("childLogin")}
      onGoToCreateAccount={() => setCurrentPage("create")}
    />

    <div style={{ textAlign: "center", marginTop: 20 }}>
      <button
        style={{ padding: "12px 25px", fontSize: "18px", cursor: "pointer" }}
        onClick={() => setCurrentPage("practice")}
      >
        Go To Practice
      </button>
    </div>
  </>
)}

      {currentPage === "create" && (
        <CreateAccount onBackToLogin={() => setCurrentPage("login")} />
      )}

      {currentPage === "parentLogin" && (
        <ParentLogin
          onLoginSuccess={() => setCurrentPage("parent")}
          onBack={() => setCurrentPage("login")}
        />
      )}

      {/* {currentPage === "childLogin" && (
        <ChildLogin
          onLoginSuccess={() => setCurrentPage("child")}
          onBack={() => setCurrentPage("login")}
        />
      )} */}

      {currentPage === "childLogin" && (
  <ChildLogin
    onLoginSuccess={(id) => {
      setChildId(id);
      setCurrentPage("child");
    }}
    onBack={() => setCurrentPage("login")}
  />
)}

      {currentPage === "parent" && (
        <ParentDashboard onLogout={() => setCurrentPage("login")} />
      )}
{/* 
      {currentPage === "child" && (
        <ChildAACBoard onLogout={() => setCurrentPage("login")} />
      )} */}
      {currentPage === "child" && (
  <ChildAACBoard 
    onLogout={() => setCurrentPage("login")} 
    childId={childId}
  />
)}

      {/* {currentPage === "practice" && (
      <PracticeMode />
     )} */
     }
     {currentPage === "practice" && (
  <PracticeMode 
    onBack={() => setCurrentPage("child")} 
    childId={childId}
  />
)}
    </div>
  );
}

export default App;


// import React from "react";
// import PracticeMode from "./Practice/PracticeMode";

// function App() {
//   return <PracticeMode />;
// }

// export default App;