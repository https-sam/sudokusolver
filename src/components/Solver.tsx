import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import MyPromise from "../utils/promise";
import solveSudoku from "../utils/solver";
import Cell from "./Cell";
import { PopupAboutMe } from "./PopupAboutme";

const renderNewGrid = (board: string[][]) => {
  let counter = 0;
  const solverBoard = document.getElementById("solver-board");
  const cells = solverBoard?.childNodes;
  if (!cells) return;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      (cells[counter] as HTMLInputElement).value = board[i][j];
      counter++;
    }
  }
};

const isValidSudoku = function (board: string[][]) {
  for (let i = 0; i < 9; i++) {
    let row = new Set(),
      col = new Set(),
      box = new Set();

    for (let j = 0; j < 9; j++) {
      let _row = board[i][j];
      let _col = board[j][i];
      let _box =
        board[3 * Math.floor(i / 3) + Math.floor(j / 3)][3 * (i % 3) + (j % 3)];

      if (_row != "") {
        if (row.has(_row)) return false;
        row.add(_row);
      }
      if (_col != "") {
        if (col.has(_col)) return false;
        col.add(_col);
      }

      if (_box != "") {
        if (box.has(_box)) return false;
        box.add(_box);
      }
    }
  }
  return true;
};

const Solver = () => {
  let valArray: string[][] = [];
  const [invalidSodukuTriggered, setInvalidSodukuTriggered] = useState(false);

  function solveHelper() {
    valArray = [];
    let counter = 0;
    const solverBoard = document.getElementById("solver-board");
    for (let i = 0; i < 9; i++) {
      let row: string[] = [];
      for (let j = 0; j < 9; j++) {
        row.push((solverBoard?.children[counter] as HTMLInputElement).value);
        counter++;
      }
      valArray.push(row);
    }
  }

  function startSolve() {
    solveHelper(); // converts dom elmetns to a 2D array
    const pr = new MyPromise((resolve, reject) => {
      if (!isValidSudoku(valArray)) {
        // setIsOpen(true);
        setInvalidSodukuTriggered(true);
        reject("The Entered sudoku grid is invalid!");
      } else {
        resolve(solveSudoku(valArray));
      }
    });

    pr.then((result: string[][]) => {
      console.log(result);
      renderNewGrid(result);
    }).catch((err: string) => {
      // handle errors here
      console.log(err);
    });
  }

  const resetGrid = () => {
    let counter = 0;
    const solverBoard = document.getElementById("solver-board");
    const cells = solverBoard?.childNodes;
    if (!cells) return;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        (cells[counter] as HTMLInputElement).value = "";
        counter++;
      }
    }
  };

  function InvalidSoduku() {
    let [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
      if (invalidSodukuTriggered) setIsOpen(true);
    }, [invalidSodukuTriggered]);

    function closeModal() {
      setIsOpen(false);
      setTimeout(() => {
        setInvalidSodukuTriggered(false);
      }, 300);
    }

    return (
      <>
        <Transition appear={isOpen} show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Oops.. Invalid Sudoku
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        <div className="mt-2">
                          <h1 className="mb-1">Remember that . . . </h1>
                          <p className="text-sm text-gray-500">
                            1) Each row must contain the digits 1-9 without
                            repetition. <br /> 2) Each column must contain the
                            digits 1-9 without repetition.
                            <br /> 3) Each of the nine 3 x 3 sub-boxes of the
                            grid must contain the digits 1-9 without repetition.
                            <br />
                          </p>
                        </div>
                      </p>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Got it
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    );
  }

  return (
    <>
      <div
        className="grid grid-cols-9 w-fit rounded-lg border-[1px] overflow-hidden"
        id="solver-board"
      >
        {Array.from(Array(81), (_, i) => (
          <Cell key={i} odd={i % 2 == 1} i={i} />
        ))}
      </div>
      <button
        className="w-[20rem] h-[2.3rem] rounded-md text-white font-semibold bg-indigo-600 hover:bg-indigo-700 mt-10"
        onClick={startSolve}
      >
        Solve
      </button>
      <button
        className="w-[20rem] h-[2.3rem] rounded-md text-white font-semibold bg-gray-300 hover:bg-gray-400 mt-3"
        onClick={resetGrid}
      >
        Reset
      </button>
      <InvalidSoduku />
    </>
  );
};

export default Solver;
