// Project: Sudoku Solver
// Package: Graphical User Interface
// Purpose: Create the panel that displays the solve results
// Created by: Ethan Cockrell

package gui;

import java.awt.*;
import javax.swing.*;

public class Results extends JPanel {
    private static JTextArea lvlZeroLabel = new JTextArea();
    private static JTextArea lvlOneLabel = new JTextArea();
    private static JTextArea lvlTwoLabel = new JTextArea();
    private static JTextArea lvlThreeLabel = new JTextArea();
    
    public Results() {
        Frame.setLookAndFeel();
        setLayout(new BoxLayout(this, BoxLayout.Y_AXIS));
        
        JPanel lvlZeroPane = new JPanel();
        lvlZeroPane.setLayout(new FlowLayout(FlowLayout.LEFT));
        lvlZeroLabel.setFont(new Font("Arial", Font.BOLD, 15));
        lvlZeroLabel.setBackground(Color.WHITE);
        lvlZeroLabel.setEditable(false);
        lvlZeroPane.add(lvlZeroLabel);
        add(lvlZeroPane);
        
        JPanel lvlOnePane = new JPanel();
        lvlOnePane.setLayout(new FlowLayout(FlowLayout.LEFT));
        lvlOneLabel.setFont(new Font("Arial", Font.BOLD, 15));
        lvlOneLabel.setBackground(Color.WHITE);
        lvlOneLabel.setEditable(false);
        lvlOnePane.add(lvlOneLabel);
        add(lvlOnePane);
        
        JPanel lvlTwoPane = new JPanel();
        lvlTwoPane.setLayout(new FlowLayout(FlowLayout.LEFT));
        lvlTwoLabel.setFont(new Font("Arial", Font.BOLD, 15));
        lvlTwoLabel.setBackground(Color.WHITE);
        lvlTwoLabel.setEditable(false);
        lvlTwoPane.add(lvlTwoLabel);
        add(lvlTwoPane);
        
        JPanel lvlThreePane = new JPanel();
        lvlThreePane.setLayout(new FlowLayout(FlowLayout.LEFT));
        lvlThreeLabel.setFont(new Font("Arial", Font.BOLD, 15));
        lvlThreeLabel.setBackground(Color.WHITE);
        lvlThreeLabel.setEditable(false);
        lvlThreePane.add(lvlThreeLabel);
        add(lvlThreePane);
        
        setDefaultLabel();
    }
    
    public static void setResultLabels() {
        lvlZeroLabel.setText("Level Zero Changes: " + Solver.levelZeroChanges + 
                "\n\tOne In A Row: " + Solver.oneInARowChanges +
                "\n\tOne In A Column: " + Solver.oneInAColumnChanges +
                "\n\tOne In A Group: " + Solver.oneInAGroupChanges +
                "\n\tOne In A Cell: " + Solver.oneInACellChanges);
        lvlOneLabel.setText("Level One Changes: " + Solver.levelOneChanges +
                "\n\tPhantom: " + (Solver.phantomRowChanges + Solver.phantomColumnChanges + Solver.phantomGroupChanges)
                +"\n\tNaked Pair: " + (Solver.nakedPairRowChanges + Solver.nakedPairColumnChanges +Solver.nakedPairGroupChanges)
                +"\n\tHidden Pair: " + (Solver.hiddenPairRowChanges + Solver.hiddenPairColumnChanges + Solver.hiddenPairGroupChanges));
        lvlTwoLabel.setText("Level Two Changes: " + Solver.levelTwoChanges +
                "\n\tNaked Triple: " + (Solver.nakedTripleRowChanges + Solver.nakedTripleColumnChanges + Solver.nakedTripleGroupChanges)
                +"\n\tHidden Triple: " + (Solver.hiddenTripleRowChanges + Solver.hiddenTripleColumnChanges + Solver.hiddenTripleGroupChanges)
                +"\n\tNaked Quad: " + (Solver.nakedQuadRowChanges + Solver.nakedQuadColumnChanges + Solver.nakedQuadGroupChanges)
                +"\n\tX Wing: " + (Solver.xWingRowChanges + Solver.xWingColumnChanges)
                +"\n\tY Wing: " + (Solver.yWingColumnGroupChanges + Solver.yWingRowGroupChanges + Solver.yWingRowColumnChanges));
        lvlThreeLabel.setText("Level Three Changes: " + Solver.levelThreeChanges +
                "\n\tGuess and Check: " + Solver.guessAndCheckChanges
                +"\n\tBrute Force: " + Solver.bruteForceChanges);
    }
    
    public static void setDefaultLabel() {
        lvlZeroLabel.setText("Results will be shown once a puzzle is entered and 'Solve Puzzle' is clicked.");
        lvlOneLabel.setText("");
        lvlTwoLabel.setText("");
        lvlThreeLabel.setText("");
    }
    
}