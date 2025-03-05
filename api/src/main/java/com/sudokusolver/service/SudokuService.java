package com.sudokusolver.service;

import com.sudokusolver.model.SolveResponse;
import com.sudokusolver.model.SolveMetrics;
import com.sudokusolver.gui.Solver;
import com.sudokusolver.gui.Cell;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class SudokuService {
    
    public SolveResponse solve(String puzzleInput) {
        // Reset all static variables before solving
        Solver.resetAll();
        Solver.solved = false;
        Solver.bruteForceSolved = false;
        Solver.levelZeroChanges = 0;
        Solver.oneInARowChanges = 0;
        Solver.oneInAColumnChanges = 0;
        Solver.oneInAGroupChanges = 0;
        Solver.oneInACellChanges = 0;
        Solver.levelOneChanges = 0;
        Solver.phantomRowChanges = 0;
        Solver.phantomColumnChanges = 0;
        Solver.phantomGroupChanges = 0;
        Solver.hiddenPairRowChanges = 0;
        Solver.hiddenPairColumnChanges = 0;
        Solver.hiddenPairGroupChanges = 0;
        Solver.nakedPairRowChanges = 0;
        Solver.nakedPairColumnChanges = 0;
        Solver.nakedPairGroupChanges = 0;
        Solver.levelTwoChanges = 0;
        Solver.nakedTripleRowChanges = 0;
        Solver.nakedTripleColumnChanges = 0;
        Solver.nakedTripleGroupChanges = 0;
        Solver.hiddenTripleRowChanges = 0;
        Solver.hiddenTripleColumnChanges = 0;
        Solver.hiddenTripleGroupChanges = 0;
        Solver.nakedQuadRowChanges = 0;
        Solver.nakedQuadColumnChanges = 0;
        Solver.nakedQuadGroupChanges = 0;
        Solver.xWingRowChanges = 0;
        Solver.xWingColumnChanges = 0;
        Solver.yWingColumnGroupChanges = 0;
        Solver.yWingRowGroupChanges = 0;
        Solver.yWingRowColumnChanges = 0;
        Solver.levelThreeChanges = 0;
        Solver.guessAndCheckChanges = 0;
        Solver.bruteForceChanges = 0;
        Solver.totalChangeCount = 0;
        Solver.mainChangeCount = 0;
        Solver.possibleChangeCount = 0;
        Solver.mainChangePossibleCount = 0;
        Solver.possibleChangePossibleCount = 0;
        Solver.totalChangeType.clear();
        Solver.mainChangeMethod.clear();
        Solver.mainChangeDescription.clear();
        Solver.mainChangeNumber.clear();
        Solver.mainChangeRow.clear();
        Solver.mainChangeColumn.clear();
        Solver.mainChangePossibleOrder.clear();
        Solver.mainChangePossibleNumber.clear();
        Solver.mainChangePossibleRow.clear();
        Solver.mainChangePossibleColumn.clear();
        Solver.possibleChangeMethod.clear();
        Solver.possibleChangeDescription.clear();
        Solver.possibleChangeOrder.clear();
        Solver.possibleChangeNumber.clear();
        Solver.possibleChangeRow.clear();
        Solver.possibleChangeColumn.clear();

        // Convert string input to 2D array
        Cell[][] cellGrid = new Cell[9][9];
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                int value = Character.getNumericValue(puzzleInput.charAt(i * 9 + j));
                cellGrid[i][j] = new Cell(i, j);
                if (value != 0) {
                    cellGrid[i][j].setValue(value);
                }
            }
        }

        // Solve the puzzle using static method
        int[][] solution = Solver.solveGame(cellGrid);
        
        if (!Solver.solved) {
            throw new RuntimeException("Unable to solve puzzle");
        }

        // Convert solution back to string
        StringBuilder solutionString = new StringBuilder();
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                solutionString.append(solution[i][j]);
            }
        }

        // Collect metrics from Solver's static fields
        SolveMetrics metrics = new SolveMetrics(
            Solver.solved,
            Solver.levelZeroChanges,
            Solver.oneInARowChanges,
            Solver.oneInAColumnChanges,
            Solver.oneInAGroupChanges,
            Solver.oneInACellChanges,
            Solver.levelOneChanges,
            Solver.phantomRowChanges,
            Solver.phantomColumnChanges,
            Solver.phantomGroupChanges,
            Solver.hiddenPairRowChanges,
            Solver.hiddenPairColumnChanges,
            Solver.hiddenPairGroupChanges,
            Solver.nakedPairRowChanges,
            Solver.nakedPairColumnChanges,
            Solver.nakedPairGroupChanges,
            Solver.levelTwoChanges,
            Solver.nakedTripleRowChanges,
            Solver.nakedTripleColumnChanges,
            Solver.nakedTripleGroupChanges,
            Solver.hiddenTripleRowChanges,
            Solver.hiddenTripleColumnChanges,
            Solver.hiddenTripleGroupChanges,
            Solver.nakedQuadRowChanges,
            Solver.nakedQuadColumnChanges,
            Solver.nakedQuadGroupChanges,
            Solver.xWingRowChanges,
            Solver.xWingColumnChanges,
            Solver.yWingColumnGroupChanges,
            Solver.yWingRowGroupChanges,
            Solver.yWingRowColumnChanges,
            Solver.levelThreeChanges,
            Solver.guessAndCheckChanges,
            Solver.bruteForceChanges,
            Solver.totalChangeCount,
            new ArrayList<>(Solver.totalChangeType),
            Solver.mainChangeCount,
            Solver.possibleChangeCount,
            Solver.mainChangePossibleCount,
            Solver.possibleChangePossibleCount,
            new ArrayList<>(Solver.mainChangeMethod),
            new ArrayList<>(Solver.mainChangeDescription),
            new ArrayList<>(Solver.mainChangeNumber),
            new ArrayList<>(Solver.mainChangeRow),
            new ArrayList<>(Solver.mainChangeColumn),
            new ArrayList<>(Solver.mainChangePossibleOrder),
            new ArrayList<>(Solver.mainChangePossibleNumber),
            new ArrayList<>(Solver.mainChangePossibleRow),
            new ArrayList<>(Solver.mainChangePossibleColumn),
            new ArrayList<>(Solver.possibleChangeMethod),
            new ArrayList<>(Solver.possibleChangeDescription),
            new ArrayList<>(Solver.possibleChangeOrder),
            new ArrayList<>(Solver.possibleChangeNumber),
            new ArrayList<>(Solver.possibleChangeRow),
            new ArrayList<>(Solver.possibleChangeColumn)
        );

        return new SolveResponse(solutionString.toString(), metrics);
    }
} 