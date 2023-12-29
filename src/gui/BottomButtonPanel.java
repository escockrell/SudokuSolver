// Project: Sudoku Solver
// Package: Graphical User Interface
// Purpose: Create the panel that goes along the bottom of the main tab
// Created by: Ethan Cockrell

package gui;

import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

public class BottomButtonPanel extends JPanel implements ActionListener, FocusListener {
    String[] choices = { "1", "2", "3", "4", "5", "6", "7", "8", "9", "Reset" };
    JButton buttonPanel[] = new JButton[10];
    
    public BottomButtonPanel() {
        setLayout(new FlowLayout());
        for (int i = 0; i < 10; i++) {
            buttonPanel[i] = new JButton(choices[i]);
            buttonPanel[i].addActionListener(this);
            buttonPanel[i].addFocusListener(this);
            add(buttonPanel[i]);
        }
    }
    
    @Override
    public void actionPerformed(ActionEvent event) {
        JButton source = (JButton) event.getSource();
        boolean flag = false;
        if (source != buttonPanel[9]) {
            Frame.game[Frame.currentXIndex][Frame.currentYIndex].setValue(source.getText());
            Frame.game[Frame.currentXIndex][Frame.currentYIndex].setText(source.getText());
//            System.out.println("Value of cell at (" + Frame.currentXIndex + ", " + Frame.currentYIndex + "): " + Frame.game[Frame.currentXIndex][Frame.currentYIndex].getValue() + "\n");
        }
        else {
            Frame.game[Frame.currentXIndex][Frame.currentYIndex].setText("");
            Frame.game[Frame.currentXIndex][Frame.currentYIndex].setValue("0");
//            System.out.println("Value of cell at (" + Frame.currentXIndex + ", " + Frame.currentYIndex + "): " + Frame.game[Frame.currentXIndex][Frame.currentYIndex].getValue() + "\n");
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