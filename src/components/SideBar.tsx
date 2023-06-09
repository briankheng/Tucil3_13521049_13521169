import inputFileHandler from "@/utils/inputFileHandler";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

function SideBar({
  fileData,
  setFileData,
  setShortestPath,
}: {
  fileData: any;
  setFileData: any;
  setShortestPath: any;
}) {
  const [shortestDistance, setShortestDistance] = useState(0);

  const submitHandler = async () => {
    try {
      // Get the start point, end point, and method
      const start = document.getElementById("start") as HTMLSelectElement;
      const end = document.getElementById("end") as HTMLSelectElement;
      const method = document.getElementById("method") as HTMLSelectElement;

      // Check if the user has selected a start point, end point, and method
      if (start.value === "Choose a start point") {
        toast.error("Please choose a start point!");
        return;
      }
      if (end.value === "Choose an end point") {
        toast.error("Please choose an end point!");
        return;
      }
      if (method.value === "Choose a method") {
        toast.error("Please choose a method!");
        return;
      }

      const response = await axios.post("api/pathfinder", {
        start: parseInt(start.value),
        end: parseInt(end.value),
        method: method.value,
        fileData,
      });

      const { shortestPath, shortestDistance } = response.data;

      setShortestPath(shortestPath);
      setShortestDistance(shortestDistance);
      toast.success("Shortest path found!");
    } catch (e: any) {
      toast.error(e.response.data.message);
    }
  };

  return (
    <div className="flex flex-col gap-4 text-center bg-zinc-900 text-white h-full">
      <h1 className="bg-red-600 p-3 text-lg font-bold sticky top-0 z-50 hidden md:block">
        PATHFINDER
      </h1>

      <div className="flex flex-col items-center mt-4 md:mt-0">
        <h2 className="w-[90%]">1. Upload File Configuration/ Choose Directly From Map</h2>
        <h3 className="text-[0.6rem] w-[90%] text-[#EED202]">(*Add Node: left click on map, Add Edge: left click two nodes, Delete Node/Edge: right click)</h3>
        <div className="w-[90%] mt-3">
          <input
            className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding py-[0.32rem] px-3 text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100"
            type="file"
            onChange={(event) =>
              inputFileHandler(event, setFileData, setShortestPath)
            }
          />
        </div>
      </div>

      <div className="flex flex-col items-center">
        <h2 className="w-[90%]">2. Choose Start Point, End Point, And Method</h2>
        <div className="w-[90%] mt-3">
          <label
            htmlFor="start"
            className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Start:
          </label>
          <select
            id="start"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option disabled selected>
              Choose a start point
            </option>

            {fileData &&
              fileData.nodes.map((node: any) => (
                <option key={node.id} value={node.id}>
                  {node.name}
                </option>
              ))}
          </select>
        </div>

        <div className="w-[90%] mt-3">
          <label
            htmlFor="end"
            className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            End:
          </label>
          <select
            id="end"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option disabled selected>
              Choose an end point
            </option>
            {fileData &&
              fileData.nodes.map((node: any) => (
                <option key={node.id} value={node.id}>
                  {node.name}
                </option>
              ))}
          </select>
        </div>

        <div className="w-[90%] mt-3">
          <label
            htmlFor="method"
            className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Method:
          </label>
          <select
            id="method"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option disabled selected>
              Choose a method
            </option>
            <option value="UCS">UCS</option>
            <option value="A*">A*</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-[90%] mt-3">
          <button
            onClick={submitHandler}
            className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 border border-red-700 rounded"
          >
            Submit
          </button>
        </div>
      </div>

      <div className="flex flex-col flex-auto justify-end mb-5">
        <h2 className="text-left block font-bold ml-[5%] mb-2 text-lg text-gray-900 dark:text-white">
          Shortest Distance: {shortestDistance} km
        </h2>
      </div>
    </div>
  );
}

export default SideBar;
