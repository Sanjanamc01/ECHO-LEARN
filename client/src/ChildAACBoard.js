// import React, { useState } from "react";
// import { iconsData, sortIcons } from "./iconsData";
// import CategoryCard from "./CategoryCard";
// import { pronunciationMap } from "./pronunciationMap";
// import "./aac.css";

// function ChildAACBoard({ onLogout }) {

//   const [sentence, setSentence] = useState([]);
//   const [activeCategory, setActiveCategory] = useState(null);
//   const [editMode, setEditMode] = useState(false);

//   const [selectedTile, setSelectedTile] = useState(null);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [newTileName, setNewTileName] = useState("");
//   const [newTileFile, setNewTileFile] = useState(null);
//   const [mode, setMode] = useState("aac");

//   // SPEAK SINGLE TILE
//   const addWord = (word) => {
//     const speakText = pronunciationMap[word.toLowerCase()] || word;

//     const utter = new SpeechSynthesisUtterance(speakText);
//     utter.lang = "en-IN";
//     utter.rate = 0.90;
//     utter.pitch = 1.0;
//     window.speechSynthesis.speak(utter);

//     setSentence([...sentence, { word, category: activeCategory }]);
//   };

//   // SPEAK FULL SENTENCE
//   const speakSentence = () => {
//     const spokenSentence = sentence
//       .map(i => pronunciationMap[i.word.toLowerCase()] || i.word)
//       .join(" ");

//     const utter = new SpeechSynthesisUtterance(spokenSentence);
//     utter.lang = "en-IN";
//     utter.rate = 0.90;
//     utter.pitch = 1.0;
//     window.speechSynthesis.speak(utter);
//   };


//   const clearSentence = () => setSentence([]);


//   // DELETE TILE
//   const deleteTile = () => {
//     if (!selectedTile) return alert("No tile selected!");
//     iconsData[activeCategory] = iconsData[activeCategory].filter(t => t !== selectedTile);
//     setSelectedTile(null);
//   };


//   // ADD TILE
//   const saveNewTile = () => {
//     if (!activeCategory || !newTileName || !newTileFile)
//       return alert("All fields required!");

//     const formatted = newTileName.toLowerCase().trim().replace(/ /g, "-");

//     if (!iconsData[activeCategory]) {
//       iconsData[activeCategory] = [];
//       alert(`Created NEW category: ${activeCategory}`);
//     }

//     iconsData[activeCategory].push(formatted);

//     alert(`Added tile "${formatted}" under "${activeCategory}". 
// Remember to add image manually in /public/aac-icons/${activeCategory}/`);

//     setNewTileName("");
//     setNewTileFile("");
//     setShowAddForm(false);
//   };



//   return (
//     <div className="aac-container">


//       {/* SENTENCE BAR */}
//       <div className="sentence-bar">
//         {sentence.length === 0 ? (
//           <p className="placeholder">Tap tiles to create a sentence...</p>
//         ) : (
//           sentence.map((item, i) => (
//             <div className="sentence-icon" key={i}>
//              <img 
//   src={
//     item.category
//       ? `/aac-icons/${item.category}/${item.word}.svg`
//       : `/aac-icons/categories/${item.word}.png`
//   }
//   onError={(e)=> {
//     e.target.src = item.category
//       ? `/aac-icons/${item.category}/${item.word}.png`
//       : `/aac-icons/categories/${item.word}.png`;
//   }}
//   alt={item.word}
// />

//               <p>{item.word}</p>
//             </div>
//           ))
//         )}
//       </div>



//       {/* BUTTONS */}
//       <div className="aac-controls">
//         <button className="btn speak" onClick={speakSentence}>Speak</button>
//         <button className="btn clear" onClick={clearSentence}>Clear</button>
//         <button className="btn edit" onClick={()=>setEditMode(!editMode)}>
//           {editMode ? "Done" : "Edit"}
//         </button>

//         {editMode && selectedTile && (
//           <button className="btn delete" onClick={deleteTile}>
//             ❌ Delete "{selectedTile}"
//           </button>
//         )}

//         {editMode && (
//           <button className="btn add" onClick={()=>setShowAddForm(true)}>
//             ➕ Add Tile
//           </button>
//         )}
//       </div>




//       {/* ============= CATEGORY LEVEL (YES/NO FIX APPLIED HERE) ============= */}
//       {!activeCategory && (
//         <div className="category-grid">
//           {Object.keys(iconsData).map(cat => (
//             <CategoryCard
//               key={cat}
//               title={cat}
//               image={`/aac-icons/categories/${cat}.png`}

//               // 🔥 THIS IS THE FIX → YES & NO now speak directly
//               onClick={() => {
//                 if (!iconsData[cat] || iconsData[cat].length === 0) {
//                   addWord(cat.toLowerCase());
//                 } else {
//                   setActiveCategory(cat);
//                 }
//               }}
//             />
//           ))}
//         </div>
//       )}



//       {/* SUB-CATEGORY */}
//       {activeCategory && (
//         <div>
//           <button className="back-btn" onClick={()=>setActiveCategory(null)}>⬅ Back</button>

//           <div className="subgrid">
//             {sortIcons(activeCategory, iconsData[activeCategory]).map(name => (
//               <div
//                 key={name}
//                 className={`tile ${selectedTile === name ? "selected" : ""}`}
//                 onClick={() => editMode ? setSelectedTile(name) : addWord(name)}
//               >
//                 <img 
//                   src={`/aac-icons/${activeCategory}/${name}.svg`}
//                   onError={(e)=>e.target.src=`/aac-icons/${activeCategory}/${name}.png`}
//                   alt={name}
//                 />
//                 <p>{name}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}



//       {/* ADD TILE FORM */}
//       {showAddForm && (
//         <div className="modal">

//           <h2 className="modal-title">➕ Add New Tile / Category</h2>

//           <label><b>Choose Existing Category</b></label>
//           <select
//             value={activeCategory}
//             onChange={(e) => setActiveCategory(e.target.value)}
//             className="modal-input"
//           >
//             {Object.keys(iconsData).map(cat => (
//               <option key={cat} value={cat}>{cat}</option>
//             ))}
//           </select>


//           <label><b>OR Create New Category</b></label>
//           <input 
//             type="text"
//             placeholder="Type new category name..."
//             className="modal-input"
//             onChange={(e)=>setActiveCategory(e.target.value.toLowerCase().trim())}
//           />


//           <label><b>Tile Name</b></label>
//           <input 
//             type="text"
//             placeholder="Example: peacock"
//             className="modal-input"
//             value={newTileName}
//             onChange={(e)=>setNewTileName(e.target.value)}
//           />


//           <label><b>Image URL (.png/.svg)</b></label>
//           <input 
//             type="text"
//             placeholder="Paste URL"
//             className="modal-input"
//             value={newTileFile}
//             onChange={(e)=>setNewTileFile(e.target.value)}
//           />

//           <button className="save-btn" onClick={saveNewTile}>Save Tile</button>
//           <button className="cancel-btn" onClick={()=>setShowAddForm(false)}>Cancel</button>
//         </div>
//       )}

//       <button className="logout" onClick={onLogout}>Logout</button>
//     </div>
//   );
// }

// export default ChildAACBoard;
import React, { useState } from "react";
import { iconsData, sortIcons } from "./iconsData";
import CategoryCard from "./CategoryCard";
import { pronunciationMap } from "./pronunciationMap";
import PracticeMode from "./Practice/PracticeMode";
import "./aac.css";

function ChildAACBoard({ onLogout,childId }) {

  const [sentence, setSentence] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [selectedTile, setSelectedTile] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTileName, setNewTileName] = useState("");
  const [newTileFile, setNewTileFile] = useState(null);

  // ⭐ MODE SWITCH (AAC vs Practice)
  const [mode, setMode] = useState("aac");


  // SPEAK SINGLE TILE
  const addWord = (word) => {
    const speakText = pronunciationMap[word.toLowerCase()] || word;

    const utter = new SpeechSynthesisUtterance(speakText);
    utter.lang = "en-IN";
    utter.rate = 0.80;
    utter.pitch = 1.0;
    window.speechSynthesis.speak(utter);

    setSentence([...sentence, { word, category: activeCategory }]);
  };


  // SPEAK FULL SENTENCE
  const speakSentence = () => {
    const spokenSentence = sentence
      .map(i => pronunciationMap[i.word.toLowerCase()] || i.word)
      .join(" ");

    const utter = new SpeechSynthesisUtterance(spokenSentence);
    utter.lang = "en-IN";
    utter.rate = 0.90;
    utter.pitch = 1.0;
    window.speechSynthesis.speak(utter);
  };

  const clearSentence = () => setSentence([]);


  // DELETE TILE
  const deleteTile = () => {
    if (!selectedTile) return alert("No tile selected!");
    iconsData[activeCategory] =
      iconsData[activeCategory].filter(t => t !== selectedTile);
    setSelectedTile(null);
  };


  // ADD TILE
  const saveNewTile = () => {
    if (!activeCategory || !newTileName || !newTileFile)
      return alert("All fields required!");

    const formatted = newTileName.toLowerCase().trim().replace(/ /g, "-");

    if (!iconsData[activeCategory]) {
      iconsData[activeCategory] = [];
      alert(`Created NEW category: ${activeCategory}`);
    }

    iconsData[activeCategory].push(formatted);

    alert(`Added tile "${formatted}" under "${activeCategory}".
Remember to add image manually in /public/aac-icons/${activeCategory}/`);

    setNewTileName("");
    setNewTileFile("");
    setShowAddForm(false);
  };


  return (
    <div className="aac-container">

      {/* ================= AAC MODE ================= */}
      {mode === "aac" && (
        <>
          {/* SENTENCE BAR */}
          <div className="sentence-bar">
            {sentence.length === 0 ? (
              <p className="placeholder">Tap tiles to create a sentence...</p>
            ) : (
              sentence.map((item, i) => (
                <div className="sentence-icon" key={i}>
                  <img
                    src={
                      item.category
                        ? `/aac-icons/${item.category}/${item.word}.svg`
                        : `/aac-icons/categories/${item.word}.png`
                    }
                    onError={(e) => {
                      e.target.src = item.category
                        ? `/aac-icons/${item.category}/${item.word}.png`
                        : `/aac-icons/categories/${item.word}.png`;
                    }}
                    alt={item.word}
                  />
                  <p>{item.word}</p>
                </div>
              ))
            )}
          </div>


          {/* BUTTONS */}
          <div className="aac-controls">
            <button className="btn speak" onClick={speakSentence}>Speak</button>
            <button className="btn clear" onClick={clearSentence}>Clear</button>

            <button className="btn edit" onClick={() => setEditMode(!editMode)}>
              {editMode ? "Done" : "Edit"}
            </button>

            {/* ⭐ PRACTICE BUTTON */}
            <button className="btn practice" onClick={() => setMode("practice")}>
              Practice Pronunciation
            </button>

            {editMode && selectedTile && (
              <button className="btn delete" onClick={deleteTile}>
                ❌ Delete "{selectedTile}"
              </button>
            )}

            {editMode && (
              <button className="btn add" onClick={() => setShowAddForm(true)}>
                ➕ Add Tile
              </button>
            )}
          </div>



          {/* CATEGORY LEVEL */}
          {!activeCategory && (
            <div className="category-grid">
              {Object.keys(iconsData).map(cat => (
                <CategoryCard
                  key={cat}
                  title={cat}
                  image={`/aac-icons/categories/${cat}.png`}
                  onClick={() => {
                    if (!iconsData[cat] || iconsData[cat].length === 0) {
                      addWord(cat.toLowerCase());
                    } else {
                      setActiveCategory(cat);
                    }
                  }}
                />
              ))}
            </div>
          )}



          {/* SUBCATEGORY */}
          {activeCategory && (
            <div>
              <button className="back-btn" onClick={() => setActiveCategory(null)}>
                ⬅ Back
              </button>

              <div className="subgrid">
                {sortIcons(activeCategory, iconsData[activeCategory]).map(name => (
                  <div
                    key={name}
                    className={`tile ${selectedTile === name ? "selected" : ""}`}
                    onClick={() => editMode ? setSelectedTile(name) : addWord(name)}
                  >
                    <img
                      src={`/aac-icons/${activeCategory}/${name}.svg`}
                      onError={(e) =>
                        e.target.src = `/aac-icons/${activeCategory}/${name}.png`
                      }
                      alt={name}
                    />
                    <p>{name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}



          {/* ADD TILE MODAL */}
          {showAddForm && (
            <div className="modal">

              <h2 className="modal-title">➕ Add New Tile / Category</h2>

              <label><b>Choose Existing Category</b></label>
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="modal-input"
              >
                {Object.keys(iconsData).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>


              <label><b>OR Create New Category</b></label>
              <input
                type="text"
                placeholder="Type new category name..."
                className="modal-input"
                onChange={(e) =>
                  setActiveCategory(e.target.value.toLowerCase().trim())
                }
              />


              <label><b>Tile Name</b></label>
              <input
                type="text"
                placeholder="Example: peacock"
                className="modal-input"
                value={newTileName}
                onChange={(e) => setNewTileName(e.target.value)}
              />


              <label><b>Image URL (.png/.svg)</b></label>
              <input
                type="text"
                placeholder="Paste URL"
                className="modal-input"
                value={newTileFile}
                onChange={(e) => setNewTileFile(e.target.value)}
              />

              <button className="save-btn" onClick={saveNewTile}>Save Tile</button>
              <button className="cancel-btn" onClick={() => setShowAddForm(false)}>Cancel</button>
            </div>
          )}

          <button className="logout" onClick={onLogout}>Logout</button>
        </>
      )}



      {/* ================= PRACTICE MODE ================= */}
      {/* {mode === "practice" && (
        <PracticeMode onBack={() => setMode("aac")} />
      )} */}
      {mode === "practice" && (
  <PracticeMode 
    onBack={() => setMode("aac")} 
    childId={childId}
  />
)}

    </div>
  );
}

export default ChildAACBoard;