import "./App.scss";
import AutoCompleteInput from "./Components/AutoCompleteInput/AutoCompleteInput";
import { Toaster } from "react-hot-toast";
import SelectedPacakgesContext from "./Context/SelectedPacakgesContext";
import { useState } from "react";
import ComparisonSections from "./Components/ComparisonSections";

function App() {
  const [selected, setSelected] = useState<string[]>([]);
  const [showTable, setShowTable] = useState<boolean>(false);

  const value = {
    selected,
    setSelected,
  };
  return (
    <>
      <SelectedPacakgesContext.Provider value={value}>
        <section className="landing">
          <div>
            <h1>NPM Pacakge Comparator</h1>
            <p>
              Web Application to <b>compare and recommend</b> the best npm
              package for a keyword.
            </p>
          </div>

          <div style={{ width: "100%" }}>
            <AutoCompleteInput setShowTable={setShowTable} />
          </div>

          <div>
            {showTable && (
              <div>
                <ComparisonSections />
              </div>
            )}
          </div>
        </section>
        <Toaster position="bottom-right" />
      </SelectedPacakgesContext.Provider>
    </>
  );
}

export default App;
