import React from "react";
import CardList from "../cardlist";

function ShowCase() {
  const Search = () => {
    return (
      <form className="w-2/3">
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full p-4 pl-10 text-sm text-gray-900 border border-cyan-700 rounded-lg bg-gray-50 focus:ring-cyan-700 focus:border-cyan-700 dark:bg-cyan-700 dark:border-cyan-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500 focus:outline-cyan-700"
            placeholder="Search Templates..."
            required
          />
          <button
            type="submit"
            class="text-white absolute right-2.5 bottom-2.5 bg-cyan-800 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-cyan-600 font-medium rounded-lg text-sm px-4 py-2 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
          >
            Search
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-12">
      <Search></Search>
      <CardList></CardList>
      <button className="px-12 py-4 text-white font-bold bg-cyan-800 rounded-lg shadow-xl hover:bg-cyan-700 ">Explore more</button>
      <hr className="w-96 h-1 my-8 bg-cyan-900 border-0 rounded dark:bg-gray-700"/>

    </div>
  );
}

export default ShowCase;
