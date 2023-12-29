// Project: Sudoku Solver
// Package: Graphical User Interface
// Purpose: Create the panel that goes along the right side of the main tab after the puzzle has been solved
// Created by: Ethan Cockrell

package gui;

import java.awt.event.*;
import javax.swing.*;

public class RestartButtonPanel extends JPanel implements ActionListener {
    JLabel restartLabel1 = new JLabel(" Click 'Restart' to ");
    JLabel restartLabel2 = new JLabel("   enter a new");
    JLabel restartLabel3 = new JLabel(" Sudoku puzzle");
    JButton restartButton = new JButton("Restart");
    
    public RestartButtonPanel() {
        setLayout(new BoxLayout(this, BoxLayout.Y_AXIS));
        restartButton.addActionListener(this);
        add(restartLabel1);
        add(restartLabel2);
        add(restartLabel3);
        add(restartButton);
    }
    
    @Override
    public void actionPerformed(ActionEvent event) {
        JButton source = (JButton) event.getSource();
        if (source == restartButton) {
            Solver.resetAll();
            Changes.resetAll();
            ChangeButtonPanel.resetAll();
            Frame.resetAll();
        }
    }
    
}
