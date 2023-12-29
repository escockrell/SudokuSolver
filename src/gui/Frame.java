// Project: Sudoku Solver
// Package: Graphical User Interface
// Purpose: Create the window frame that house the GUI and hold the main method
// Created by: Ethan Cockrell

package gui;

import java.awt.*;
import javax.swing.*;

public class Frame extends JFrame {
    
    public static int currentXIndex;
    public static int currentYIndex;
    public static String currentStage;
    public static Cell game[][] = new Cell[9][9];
    public static int intGame[][];
    private static JPanel masterPane = new JPanel();
    public static Background pane = new Background();
    private static JTabbedPane tabs = new JTabbedPane();
    private static Results resultPane = new Results();
    private static JLabel topLabel = new JLabel();
    private static RightButtonPanel rightPane = new RightButtonPanel();
    private static BottomButtonPanel bottomPane = new BottomButtonPanel();
    private static RestartButtonPanel restartPane = new RestartButtonPanel();
    public static Changes changePane = new Changes();
    
    public Frame() {
        super("Sudoku Solver");
        setSize(800, 700);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        
        masterPane.setLayout(new BorderLayout());
        topLabel.setFont(new Font("Arial", Font.BOLD, 15));
        topLabel.setText("Enter all of the numbers provided by the unsolved puzzle");
        currentStage = "puzzleInput";
        
        pane.setLayout(new GridLayout(9, 9, 10, 10));
        
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                game[i][j] = new Cell(i, j);
                pane.add(game[i][j]);
            }
        }
        
        masterPane.add(pane, BorderLayout.CENTER);
        masterPane.add(topLabel, BorderLayout.NORTH);
        masterPane.add(bottomPane, BorderLayout.SOUTH);
        masterPane.add(rightPane, BorderLayout.EAST);
        tabs.addTab("Main", masterPane);
        tabs.addTab("Results", resultPane);
        tabs.addTab("Changes", changePane);
        add(tabs);

        setVisible(true);
    }
    
       
    public static void setSolvedFrame() {
        Frame.setLookAndFeel();
        if (Solver.solved == true) {
            topLabel.setText("The solved puzzle is displayed below");
        } else {
            topLabel.setText("Since the puzzle wasn't solved, the changes this program could make are displayed below");
        }
        
        masterPane.remove(bottomPane);
        masterPane.remove(rightPane);
        masterPane.add(restartPane, BorderLayout.EAST);
        masterPane.validate();
        masterPane.repaint();
    }
    
    public static void setLookAndFeel() {
        try {
            UIManager.setLookAndFeel(
                    "javax.swing.plaf.nimbus.NimbusLookAndFeel"
            );
        } catch (Exception exc) {
            System.out.println(exc.getMessage());
        }
    }
    
    public static void resetAll() {
        masterPane.remove(pane);
        masterPane.remove(restartPane);
        
        game = new Cell[9][9];
        intGame = new int[9][9];
        pane = new Background();
        resultPane.setDefaultLabel();
        topLabel.setText("Enter all of the numbers provided by the unsolved puzzle");
        currentStage = "puzzleInput";
        
        pane.setLayout(new GridLayout(9, 9, 10, 10));
        
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                game[i][j] = new Cell(i, j);
                pane.add(game[i][j]);
            }
        }
                
        masterPane.add(pane, BorderLayout.CENTER);
        masterPane.add(rightPane, BorderLayout.EAST);
        masterPane.add(bottomPane, BorderLayout.SOUTH);
        masterPane.validate();
        masterPane.repaint();
        
    }
    
    public static void main(String[] arguments) {
        Frame.setLookAndFeel();
        Frame frame = new Frame();
    }
   
}
