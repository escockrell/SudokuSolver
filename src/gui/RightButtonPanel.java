// Project: Sudoku Solver
// Package: Graphical User Interface
// Purpose: Create the panel that goes along the right side of the main tab
// Created by: Ethan Cockrell

package gui;

import java.awt.event.*;
import javax.swing.*;

public class RightButtonPanel extends JPanel implements ActionListener, FocusListener {
    String[] choices = { "Solve Puzzle", "Clear All" };
    JButton buttonPanel[] = new JButton[2];
    
    public RightButtonPanel() {
        setLayout(new BoxLayout(this, BoxLayout.Y_AXIS));
        for (int i = 0; i < 2; i++) {
            buttonPanel[i] = new JButton(choices[i]);
            buttonPanel[i].addActionListener(this);
            buttonPanel[i].addFocusListener(this);
            add(buttonPanel[i]);
        }
    }
    
    @Override
    public void actionPerformed(ActionEvent event) {
        JButton source = (JButton) event.getSource();
        // Solve Button
        if (source == buttonPanel[0]) {
            Frame.intGame = Solver.convertGame(Frame.game);
            if (Solver.check(Frame.intGame) == false) {
                JOptionPane.showMessageDialog(Frame.pane, "The puzzle is not a proper Sudoku puzzle\n" + "Please correct, then hit Solve",
                        "Input Error", JOptionPane.WARNING_MESSAGE);
            } else {
                int[][] tempGame = Solver.solveGame(Frame.game);
                //if (Solver.solved) {
                    Frame.intGame = tempGame;
                    Changes.setStartChanges();
                    Changes.setChangeFrame();
                    Frame.currentStage = "puzzleSolved";
                    Frame.setSolvedFrame();
                    Results.setResultLabels();
                    Solver.updateFrame(Frame.intGame);
                    System.out.println("\nMain Count Variables:");
                    System.out.println("Solver.totalChangeCount: " + Solver.totalChangeCount);
                    System.out.println("Solver.mainChangeCount: " + Solver.mainChangeCount);
                    System.out.println("Solver.possibleChangeCount: " + Solver.possibleChangeCount);
                    System.out.println("Solver.mainChangePossibleCount: " + Solver.mainChangePossibleCount);
                    System.out.println("Solver.possibleChangePossibleCount: " + Solver.possibleChangePossibleCount);
                    System.out.println("\n---------------------------------------------------------------------------\n");
    //                Solver.saveTotalChangeTypeToCSV();
    //                Solver.saveMainChangeNumberToCSV();
    //                Solver.saveMainChangeRowToCSV();
    //                Solver.saveMainChangeColumnToCSV();
    //                Solver.saveMainChangePossibleOrderToCSV();
    //                Solver.saveMainChangePossibleNumberToCSV();
    //                Solver.saveMainChangePossibleRowToCSV();
    //                Solver.saveMainChangePossibleColumnToCSV();
    //                Solver.savePossibleChangeOrderToCSV();
    //                Solver.savePossibleChangeNumberToCSV();
    //                Solver.savePossibleChangeRowToCSV();
    //                Solver.savePossibleChangeColumnToCSV();
    //                Solver.saveMainChangeLogToCSV();
    //                Solver.savePossibleChangeLogToCSV();
    //                Solver.printGame();
//                    Solver.printPossible();
    //                Solver.printChangeLog();
    //                Solver.printPossibleChangeLog();

                    JOptionPane.showMessageDialog(Frame.pane, "Level Zero Changes: " + Solver.levelZeroChanges
                        + "\nLevel One Changes: " + Solver.levelOneChanges
                        + "\nLevel Two Changes: " + Solver.levelTwoChanges
                        + "\nLevel Three Changes: " + Solver.levelThreeChanges
                        + "\nGo to Results tab to see a more detailed breakdown",
                            "Change Breakdown", JOptionPane.INFORMATION_MESSAGE);
    //                System.out.println("Solver.solved = " + Solver.solved);
    //                System.out.println("Level 0 Changes = " + Solver.levelZeroChanges);
    //                System.out.println("Phantom Changes = " + Solver.phantomChanges);
    //                System.out.println("Hidden Pair Changes = " + Solver.hiddenPairChanges);
    //                System.out.println("Iteration Changes = " + Solver.iterationChanges);
                /*} else {
                    Solver.resetAll();
                    JOptionPane.showMessageDialog(Frame.pane, "The puzzle is not a proper Sudoku puzzle\n" + "Please correct, then hit Solve",
                        "Input Error", JOptionPane.WARNING_MESSAGE);
                }*/
            }
        }
        // Clear All button
        if (source == buttonPanel[1]) {
            for (int i = 0; i < 9; i++) {
                for (int j = 0; j < 9; j++) {
                    Frame.game[i][j].setText("");
                    Frame.game[i][j].setValue("0");
                }
            }
        }  
    }
    
    @Override
    public void focusGained(FocusEvent event) {
        Frame.game[Frame.currentXIndex][Frame.currentYIndex].requestFocus();
    }
    
    @Override
    public void focusLost(FocusEvent event) {
        // do nothing
    }
    
}
