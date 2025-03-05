package com.sudokusolver.gui;

public class Frame {
    public static int currentXIndex;
    public static int currentYIndex;
    public static String currentStage;
    public static Cell[][] game = new Cell[9][9];
    public static int[][] intGame;
    
    public static void resetAll() {
        game = new Cell[9][9];
        intGame = new int[9][9];
        currentStage = "puzzleInput";
        
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                game[i][j] = new Cell(i, j);
            }
        }
    }
} 