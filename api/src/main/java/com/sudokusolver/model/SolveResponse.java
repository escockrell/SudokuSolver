package com.sudokusolver.model;

import java.util.List;

public class SolveResponse {
    private String solution;
    private List<String> steps;

    public SolveResponse(String solution, List<String> steps) {
        this.solution = solution;
        this.steps = steps;
    }

    public String getSolution() {
        return solution;
    }

    public List<String> getSteps() {
        return steps;
    }
} 