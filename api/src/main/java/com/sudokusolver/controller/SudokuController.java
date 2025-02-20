package com.sudokusolver.controller;

import com.sudokusolver.model.SolveRequest;
import com.sudokusolver.model.SolveResponse;
import com.sudokusolver.service.SudokuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SudokuController {
    
    @Autowired
    private SudokuService sudokuService;

    @PostMapping("/solve")
    public SolveResponse solvePuzzle(@RequestBody SolveRequest request) {
        return sudokuService.solve(request.getPuzzle());
    }
} 