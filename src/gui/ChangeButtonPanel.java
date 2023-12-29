// Project: Sudoku Solver
// Package: Graphical User Interface
// Purpose: Create the panel that goes along the right side of the changes tab
// Created by: Ethan Cockrell

package gui;

import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

public class ChangeButtonPanel extends JPanel implements ActionListener, FocusListener {
    private static JPanel masterPane = new JPanel();
    static String[]  choices = { "Next", "Previous", "Reset" };
    static JButton buttonPanel[] = new JButton[3];
    static int row;
    static int column;
    static int number;
    static int prevRow;
    static int prevColumn;
    static int prevOrder;
    static int prevOrderStart;
    public static boolean endMainChangePossibleFlag = false;
    public static boolean endPossibleChangeFlag = false;
    public static boolean endPossibleChangeFlagPrev = false;
    public static boolean startPossibleChangeFlag = false;
    public static boolean startMainPossibleChangeFlag = false;
    
    public ChangeButtonPanel() {
        setLayout(new BorderLayout());
        masterPane.setLayout(new BoxLayout(masterPane, BoxLayout.Y_AXIS));
        for (int i = 0; i < 3; i++) {
            buttonPanel[i] = new JButton(choices[i]);
            buttonPanel[i].addActionListener(this);
            buttonPanel[i].addFocusListener(this);
            masterPane.add(buttonPanel[i]);
        }
        add(masterPane);
    }
    
    @Override
    public void actionPerformed(ActionEvent event) {
        JButton source = (JButton) event.getSource();
        // Next button
        if (source == buttonPanel[0]) {
//            System.out.println("*****NEXT BUTTON PRESSED*****\n");
//            System.out.println("Before:");
//            System.out.println("Changes.currentTotalChange: " + Changes.currentTotalChange);
//            System.out.println("Changes.currentChangeType: " + Changes.currentChangeType);
//            System.out.println("Changes.previousChangeType: " + Changes.previousChangeType);
//            System.out.println("Changes.currentMainChange: " + Changes.currentMainChange);
//            System.out.println("Changes.currentMainPossibleOrder: " + Changes.currentMainPossibleOrder);
//            System.out.println("Changes.currentMainPossibleChange: " + Changes.currentMainPossibleChange);
//            System.out.println("Changes.currentPossibleChangeOrder: " + Changes.currentPossibleChangeOrder);
//            System.out.println("Changes.currentPossibleChange: " + Changes.currentPossibleChange);
//            System.out.println("endMainChangePossibleFlag: " + endMainChangePossibleFlag);
//            System.out.println("endPossibleChangeFlag: " + endPossibleChangeFlag);
//            System.out.println("endPossibleChangeFlagPrev: " + endPossibleChangeFlagPrev);
//            System.out.println("startMainPossibleChangeFlag: " + startMainPossibleChangeFlag);
//            System.out.println("startPossibleChangeFlag: " + startPossibleChangeFlag);
//            System.out.println();
            
            // reset flags for the previous button
            startPossibleChangeFlag = false;
            startMainPossibleChangeFlag = false;
            
            if (!endMainChangePossibleFlag) {
                if (Changes.currentTotalChange < Solver.totalChangeCount) {
                    Changes.currentChangeType = (String) Solver.totalChangeType.get(Changes.currentTotalChange);

                    // Main change action
                    if (Changes.currentChangeType.equals("main")) {
                        row = (int) Solver.mainChangeRow.get(Changes.currentMainChange);
                        column = (int) Solver.mainChangeColumn.get(Changes.currentMainChange);
                        Changes.game[row][column].setBackground(Color.YELLOW);
                        Changes.setChangeDescription(Changes.currentChangeType);

                        // if this is NOT the first change, update cells related to the previous change
                        if (Changes.currentTotalChange > 0) {
                            Changes.previousChangeType = (String) Solver.totalChangeType.get(Changes.currentTotalChange-1);
                            // if previous change was a main change, do this
                            if (Changes.previousChangeType.equals("main")) {
                                prevRow = (int) Solver.mainChangeRow.get(Changes.currentMainChange-1);
                                prevColumn = (int) Solver.mainChangeColumn.get(Changes.currentMainChange-1);
                                Changes.game[prevRow][prevColumn].setToNumber((String) Solver.mainChangeNumber.get(Changes.currentMainChange-1));
                                Changes.game[prevRow][prevColumn].setBackground(Color.WHITE);

                                // remove all possible options that the previous main change eliminated
                                if (Changes.currentMainPossibleChange < Solver.mainChangePossibleCount) {
                                    Changes.currentMainPossibleOrder = (int) Solver.mainChangePossibleOrder.get(Changes.currentMainPossibleChange);
                                    while((int) Solver.mainChangePossibleOrder.get(Changes.currentMainPossibleChange) == Changes.currentMainPossibleOrder &&
                                            !endMainChangePossibleFlag) {
                                        row = (int) Solver.mainChangePossibleRow.get(Changes.currentMainPossibleChange);
                                        column = (int) Solver.mainChangePossibleColumn.get(Changes.currentMainPossibleChange);
                                        if (!(row == prevRow && column == prevColumn)) {
                                            number = (int) Solver.mainChangePossibleNumber.get(Changes.currentMainPossibleChange);
                                            Changes.game[row][column].removePossibleOption(number-1);
                                        }

                                        if (Changes.currentMainPossibleChange < Solver.mainChangePossibleCount-1) {
                                            Changes.currentMainPossibleChange++;
                                        } else {
                                            endMainChangePossibleFlag = true;
                                        }
                                    }
                                }
                            }

                            // if previous change was a possible change, do this
                            if (Changes.previousChangeType.equals("possible")) {
                                prevOrder = Changes.currentPossibleChangeOrder;
                                prevOrderStart = Solver.possibleChangeOrder.indexOf(prevOrder);
                                   
                                // remove all possible options that the previous possible change eliminated
                                while ((int) Solver.possibleChangeOrder.get(prevOrderStart) == prevOrder && !endPossibleChangeFlagPrev) {
                                    row = (int) Solver.possibleChangeRow.get(prevOrderStart);
                                    column = (int) Solver.possibleChangeColumn.get(prevOrderStart);
                                    number = (int) Solver.possibleChangeNumber.get(prevOrderStart);
                                    Changes.game[row][column].removePossibleOption(number-1);

                                    if (prevOrderStart < Solver.possibleChangePossibleCount-1) {
                                        prevOrderStart++;
                                    } else {
                                        endPossibleChangeFlagPrev = true;
                                    }
                                }
                            }

                        }

                        Changes.currentMainChange++;
                    }

                    // Possible change action
                    if (Changes.currentChangeType.equals("possible")) {
                        Changes.currentPossibleChangeOrder = (int) Solver.possibleChangeOrder.get(Changes.currentPossibleChange);
                        Changes.setChangeDescription(Changes.currentChangeType);
                        
                        // highlight all possible options that are made by the current possible change
                        while ((int) Solver.possibleChangeOrder.get(Changes.currentPossibleChange) == Changes.currentPossibleChangeOrder && !endPossibleChangeFlag) {
                            row = (int) Solver.possibleChangeRow.get(Changes.currentPossibleChange);
                            column = (int) Solver.possibleChangeColumn.get(Changes.currentPossibleChange);
                            number = (int) Solver.possibleChangeNumber.get(Changes.currentPossibleChange);
                            Changes.game[row][column].highlightPossibleOption(number-1);

                            if (Changes.currentPossibleChange < Solver.possibleChangePossibleCount-1) {
                                Changes.currentPossibleChange++;
                            } else {
                                endPossibleChangeFlag = true;
                            }
                        }

                        // if this is NOT the first change, update cells related to the previous change
                        if (Changes.currentTotalChange > 0) {
                            Changes.previousChangeType = (String) Solver.totalChangeType.get(Changes.currentTotalChange-1);

                            // if previous change was a main change, do this
                            if (Changes.previousChangeType.equals("main")) {
                                prevRow = (int) Solver.mainChangeRow.get(Changes.currentMainChange-1);
                                prevColumn = (int) Solver.mainChangeColumn.get(Changes.currentMainChange-1);
                                Changes.game[prevRow][prevColumn].setToNumber((String) Solver.mainChangeNumber.get(Changes.currentMainChange-1));
                                Changes.game[prevRow][prevColumn].setBackground(Color.WHITE);

                                // remove all possible options that the previous main change eliminated
                                if (Changes.currentMainPossibleChange < Solver.mainChangePossibleCount) {
                                    Changes.currentMainPossibleOrder = (int) Solver.mainChangePossibleOrder.get(Changes.currentMainPossibleChange);
                                    while((int) Solver.mainChangePossibleOrder.get(Changes.currentMainPossibleChange) == Changes.currentMainPossibleOrder &&
                                            !endMainChangePossibleFlag) {
                                        row = (int) Solver.mainChangePossibleRow.get(Changes.currentMainPossibleChange);
                                        column = (int) Solver.mainChangePossibleColumn.get(Changes.currentMainPossibleChange);
                                        if (!(row == prevRow && column == prevColumn)) {
                                            number = (int) Solver.mainChangePossibleNumber.get(Changes.currentMainPossibleChange);
                                            Changes.game[row][column].removePossibleOption(number-1);
                                        }

                                        if (Changes.currentMainPossibleChange < Solver.mainChangePossibleCount-1) {
                                            Changes.currentMainPossibleChange++;
                                        } else {
                                            endMainChangePossibleFlag = true;
                                        }
                                    }
                                }
                            }

                            // if previous change was a possible change, do this
                            if (Changes.previousChangeType.equals("possible")) {
                                prevOrder = Changes.currentPossibleChangeOrder-1;
                                prevOrderStart = Solver.possibleChangeOrder.indexOf(prevOrder);

                                // remove all possible options that the previous possible change eliminated
                                while ((int) Solver.possibleChangeOrder.get(prevOrderStart) == prevOrder && !endPossibleChangeFlagPrev) {
                                    row = (int) Solver.possibleChangeRow.get(prevOrderStart);
                                    column = (int) Solver.possibleChangeColumn.get(prevOrderStart);
                                    number = (int) Solver.possibleChangeNumber.get(prevOrderStart);
                                    Changes.game[row][column].removePossibleOption(number-1);

                                    if (prevOrderStart < Solver.possibleChangePossibleCount-1) {
                                        prevOrderStart++;
                                    } else {
                                        endPossibleChangeFlagPrev = true;
                                    }
                                }
                            }
                        }

                    }

                    Changes.currentTotalChange++;

                } else {
                    // Perform the last change of the puzzle
                    prevRow = (int) Solver.mainChangeRow.get(Changes.currentMainChange-1);
                    prevColumn = (int) Solver.mainChangeColumn.get(Changes.currentMainChange-1);
                    Changes.game[prevRow][prevColumn].setToNumber((String) Solver.mainChangeNumber.get(Changes.currentMainChange-1));
                    Changes.game[prevRow][prevColumn].setBackground(Color.WHITE);
                    Changes.setChangeDescription(Changes.currentChangeType);
                    Changes.currentMainPossibleOrder = (int) Solver.mainChangePossibleOrder.get(Changes.currentMainPossibleChange);
                    endMainChangePossibleFlag = true;
                }

//                System.out.println("After:");
//                System.out.println("Changes.currentTotalChange: " + Changes.currentTotalChange);
//                System.out.println("Changes.currentChangeType: " + Changes.currentChangeType);
//                System.out.println("Changes.previousChangeType: " + Changes.previousChangeType);
//                System.out.println("Changes.currentMainChange: " + Changes.currentMainChange);
//                System.out.println("Changes.currentMainPossibleOrder: " + Changes.currentMainPossibleOrder);
//                System.out.println("Changes.currentMainPossibleChange: " + Changes.currentMainPossibleChange);
//                System.out.println("Changes.currentPossibleChangeOrder: " + Changes.currentPossibleChangeOrder);
//                System.out.println("Changes.currentPossibleChange: " + Changes.currentPossibleChange);
//                System.out.println("endMainChangePossibleFlag: " + endMainChangePossibleFlag);
//                System.out.println("endPossibleChangeFlag: " + endPossibleChangeFlag);
//                System.out.println("endPossibleChangeFlagPrev: " + endPossibleChangeFlagPrev);
//                System.out.println("startMainPossibleChangeFlag: " + startMainPossibleChangeFlag);
//                System.out.println("startPossibleChangeFlag: " + startPossibleChangeFlag);
//                System.out.println("\n---------------------------------------------------------------------------\n");
            }
        }
        // Previous button
        if (source == buttonPanel[1]) {
//            System.out.println("*****PREVIOUS BUTTON PRESSED*****\n");
//            System.out.println("Before:");
//            System.out.println("Changes.currentTotalChange: " + Changes.currentTotalChange);
//            System.out.println("Changes.currentChangeType: " + Changes.currentChangeType);
//            System.out.println("Changes.previousChangeType: " + Changes.previousChangeType);
//            System.out.println("Changes.currentMainChange: " + Changes.currentMainChange);
//            System.out.println("Changes.currentMainPossibleOrder: " + Changes.currentMainPossibleOrder);
//            System.out.println("Changes.currentMainPossibleChange: " + Changes.currentMainPossibleChange);
//            System.out.println("Changes.currentPossibleChangeOrder: " + Changes.currentPossibleChangeOrder);
//            System.out.println("Changes.currentPossibleChange: " + Changes.currentPossibleChange);
//            System.out.println("endMainChangePossibleFlag: " + endMainChangePossibleFlag);
//            System.out.println("endPossibleChangeFlag: " + endPossibleChangeFlag);
//            System.out.println("endPossibleChangeFlagPrev: " + endPossibleChangeFlagPrev);
//            System.out.println("startMainPossibleChangeFlag: " + startMainPossibleChangeFlag);
//            System.out.println("startPossibleChangeFlag: " + startPossibleChangeFlag);
//            System.out.println();
            
            if (Changes.currentTotalChange > 0) {
                if (!endMainChangePossibleFlag) {
                    // update the current total change count
                    Changes.currentTotalChange--;

                    // update current main change or current possible change
                    if (Changes.currentChangeType.equals("main")) {
                        Changes.currentMainChange--;
                    } else if (Changes.currentChangeType.equals("possible") && !endPossibleChangeFlag) {
                        Changes.currentPossibleChange--;
                    }

                    // if only the first change has been made, do this
                    if (Changes.currentTotalChange == 0) {
                        Changes.setDefaultChangeDescription();

                        // if the first change was a main change, do this
                        if (Changes.currentChangeType.equals("main")) {
                            row = (int) Solver.mainChangeRow.get(Changes.currentMainChange);
                            column = (int) Solver.mainChangeColumn.get(Changes.currentMainChange);
                            Changes.game[row][column].setBackground(Color.WHITE);
                        }

                        // if the first change was a possible change, do this
                        if (Changes.currentChangeType.equals("possible")) {
                            
                            // unhighlight all possible options that are made by the first possible change
                            while ((int) Solver.possibleChangeOrder.get(Changes.currentPossibleChange) == Changes.currentPossibleChangeOrder && !startPossibleChangeFlag) {
                                row = (int) Solver.possibleChangeRow.get(Changes.currentPossibleChange);
                                column = (int) Solver.possibleChangeColumn.get(Changes.currentPossibleChange);
                                number = (int) Solver.possibleChangeNumber.get(Changes.currentPossibleChange);
                                Changes.game[row][column].unhighlightPossibleOption(number-1);

                                if (Changes.currentPossibleChange > 0) {
                                    Changes.currentPossibleChange--;
                                } else {
                                    startPossibleChangeFlag = true;
                                }
                            }
                        }

                    } else if (Changes.currentTotalChange < Solver.totalChangeCount) {
                        
                        // if current change is main, do this
                        if (Changes.currentChangeType.equals("main")) {
                            
                            // if previous change is main, do this
                            if (Changes.previousChangeType.equals("main")) {
                                
                                // unhighlight current cell and update change description
                                row = (int) Solver.mainChangeRow.get(Changes.currentMainChange);
                                column = (int) Solver.mainChangeColumn.get(Changes.currentMainChange);
                                Changes.game[row][column].setBackground(Color.WHITE);
                                Changes.setPreviousChangeDescription();
                                
                                // highlight previous cell
                                prevRow = (int) Solver.mainChangeRow.get(Changes.currentMainChange-1);
                                prevColumn = (int) Solver.mainChangeColumn.get(Changes.currentMainChange-1);
                                Changes.game[prevRow][prevColumn].setBackground(Color.YELLOW);
                                
                                // add possible options that the previous main change eliminated
                                Changes.currentMainPossibleChange--;
                                Changes.game[prevRow][prevColumn].resetPossiblePanels();
                                while((int) Solver.mainChangePossibleOrder.get(Changes.currentMainPossibleChange) == Changes.currentMainPossibleOrder && !startMainPossibleChangeFlag) {
                                    row = (int) Solver.mainChangePossibleRow.get(Changes.currentMainPossibleChange);
                                    column = (int) Solver.mainChangePossibleColumn.get(Changes.currentMainPossibleChange);
                                    number = (int) Solver.mainChangePossibleNumber.get(Changes.currentMainPossibleChange);
                                    Changes.game[row][column].addPossibleOption(number-1);
                                    
                                    if (Changes.currentMainPossibleChange > 0) {
                                        Changes.currentMainPossibleChange--;
                                    } else {
                                        startMainPossibleChangeFlag = true;
                                    }
                                    
                                }
                                Changes.currentMainPossibleOrder--;
                                Changes.currentMainPossibleChange++;
                                
                            }
                            
                            // if previous change is possible, do this
                            if (Changes.previousChangeType.equals("possible")) {
                                
                                // unhighlight current cell and update change description
                                row = (int) Solver.mainChangeRow.get(Changes.currentMainChange);
                                column = (int) Solver.mainChangeColumn.get(Changes.currentMainChange);
                                Changes.game[row][column].setBackground(Color.WHITE);
                                Changes.setPreviousChangeDescription();                  
                                
                                // store the current possible change so it can be reset after adding back the possible options in the while loop below
                                int startPossibleChange = Changes.currentPossibleChange;
                                
                                // update the current possible change and end possible change flag prev if needed
                                if (!endPossibleChangeFlagPrev) {
                                    Changes.currentPossibleChange--;
                                } else {
                                    endPossibleChangeFlagPrev = false;
                                }
                                
                                // add possible options that the last possible change eliminated and highlight them
                                while ((int) Solver.possibleChangeOrder.get(Changes.currentPossibleChange) == Changes.currentPossibleChangeOrder && !startPossibleChangeFlag) {
                                    row = (int) Solver.possibleChangeRow.get(Changes.currentPossibleChange);
                                    column = (int) Solver.possibleChangeColumn.get(Changes.currentPossibleChange);
                                    number = (int) Solver.possibleChangeNumber.get(Changes.currentPossibleChange);
                                    Changes.game[row][column].addPossibleOption(number-1);
                                    Changes.game[row][column].highlightPossibleOption(number-1);

                                    if (Changes.currentPossibleChange > 0) {
                                        Changes.currentPossibleChange--;
                                    } else {
                                        startPossibleChangeFlag = true;
                                    }
                                }
                                    
                                // reset current possible change to the value it was after the next button was pushed originally
                                Changes.currentPossibleChange = startPossibleChange;
                                
                            }
                        }
                        
                        // if current change is possible, do this
                        if (Changes.currentChangeType.equals("possible")) {
                            
                            // if previous change is main, do this
                            if (Changes.previousChangeType.equals("main")) {
                                
                                // unhighlight current possible changes and update change description
                                Changes.setPreviousChangeDescription();
                                
                                while ((int) Solver.possibleChangeOrder.get(Changes.currentPossibleChange) == Changes.currentPossibleChangeOrder && !startPossibleChangeFlag) {
                                    row = (int) Solver.possibleChangeRow.get(Changes.currentPossibleChange);
                                    column = (int) Solver.possibleChangeColumn.get(Changes.currentPossibleChange);
                                    number = (int) Solver.possibleChangeNumber.get(Changes.currentPossibleChange);
                                    Changes.game[row][column].unhighlightPossibleOption(number-1);

                                    if (Changes.currentPossibleChange > 0) {
                                        Changes.currentPossibleChange--;
                                    } else {
                                        startPossibleChangeFlag = true;
                                    }
                                }
                                
                                // update currentPossibleChange and currentPossibleChangeOrder if it isn't the first possible change
                                if (!startPossibleChangeFlag) {
                                    Changes.currentPossibleChange++;
                                    Changes.currentPossibleChangeOrder--;
                                }
                                
                                // update endPossibleChangeFlag if needed
                                if (endPossibleChangeFlag) {
                                    endPossibleChangeFlag = false;
                                }
                                
                                // highlight previous cell
                                prevRow = (int) Solver.mainChangeRow.get(Changes.currentMainChange-1);
                                prevColumn = (int) Solver.mainChangeColumn.get(Changes.currentMainChange-1);
                                Changes.game[prevRow][prevColumn].setBackground(Color.YELLOW);
                                
                                // add possible options that the previous main change eliminated
                                Changes.currentMainPossibleChange--;
                                Changes.game[prevRow][prevColumn].resetPossiblePanels();
                                while((int) Solver.mainChangePossibleOrder.get(Changes.currentMainPossibleChange) == Changes.currentMainPossibleOrder && !startMainPossibleChangeFlag) {
                                    row = (int) Solver.mainChangePossibleRow.get(Changes.currentMainPossibleChange);
                                    column = (int) Solver.mainChangePossibleColumn.get(Changes.currentMainPossibleChange);
                                    number = (int) Solver.mainChangePossibleNumber.get(Changes.currentMainPossibleChange);
                                    Changes.game[row][column].addPossibleOption(number-1);
                                    
                                    if (Changes.currentMainPossibleChange > 0) {
                                        Changes.currentMainPossibleChange--;
                                    } else {
                                        startMainPossibleChangeFlag = true;
                                    }
                                    
                                }
                                Changes.currentMainPossibleOrder--;
                                Changes.currentMainPossibleChange++;
                            }
                            
                            // if previous change is possible, do this
                            if (Changes.previousChangeType.equals("possible")) {
                                
                                // unhiglight current highlighted possible change cells and set change description
                                Changes.setPreviousChangeDescription();
                                
                                while ((int) Solver.possibleChangeOrder.get(Changes.currentPossibleChange) == Changes.currentPossibleChangeOrder && !startPossibleChangeFlag) {
                                    row = (int) Solver.possibleChangeRow.get(Changes.currentPossibleChange);
                                    column = (int) Solver.possibleChangeColumn.get(Changes.currentPossibleChange);
                                    number = (int) Solver.possibleChangeNumber.get(Changes.currentPossibleChange);
                                    Changes.game[row][column].unhighlightPossibleOption(number-1);

                                    if (Changes.currentPossibleChange > 0) {
                                        Changes.currentPossibleChange--;
                                    } else {
                                        startPossibleChangeFlag = true;
                                    }
                                }
                                
                                // store the current possible change so it can be reset after adding back the possible options in the while loop below
                                int startPossibleChange = Changes.currentPossibleChange+1;
                                
                                // reduce currentPossibleChangeOrder by 1
                                if (Changes.currentPossibleChangeOrder > 0) {
                                    Changes.currentPossibleChangeOrder--;
                                }
                                
                                // update end possible change flag prev if needed
                                endPossibleChangeFlag = false;
                                
                                // add possible options that the previous possible change eliminated and highlight them
                                while ((int) Solver.possibleChangeOrder.get(Changes.currentPossibleChange) == Changes.currentPossibleChangeOrder && !startPossibleChangeFlag) {
                                    row = (int) Solver.possibleChangeRow.get(Changes.currentPossibleChange);
                                    column = (int) Solver.possibleChangeColumn.get(Changes.currentPossibleChange);
                                    number = (int) Solver.possibleChangeNumber.get(Changes.currentPossibleChange);
                                    Changes.game[row][column].addPossibleOption(number-1);
                                    Changes.game[row][column].highlightPossibleOption(number-1);

                                    if (Changes.currentPossibleChange > 0) {
                                        Changes.currentPossibleChange--;
                                    } else {
                                        startPossibleChangeFlag = true;
                                    }
                                }
                                
                                // if the current possible change is the first possible change, startPossibleChangeFlag would've been set to true when adding back
                                // the possible options it removed
                                // reset startPossibleChangeFlag to false
                                if (startPossibleChangeFlag) {
                                    startPossibleChangeFlag = false;
                                }
                                
                                // reset current possible change to the value it was after the next button was pushed originally
                                Changes.currentPossibleChange = startPossibleChange;
                                
                            }
                        }
                                
                        // update currentChangeType and previousChangeType
                        if (Changes.currentTotalChange > 0) {
                            Changes.currentChangeType = (String) Solver.totalChangeType.get(Changes.currentTotalChange-1);
                        }
                        if (Changes.currentTotalChange > 1) {
                            Changes.previousChangeType = (String) Solver.totalChangeType.get(Changes.currentTotalChange-2);
                        }
                    }
                    
                    
                    
                } else { // undo the last change
                    // update change description
                    Changes.setPreviousChangeDescription();
                    
                    // highlight previous cell
                    prevRow = (int) Solver.mainChangeRow.get(Changes.currentMainChange-1);
                    prevColumn = (int) Solver.mainChangeColumn.get(Changes.currentMainChange-1);
                    Changes.game[prevRow][prevColumn].setBackground(Color.YELLOW);
                    
                    // add possible option that the previous main change eliminated
                    number = (int) Solver.mainChangePossibleNumber.get(Changes.currentMainPossibleChange);
                    Changes.game[prevRow][prevColumn].resetPossiblePanels();
                    Changes.game[prevRow][prevColumn].addPossibleOption(number-1);
                    
                    // reduce currentMainPossibleOrder by 1
                    Changes.currentMainPossibleOrder--;
                    
                    // reset endMainChangePossibleFlag
                    endMainChangePossibleFlag = false;
                    
                    // update currentChangeType and previousChangeType
                    if (Changes.currentTotalChange > 0) {
                        Changes.currentChangeType = (String) Solver.totalChangeType.get(Changes.currentTotalChange-1);
                    }
                    if (Changes.currentTotalChange > 1) {
                        Changes.previousChangeType = (String) Solver.totalChangeType.get(Changes.currentTotalChange-2);
                    }
                }
            }
            
//            System.out.println("After:");
//            System.out.println("Changes.currentTotalChange: " + Changes.currentTotalChange);
//            System.out.println("Changes.currentChangeType: " + Changes.currentChangeType);
//            System.out.println("Changes.previousChangeType: " + Changes.previousChangeType);
//            System.out.println("Changes.currentMainChange: " + Changes.currentMainChange);
//            System.out.println("Changes.currentMainPossibleOrder: " + Changes.currentMainPossibleOrder);
//            System.out.println("Changes.currentMainPossibleChange: " + Changes.currentMainPossibleChange);
//            System.out.println("Changes.currentPossibleChangeOrder: " + Changes.currentPossibleChangeOrder);
//            System.out.println("Changes.currentPossibleChange: " + Changes.currentPossibleChange);
//            System.out.println("endMainChangePossibleFlag: " + endMainChangePossibleFlag);
//            System.out.println("endPossibleChangeFlag: " + endPossibleChangeFlag);
//            System.out.println("endPossibleChangeFlagPrev: " + endPossibleChangeFlagPrev);
//            System.out.println("startMainPossibleChangeFlag: " + startMainPossibleChangeFlag);
//            System.out.println("startPossibleChangeFlag: " + startPossibleChangeFlag);
//            System.out.println("\n---------------------------------------------------------------------------\n");
        }
        // Reset button
        if (source == buttonPanel[2]) {
//            System.out.println("*****RESET BUTTON PRESSED*****\n");
//            System.out.println("Before:");
//            System.out.println("Changes.currentTotalChange: " + Changes.currentTotalChange);
//            System.out.println("Changes.currentChangeType: " + Changes.currentChangeType);
//            System.out.println("Changes.previousChangeType: " + Changes.previousChangeType);
//            System.out.println("Changes.currentMainChange: " + Changes.currentMainChange);
//            System.out.println("Changes.currentMainPossibleOrder: " + Changes.currentMainPossibleOrder);
//            System.out.println("Changes.currentMainPossibleChange: " + Changes.currentMainPossibleChange);
//            System.out.println("Changes.currentPossibleChangeOrder: " + Changes.currentPossibleChangeOrder);
//            System.out.println("Changes.currentPossibleChange: " + Changes.currentPossibleChange);
//            System.out.println("endMainChangePossibleFlag: " + endMainChangePossibleFlag);
//            System.out.println("endPossibleChangeFlag: " + endPossibleChangeFlag);
//            System.out.println("endPossibleChangeFlagPrev: " + endPossibleChangeFlagPrev);
//            System.out.println("startMainPossibleChangeFlag: " + startMainPossibleChangeFlag);
//            System.out.println("startPossibleChangeFlag: " + startPossibleChangeFlag);
//            System.out.println();
            
            for (int i = 0; i < 9; i++) {
                for (int j = 0; j < 9; j++) {
                    Changes.game[i][j].setToStartPossiblePanels();
                }
            }
            Changes.setStartChanges();
            Changes.setDefaultChangeDescription();
            
            // reset all count variables and flags
            Changes.currentTotalChange = 0;
            Changes.currentChangeType = null;
            Changes.previousChangeType = null;
            Changes.currentMainChange = 0;
            Changes.currentMainPossibleOrder = 0;
            Changes.currentMainPossibleChange = 0;
            Changes.currentPossibleChangeOrder = 0;
            Changes.currentPossibleChange = 0;
            endMainChangePossibleFlag = false;
            endPossibleChangeFlag = false;
            endPossibleChangeFlagPrev = false;
            startMainPossibleChangeFlag = false;
            startPossibleChangeFlag = false;
            
//            System.out.println("After:");
//            System.out.println("Changes.currentTotalChange: " + Changes.currentTotalChange);
//            System.out.println("Changes.currentChangeType: " + Changes.currentChangeType);
//            System.out.println("Changes.previousChangeType: " + Changes.previousChangeType);
//            System.out.println("Changes.currentMainChange: " + Changes.currentMainChange);
//            System.out.println("Changes.currentMainPossibleOrder: " + Changes.currentMainPossibleOrder);
//            System.out.println("Changes.currentMainPossibleChange: " + Changes.currentMainPossibleChange);
//            System.out.println("Changes.currentPossibleChangeOrder: " + Changes.currentPossibleChangeOrder);
//            System.out.println("Changes.currentPossibleChange: " + Changes.currentPossibleChange);
//            System.out.println("endMainChangePossibleFlag: " + endMainChangePossibleFlag);
//            System.out.println("endPossibleChangeFlag: " + endPossibleChangeFlag);
//            System.out.println("endPossibleChangeFlagPrev: " + endPossibleChangeFlagPrev);
//            System.out.println("startMainPossibleChangeFlag: " + startMainPossibleChangeFlag);
//            System.out.println("startPossibleChangeFlag: " + startPossibleChangeFlag);
//            System.out.println("\n---------------------------------------------------------------------------\n");
        }
    }
    
    @Override
    public void focusGained(FocusEvent event) {
        // do nothing
    }
    
    @Override
    public void focusLost(FocusEvent event) {
        // do nothing
    }
    
    public static void resetAll() {
        endMainChangePossibleFlag = false;
        endPossibleChangeFlag = false;
        endPossibleChangeFlagPrev = false;
        startMainPossibleChangeFlag = false;
        startPossibleChangeFlag = false;
    }
    
}