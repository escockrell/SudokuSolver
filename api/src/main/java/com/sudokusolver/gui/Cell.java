package com.sudokusolver.gui;

public class Cell {
    private int xIndex;
    private int yIndex;
    private int value = 0;
    
    public Cell(int x, int y) {
        xIndex = x;
        yIndex = y;
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
}