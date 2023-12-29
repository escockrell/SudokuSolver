// Project: Sudoku Solver
// Package: Graphical User Interface
// Purpose: Create the background panel for the puzzle on the main tab
// Created by: Ethan Cockrell

package gui;

import java.awt.*;
import java.awt.geom.*;
import javax.swing.*;

public class Background extends JPanel {
    private Color bg_color = Color.GRAY;
  
   @Override 
   public void paintComponent(Graphics comp) {
       Graphics2D comp2D = (Graphics2D) comp;
       comp2D.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        
       comp2D.setColor(bg_color);
       Rectangle2D.Float bg = new Rectangle2D.Float(0F, 0F, getSize().width, getSize().height);
       comp2D.fill(bg);
        
       comp2D.setColor(Color.BLACK);
              
       // Bounds of the top left button of the game (x, y, width, height)
       Rectangle2D.Float bounds = new Rectangle2D.Float(Frame.game[0][0].getX(), Frame.game[0][0].getY(), Frame.game[0][0].getWidth(), Frame.game[0][0].getHeight());
       
       // Painting the vertical lines
       Float Thickness[] = {3F, 3F, 6F, 3F, 3F, 6F, 3F, 3F};
       Float yStart = bounds.y;
       Float yEnd = 9*bounds.height + 80F;
       Float xStart = bounds.x - 5F;
       Float xEnd = xStart;
       
       for (int i = 0; i < 8; i++) {
            BasicStroke bs = new BasicStroke(Thickness[i], BasicStroke.CAP_ROUND, BasicStroke.JOIN_ROUND);
            comp2D.setStroke(bs);
            xStart += bounds.width + 10F;
            xEnd = xStart;
            Line2D.Float line = new Line2D.Float(xStart, yStart, xEnd, yEnd);
            comp2D.draw(line);
       }
       
       // Painting the horizontal lines
       xStart = bounds.x;
       xEnd = bounds.x + 9*bounds.width + 80F;
       yStart = bounds.y - 5F;
       yEnd = yStart;
       
       for (int i = 0; i < 8; i++) {
            BasicStroke bs = new BasicStroke(Thickness[i], BasicStroke.CAP_ROUND, BasicStroke.JOIN_ROUND);
            comp2D.setStroke(bs);
            yStart += bounds.height + 10F;
            yEnd = yStart;
            Line2D.Float line = new Line2D.Float(xStart, yStart, xEnd, yEnd);
            comp2D.draw(line);
       }
   }
   
   public void setBackgroundColor(Color choice) {
       bg_color = choice;
       this.repaint();
   }
  
} 