
import { useState } from "react";
import data from "./data";

const Home = () => {
  const [selected, setSelected] = useState(null); // For single selection
  const [enableMultiSelection, setEnableMultiSelection] = useState(false); // Toggle multi-selection mode
  const [multiple, setMultiple] = useState([]); // For multiple selections

  // Handle single selection
  function handleSingleSelection(getCurrentId) {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }

  // Handle multiple selection
  function handleMultipleSelection(getCurrentId) {
    let cpyMultiple = [...multiple];
    const findIndexOfCurrentId = cpyMultiple.indexOf(getCurrentId);

    if (findIndexOfCurrentId === -1) {
      cpyMultiple.push(getCurrentId); // Add if not already selected
    } else {
      cpyMultiple.splice(findIndexOfCurrentId, 1); // Remove if already selected
    }

    setMultiple(cpyMultiple);
  }

  return (
    <div className="flex h-[100vh] items-center justify-center bg-fuchsia-500 flex-col gap-4">
      {/* Toggle Multi-Selection Mode */}
      <button
        onClick={() => {
          setEnableMultiSelection(!enableMultiSelection);
          setSelected(null); // Reset single selection state
          setMultiple([]); // Reset multi-selection state
        }}
        className="p-2 bg-white font-bold text-xl cursor-pointer rounded-md shadow-md"
      >
        {enableMultiSelection ? "Disable Multi Selection" : "Enable Multi Selection"}
      </button>

      <div className="w-[500px]">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div
              className={`bg-orange-700 p-4 my-2 rounded-md ${
                enableMultiSelection && multiple.includes(dataItem.id)
                  ? "bg-orange-500"
                  : ""
              }`}
              key={dataItem.id}
            >
              {/* Click Handler for Single or Multi Selection */}
              <div
                onClick={
                  enableMultiSelection
                    ? () => handleMultipleSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
                className="text-white flex justify-between cursor-pointer items-center"
              >
                <h3>{dataItem.question}</h3>
                <span>
                  {enableMultiSelection && multiple.includes(dataItem.id)
                    ? "-"
                    : "+"}
                </span>
              </div>

              {/* Render Content Based on Selection Mode */}
              {enableMultiSelection && multiple.includes(dataItem.id) ? (
                <div className="text-white mt-2">
                  <p>{dataItem.answer}</p>
                </div>
              ) : !enableMultiSelection && selected === dataItem.id ? (
                <div className="text-white mt-2">
                  <p>{dataItem.answer}</p>
                </div>
              ) : null}
            </div>
          ))
        ) : (
          <p className="text-white">No data available</p>
        )}
      </div>
    </div>
  );
};

export default Home;
