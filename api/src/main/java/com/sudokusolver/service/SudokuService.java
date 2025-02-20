package com.sudokusolver.service;

import com.sudokusolver.model.SolveResponse;
import gui.Solver; // Change back to this
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SudokuService {
    
    public SolveResponse solve(String puzzleInput) {
        // Convert string input to 2D array
        int[][] grid = new int[9][9];
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                grid[i][j] = Character.getNumericValue(puzzleInput.charAt(i * 9 + j));
            }
        }

        // Create and use your existing Solver
        Solver solver = new Solver(grid);
        boolean solved = solver.solve();

        if (!solved) {
            throw new RuntimeException("Unable to solve puzzle");
        }

        // Get solution grid
        int[][] solution = solver.getGrid();
        
        // Convert solution back to string
        StringBuilder solutionString = new StringBuilder();
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                solutionString.append(solution[i][j]);
            }
        }

        // Get solving steps if your Solver class provides them
        List<String> steps = new ArrayList<>(); // Add actual steps if available
        
        return new SolveResponse(solutionString.toString(), steps);
    }
} 