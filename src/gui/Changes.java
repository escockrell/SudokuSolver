// Project: Sudoku Solver
// Package: Graphical User Interface
// Purpose: Create the tab that walks through the changes
// Created by: Ethan Cockrell

package gui;

import java.awt.*;
import javax.swing.*;

public class Changes extends JPanel {
    private static JPanel masterPane = new JPanel();
    public static ChangeBackground pane = new ChangeBackground();
    private static ChangeButtonPanel changePane = new ChangeButtonPanel();
    private static JLabel changeLabel = new JLabel();
    public static ResultCell[][] game = new ResultCell[9][9];
    public static int currentTotalChange = 0;
    public static String currentChangeType;
    public static String previousChangeType;
    public static int currentMainChange = 0;
    public static int currentPossibleChange = 0;
    public static int currentPossibleChangeOrder = 0;
    public static int currentMainPossibleChange = 0;
    public static int currentMainPossibleOrder = 0;
    private static JTextArea changeDescription = new JTextArea();
    
    public Changes() {
        setLayout(new BorderLayout());
        masterPane.setLayout(new BorderLayout());
        
        changeLabel.setFont(new Font("Arial", Font.BOLD, 15));
        changeLabel.setText("Changes will be shown once a puzzle is entered and 'Solve Puzzle' is clicked.");
        changeDescription.setEditable(false);
        
        pane.setLayout(new GridLayout(9, 9, 10, 10));

        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                game[i][j] = new ResultCell(i,j);
                pane.add(game[i][j]);
            }
        }
        masterPane.add(changeLabel, BorderLayout.NORTH);
        add(masterPane, BorderLayout.CENTER);
        
    }
    
    public static void setStartChanges() {
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                // determine whether the cell has a number or not
                if (Solver.startGame[i][j] != 0) {
                    game[i][j].setToStartNumber(Solver.startGame[i][j]);
                } else {
                    for (int k = 0; k < 9; k++) {
                        if (Solver.startPossible[i][j][k] == 0) {
                            game[i][j].removePossibleOption(k);
                        }
                    }
                }
            }
        }
    }
    
    public static void setChangeFrame() {
        masterPane.remove(changeLabel);
        masterPane.add(pane, BorderLayout.CENTER);
        masterPane.add(changePane, BorderLayout.EAST);
        setDefaultChangeDescription();
        masterPane.add(changeDescription, BorderLayout.SOUTH);
        masterPane.validate();
        masterPane.repaint();
    }
    
    public static void setDefaultChangeDescription() {
        changeDescription.setText("Change description will show here when you click on 'Next'");
    }
    
    public static void setChangeDescription(String changeType) {
        if (currentTotalChange < Solver.totalChangeCount) {
            if (changeType.equals("main")) {
                changeDescription.setText("Change #" + (currentTotalChange+1) + 
                        ", Type: main, Method: " + Solver.mainChangeMethod.get(currentMainChange) +
                        "\nDescription: " + Solver.mainChangeDescription.get(currentMainChange));
            }

            if (changeType.equals("possible")) {
                changeDescription.setText("Change #" + (currentTotalChange+1) + 
                        ", Type: possible, Method: " + Solver.possibleChangeMethod.get(currentPossibleChangeOrder) +
                        "\nDescription: " + Solver.possibleChangeDescription.get(currentPossibleChangeOrder));
            }
        } else if (currentTotalChange == Solver.totalChangeCount) {
            if (Solver.solved == true) {
                changeDescription.setText("The final solved puzzle is displayed above");
            } else {
                changeDescription.setText("The puzzle the program was able to solve is displayed above");
            }
        }
    }
    
    public static void setPreviousChangeDescription() {
        if (currentTotalChange > 0) {
            if (previousChangeType.equals("main") && currentMainChange > 0) {
                changeDescription.setText("Change #" + (currentTotalChange) + 
                        ", Type: main, Method: " + Solver.mainChangeMethod.get(currentMainChange-1) +
                        "\nDescription: " + Solver.mainChangeDescription.get(currentMainChange-1));
            }

            if (previousChangeType.equals("possible") && currentPossibleChangeOrder > 0) {
                if (currentChangeType.equals("main")) {
                    changeDescription.setText("Change #" + (currentTotalChange) + 
                        ", Type: possible, Method: " + Solver.possibleChangeMethod.get(currentPossibleChangeOrder) +
                        "\nDescription: " + Solver.possibleChangeDescription.get(currentPossibleChangeOrder));
                } else {
                    changeDescription.setText("Change #" + (currentTotalChange) + 
                        ", Type: possible, Method: " + Solver.possibleChangeMethod.get(currentPossibleChangeOrder-1) +
                        "\nDescription: " + Solver.possibleChangeDescription.get(currentPossibleChangeOrder-1));
                }
            }
        }
    }
    
    public static void resetAll() {
        masterPane.remove(pane);
        masterPane.remove(changePane);
        masterPane.remove(changeDescription);
        
        pane = new ChangeBackground();
        game = new ResultCell[9][9];
        
        currentTotalChange = 0;
        currentChangeType = null;
        previousChangeType = null;
        currentMainChange = 0;
        currentPossibleChange = 0;
        currentPossibleChangeOrder = 0;
        currentMainPossibleChange = 0;
        currentMainPossibleOrder = 0;
        
        pane.setLayout(new GridLayout(9, 9, 10, 10));

        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                game[i][j] = new ResultCell(i,j);
                pane.add(game[i][j]);
            }
        }
        
        changeLabel.setText("Changes will be shown once a puzzle is entered and 'Solve Puzzle' is clicked.");
        masterPane.add(changeLabel, BorderLayout.NORTH);
        
        masterPane.validate();
        masterPane.repaint();
    }
            
}