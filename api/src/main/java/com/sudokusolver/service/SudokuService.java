package com.sudokusolver.service;

import com.sudokusolver.model.SolveResponse;
import com.sudokusolver.model.SolveMetrics;
import gui.Solver;
import gui.Cell;
import org.springframework.stereotype.Service;
import java.awt.Point;

import java.util.ArrayList;
import java.util.List;

@Service
public class SudokuService {
    
    public SolveResponse solve(String puzzleInput) {
        // Convert string input to 2D array
        Cell[][] cellGrid = new Cell[9][9];
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                int value = Character.getNumericValue(puzzleInput.charAt(i * 9 + j));
                cellGrid[i][j] = new Cell(i, j);
                if (value != 0) {
                    cellGrid[i][j].setText(String.valueOf(value));
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