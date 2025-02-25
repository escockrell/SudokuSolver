package com.sudokusolver.model;

import java.util.List;

public class SolveResponse {
    private String solution;
    private SolveMetrics metrics;

    public SolveResponse(String solution, SolveMetrics metrics) {
        this.solution = solution;
        this.metrics = metrics;
    }

    public String getSolution() {
        return solution;
    }

    public SolveMetrics getMetrics() {
        return metrics;
    }
} 