// Project: Sudoku Solver
// Package: Graphical User Interface
// Purpose: Create a single cell
// Created by: Ethan Cockrell

package gui;

import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

public class Cell extends JButton implements ActionListener, FocusListener {
    
    private int xIndex;
    private int yIndex;
    private int value = 0;
    private Color cell_bg = Color.YELLOW;
    
    public Cell(int x, int y) {
        xIndex = x;
        yIndex = y;
        
        setFont(new Font("Arial", Font.BOLD, 35));
                
        KeyAdapter key = new KeyAdapter() {
            @Override
            public void keyPressed(KeyEvent event) {
                if (Frame.currentStage == "puzzleInput") {
                    int keyCode = event.getKeyCode();
                    switch(keyCode) {
                        // up arrow
                        case 38:
                        case 87:
                            if (Frame.currentXIndex > 0) {
                                Frame.currentXIndex--;
                                Frame.game[Frame.currentXIndex][Frame.currentYIndex].requestFocus();
                            }
                            break;
                        // down arrow    
                        case 40:
                        case 83:
                            if (Frame.currentXIndex < 8) {
                                Frame.currentXIndex++;
                                Frame.game[Frame.currentXIndex][Frame.currentYIndex].requestFocus();
                            }
                            break;
                        // left arrow    
                        case 37:
                        case 65:
                            if (Frame.currentYIndex > 0) {
                                Frame.currentYIndex--;
                                Frame.game[Frame.currentXIndex][Frame.currentYIndex].requestFocus();
                            }
                            break;
                        // right arrow    
                        case 39:
                        case 68:
                            if (Frame.currentYIndex < 8) {
                                Frame.currentYIndex++;
                                Frame.game[Frame.currentXIndex][Frame.currentYIndex].requestFocus();
                            }
                            break;
                        case 49:
                        case 97:
                            Frame.game[Frame.currentXIndex][Frame.currentYIndex].setValue(1);
                            Frame.game[Frame.currentXIndex][Frame.currentYIndex].setText("1");
                            break;
                        case 50:
                        case 98:
                            Frame.game[Frame.currentXIndex][Frame.currentYIndex].setValue(2);
                            Frame.game[Frame.currentXIndex][Frame.currentYIndex].setText("2");
                            break;
                        case 51:
                        case 99:
                            Frame.game[Frame.currentXIndex][Frame.currentYIndex].setValue(3);
                            Frame.game[Frame.currentXIndex][Frame.currentYIndex].setText("3");
                            break;
                        case 52:
                        case 100:
                            Frame.game[Frame.currentXIndex][Frame.currentYIndex].setValue(4);
                            Frame.game[Frame.currentXIndex][Frame.currentYIndex].setText("4");
                            break;
                        case 53:
                        case 101:
                            Frame.game[Frame.currentXIndex][Frame.currentYIndex].setValue(5);
                            Frame.game[Frame.currentXIndex][Frame.currentYIndex].setText("5");
                            break;
                        case 54:
                        case 102:
                            Frame.game[Frame.currentXIndex][Frame.currentYIndex].setValue(6);
                            Frame.game[Frame.currentXIndex][Frame.currentYIndex].setText("6");
                            break;
                        case 55:
                        case 103:
                            Frame.game[Frame.currentXIndex][Frame.currentYIndex].setValue(7);
                            Frame.game[Frame.currentXIndex][Frame.currentYIndex].setText("7");
                            break;
                        case 56:
                        case 104:
                            Frame.game[Frame.currentXIndex][Frame.currentYIndex].setValue(8);
                            Frame.game[Frame.currentXIndex][Frame.currentYIndex].setText("8");
                            break;
                        case 57:
                        case 105:
                            Frame.game[Frame.currentXIndex][Frame.currentYIndex].setValue(9);
                            Frame.game[Frame.currentXIndex][Frame.currentYIndex].setText("9");
                            break;
                        case 8:
                        case 127:
                            Frame.game[Frame.currentXIndex][Frame.currentYIndex].setValue(0);
                            Frame.game[Frame.currentXIndex][Frame.currentYIndex].setText("");
                            break;
                    }
                }
            }
        };
        
        addActionListener(this);
        addFocusListener(this);
        addKeyListener(key);
    }
    
    public void setXIndex(int x) {
        xIndex = x;
    }
    
    public int getXIndex() {
        return xIndex;
    }
    
    public void setYIndex(int y) {
        yIndex = y;
    }
    
    public int getYIndex() {
        return yIndex;
    }
    
    public void setValue(String value) {
        this.value = Integer.parseInt(value);
    }
    
    public void setValue(int value) {
        this.value = value;
    }
    
    public int getValue() {
        return value;
    }
    
    public void setCellColor(Color choice) {
        this.cell_bg = choice;
    }
    
    @Override
    public void actionPerformed(ActionEvent event) {
        if (Frame.currentStage == "puzzleInput") {
            Frame.currentXIndex = this.getXIndex();
            Frame.currentYIndex = this.getYIndex();
            this.setBackground(cell_bg);
        }
    }
    
    @Override
    public void focusGained(FocusEvent event) {
        if (Frame.currentStage == "puzzleInput") {
            Frame.currentXIndex = this.getXIndex();
            Frame.currentYIndex = this.getYIndex();
            this.setBackground(cell_bg);
        }
    }
    
    @Override
    public void focusLost(FocusEvent event) {
        this.setBackground(Color.LIGHT_GRAY);
    }
    
}