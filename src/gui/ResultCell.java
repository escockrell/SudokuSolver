// Project: Sudoku Solver
// Package: Graphical User Interface
// Purpose: Create a single cell for the puzzle on the changes tab
// Created by: Ethan Cockrell

package gui;

import java.awt.*;
import javax.swing.*;

public class ResultCell extends JPanel {
    private boolean isNumber;
    private JLabel[] possible = new JLabel[9];
    private JLabel number = new JLabel();
    private Font possibleFont = new Font("Arial", Font.PLAIN, 12);
    private Font numberFont = new Font("Arial", Font.PLAIN, 35);
    private Font numberFontStart = new Font("Arial", Font.BOLD, 35);
    
    public ResultCell(int r, int c) {
        isNumber = false;
        
        setLayout(new GridLayout(3, 3, 1, 1));
        setBackground(Color.WHITE);
        
        for (int i = 0; i < 9; i++) {
            possible[i] = new JLabel(String.valueOf(i+1));
            possible[i].setFont(possibleFont);
            possible[i].setHorizontalAlignment(SwingConstants.CENTER);
            add(possible[i]);
        }
    }
    
    public void setToNumber(String num) {
        isNumber = true;
        for (int i = 0; i < 9; i++) {
            remove(possible[i]);
        }
        number.setText(num);
        number.setFont(numberFont);
        number.setHorizontalAlignment(SwingConstants.CENTER);
        number.setVerticalAlignment(SwingConstants.CENTER);
        setLayout(new BorderLayout());
        add(number, BorderLayout.CENTER);
        validate();
        repaint();
    }
    
    public void setToStartNumber(int num) {
        isNumber = true;
        for (int i = 0; i < 9; i++) {
            remove(possible[i]);
        }
        number.setText(String.valueOf(num));
        number.setFont(numberFontStart);
        number.setHorizontalAlignment(SwingConstants.CENTER);
        number.setVerticalAlignment(SwingConstants.CENTER);
        setLayout(new BorderLayout());
        add(number, BorderLayout.CENTER);
        validate();
        repaint();
    }
    
    public void setToStartPossiblePanels() {
        setBackground(Color.WHITE);
        if (isNumber) {
            remove(number);
            setLayout(new GridLayout(3, 3, 1, 1));
            for (int i = 0; i < 9; i++) {
                possible[i].setText(String.valueOf(i+1));
                possible[i].setFont(possibleFont);
                possible[i].setHorizontalAlignment(SwingConstants.CENTER);
                possible[i].setBackground(Color.WHITE);
                possible[i].setOpaque(false);
                add(possible[i]);
            }
        } else {
            for (int i = 0; i < 9; i++) {
                possible[i].setText(String.valueOf(i+1));
                possible[i].setBackground(Color.WHITE);
                possible[i].setOpaque(false);
            }
        }
        validate();
        repaint();
    }
    
    public void resetPossiblePanels() {
        isNumber = false;
        remove(number);
        setLayout(new GridLayout(3, 3, 1, 1));
        for (int i = 0; i < 9; i++) {
            possible[i].setText("");
            possible[i].setFont(possibleFont);
            possible[i].setHorizontalAlignment(SwingConstants.CENTER);
            possible[i].setOpaque(false);
            add(possible[i]);
        }
        validate();
        repaint();
    }
    
    public void addPossibleOption(int k) {
        possible[k].setText(String.valueOf(k+1));
        possible[k].setOpaque(false);
    }
    
    public void removePossibleOption(int k) {
        possible[k].setText("");
        possible[k].setOpaque(false);
    }
    
    public void highlightPossibleOption(int k) {
        possible[k].setOpaque(true);
        possible[k].setBackground(Color.YELLOW);
    }
    
    public void unhighlightPossibleOption(int k) {
        possible[k].setOpaque(false);
        possible[k].setBackground(Color.WHITE);
    }
}
