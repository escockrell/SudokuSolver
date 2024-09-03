// Project: Sudoku Solver
// Package: Graphical User Interface
// Purpose: Hold the methods that solve the puzzle
// Created by: Ethan Cockrell

package gui;

import java.util.*;
import com.opencsv.CSVWriter;
import java.io.FileWriter;
import java.io.IOException;

public class Solver {
    private static int[][] solveGame;
    private static int[][][] solvePossible;
    private static boolean[][] solveRows;
    private static boolean[][] solveColumns;
    private static boolean[][] solveGroups;
    
    public static int[][] startGame;
    public static int[][][] startPossible;
    
    public static boolean solved = false;
    public static boolean bruteForceSolved = false;
    public static int levelZeroChanges = 0;
    public static int oneInARowChanges = 0;
    public static int oneInAColumnChanges = 0;
    public static int oneInAGroupChanges = 0;
    public static int oneInACellChanges = 0;
    public static int levelOneChanges = 0;
    public static int phantomRowChanges = 0;
    public static int phantomColumnChanges = 0;
    public static int phantomGroupChanges = 0;
    public static int hiddenPairRowChanges = 0;
    public static int hiddenPairColumnChanges = 0;
    public static int hiddenPairGroupChanges = 0;
    public static int nakedPairRowChanges = 0;
    public static int nakedPairColumnChanges = 0;
    public static int nakedPairGroupChanges = 0;
    public static int levelTwoChanges = 0;
    public static int nakedTripleRowChanges = 0;
    public static int nakedTripleColumnChanges = 0;
    public static int nakedTripleGroupChanges = 0;
    public static int hiddenTripleRowChanges = 0;
    public static int hiddenTripleColumnChanges = 0;
    public static int hiddenTripleGroupChanges = 0;
    public static int nakedQuadRowChanges = 0;
    public static int nakedQuadColumnChanges = 0;
    public static int nakedQuadGroupChanges = 0;
    public static int xWingRowChanges = 0;
    public static int xWingColumnChanges = 0;
    public static int yWingColumnGroupChanges = 0;
    public static int yWingRowGroupChanges = 0;
    public static int yWingRowColumnChanges = 0;
    public static int levelThreeChanges = 0;
    public static int guessAndCheckChanges = 0;
    public static int bruteForceChanges = 0;
    
    public static int totalChangeCount = 0;
    public static ArrayList totalChangeType = new ArrayList(200);
    public static int mainChangeCount = 0;
    public static int possibleChangeCount = 0;
    public static int mainChangePossibleCount = 0;
    public static int possibleChangePossibleCount = 0;
    
    public static ArrayList mainChangeMethod = new ArrayList(81);
    public static ArrayList mainChangeDescription = new ArrayList(81);
    public static ArrayList mainChangeNumber = new ArrayList(81);
    public static ArrayList mainChangeRow = new ArrayList(81);
    public static ArrayList mainChangeColumn = new ArrayList(81);
    
    public static ArrayList mainChangePossibleOrder = new ArrayList(729);
    public static ArrayList mainChangePossibleNumber = new ArrayList(729);
    public static ArrayList mainChangePossibleRow = new ArrayList(729);
    public static ArrayList mainChangePossibleColumn = new ArrayList(729);
    
    public static ArrayList possibleChangeMethod = new ArrayList(200);
    public static ArrayList possibleChangeDescription = new ArrayList(200);
    public static ArrayList possibleChangeOrder = new ArrayList(200);
    public static ArrayList possibleChangeNumber = new ArrayList(200);
    public static ArrayList possibleChangeRow = new ArrayList(200);
    public static ArrayList possibleChangeColumn = new ArrayList(200);
    
    
    private static final int[] ROW_START = {0,0,0,3,3,3,6,6,6};
    private static final int[] ROW_END = {2,2,2,5,5,5,8,8,8};
    private static final int[] COLUMN_START = {0,3,6,0,3,6,0,3,6};
    private static final int[] COLUMN_END = {2,5,8,2,5,8,2,5,8};
    
    
    public static int[][] solveGame(Cell game[][]) {
        solveGame = convertGame(game);
        startGame = convertGame(game);
        solveRows = initializeRows(solveGame);
        solveColumns = initializeColumns(solveGame);
        solveGroups = initializeGroups(solveGame);
        solvePossible = initializePossible(solveGame, solveRows, solveColumns, solveGroups);
        startPossible = initializePossible(solveGame, solveRows, solveColumns, solveGroups);
        
        levelZeroMethods(solveGame, solvePossible, solveRows, solveColumns, solveGroups, false, false);
        
        if (!solved) {
            levelOneMethods(solveGame, solvePossible, solveRows, solveColumns, solveGroups, false, false);
            if (!solved) {
                levelTwoMethods(solveGame, solvePossible, solveRows, solveColumns, solveGroups, false, false);
                if (!solved) {
                    levelThreeMethods(solveGame, solvePossible, solveRows, solveColumns, solveGroups);
                }
            }
        }
                
        return solveGame;
    }
    
    public static void updateFrame(int game[][]) {
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                if (game[i][j] != 0)
                    Frame.game[i][j].setText(Integer.toString(game[i][j]));
            }
        }
    }
    
    public static void updateSolved(int game[][]) {
        int count = 0;
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                if (game[i][j] != 0) {
                    count++;
                }
            }
        }
        solved = (count == 81 && check(game));
            
    }
    
    public static boolean isSolved(int game[][]) {
        int count = 0;
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                if (game[i][j] != 0) {
                    count++;
                }
            }
        }
        return count == 81 && check(game);
    }
    
    public static void updateShadowPossible(int number, int row, int column, int possible[][][], boolean Rows[][], boolean Columns[][], boolean Groups[][], boolean isGuessAndCheck, boolean isBruteForce) {
        Rows[row][number - 1] = true;
	Columns[column][number - 1] = true;
	int group = determineGroup(row, column);
	Groups[group][number - 1] = true;
        
        // Removes all options from the cell
        for (int k = 0; k < 9; k++) { // number 1-9
            if (possible[row][column][k] == k+1) {
                possible[row][column][k] = 0;
                if (!isGuessAndCheck && !isBruteForce) {
                    mainChangePossibleOrder.add(mainChangeCount);
                    mainChangePossibleNumber.add(k+1);
                    mainChangePossibleRow.add(row);
                    mainChangePossibleColumn.add(column);
                    mainChangePossibleCount++;
                }
            }
        }
        
        // Removes the number as an option for the column
	for (int i = 0; i < 9; i++) { // row number
            if (possible[i][column][number-1] == number) {
                possible[i][column][number - 1] = 0;
                if (!isGuessAndCheck && !isBruteForce) {
                    mainChangePossibleOrder.add(mainChangeCount);
                    mainChangePossibleNumber.add(number);
                    mainChangePossibleRow.add(i);
                    mainChangePossibleColumn.add(column);
                    mainChangePossibleCount++;
                }
            }
	}
        
        // Removes the number as an option for the row
	for (int j = 0; j < 9; j++) { // column number
            if (possible[row][j][number-1] == number) {
                possible[row][j][number - 1] = 0;
                if (!isGuessAndCheck && !isBruteForce) {
                    mainChangePossibleOrder.add(mainChangeCount);
                    mainChangePossibleNumber.add(number);
                    mainChangePossibleRow.add(row);
                    mainChangePossibleColumn.add(j);
                    mainChangePossibleCount++;
                }
            }
	}
        
        // Removes the number as an option for the group
	for (int i = ROW_START[group]; i <= ROW_END[group]; i++) { // row number
            for (int j = COLUMN_START[group]; j <= COLUMN_END[group]; j++) { // column number
                if (possible[i][j][number-1] == number) {
                    possible[i][j][number - 1] = 0;
                    if (!isGuessAndCheck && !isBruteForce) {
                        mainChangePossibleOrder.add(mainChangeCount);
                        mainChangePossibleNumber.add(number);
                        mainChangePossibleRow.add(i);
                        mainChangePossibleColumn.add(j);
                        mainChangePossibleCount++;
                    }
                }
            }
	}
    }
    
    public static int[][] convertGame(Cell game[][]) {
        int[][] intGame = new int[9][9];
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                intGame[i][j] = game[i][j].getValue();
            }
        }
        return intGame;
    }
    
    public static void printGame() {
        System.out.println("Game: ");
        for (int i = 0; i < 9; i++) {
            System.out.print("   ");
            for (int j = 0; j < 9; j++) {
                System.out.print(solveGame[i][j] + " ");
            }
            System.out.print("\n");
        }
    }
    
    public static void printGame(int game[][]) {
        System.out.println("Game: ");
        for (int i = 0; i < 9; i++) {
            System.out.print("   ");
            for (int j = 0; j < 9; j++) {
                System.out.print(game[i][j] + " ");
            }
            System.out.print("\n");
        }
    }
    
    public static void printStartGame() {
        System.out.println("Start Game: ");
        for (int i = 0; i < 9; i++) {
            System.out.print("   ");
            for (int j = 0; j < 9; j++) {
                System.out.print(startGame[i][j] + " ");
            }
            System.out.print("\n");
        }
    }
    
    public static void printRows(boolean Rows[][]) {
        System.out.println("Row     1     2     3     4     5     6     7     8     9");
        for (int i = 0; i < 9; i++) {
            System.out.print("  " + i + "   ");
            for (int j = 0; j < 9; j++) {
                if (Rows[i][j] == false) {
                    System.out.print(Rows[i][j] + " ");
                } else {
                    System.out.print(Rows[i][j] + "  ");
                }
            }
            System.out.print("\n");
        }
    }
    
    public static void printColumns() {
        System.out.println("Column     1     2     3     4     5     6     7     8     9");
        for (int k = 0; k < 9; k++) { // number 1-9
            System.out.print("     " + (k+1) + "   ");
            for (int j = 0; j < 9; j++) { // column number
                if (solveColumns[j][k] == false) {
                    System.out.print(solveColumns[j][k] + " ");
                } else {
                    System.out.print(solveColumns[j][k] + "  ");
                }
            }
            System.out.println();
        }
    }
    
    public static void printGroups(boolean Groups[][]) {
        System.out.println("Group     1     2     3     4     5     6     7     8     9");
        for (int i = 0; i < 9; i++) {
            System.out.print("    " + i + "   ");
            for (int j = 0; j < 9; j++) {
                if (Groups[i][j] == false) {
                    System.out.print(Groups[i][j] + " ");
                } else {
                    System.out.print(Groups[i][j] + "  ");
                }
            }
            System.out.print("\n");
        }
    }
    
    public static void printPossible() {
        System.out.println("Possible: ");
        for (int i = 0; i < 9; i++) {
            System.out.println("Row " + (i+1) + ":");
            for (int j = 0; j < 9; j++) {
                if (solveGame[i][j] == 0) {
                    for (int k = 0; k < 9; k++) {
                        if (solvePossible[i][j][k] == k+1) {
                            System.out.print(solvePossible[i][j][k] + " ");
                        }
                    }
                    System.out.println();
                }
            }
            System.out.print("\n");
        }
    }
    
    public static void printPossible(int game[][], int possible[][][]) {
        System.out.println("Possible: ");
        for (int i = 0; i < 9; i++) {
            System.out.println("Row " + (i+1) + ":");
            for (int j = 0; j < 9; j++) {
                if (game[i][j] == 0) {
                    for (int k = 0; k < 9; k++) {
                        if (possible[i][j][k] == k+1) {
                            System.out.print(possible[i][j][k] + " ");
                        }
                    }
                    System.out.println();
                }
            }
            System.out.print("\n");
        }
    }
    
    public static void printStartPossible() {
        System.out.println("Start Possible: ");
        for (int i = 0; i < 9; i++) {
            System.out.println("Row " + (i+1) + ":");
            for (int j = 0; j < 9; j++) {
                if (startGame[i][j] == 0) {
                    for (int k = 0; k < 9; k++) {
                        if (startPossible[i][j][k] == k+1) {
                            System.out.print(startPossible[i][j][k] + " ");
                        }
                    }
                    System.out.println();
                }
            }
            System.out.print("\n");
        }
    }
    
    public static void printChangeLog() {
        int row;
        int column;
        String method;
        String description;
        String type;
        int currentMainChange = 0;
        int currentPossibleChange = 0;
        
        System.out.println("Change Log: ");
        for (int i = 0; i < totalChangeCount; i++) {
            type = (String) totalChangeType.get(i);
            if (type == "main") {
                row = (int) mainChangeRow.get(currentMainChange) + 1;
                column = (int) mainChangeColumn.get(currentMainChange) + 1;
                method = (String) mainChangeMethod.get(currentMainChange);
                description = (String) mainChangeDescription.get(currentMainChange);
                System.out.println("Change #" + String.valueOf(i+1));
                System.out.println("Type: " + type);
                System.out.println("Row " + row + ", Column " + column);
                System.out.println("Method: " + method);
                System.out.println("Description: " + description);
                System.out.println();
                currentMainChange++;
            } else if (type == "possible") {
                method = (String) possibleChangeMethod.get(currentPossibleChange);
                description = (String) possibleChangeDescription.get(currentPossibleChange);
                System.out.println("Change #" + String.valueOf(i+1));
                System.out.println("Type: " + type);
                System.out.println("Method: " + method);
                System.out.println("Description: " + description);
                System.out.println();
                currentPossibleChange++;
            }
        }
    }
    
    public static void printPossibleChangeLog() {
        int order;
        int number;
        int row;
        int column;
        int length = possibleChangeOrder.size();
        
        System.out.println("Possible Change Log: ");
        for (int i = 0; i < length; i++) {
            order = (int) possibleChangeOrder.get(i) + 1;
            number = (int) possibleChangeNumber.get(i);
            row = (int) possibleChangeRow.get(i) + 1;
            column = (int) possibleChangeColumn.get(i) + 1;
            
            System.out.println("Possible Change #" + order);
            System.out.println("Removed " + number + " from Row " + row + ", " + "Column " + column);
            System.out.println();
        }
    }
    
    public static boolean[][] initializeRows(int game[][]) {
        boolean Rows[][] = new boolean[9][9];
        for (int i = 0; i < 9; i++) { // row number
            for (int j = 0; j < 9; j++) { // column number
                for (int k = 0; k < 9; k++) { // number 1-9
                    if (game[i][j] == k+1) {
                        Rows[i][k] = true;
                    }
                }
            }
        }
        return Rows;
    }
    
    public static boolean[][] initializeColumns(int game[][]) {
        boolean Columns[][] = new boolean[9][9];
        for (int j = 0; j < 9; j++) { // column number
            for (int i = 0; i < 9; i++) { // row number
                for (int k = 0; k < 9; k++) { // number 1-9
                    if (game[i][j] == k+1) {
                        Columns[j][k] = true;
                    }
                }
            }
        }
        return Columns;
    }
    
    public static boolean[][] initializeGroups(int game[][]) {
        boolean Groups[][] = new boolean[9][9];
        int group;
        
        for (int i = 0; i < 9; i++) { // row number
            for (int j = 0; j < 9; j++) { // column number
                for (int k = 0; k < 9; k++) { // number 1-9
                    if (game[i][j] == k+1) {
                        group = determineGroup(i, j);
                        Groups[group][k] = true;
                    }
                }
            }
        }
        return Groups;
    }
    
    public static int[][][] initializePossible(int game[][], boolean Rows[][], boolean Columns[][], boolean Groups[][]) {
        int[][][] possible = new int[9][9][9];
        int group;
        
        for (int i = 0; i < 9; i++) { // row number
            for (int j = 0; j < 9; j++) { // column number
                if (game[i][j] == 0) {
                    group = determineGroup(i, j);
                    for (int k = 0; k < 9; k++) { // number 1-9
                        if (!Rows[i][k] && !Columns[j][k] && !Groups[group][k]) {
                            possible[i][j][k] = k+1;
                        }
                    }
                }
            }
        }
        
        return possible;
    }
    
    public static int determineGroup(int row, int column) {
        int group;
        if (row < 3 && column < 3) {
            group = 0;
        } else if (row < 3 && column < 6) {
            group = 1;
        } else if (row < 3) {
            group = 2;
        } else if (row < 6 && column < 3) {
            group = 3;
        } else if (row < 6 && column < 6) {
            group = 4;
        } else if (row < 6) {
            group = 5;
        } else if (column < 3) {
            group = 6;
        } else if (column < 6) {
            group = 7;
        } else {
            group = 8;
        }
        return group;
    }
    
    public static boolean check(int game[][]) {
        int count = 0;
        
        // Check to make sure there are at least 17 given digits
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                if (game[i][j] != 0) {
                    count++;
                }
            }
        }
        if (count < 17) {
            return false;
        }
        
        // Checks each row for duplicates
        for (int i = 0; i < 9; i++) { // row number
            for (int k = 0; k < 9; k++) { // number 1-9
                count = 0;
                for (int j = 0; j < 9; j++) { // column number
                    if (game[i][j] == k+1)
                        count++;
                }
                if (count > 1)
                    return false;
            }
        }
        
        // Checks each column for duplicates
        for (int j = 0; j < 9; j++) { // column number
            for (int k = 0; k < 9; k++) { // number 1-9
                count = 0;
                for (int i = 0; i < 9; i++) { // row number
                    if (game[i][j] == k+1)
                        count++;
                }
                if (count > 1)
                    return false;
            }
        }
        
        // Checks each group for duplicates
        for (int l = 0; l < 9; l++) { // group number
            for (int k = 0; k < 9; k++) { // number 1-9
                count = 0;
                for (int i = ROW_START[l]; i <= ROW_END[l]; i++) {
                    for (int j = COLUMN_START[l]; j <= COLUMN_END[l]; j++) {
                        if (game[i][j] == k+1)
                            count++;
                    }
                }
                if (count > 1)
                    return false;
            }
        }
        
        return true;
    }
    
    public static int levelZeroMethods(int game[][], int possible[][][], boolean Rows[][], boolean Columns[][], boolean Groups[][], boolean isGuessAndCheck, boolean isBruteForce) {
        int changes;
        int tempLevelZeroChanges = 0;
        do {
            changes = 0;
            changes += oneInARowPossibleCheck(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
            changes += oneInAColumnPossibleCheck(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
            changes += oneInAGroupPossibleCheck(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
            changes += oneInACellPossibleCheck(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
            tempLevelZeroChanges += changes;
        } while (changes != 0);
        return tempLevelZeroChanges;
    }
    
    public static int oneInARowPossibleCheck(int game[][], int possible[][][], boolean Rows[][], boolean Columns[][], boolean Groups[][], boolean isGuessAndCheck, boolean isBruteForce) {
        int works;
        int worksColumn = 0;
        int changes = 0;
        int tempChanges;
        
        do {
            tempChanges = 0;
            for (int i = 0; i < 9; i++) { // row number
                for (int k = 0; k < 9; k++) { // number 1-9
                    works = 0;
                    for (int j = 0; j < 9; j++) { // column number
                        if (game[i][j] == 0) {
                            if (possible[i][j][k] == k+1) {
                                works++;
                                worksColumn = j;
                            }
                        }
                    }

                    if (works == 1) {
                        game[i][worksColumn] = k+1;
                        if (!isGuessAndCheck && !isBruteForce) {
                            mainChangeNumber.add(String.valueOf(k+1));
                            mainChangeMethod.add("One in a Row");
                            mainChangeDescription.add("The number " + String.valueOf(k+1) + " is only possible in row " + 
                                    String.valueOf(i+1) + ", column " + String.valueOf(worksColumn+1));
                            mainChangeRow.add(i);
                            mainChangeColumn.add(worksColumn);
                            totalChangeType.add("main");
                            levelZeroChanges++;
                            oneInARowChanges++;
                            mainChangeCount++;
                            totalChangeCount++;
                            updateSolved(game);
                        } 
                        updateShadowPossible((k+1), i, worksColumn, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                        tempChanges++;
                    }
                }
            }
            changes += tempChanges;
        } while (tempChanges != 0);
        
        return changes;
    }
    
    public static int oneInAColumnPossibleCheck(int game[][], int possible[][][], boolean Rows[][], boolean Columns[][], boolean Groups[][], boolean isGuessAndCheck, boolean isBruteForce) {
        int works;
	int worksRow = 0;
	int changes = 0;
        int tempChanges;
        
        do {
            tempChanges = 0;
            for (int j = 0; j < 9; j++) { // column number
                for (int k = 0; k < 9; k++) { // number 1-9
                    works = 0;
                    for (int i = 0; i < 9; i++) { // row number
                        if (game[i][j] == 0) {
                            if (possible[i][j][k] == k + 1) {
                                works++;
                                worksRow = i;
                            }
                        }
                    }

                    if (works == 1) {
                        game[worksRow][j] = k+1;
                        if (!isGuessAndCheck && !isBruteForce) {
                            mainChangeNumber.add(String.valueOf(k+1));
                            mainChangeMethod.add("One in a Column");
                            mainChangeDescription.add("The number " + String.valueOf(k+1) + " is only possible in row " + 
                                String.valueOf(worksRow+1) + ", column " + String.valueOf(j+1));
                            mainChangeRow.add(worksRow);
                            mainChangeColumn.add(j);
                            totalChangeType.add("main");
                            levelZeroChanges++;
                            oneInAColumnChanges++;
                            mainChangeCount++;
                            totalChangeCount++;
                            updateSolved(game);
                        }
                        updateShadowPossible((k+1), worksRow, j, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                        tempChanges++;
                    }
                }
            }
            changes += tempChanges;
        } while (tempChanges != 0);
        
	return changes;
    }
    
    public static int oneInAGroupPossibleCheck(int game[][], int possible[][][], boolean Rows[][], boolean Columns[][], boolean Groups[][], boolean isGuessAndCheck, boolean isBruteForce) {
        int works;
	int worksRow = 0;
	int worksColumn = 0;
	int changes = 0;
        int tempChanges;
        
        do {
            tempChanges = 0;
            for (int l = 0; l < 9; l++) { // group number
                for (int k = 0; k < 9; k++) { // number 1-9
                    works = 0;
                    for (int i = ROW_START[l]; i <= ROW_END[l]; i++) { // row number
                        for (int j = COLUMN_START[l]; j <= COLUMN_END[l]; j++) { // column number
                            if (game[i][j] == 0) {
                                if (possible[i][j][k] == k+1) {
                                    works++;
                                    worksRow = i;
                                    worksColumn = j;
                                }
                            }
                        }
                    }

                    if (works == 1) {
                        game[worksRow][worksColumn] = k+1;
                        if (!isGuessAndCheck && !isBruteForce) {
                            mainChangeNumber.add(String.valueOf(k+1));
                            mainChangeMethod.add("One in a Group");
                            mainChangeDescription.add("The number " + String.valueOf(k+1) + " is only possible in row " + 
                                String.valueOf(worksRow+1) + ", column " + String.valueOf(worksColumn+1) +
                                " in group " + String.valueOf(l+1));
                            mainChangeRow.add(worksRow);
                            mainChangeColumn.add(worksColumn);
                            totalChangeType.add("main");
                            levelZeroChanges++;
                            oneInAGroupChanges++;
                            mainChangeCount++;
                            totalChangeCount++;
                            updateSolved(game);
                        }
                        updateShadowPossible((k+1), worksRow, worksColumn, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                        tempChanges++;
                    }
                }
            }
            changes += tempChanges;
        } while (tempChanges != 0);
	return changes;
    }
    
    public static int oneInACellPossibleCheck(int game[][], int possible[][][], boolean Rows[][], boolean Columns[][], boolean Groups[][], boolean isGuessAndCheck, boolean isBruteForce) {
        int works = 0;
	int count;
	int changes = 0;
        int tempChanges;
        
        do {
            tempChanges = 0;
            for (int i = 0; i < 9; i++) { // row number
                for (int j = 0; j < 9; j++) { // column number
                    count = 0;
                    for (int k = 0; k < 9; k++) { // number 1-9
                        if (game[i][j] == 0) {
                            if (possible[i][j][k] == k + 1) {
                                works = k+1;
                                count++;
                            }
                        }
                    }

                    if (count == 1) {
                        game[i][j] = works;
                        if (!isGuessAndCheck && !isBruteForce) {
                            mainChangeNumber.add(String.valueOf(works));
                            mainChangeMethod.add("One in a Cell");
                            mainChangeDescription.add("The number " + String.valueOf(works) + " is the only possible option for row " + 
                                String.valueOf(i+1) + ", column " + String.valueOf(j+1));
                            mainChangeRow.add(i);
                            mainChangeColumn.add(j);
                            totalChangeType.add("main");
                            levelZeroChanges++;
                            oneInACellChanges++;
                            mainChangeCount++;
                            totalChangeCount++;
                            updateSolved(game);
                        }
                        updateShadowPossible(works, i, j, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                        tempChanges++;
                    }
                }
            }
        } while (tempChanges != 0);
	
        return changes;
    }
    
    public static int levelOneMethods(int game[][], int possible[][][], boolean Rows[][], boolean Columns[][], boolean Groups[][], boolean isGuessAndCheck, boolean isBruteForce) {
        int changes;
        int tempLevelOneChanges = 0;
        
        do {
            changes = 0;
            changes += phantomChecks(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce); // updated
            changes += nakedPairChecks(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce); // updated
            changes += hiddenPairChecks(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce); // updated
            tempLevelOneChanges += changes;
        } while (changes != 0 && !solved);
        
        return tempLevelOneChanges;
    }
    
    public static int phantomChecks(int game[][], int possible[][][], boolean Rows[][], boolean Columns[][], boolean Groups[][], boolean isGuessAndCheck, boolean isBruteForce) {
        int changes;
        int tempPhantomChanges = 0;
        
        do {
            changes = 0;
            changes += rowPhantomCheck(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce); // works
            changes += columnPhantomCheck(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce); // works
            changes += groupPhantomRowCheck(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce); // works
            changes += groupPhantomColumnCheck(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce); // works
            tempPhantomChanges += changes;
        } while (changes != 0 && !solved);
        
        return tempPhantomChanges;
    }
    
    public static int rowPhantomCheck(int game[][], int possible[][][], boolean Rows[][], boolean Columns[][], boolean Groups[][], boolean isGuessAndCheck, boolean isBruteForce) {
        int changes = 0;
        int tempChanges;
	boolean flag;
	int count;
	int rowWork = 0;
        boolean[] columnsChanged = new boolean[9]; 
        int columnsChangedCount;
        String description;

	do {
            tempChanges = 0;
            for (int l = 0; l < 9 && !solved; l++) { // group number
                for (int k = 0; k < 9 && !solved; k++) { // number 1-9
                    count = 0;
                    Arrays.fill(columnsChanged, false);
                    description = "";
                    columnsChangedCount = 0;

                    for (int i = ROW_START[l]; i <= ROW_END[l]; i++) { // row number
                        flag = false;
                        for (int j = COLUMN_START[l]; j <= COLUMN_END[l]; j++) { // column number
                            if (game[i][j] == 0) {
                                if (possible[i][j][k] == k + 1 && flag == false) {
                                    rowWork = i;
                                    count++;
                                    flag = true;
                                }
                            }
                        }
                    }

                    if (count == 1) {
                        for (int j = 0; j < 9; j++) { // column number
                            if (game[rowWork][j] == 0) {
                                if (j < COLUMN_START[l] || j > COLUMN_END[l]) {
                                    if (possible[rowWork][j][k] != 0) {
                                        possible[rowWork][j][k] = 0;
                                        columnsChanged[j] = true;
                                        columnsChangedCount++;
                                    }
                                }
                            }
                        }

                        // Save data in change log
                        if (columnsChangedCount > 0) {
                            if (!isGuessAndCheck && !isBruteForce) {
                                possibleChangeMethod.add("Phantom - Row");
                                description = "Since the number " + (k+1) + 
                                    " only appears in row " + (rowWork+1) +
                                    " in group " + (l+1) + ", it was removed as a possible option in the below cells:";
                                for (int j = 0; j < 9; j++) {
                                    if (columnsChanged[j]) {
                                        description = description + "\nRow " + (rowWork+1) +
                                            ", Column " + (j+1) + ": " + (k+1);
                                        possibleChangeOrder.add(possibleChangeCount);
                                        possibleChangeNumber.add(k+1);
                                        possibleChangeRow.add(rowWork);
                                        possibleChangeColumn.add(j);
                                        possibleChangePossibleCount++;
                                    } 
                                }

                                possibleChangeDescription.add(description);                          
                                totalChangeType.add("possible");
                                levelOneChanges++;
                                phantomRowChanges++;
                                possibleChangeCount++;
                                totalChangeCount++;
                            }
                            tempChanges++;
                            
                            // Run previous methods to see if the puzzle can be solved
                            tempChanges += levelZeroMethods(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                        }
                    }
                }
            }
            changes += tempChanges;
        } while (tempChanges != 0 && !solved);
        
	return changes;
    }
    
    public static int columnPhantomCheck(int game[][], int possible[][][], boolean Rows[][], boolean Columns[][], boolean Groups[][], boolean isGuessAndCheck, boolean isBruteForce) {
        int changes = 0;
        int tempChanges;
	boolean flag;
	int count;
	int columnWork = 0;
        boolean[] rowsChanged = new boolean[9]; 
        int rowsChangedCount;
        String description;
	
        do {
            tempChanges = 0;
            for (int l = 0; l < 9 && !solved; l++) { // group number
                for (int k = 0; k < 9 && !solved; k++) { // number 1-9
                    if(!Groups[l][k]) {
                        Arrays.fill(rowsChanged, false);
                        description = "";
                        count = 0;
                        rowsChangedCount = 0;
                        for (int j = COLUMN_START[l]; j <= COLUMN_END[l]; j++) { // column number
                            flag = false;
                            for (int i = ROW_START[l]; i <= ROW_END[l]; i++) { // row number
                                if (game[i][j] == 0) {
                                    if (possible[i][j][k] == k + 1 && flag == false) {
                                        columnWork = j;
                                        count++;
                                        flag = true;
                                    }
                                }
                            }
                        }

                        if (count == 1) {
                            for (int i = 0; i < 9; i++) { // row number
                                if (game[i][columnWork] == 0) {
                                    if (i < ROW_START[l] || i > ROW_END[l]) {
                                        if (possible[i][columnWork][k] != 0) {
                                            possible[i][columnWork][k] = 0;
                                            rowsChanged[i] = true;
                                            rowsChangedCount++;
                                        }
                                    }
                                }
                            }

                            // Save data in change log
                            if (rowsChangedCount > 0) {
                                if (!isGuessAndCheck && !isBruteForce) {
                                    possibleChangeMethod.add("Phantom - Column");
                                    description = "Since the number " + (k+1) + 
                                            " only appears in column " + (columnWork+1) +
                                            " in group " + (l+1) + ", it was removed as a possible option in the below cells:";
                                    for (int i = 0; i < 9; i++) {
                                        if (rowsChanged[i]) {
                                            description = description + "\nRow " + (i+1) +
                                                    ", Column " + (columnWork+1) + ": " + (k+1);
                                            possibleChangeOrder.add(possibleChangeCount);
                                            possibleChangeNumber.add(k+1);
                                            possibleChangeRow.add(i);
                                            possibleChangeColumn.add(columnWork);
                                            possibleChangePossibleCount++;
                                        } 
                                    }
                                    possibleChangeDescription.add(description);                          
                                    totalChangeType.add("possible");
                                    levelOneChanges++;
                                    phantomColumnChanges++;
                                    possibleChangeCount++;
                                    totalChangeCount++;
                                }
                                tempChanges++;
                                
                                // Run previous methods to see if the puzzle can be solved
                                tempChanges += levelZeroMethods(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                            }
                        }
                    }
                }
            }
            changes += tempChanges;
        } while (tempChanges != 0 && !solved);
        
	return changes;
    }
    
    public static int groupPhantomRowCheck(int game[][], int possible[][][], boolean Rows[][], boolean Columns[][], boolean Groups[][], boolean isGuessAndCheck, boolean isBruteForce) {
        int changes = 0;
        int tempChanges;
        int groupCount;
        int groupWork;
        int tempGroup;
        int count;
        int[] rowsChanged = new int[6];
        int[] colsChanged = new int[6];
        String description;
        
        do {
            tempChanges = 0;
            for (int i = 0; i < 9 && !solved; i++) { // row number
                for (int k = 0; k < 9 && !solved; k++) { // number 1-9
                    if (!Rows[i][k]) {
                        groupCount = 0;
                        groupWork = 10;
                        for (int j = 0; j < 9; j++) { // column number
                            if (game[i][j] == 0) {
                                if (possible[i][j][k] == k+1) {
                                    tempGroup = determineGroup(i,j);
                                    if (tempGroup != groupWork) {
                                        groupWork = tempGroup;
                                        groupCount++;
                                    }
                                }
                            }
                        }

                        if (groupCount == 1) {
                            count = 0;
                            Arrays.fill(rowsChanged, 0);
                            Arrays.fill(colsChanged, 0);
                            description = "";
                            for (int row = ROW_START[groupWork]; row <= ROW_END[groupWork]; row++) {
                                for (int col = COLUMN_START[groupWork]; col <= COLUMN_END[groupWork]; col++) {
                                    if (game[row][col] == 0 && possible[row][col][k] == k+1 && row != i) {
                                        possible[row][col][k] = 0;
                                        rowsChanged[count] = row;
                                        colsChanged[count] = col;
                                        count++;
                                    }
                                }
                            }

                            // Save data in change log
                            if (count > 0) {
                                if (!isGuessAndCheck && !isBruteForce) {
                                    possibleChangeMethod.add("Phantom - Group");
                                    description = "Since the number " + (k+1) +
                                            " only appears in group " + (groupWork+1) + 
                                            " in row " + (i+1) + ", it was removed as a possible option in the below cells: ";
                                    for (int m = 0; m < count; m++) {
                                        description = description + "\nRow " + (rowsChanged[m]+1) +
                                                ", Column " + (colsChanged[m]+1) + ": " + (k+1);
                                        possibleChangeOrder.add(possibleChangeCount);
                                        possibleChangeNumber.add(k+1);
                                        possibleChangeRow.add(rowsChanged[m]);
                                        possibleChangeColumn.add(colsChanged[m]);
                                        possibleChangePossibleCount++;
                                    }
                                    possibleChangeDescription.add(description);                          
                                    totalChangeType.add("possible");
                                    levelOneChanges++;
                                    phantomGroupChanges++;
                                    possibleChangeCount++;
                                    totalChangeCount++;
                                }
                                tempChanges++;
                                
                                // Run previous methods to see if the puzzle can be solved
                                tempChanges += levelZeroMethods(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                            }
                        }
                    }
                }
            }
            changes += tempChanges;
        } while (tempChanges != 0 && !solved);
        
        return changes;
    }
    
    public static int groupPhantomColumnCheck(int game[][], int possible[][][], boolean Rows[][], boolean Columns[][], boolean Groups[][], boolean isGuessAndCheck, boolean isBruteForce) {
        int changes = 0;
        int tempChanges;
        int groupCount;
        int groupWork;
        int tempGroup;
        int count;
        int[] rowsChanged = new int[6];
        int[] colsChanged = new int[6];
        String description;
        
        do {
            tempChanges = 0;
            for (int j = 0; j < 9 && !solved; j++) { // column number
                for (int k = 0; k < 9 && !solved; k++) { // number 1-9
                    if (!Columns[j][k]) {
                        groupCount = 0;
                        groupWork = 10;
                        for (int i = 0; i < 9; i++) { // row number
                            if (game[i][j] == 0) {
                                if (possible[i][j][k] == k+1) {
                                    tempGroup = determineGroup(i,j);
                                    if (tempGroup != groupWork) {
                                        groupWork = tempGroup;
                                        groupCount++;
                                    }
                                }
                            }
                        }

                        if (groupCount == 1) {
                            count = 0;
                            Arrays.fill(rowsChanged, 0);
                            Arrays.fill(colsChanged, 0);
                            description = "";
                            for (int row = ROW_START[groupWork]; row <= ROW_END[groupWork]; row++) {
                                for (int col = COLUMN_START[groupWork]; col <= COLUMN_END[groupWork]; col++) {
                                    if (game[row][col] == 0 && possible[row][col][k] == k+1 && col != j) {
                                        possible[row][col][k] = 0;
                                        rowsChanged[count] = row;
                                        colsChanged[count] = col;
                                        count++;
                                    }
                                }
                            }

                            // Save data in change log
                            if (count > 0) {
                                if (!isGuessAndCheck && !isBruteForce) {
                                    possibleChangeMethod.add("Phantom - Group");
                                    description = "Since the number " + (k+1) +
                                            " only appears in group " + (groupWork+1) + 
                                            " in column " + (j+1) + ", it was removed as a possible option in the below cells: ";
                                    for (int m = 0; m < count; m++) {
                                        description = description + "\nRow " + (rowsChanged[m]+1) +
                                                ", Column " + (colsChanged[m]+1) + ": " + (k+1);
                                        possibleChangeOrder.add(possibleChangeCount);
                                        possibleChangeNumber.add(k+1);
                                        possibleChangeRow.add(rowsChanged[m]);
                                        possibleChangeColumn.add(colsChanged[m]);
                                        possibleChangePossibleCount++;
                                    }
                                    possibleChangeDescription.add(description);                          
                                    totalChangeType.add("possible");
                                    levelOneChanges++;
                                    phantomGroupChanges++;
                                    possibleChangeCount++;
                                    totalChangeCount++;
                                }
                                tempChanges++;
                                
                                // Run previous methods to see if the puzzle can be solved
                                tempChanges += levelZeroMethods(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                            }
                        }
                    }
                }
            }
            changes += tempChanges;
        } while (tempChanges != 0 && !solved);
            
        return changes;
    }
    
    public static int hiddenPairChecks(int game[][], int possible[][][], boolean Rows[][], boolean Columns[][], boolean Groups[][], boolean isGuessAndCheck, boolean isBruteForce) {
        int changes;
        int tempHiddenPairChanges = 0;
        
        do {
            changes = 0;
            changes += hiddenPairRowCheck(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce); // works
            changes += hiddenPairColumnCheck(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce); // works
            changes += hiddenPairGroupCheck(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce); // works
            tempHiddenPairChanges += changes;
        } while (changes != 0 && !solved);
        
        return tempHiddenPairChanges;
    }
    
    public static int hiddenPairRowCheck(int game[][], int possible[][][], boolean Rows[][], boolean Columns[][], boolean Groups[][], boolean isGuessAndCheck, boolean isBruteForce) {
        int changes = 0;
        int tempChanges = 0;
        int[][] columns = new int[9][2];
        int[] columnsCount = new int[9];
        int[] pairNumbers = new int[9];
        int pairCount = 0;
        int number1 = 0;
        int number2 = 0;
        int column1 = 0;
        int column2 = 0;
        boolean[] twoOptionCell = new boolean[9];
        int tempCount = 0;
        int totalCount = 0;
        String description = "";
        int countCell1 = 0;
        int countCell2 = 0;
        int[] cellNumbersChanged1 = new int[9];
        int[] cellNumbersChanged2 = new int[9];
        
        do {
            tempChanges = 0;
            for (int i = 0; i < 9 && !solved; i++) { // row number
                for (int z = 0; z < 9; z++) {
                    columns[z][0] = 0;
                    columns[z][1] = 0;
                }
                Arrays.fill(columnsCount, 0);
                Arrays.fill(twoOptionCell, false);
                pairCount = 0;
                column1 = 0;
                column2 = 0;

                for (int k = 0; k < 9; k++) { // number 1-9
                    if (!Rows[i][k]) {
                        for (int j = 0; j < 9; j++) { // column number
                            if (game[i][j] == 0 && possible[i][j][k] == k+1) {
                                if (columnsCount[k] == 0) {
                                    columns[k][0] = j;
                                } else if (columnsCount[k] == 1) {
                                    columns[k][1] = j;
                                }
                                columnsCount[k]++;
                            }
                        }
                    }
                }

                // Counts the number of numbers 1-9 that appear in only 2 columns
                for (int k = 0; k < 9; k++) { // number 1-9
                    if (columnsCount[k] == 2) {
                        pairNumbers[pairCount] = k;
                        pairCount++;
                    }
                }

                // Counts the number of cells with only 2 options
                for (int j = 0; j < 9; j++) { // column number
                    if (game[i][j] == 0) {
                        tempCount = 0;
                        for (int k = 0; k < 9; k++) { // number 1-9
                            if (possible[i][j][k] == k+1) {
                                tempCount++;
                            }
                        }
                        if (tempCount == 2) {
                            twoOptionCell[j] = true;
                        }
                    }
                }

                // Checks to see if any of the numbers match any other numbers, forming a hidden pair
                // Then, if a hidden pair is found, it updates the possible values
                if (pairCount > 1) {
                    for (int m = 0; m < pairCount; m++) {
                        number1 = pairNumbers[m];
                        column1 = columns[number1][0];
                        column2 = columns[number1][1];

                        for (int n = m+1; n < pairCount; n++) {
                            number2 = pairNumbers[n];

                            if (column1 == columns[number2][0] && column2 == columns[number2][1]) {
                                if (!(twoOptionCell[column1] && twoOptionCell[column2])) {
                                    // number1 and number2 form a hidden pair in column1 and column2
                                    totalCount = 0;
                                    countCell1 = 0;
                                    countCell2 = 0;
                                    Arrays.fill(cellNumbersChanged1, 0);
                                    Arrays.fill(cellNumbersChanged2, 0);
                                    description = "";

                                    // Remove all possible options other than number1 and number2 in column1 and column2
                                    for (int k = 0; k < 9; k++) {
                                        if (k != number1 && k != number2) {
                                            if (possible[i][column1][k] == k+1) {
                                                possible[i][column1][k] = 0;
                                                cellNumbersChanged1[countCell1] = k;
                                                countCell1++;
                                                totalCount++;
                                            }
                                            if (possible[i][column2][k] == k+1) {
                                                possible[i][column2][k] = 0;
                                                cellNumbersChanged2[countCell2] = k;
                                                countCell2++;
                                                totalCount++;
                                            }
                                        }
                                    }

                                    // Save data to change log
                                    if (totalCount > 0) {
                                        if (!isGuessAndCheck && !isBruteForce) {
                                            possibleChangeMethod.add("Hidden Pair - Row");
                                            description = "Since the numbers " + (number1+1) + " and " + (number2+1) +
                                                    " form a hidden pair in the cells (" + (i+1) + "," + (column1+1) + ") and (" +
                                                    (i+1) + "," + (column2+1) + "), the below cells were removed as possible options:";

                                            if (countCell1 > 0) {
                                                description = description + "\nRow " + (i+1) + ", Column " + (column1+1) + ": ";
                                                for (int s = 0; s < countCell1; s++) {
                                                    if (s < countCell1-1) {
                                                        description = description + (cellNumbersChanged1[s]+1) + ", ";
                                                    } else if (s == countCell1-1 && s != 0) {
                                                        description = description + "and " +(cellNumbersChanged1[s]+1);
                                                    } else if (s == 0) {
                                                        description = description + (cellNumbersChanged1[s]+1);
                                                    }
                                                    possibleChangeOrder.add(possibleChangeCount);
                                                    possibleChangeNumber.add(cellNumbersChanged1[s]+1);
                                                    possibleChangeRow.add(i);
                                                    possibleChangeColumn.add(column1);
                                                    possibleChangePossibleCount++;
                                                }
                                            }

                                            if (countCell2 > 0) {
                                                description = description + "\nRow " + (i+1) + ", Column " + (column2+1) + ": ";
                                                for (int s = 0; s < countCell2; s++) {
                                                    if (s < countCell2-1) {
                                                        description = description + (cellNumbersChanged2[s]+1) + ", ";
                                                    } else if (s == countCell2-1 && s != 0) {
                                                            description = description + "and " +(cellNumbersChanged2[s]+1);
                                                    } else if (s == 0) {
                                                            description = description + (cellNumbersChanged2[s]+1);
                                                    }
                                                    possibleChangeOrder.add(possibleChangeCount);
                                                    possibleChangeNumber.add(cellNumbersChanged2[s]+1);
                                                    possibleChangeRow.add(i);
                                                    possibleChangeColumn.add(column2);
                                                    possibleChangePossibleCount++;
                                                }
                                            }
                                            possibleChangeDescription.add(description);                          
                                            totalChangeType.add("possible");
                                            levelOneChanges++;
                                            hiddenPairRowChanges++;
                                            possibleChangeCount++;
                                            totalChangeCount++;
                                        }
                                        tempChanges++;
                                        
                                        // Run previous methods to see if the puzzle can be solved
                                        tempChanges += levelZeroMethods(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            changes += tempChanges;
        } while (tempChanges != 0 && !solved);
	return changes;
    }
    
    public static int hiddenPairColumnCheck(int game[][], int possible[][][], boolean Rows[][], boolean Columns[][], boolean Groups[][], boolean isGuessAndCheck, boolean isBruteForce) {
        int changes = 0;
        int tempChanges;
        int[][] rows = new int[9][2];
        int[] rowsCount = new int[9];
        int[] pairNumbers = new int[9];
        int pairCount = 0;
        int number1 = 0;
        int number2 = 0;
        int row1 = 0;
        int row2 = 0;
        boolean[] twoOptionCell = new boolean[9];
        int tempCount = 0;
        int totalCount = 0;
        String description = "";
        int countCell1 = 0;
        int countCell2 = 0;
        int[] cellNumbersChanged1 = new int[9];
        int[] cellNumbersChanged2 = new int[9];
        
        do {
            tempChanges = 0;
            for (int j = 0; j < 9 && !solved; j++) { // column number
                for (int z = 0; z < 9; z++) {
                    rows[z][0] = 0;
                    rows[z][1] = 0;
                }
                Arrays.fill(rowsCount, 0);
                Arrays.fill(twoOptionCell, false);
                pairCount = 0;
                row1 = 0;
                row2 = 0;

                for (int k = 0; k < 9; k++) { // number 1-9
                    if (!Columns[j][k]) {
                        for (int i = 0; i < 9; i++) { // row number
                            if (game[i][j] == 0 && possible[i][j][k] == k+1) {
                                if (rowsCount[k] == 0) {
                                    rows[k][0] = i;
                                } else if (rowsCount[k] == 1) {
                                    rows[k][1] = i;
                                }
                                rowsCount[k]++;
                            }
                        }
                    }
                }

                // Counts the number of numbers 1-9 that appear in only 2 rows
                for (int k = 0; k < 9; k++) { // number 1-9
                    if (rowsCount[k] == 2) {
                        pairNumbers[pairCount] = k;
                        pairCount++;
                    }
                }

                // Counts the number of cells with only 2 options
                for (int i = 0; i < 9; i++) { // row number
                    if (game[i][j] == 0) {
                        tempCount = 0;
                        for (int k = 0; k < 9; k++) { // number 1-9
                            if (possible[i][j][k] == k+1) {
                                tempCount++;
                            }
                        }
                        if (tempCount == 2) {
                            twoOptionCell[i] = true;
                        }
                    }
                }

                // Checks to see if any of the numbers match any other numbers, forming a hidden pair
                // Then, if a hidden pair is found, it updates the possible values
                if (pairCount > 1) {
                    for (int m = 0; m < pairCount; m++) {
                        number1 = pairNumbers[m];
                        row1 = rows[number1][0];
                        row2 = rows[number1][1];

                        for (int n = m+1; n < pairCount; n++) {
                            number2 = pairNumbers[n];

                            if (row1 == rows[number2][0] && row2 == rows[number2][1]) {
                                if (!(twoOptionCell[row1] && twoOptionCell[row2])) {
                                    // number1 and number2 form a hidden pair in row1 and row2
                                    totalCount = 0;
                                    countCell1 = 0;
                                    countCell2 = 0;
                                    Arrays.fill(cellNumbersChanged1, 0);
                                    Arrays.fill(cellNumbersChanged2, 0);
                                    description = "";

                                    // Remove all possible options other than number1 and number2 in row1 and row2
                                    for (int k = 0; k < 9; k++) {
                                        if (k != number1 && k != number2) {
                                            if (possible[row1][j][k] == k+1) {
                                                possible[row1][j][k] = 0;
                                                cellNumbersChanged1[countCell1] = k;
                                                countCell1++;
                                                totalCount++;
                                            }
                                            if (possible[row2][j][k] == k+1) {
                                                possible[row2][j][k] = 0;
                                                cellNumbersChanged2[countCell2] = k;
                                                countCell2++;
                                                totalCount++;
                                            }
                                        }
                                    }

                                    // Save data to change log
                                    if (totalCount > 0) {
                                        if (!isGuessAndCheck && !isBruteForce) {
                                            possibleChangeMethod.add("Hidden Pair - Column");
                                            description = "Since the numbers " + (number1+1) + " and " + (number2+1) +
                                                    " form a hidden pair in the cells (" + (row1+1) + "," + (j+1) + ") and (" +
                                                    (row2+1) + "," + (j+1) + "), the below cells were removed as possible options:"; 

                                            if (countCell1 > 0) {
                                                description = description + "\nRow " + (row1+1) + ", Column " + (j+1) + ": ";
                                                for (int s = 0; s < countCell1; s++) {
                                                    if (s < countCell1-1) {
                                                        description = description + (cellNumbersChanged1[s]+1) + ", ";
                                                    } else if (s == countCell1-1 && s != 0) {
                                                        description = description + "and " +(cellNumbersChanged1[s]+1);
                                                    } else if (s == 0) {
                                                        description = description + (cellNumbersChanged1[s]+1);
                                                    }
                                                    possibleChangeOrder.add(possibleChangeCount);
                                                    possibleChangeNumber.add(cellNumbersChanged1[s]+1);
                                                    possibleChangeRow.add(row1);
                                                    possibleChangeColumn.add(j);
                                                    possibleChangePossibleCount++;
                                                }
                                            }

                                            if (countCell2 > 0) {
                                                description = description + "\nRow " + (row2+1) + ", Column " + (j+1) + ": ";
                                                for (int s = 0; s < countCell2; s++) {
                                                    if (s < countCell2-1) {
                                                        description = description + (cellNumbersChanged2[s]+1) + ", ";
                                                    } else if (s == countCell2-1 && s != 0) {
                                                            description = description + "and " +(cellNumbersChanged2[s]+1);
                                                    } else if (s == 0) {
                                                            description = description + (cellNumbersChanged2[s]+1);
                                                    }
                                                    possibleChangeOrder.add(possibleChangeCount);
                                                    possibleChangeNumber.add(cellNumbersChanged2[s]+1);
                                                    possibleChangeRow.add(row2);
                                                    possibleChangeColumn.add(j);
                                                    possibleChangePossibleCount++;
                                                }
                                            }
                                            possibleChangeDescription.add(description);                          
                                            totalChangeType.add("possible");
                                            levelOneChanges++;
                                            hiddenPairColumnChanges++;
                                            possibleChangeCount++;
                                            totalChangeCount++;
                                        }
                                        tempChanges++;
                                        
                                        // Run previous methods to see if the puzzle can be solved
                                        tempChanges += levelZeroMethods(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                    } 
                                }
                            }
                        }
                    }
                }
            }
            changes += tempChanges;
        } while (tempChanges != 0 && !solved);
        
	return changes;
    }
    
    public static int hiddenPairGroupCheck(int game[][], int possible[][][], boolean Rows[][], boolean Columns[][], boolean Groups[][], boolean isGuessAndCheck, boolean isBruteForce) {
        int changes = 0;
        int tempChanges;
        int[] cellCount = new int[9];
        int[][] rows = new int[9][2];
        int[][] columns = new int[9][2];
        int[] pairNumbers = new int[9];
        int pairCount = 0;
        boolean[][] twoOptionCells = new boolean[9][9];
        int tempCount = 0;
        int number1 = 0;
        int number2 = 0;
        int row1 = 0;
        int row2 = 0;
        int column1 = 0;
        int column2 = 0;
        int totalCount = 0;
        String description = "";
        int countCell1 = 0;
        int countCell2 = 0;
        int[] cellNumbersChanged1 = new int[9];
        int[] cellNumbersChanged2 = new int[9];
        
        do {
            tempChanges = 0;
            for (int l = 0; l < 9 && !solved; l++) { // group number
                pairCount = 0;
                for (int z = 0; z < 9; z++) {
                    Arrays.fill(twoOptionCells[z], false);
                }
                Arrays.fill(cellCount, 0);
                Arrays.fill(pairNumbers, 0);
                for (int z = 0; z < 9; z++) {
                    rows[z][0] = 0;
                    columns[z][0] = 0;      
                    rows[z][1] = 0;
                    columns[z][1] = 0;
                }

                // Counts how many times each number appears in the group
                for (int k = 0; k < 9; k++) { // number 1-9
                    if (!Groups[l][k]) {
                        for (int i = ROW_START[l]; i <= ROW_END[l]; i++) { // row number
                            for (int j = COLUMN_START[l]; j <= COLUMN_END[l]; j++) { // column number
                                if (game[i][j] == 0 && possible[i][j][k] == k+1) {
                                    if (cellCount[k] == 0) {
                                        rows[k][0] = i;
                                        columns[k][0] = j;
                                    } else if (cellCount[k] == 1) {
                                        rows[k][1] = i;
                                        columns[k][1] = j;
                                    }
                                    cellCount[k]++;
                                }
                            }
                        }
                    }
                }

                // Counts the number of numbers 1-9 that appear in only 2 rows
                for (int k = 0; k < 9; k++) { // number 1-9
                    if (cellCount[k] == 2) {
                        pairNumbers[pairCount] = k;
                        pairCount++;
                    }
                }

                // Counts the number of cells with only 2 options
                for (int i = ROW_START[l]; i <= ROW_END[l]; i++) { // row number
                    for (int j = COLUMN_START[l]; j <= COLUMN_END[l]; j++) { // column number
                        tempCount = 0;
                        if (game[i][j] == 0) {
                            for (int k = 0; k < 9; k++) { // number 1-9
                                if (possible[i][j][k] == k+1) {
                                    tempCount++;
                                }
                            }
                            if (tempCount == 2) {
                                twoOptionCells[i][j] = true;
                            }
                        }
                    }
                }

                // Checks to see if any of the numbers match any other numbers, forming a hidden pair
                // Then, if a hidden pair is found, it updates the possible values
                if (pairCount > 1) {
                    for (int m = 0; m < pairCount; m++) {
                        number1 = pairNumbers[m];
                        row1 = rows[number1][0];
                        column1 = columns[number1][0];
                        row2 = rows[number1][1];
                        column2 = columns[number1][1];

                        for (int n = m+1; n < pairCount; n++) {
                            number2 = pairNumbers[n];

                            if (row1 == rows[number2][0] && row2 == rows[number2][1] &&
                                    column1 == columns[number2][0] && column2 == columns[number2][1]) {
                                if (!(twoOptionCells[row1][column1] && twoOptionCells[row2][column2])) {
                                    // number1 and number2 form a hidden pair in row1, column1 and row2, column2
                                    totalCount = 0;
                                    countCell1 = 0;
                                    countCell2 = 0;
                                    Arrays.fill(cellNumbersChanged1, 0);
                                    Arrays.fill(cellNumbersChanged2, 0);
                                    description = "";

                                    // Remove all possible options other than number1 and number2 in row1, column1 and row2, column2
                                    for (int k = 0; k < 9; k++) {
                                        if (k != number1 && k != number2) {
                                            if (possible[row1][column1][k] == k+1) {
                                                possible[row1][column1][k] = 0;
                                                cellNumbersChanged1[countCell1] = k;
                                                countCell1++;
                                                totalCount++;
                                            }
                                            if (possible[row2][column2][k] == k+1) {
                                                possible[row2][column2][k] = 0;
                                                cellNumbersChanged2[countCell2] = k;
                                                countCell2++;
                                                totalCount++;
                                            }
                                        }
                                    }

                                    // Save data to change log
                                    if (totalCount > 0) {
                                        if (!isGuessAndCheck && !isBruteForce) {
                                            possibleChangeMethod.add("Hidden Pair - Group");
                                            description = "Since the numbers " + (number1+1) + " and " + (number2+1) +
                                                    " form a hidden pair in the cells (" + (row1+1) + "," + (column1+1) + ") and (" +
                                                    (row2+1) + "," + (column2+1) + "), the below cells were removed as possible options:"; 

                                            if (countCell1 > 0) {
                                                description = description + "\nRow " + (row1+1) + ", Column " + (column1+1) + ": ";
                                                for (int s = 0; s < countCell1; s++) {
                                                    if (s < countCell1-1) {
                                                        description = description + (cellNumbersChanged1[s]+1) + ", ";
                                                    } else if (s == countCell1-1 && s != 0) {
                                                        description = description + "and " +(cellNumbersChanged1[s]+1);
                                                    } else if (s == 0) {
                                                        description = description + (cellNumbersChanged1[s]+1);
                                                    }
                                                    possibleChangeOrder.add(possibleChangeCount);
                                                    possibleChangeNumber.add(cellNumbersChanged1[s]+1);
                                                    possibleChangeRow.add(row1);
                                                    possibleChangeColumn.add(column1);
                                                    possibleChangePossibleCount++;
                                                }
                                            }

                                            if (countCell2 > 0) {
                                                description = description + "\nRow " + (row2+1) + ", Column " + (column2+1) + ": ";
                                                for (int s = 0; s < countCell2; s++) {
                                                    if (s < countCell2-1) {
                                                        description = description + (cellNumbersChanged2[s]+1) + ", ";
                                                    } else if (s == countCell2-1 && s != 0) {
                                                            description = description + "and " +(cellNumbersChanged2[s]+1);
                                                    } else if (s == 0) {
                                                            description = description + (cellNumbersChanged2[s]+1);
                                                    }
                                                    possibleChangeOrder.add(possibleChangeCount);
                                                    possibleChangeNumber.add(cellNumbersChanged2[s]+1);
                                                    possibleChangeRow.add(row2);
                                                    possibleChangeColumn.add(column2);
                                                    possibleChangePossibleCount++;
                                                }
                                            }
                                            possibleChangeDescription.add(description);                          
                                            totalChangeType.add("possible");
                                            levelOneChanges++;
                                            hiddenPairGroupChanges++;
                                            possibleChangeCount++;
                                            totalChangeCount++;
                                        }
                                        tempChanges++;
                                        
                                        // Run previous methods to see if the puzzle can be solved
                                        tempChanges += levelZeroMethods(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            changes += tempChanges;
        } while (tempChanges != 0 && !solved);
	return changes;
    }
    
    public static int nakedPairChecks(int game[][], int possible[][][], boolean Rows[][], boolean Columns[][], boolean Groups[][], boolean isGuessAndCheck, boolean isBruteForce) {
        int changes;
        int tempNakedPairChanges = 0;
        
        do {
            changes = 0;
            changes += nakedPairRowCheck(game, possible, Rows, Columns, Groups, isGuessAndCheck,  isBruteForce); // works
            changes += nakedPairColumnCheck(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce); // works
            changes += nakedPairGroupCheck(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce); // works
            tempNakedPairChanges += changes;
        } while (changes != 0 && !solved);
        
        return tempNakedPairChanges;
    }
    
    public static int nakedPairRowCheck(int game[][], int possible[][][], boolean Rows[][], boolean Columns[][], boolean Groups[][], boolean isGuessAndCheck, boolean isBruteForce) {
        int changes = 0;
        int tempChanges;
        int[] numberCount = new int[9];
        int[][] numbers = new int[9][2];
        int[] pairColumns = new int[9];
        int pairCount = 0;
        int number1 = 0;
        int number2 = 0;
        int column1 = 0;
        int column2 = 0;
        int totalCount = 0;
        int number1Changes = 0;
        int number2Changes = 0;
        int[] columnsChanged1 = new int[9];
        int[] columnsChanged2 = new int[9];
        String description;
        
        do {
            tempChanges = 0;
            for (int i = 0; i < 9 && !solved; i++) { // row number
                for (int z = 0; z < 9; z++) {
                    Arrays.fill(numbers[z], 0);
                }
                Arrays.fill(numberCount, 0);
                Arrays.fill(pairColumns, 0);
                pairCount = 0;

                // Goes down the row and counts the number of options in each cell and stores the first two
                for (int j = 0; j < 9; j++) { // column number
                    if (game[i][j] == 0) {
                        for (int k = 0; k < 9; k++) { // number 1-9
                            if (possible[i][j][k] == k+1) {
                                if (numberCount[j] == 0) {
                                    numbers[j][0] = k;
                                } else if (numberCount[j] == 1) {
                                    numbers[j][1] = k;
                                }
                                numberCount[j]++;
                            }
                        }
                    }
                }

                // Counts the number of cells that have only 2 options
                for (int j = 0; j < 9; j++) { // column number
                    if (numberCount[j] == 2) {
                        pairColumns[pairCount] = j;
                        pairCount++;
                    }
                }

                // Checks to see if any of the two option cells have the same numbers, forming a naked pair
                // Then, if a naked pair is found, it updates the possible values
                if (pairCount > 1) {
                    for (int m = 0; m < pairCount; m++) {
                        column1 = pairColumns[m];
                        number1 = numbers[column1][0];
                        number2 = numbers[column1][1];

                        for (int n = m+1; n < pairCount; n++) {
                            column2 = pairColumns[n];

                            if (number1 == numbers[column2][0] && number2 == numbers[column2][1]) {
                                // number1 and number2 form a naked pair in column1 and column2
                                totalCount = 0;
                                number1Changes = 0;
                                number2Changes = 0;
                                Arrays.fill(columnsChanged1, 0);
                                Arrays.fill(columnsChanged2, 0);
                                description = "";

                                // Remove number1 and number2 from every cell in row other than column1 and column2
                                for (int j = 0; j < 9; j++) {
                                    if (game[i][j] == 0 && j != column1 && j != column2) {
                                        if (possible[i][j][number1] == number1+1) {
                                            possible[i][j][number1] = 0;
                                            columnsChanged1[number1Changes] = j;
                                            number1Changes++;
                                            totalCount++;
                                        }
                                        if (possible[i][j][number2] == number2+1) {
                                            possible[i][j][number2] = 0;
                                            columnsChanged2[number2Changes] = j;
                                            number2Changes++;
                                            totalCount++;
                                        }
                                    }
                                }

                                // save data to change log
                                if (totalCount > 0) {
                                    if (!isGuessAndCheck && !isBruteForce) {
                                        possibleChangeMethod.add("Naked Pair - Row");
                                        description = "Since the numbers " + (number1+1) + " and " + (number2+1) +
                                                " form a naked pair in the cells (" + (i+1) + "," + (column1+1) + ") and (" +
                                                (i+1) + "," + (column2+1) + "), the below numbers were removed as possible options:";

                                        if (number1Changes > 0) {
                                            for (int s = 0; s < number1Changes; s++) {
                                                description = description + "\nRow " + (i+1) + ", Column " + (columnsChanged1[s]+1) + ": " + (number1+1);
                                                possibleChangeOrder.add(possibleChangeCount);
                                                possibleChangeNumber.add(number1+1);
                                                possibleChangeRow.add(i);
                                                possibleChangeColumn.add(columnsChanged1[s]);
                                                possibleChangePossibleCount++;
                                            }
                                        }

                                        if (number2Changes > 0) {
                                            for (int s = 0; s < number2Changes; s++) {
                                                description = description + "\nRow " + (i+1) + ", Column " + (columnsChanged2[s]+1) + ": " + (number2+1);
                                                possibleChangeOrder.add(possibleChangeCount);
                                                possibleChangeNumber.add(number2+1);
                                                possibleChangeRow.add(i);
                                                possibleChangeColumn.add(columnsChanged2[s]);
                                                possibleChangePossibleCount++;
                                            }
                                        }

                                        possibleChangeDescription.add(description);                          
                                        totalChangeType.add("possible");
                                        levelOneChanges++;
                                        nakedPairRowChanges++;
                                        possibleChangeCount++;
                                        totalChangeCount++;
                                    }
                                    tempChanges++;
                                    
                                    // Run previous methods to see if the puzzle can be solved
                                    tempChanges += levelZeroMethods(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                }
                            }
                        }
                    }
                }
            }
            changes += tempChanges;
        } while (tempChanges != 0 && !solved);
        return changes;
    }
    
    public static int nakedPairColumnCheck(int game[][], int possible[][][], boolean Rows[][], boolean Columns[][], boolean Groups[][], boolean isGuessAndCheck, boolean isBruteForce) {
        int changes = 0;
        int tempChanges;
        int[] numberCount = new int[9];
        int[][] numbers = new int[9][2];
        int[] pairRows = new int[9];
        int pairCount = 0;
        int number1 = 0;
        int number2 = 0;
        int row1 = 0;
        int row2 = 0;
        int totalCount = 0;
        int number1Changes = 0;
        int number2Changes = 0;
        int[] rowsChanged1 = new int[9];
        int[] rowsChanged2 = new int[9];
        String description;
        
        do {
            tempChanges = 0;
            for (int j = 0; j < 9 && !solved; j++) { // column number
                for (int z = 0; z < 9; z++) {
                    Arrays.fill(numbers[z], 0);
                }
                Arrays.fill(numberCount, 0);
                Arrays.fill(pairRows, 0);
                pairCount = 0;

                // Goes down the column and counts the number of options in each cell and stores the first two
                for (int i = 0; i < 9; i++) { // row number
                    if (game[i][j] == 0) {
                        for (int k = 0; k < 9; k++) { // number 1-9
                            if (possible[i][j][k] == k+1) {
                                if (numberCount[i] == 0) {
                                    numbers[i][0] = k;
                                } else if (numberCount[i] == 1) {
                                    numbers[i][1] = k;
                                }
                                numberCount[i]++;
                            }
                        }
                    }
                }

                // Counts the number of cells that have only 2 options
                for (int i = 0; i < 9; i++) { // row number
                    if (numberCount[i] == 2) {
                        pairRows[pairCount] = i;
                        pairCount++;
                    }
                }

                // Checks to see if any of the two option cells have the same numbers, forming a naked pair
                // Then, if a naked pair is found, it updates the possible values
                if (pairCount > 1) {
                    for (int m = 0; m < pairCount; m++) {
                        row1 = pairRows[m];
                        number1 = numbers[row1][0];
                        number2 = numbers[row1][1];

                        for (int n = m+1; n < pairCount; n++) {
                            row2 = pairRows[n];

                            if (number1 == numbers[row2][0] && number2 == numbers[row2][1]) {
                                // number1 and number2 form a naked pair in row1 and row2
                                totalCount = 0;
                                number1Changes = 0;
                                number2Changes = 0;
                                Arrays.fill(rowsChanged1, 0);
                                Arrays.fill(rowsChanged2, 0);
                                description = "";

                                // Remove number1 and number2 from every cell in column other than column1 and column2
                                for (int i = 0; i < 9; i++) {
                                    if (game[i][j] == 0 && i != row1 && i != row2) {
                                        if (possible[i][j][number1] == number1+1) {
                                            possible[i][j][number1] = 0;
                                            rowsChanged1[number1Changes] = i;
                                            number1Changes++;
                                            totalCount++;
                                        }
                                        if (possible[i][j][number2] == number2+1) {
                                            possible[i][j][number2] = 0;
                                            rowsChanged2[number2Changes] = i;
                                            number2Changes++;
                                            totalCount++;
                                        }
                                    }
                                }

                                // save data to change log
                                if (totalCount > 0) {
                                    if (!isGuessAndCheck && !isBruteForce) {
                                        possibleChangeMethod.add("Naked Pair - Column");
                                        description = "Since the numbers " + (number1+1) + " and " + (number2+1) +
                                                " form a naked pair in the cells (" + (row1+1) + "," + (j+1) + ") and (" +
                                                (row2+1) + "," + (j+1) + "), the below cells were removed as possible options:";

                                        if (number1Changes > 0) {
                                            description = description + "\nNumber " + (number1+1) + ", Rows: ";
                                            for (int s = 0; s < number1Changes; s++) {
                                                if (s < number1Changes-1) {
                                                    description = description + (rowsChanged1[s]+1) + ", ";
                                                } else if (s == number1Changes-1 && s != 0) {
                                                    description = description + "and " +(rowsChanged1[s]+1);
                                                } else if (s == 0) {
                                                    description = description + (rowsChanged1[s]+1);
                                                }
                                                possibleChangeOrder.add(possibleChangeCount);
                                                possibleChangeNumber.add(number1+1);
                                                possibleChangeRow.add(rowsChanged1[s]);
                                                possibleChangeColumn.add(j);
                                                possibleChangePossibleCount++;
                                            }
                                        }

                                        if (number2Changes > 0) {
                                            description = description + "\nNumber " + (number2+1) + ", Rows: ";
                                            for (int s = 0; s < number2Changes; s++) {
                                                if (s < number2Changes-1) {
                                                    description = description + (rowsChanged2[s]+1) + ", ";
                                                } else if (s == number2Changes-1 && s != 0) {
                                                    description = description + "and " +(rowsChanged2[s]+1);
                                                } else if (s == 0) {
                                                    description = description + (rowsChanged2[s]+1);
                                                }
                                                possibleChangeOrder.add(possibleChangeCount);
                                                possibleChangeNumber.add(number2+1);
                                                possibleChangeRow.add(rowsChanged2[s]);
                                                possibleChangeColumn.add(j);
                                                possibleChangePossibleCount++;
                                            }
                                        }

                                        possibleChangeDescription.add(description);                          
                                        totalChangeType.add("possible");
                                        levelOneChanges++;
                                        nakedPairColumnChanges++;
                                        possibleChangeCount++;
                                        totalChangeCount++;
                                    }
                                    tempChanges++;
                                    
                                    // Run previous methods to see if the puzzle can be solved
                                    tempChanges += levelZeroMethods(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                }
                            }
                        }
                    }
                }
            }
            changes += tempChanges;
        } while (tempChanges != 0 && !solved);
            
        return changes;
    }
    
    public static int nakedPairGroupCheck(int game[][], int possible[][][], boolean Rows[][], boolean Columns[][], boolean Groups[][], boolean isGuessAndCheck, boolean isBruteForce) {
        int changes = 0;
        int tempChanges;
        int[][] numberCount = new int[9][9];
        int[][][] numbers = new int[9][9][2];
        int pairCount = 0;
        int[] pairRows = new int[9];
        int[] pairColumns = new int[9];
        int row1 = 0;
        int column1 = 0;
        int number1 = 0;
        int row2 = 0;
        int column2 = 0;
        int number2 = 0;
        int totalCount = 0;
        int number1Changes = 0;
        int number2Changes = 0;
        int[] rowsChanged1 = new int[9];
        int[] rowsChanged2 = new int[9];
        int[] columnsChanged1 = new int[9];
        int[] columnsChanged2 = new int[9];
        String description;
        
        do {
            tempChanges = 0;
            for (int l = 0; l < 9 && !solved; l++) { // group number
                for (int x = 0; x < 9; x++) {
                    Arrays.fill(numberCount[x], 0);
                    for (int y = 0; y < 9; y++) {
                        numbers[x][y][0] = 0;
                        numbers[x][y][1] = 0;
                    }
                }
                pairCount = 0;

                // Goes through the group and counts the number of options in each cell and stores the first two
                for (int i = ROW_START[l]; i <= ROW_END[l]; i++) { // row number
                    for (int j = COLUMN_START[l]; j <= COLUMN_END[l]; j++) { // column number
                        if (game[i][j] == 0) {
                            for (int k = 0; k < 9; k++) { // number 1-9
                                if (possible[i][j][k] == k+1) {
                                    if (numberCount[i][j] == 0) {
                                        numbers[i][j][0] = k;
                                    } else if (numberCount[i][j] == 1) {
                                        numbers[i][j][1] = k;
                                    }
                                    numberCount[i][j]++;
                                }
                            }
                        }
                    }
                }

                // Counts the number of cells that have only 2 options
                for (int i = ROW_START[l]; i <= ROW_END[l]; i++) { // row number
                    for (int j = COLUMN_START[l]; j <= COLUMN_END[l]; j++) { // column number
                        if (numberCount[i][j] == 2) {
                            pairRows[pairCount] = i;
                            pairColumns[pairCount] = j;
                            pairCount++;
                        }
                    }
                }

                // Checks to see if any of the two option cells have the same numbers, forming a naked pair
                // Then, if a naked pair is found, it updates the possible values
                if (pairCount > 1) {
                    for (int m = 0; m < pairCount; m++) {
                        row1 = pairRows[m];
                        column1 = pairColumns[m];
                        number1 = numbers[row1][column1][0];
                        number2 = numbers[row1][column1][1];

                        for (int n = m+1; n < pairCount; n++) {
                            row2 = pairRows[n];
                            column2 = pairColumns[n];

                            if (number1 == numbers[row2][column2][0] && number2 == numbers[row2][column2][1]) {
                                // number1 and number2 form a naked pair in row1, column1 and row2, column2
                                totalCount = 0;
                                number1Changes = 0;
                                number2Changes = 0;
                                Arrays.fill(rowsChanged1, 0);
                                Arrays.fill(columnsChanged1, 0);
                                Arrays.fill(rowsChanged2, 0);
                                Arrays.fill(columnsChanged2, 0);
                                description = "";

                                // Remove number1 and number2 from every cell in group other than row1, column1 and row2, column2
                                for (int i = ROW_START[l]; i <= ROW_END[l]; i++) { // row number
                                    for (int j = COLUMN_START[l]; j <= COLUMN_END[l]; j++) { // column number
                                        if (game[i][j] == 0 && !(i == row1 && j == column1) && !(i == row2 && j == column2)) {
                                            if (possible[i][j][number1] == number1+1) {
                                                possible[i][j][number1] = 0;
                                                rowsChanged1[number1Changes] = i;
                                                columnsChanged1[number1Changes] = j;
                                                number1Changes++;
                                                totalCount++;
                                            }
                                            if (possible[i][j][number2] == number2+1) {
                                                possible[i][j][number2] = 0;
                                                rowsChanged2[number2Changes] = i;
                                                columnsChanged2[number2Changes] = j;
                                                number2Changes++;
                                                totalCount++;
                                            }
                                        }
                                    }
                                }

                                // save data to change log
                                if (totalCount > 0) {
                                    if (!isGuessAndCheck && !isBruteForce) {
                                        possibleChangeMethod.add("Naked Pair - Group");
                                        description = "Since the numbers " + (number1+1) + " and " + (number2+1) +
                                                " form a naked pair in the cells (" + (row1+1) + "," + (column1+1) + ") and (" +
                                                (row2+1) + "," + (column2+1) + "), the below cells were removed as possible options:";

                                        if (number1Changes > 0) {
                                            description = description + "\nNumber " + (number1+1) + ": ";
                                            for (int s = 0; s < number1Changes; s++) {
                                                description = description + "\nRow " + (rowsChanged1[s]+1) + ", Column "
                                                        + (columnsChanged1[s]+1);
                                                possibleChangeOrder.add(possibleChangeCount);
                                                possibleChangeNumber.add(number1+1);
                                                possibleChangeRow.add(rowsChanged1[s]);
                                                possibleChangeColumn.add(columnsChanged1[s]);
                                                possibleChangePossibleCount++;
                                            }
                                        }

                                        if (number2Changes > 0) {
                                            description = description + "\nNumber " + (number2+1) + ": ";
                                            for (int s = 0; s < number2Changes; s++) {
                                                description = description + "\nRow " + (rowsChanged2[s]+1) + ", Column "
                                                        + (columnsChanged2[s]+1);
                                                possibleChangeOrder.add(possibleChangeCount);
                                                possibleChangeNumber.add(number2+1);
                                                possibleChangeRow.add(rowsChanged2[s]);
                                                possibleChangeColumn.add(columnsChanged2[s]);
                                                possibleChangePossibleCount++;
                                            }
                                        }

                                        possibleChangeDescription.add(description);                          
                                        totalChangeType.add("possible");
                                        levelOneChanges++;
                                        nakedPairGroupChanges++;
                                        possibleChangeCount++;
                                        totalChangeCount++;
                                    }
                                    tempChanges++;
                                    
                                    // Run previous methods to see if the puzzle can be solved
                                    tempChanges += levelZeroMethods(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                }
                            }
                        }
                    }
                }
            }
            changes += tempChanges;
        } while (tempChanges != 0 && !solved);
            
        return changes;
    }
    
    public static int levelTwoMethods(int game[][], int possible[][][], boolean Rows[][], boolean Columns[][], boolean Groups[][], boolean isGuessAndCheck,  boolean isBruteForce) {
        int changes;
        int tempLevelTwoChanges = 0;
        
        do {
            changes = 0;
            changes += nakedTripleChecks(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce); // updated
            changes += hiddenTripleChecks(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce); // updated
            changes += nakedQuadChecks(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce); // updated
            changes += xWingChecks(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce); // updated
            changes += yWingChecks(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce); // updated
            tempLevelTwoChanges += changes;
        } while (changes != 0 && !solved);
        
        return tempLevelTwoChanges;
    }
    
    public static int nakedTripleChecks(int game[][], int possible[][][], boolean Rows[][], boolean Columns[][], boolean Groups[][], boolean isGuessAndCheck, boolean isBruteForce) {
        int changes;
        int tempNakedTripleChanges = 0;
        
        do {
            changes = 0;
            changes += nakedTripleRowCheck(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
            changes += nakedTripleColumnCheck(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
            changes += nakedTripleGroupCheck(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
            tempNakedTripleChanges += changes;
        } while (changes != 0 && !solved);
        
        return tempNakedTripleChanges;
    }
    
    public static int nakedTripleRowCheck(int game[][], int possible[][][], boolean Rows[][], boolean Columns[][], boolean Groups[][], boolean isGuessAndCheck, boolean isBruteForce) {
        int changes = 0;
        int tempChanges;
        int[] numberCount = new int[9];
        int[][] numbers = new int[9][3];
        int[] tripleColumns = new int[9];
        int tripleCount = 0;
        int column1 = 0;
        int column2 = 0;
        int column3 = 0;
        int[] diffNumbers = new int[3];
        int[] countDiffNumbers = new int[3];
        int tempCount = 0;
        int tempNumber = 0;
        boolean sameFlag = false;
        int totalCount = 0;
        int number1Changes = 0;
        int number2Changes = 0;
        int number3Changes = 0;
        int[] columnsChanged1 = new int[9];
        int[] columnsChanged2 = new int[9];
        int[] columnsChanged3 = new int[9];
        String description;
        
        do {
            tempChanges = 0;
            for (int i = 0; i < 9 && !solved; i++) { // row number
                for (int z = 0; z < 9; z++) {
                    Arrays.fill(numbers[z], 0);
                }
                Arrays.fill(numberCount, 0);
                Arrays.fill(tripleColumns, 0);
                tripleCount = 0;

                // Goes down the row and counts the number of options in each cell and stores the first three
                for (int j = 0; j < 9; j++) { // column number
                    if (game[i][j] == 0) {
                        for (int k = 0; k < 9; k++) { // number 1-9
                            if (possible[i][j][k] == k+1) {
                                if (numberCount[j] < 3) {
                                    numbers[j][numberCount[j]] = k;
                                }
                                numberCount[j]++;
                            }
                        }
                    }
                }

                // Counts number of cells with 3 or less options
                for (int j = 0; j < 9; j++) { // column number
                    if (numberCount[j] == 2 || numberCount[j] == 3) {
                        tripleColumns[tripleCount] = j;
                        tripleCount++;
                    }
                }

                // Checks to see if any of the two or three option cells have the same numbers, forming a naked triple
                // Then, if a naked triple is found, it updates the possible values
                if (tripleCount > 2) {
                    // Stage 1
                    for (int a = 0; a <= tripleCount-3 && !solved; a++) {
                        Arrays.fill(diffNumbers, 0);
                        Arrays.fill(countDiffNumbers, 0);
                        column1 = tripleColumns[a];
                        diffNumbers[0] = numbers[column1][0];
                        diffNumbers[1] = numbers[column1][1];
                        if (numberCount[column1] == 2) {
                            countDiffNumbers[0] = 2;
                        }
                        if (numberCount[column1] == 3) {
                            diffNumbers[2] = numbers[column1][2];
                            countDiffNumbers[0] = 3;
                        }

                        // Stage 2
                        for (int b = a+1; b <= tripleCount-2 && !solved; b++) {
                            column2 = tripleColumns[b];
                            tempCount = countDiffNumbers[0];

                            for (int x = 0; x < numberCount[column2]; x++) {
                                sameFlag = false;
                                tempNumber = numbers[column2][x];
                                for (int y = 0; y < countDiffNumbers[0]; y++) {
                                    if (tempNumber == diffNumbers[y]) {
                                        sameFlag = true;
                                    }
                                }
                                if (sameFlag == false) {
                                    if (tempCount < 3) {
                                        diffNumbers[tempCount] = tempNumber;
                                    }
                                    tempCount++;
                                }
                            }
                            countDiffNumbers[1] = tempCount;

                            // Stage 3
                            if (countDiffNumbers[1] <= 3) { // There still may be a naked triple
                                for (int c = b+1; c <= tripleCount-1 && !solved; c++) {
                                    column3 = tripleColumns[c];
                                    tempCount = countDiffNumbers[1];

                                    for (int x = 0; x < numberCount[column3]; x++) {
                                        sameFlag = false;
                                        tempNumber = numbers[column3][x];
                                        for (int y = 0; y < countDiffNumbers[1]; y++) {
                                            if (tempNumber == diffNumbers[y]) {
                                                sameFlag = true;
                                            }
                                        }
                                        if (sameFlag == false) {
                                            if (tempCount < 3) {
                                                diffNumbers[tempCount] = tempNumber;
                                            }
                                            tempCount++;
                                        }
                                    }
                                    countDiffNumbers[2] = tempCount;

                                    if (countDiffNumbers[2] == 3) {
                                        // The 3 numbers stored in diffNumbers form a naked triple in columns 1, 2, & 3
                                        totalCount = 0;
                                        number1Changes = 0;
                                        number2Changes = 0;
                                        number3Changes = 0;
                                        Arrays.fill(columnsChanged1, 0);
                                        Arrays.fill(columnsChanged2, 0);
                                        Arrays.fill(columnsChanged3, 0);
                                        description = "";

                                        // Remove number1, number2, and number3 from every cell 
                                        // in row other than column1, column2, and column4
                                        for (int j = 0; j < 9; j++) {
                                            if (game[i][j] == 0 && j != column1 && j != column2 && j != column3) {
                                                if (possible[i][j][diffNumbers[0]] == diffNumbers[0]+1) {
                                                    possible[i][j][diffNumbers[0]] = 0;
                                                    columnsChanged1[number1Changes] = j;
                                                    number1Changes++;
                                                    totalCount++;
                                                }
                                                if (possible[i][j][diffNumbers[1]] == diffNumbers[1]+1) {
                                                    possible[i][j][diffNumbers[1]] = 0;
                                                    columnsChanged2[number2Changes] = j;
                                                    number2Changes++;
                                                    totalCount++;
                                                }
                                                if (possible[i][j][diffNumbers[2]] == diffNumbers[2]+1) {
                                                    possible[i][j][diffNumbers[2]] = 0;
                                                    columnsChanged3[number3Changes] = j;
                                                    number3Changes++;
                                                    totalCount++;
                                                }
                                            }
                                        }

                                        // save data to change log
                                        if (totalCount > 0) {
                                            if (!isGuessAndCheck && !isBruteForce) {
                                                possibleChangeMethod.add("Naked Triple - Row");
                                                description = "Since the numbers " + (diffNumbers[0]+1) + ", " + (diffNumbers[1]+1) +
                                                    ", and " + (diffNumbers[2]+1) + " form a naked triple in the cells (" + (i+1) + "," + (column1+1) + "), (" +
                                                    (i+1) + "," + (column2+1) + "), and (" + (i+1) + "," + (column3+1) + 
                                                    "), the below cells were removed as possible options:";

                                                if (number1Changes > 0) {
                                                    description = description + "\nNumber " + (diffNumbers[0]+1) + ", Row " + (i+1) + ", Columns: ";
                                                    for (int s = 0; s < number1Changes; s++) {
                                                        if (s < number1Changes-1) {
                                                            description = description + (columnsChanged1[s]+1) + ", ";
                                                        } else if (s == number1Changes-1 && s != 0) {
                                                            description = description + "and " +(columnsChanged1[s]+1);
                                                        } else if (s == 0) {
                                                            description = description + (columnsChanged1[s]+1);
                                                        }
                                                        possibleChangeOrder.add(possibleChangeCount);
                                                        possibleChangeNumber.add(diffNumbers[0]+1);
                                                        possibleChangeRow.add(i);
                                                        possibleChangeColumn.add(columnsChanged1[s]);
                                                        possibleChangePossibleCount++;
                                                    }
                                                }

                                                if (number2Changes > 0) {
                                                    description = description + "\nNumber " + (diffNumbers[1]+1) + ", Row " + (i+1) + ", Columns: ";
                                                    for (int s = 0; s < number2Changes; s++) {
                                                        if (s < number2Changes-1) {
                                                            description = description + (columnsChanged2[s]+1) + ", ";
                                                        } else if (s == number2Changes-1 && s != 0) {
                                                            description = description + "and " +(columnsChanged2[s]+1);
                                                        } else if (s == 0) {
                                                            description = description + (columnsChanged2[s]+1);
                                                        }
                                                        possibleChangeOrder.add(possibleChangeCount);
                                                        possibleChangeNumber.add(diffNumbers[1]+1);
                                                        possibleChangeRow.add(i);
                                                        possibleChangeColumn.add(columnsChanged2[s]);
                                                        possibleChangePossibleCount++;
                                                    }
                                                }

                                                if (number3Changes > 0) {
                                                    description = description + "\nNumber " + (diffNumbers[2]+1) + ", Row " + (i+1) + ", Columns: ";
                                                    for (int s = 0; s < number3Changes; s++) {
                                                        if (s < number3Changes-1) {
                                                            description = description + (columnsChanged3[s]+1) + ", ";
                                                        } else if (s == number3Changes-1 && s != 0) {
                                                            description = description + "and " +(columnsChanged3[s]+1);
                                                        } else if (s == 0) {
                                                            description = description + (columnsChanged3[s]+1);
                                                        }
                                                        possibleChangeOrder.add(possibleChangeCount);
                                                        possibleChangeNumber.add(diffNumbers[2]+1);
                                                        possibleChangeRow.add(i);
                                                        possibleChangeColumn.add(columnsChanged3[s]);
                                                        possibleChangePossibleCount++;
                                                    }
                                                }

                                                possibleChangeDescription.add(description);                          
                                                totalChangeType.add("possible");
                                                levelTwoChanges++;
                                                nakedTripleRowChanges++;
                                                possibleChangeCount++;
                                                totalChangeCount++;
                                            }
                                            tempChanges++;
                                            
                                            // Run previous methods to see if the puzzle can be solved
                                            tempChanges += levelZeroMethods(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                            if (!solved) {
                                                tempChanges += levelOneMethods(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            changes += tempChanges;
        } while (tempChanges != 0 && !solved);
            
        return changes;
    }
    
    public static int nakedTripleColumnCheck(int game[][], int possible[][][], boolean Rows[][], boolean Columns[][], boolean Groups[][], boolean isGuessAndCheck, boolean isBruteForce) {
        int changes = 0;
        int tempChanges;
        int[] numberCount = new int[9];
        int[][] numbers = new int[9][3];
        int[] tripleRows = new int[9];
        int tripleCount = 0;
        int row1 = 0;
        int row2 = 0;
        int row3 = 0;
        int[] diffNumbers = new int[3];
        int[] countDiffNumbers = new int[3];
        int tempCount = 0;
        int tempNumber = 0;
        boolean sameFlag = false;
        int totalCount = 0;
        int number1Changes = 0;
        int number2Changes = 0;
        int number3Changes = 0;
        int[] rowsChanged1 = new int[9];
        int[] rowsChanged2 = new int[9];
        int[] rowsChanged3 = new int[9];
        String description;
        
        do {
            tempChanges = 0;
            for (int j = 0; j < 9 && !solved; j++) { // column number
                for (int z = 0; z < 9; z++) {
                    Arrays.fill(numbers[z], 0);
                }
                Arrays.fill(numberCount, 0);
                Arrays.fill(tripleRows, 0);
                tripleCount = 0;

                // Goes down the column and counts the number of options in each cell and stores the first three
                for (int i = 0; i < 9; i++) { // row number
                    if (game[i][j] == 0) {
                        for (int k = 0; k < 9; k++) { // number 1-9
                            if (possible[i][j][k] == k+1) {
                                if (numberCount[i] < 3) {
                                    numbers[i][numberCount[i]] = k;
                                }
                                numberCount[i]++;
                            }
                        }
                    }
                }

                // Counts number of cells with 3 or less options
                for (int i = 0; i < 9; i++) { // row number
                    if (numberCount[i] == 2 || numberCount[i] == 3) {
                        tripleRows[tripleCount] = i;
                        tripleCount++;
                    }
                }

                // Checks to see if any of the two or three option cells have the same numbers, forming a naked triple
                // Then, if a naked triple is found, it updates the possible values
                if (tripleCount > 2) {
                    // Stage 1
                    for (int a = 0; a <= tripleCount-3 && !solved; a++) {
                        Arrays.fill(diffNumbers, 0);
                        Arrays.fill(countDiffNumbers, 0);
                        row1 = tripleRows[a];
                        diffNumbers[0] = numbers[row1][0];
                        diffNumbers[1] = numbers[row1][1];
                        if (numberCount[row1] == 2) {
                            countDiffNumbers[0] = 2;
                        }
                        if (numberCount[row1] == 3) {
                            diffNumbers[2] = numbers[row1][2];
                            countDiffNumbers[0] = 3;
                        } 

                        // Stage 2
                        for (int b = a+1; b <= tripleCount-2 && !solved; b++) {
                            row2 = tripleRows[b];
                            tempCount = countDiffNumbers[0];

                            for (int x = 0; x < numberCount[row2]; x++) {
                                sameFlag = false;
                                tempNumber = numbers[row2][x];
                                for (int y = 0; y < countDiffNumbers[0]; y++) {
                                    if (tempNumber == diffNumbers[y]) {
                                        sameFlag = true;
                                    }
                                }
                                if (sameFlag == false) {
                                    if (tempCount < 3) {
                                        diffNumbers[tempCount] = tempNumber;
                                    }
                                    tempCount++;
                                }
                            }
                            countDiffNumbers[1] = tempCount;

                            // Stage 3
                            if (countDiffNumbers[1] <= 3) { // There still may be a naked triple
                                for (int c = b+1; c <= tripleCount-1 && !solved; c++) {
                                    row3 = tripleRows[c];
                                    tempCount = countDiffNumbers[1];

                                    for (int x = 0; x < numberCount[row3]; x++) {
                                        sameFlag = false;
                                        tempNumber = numbers[row3][x];
                                        for (int y = 0; y < countDiffNumbers[1]; y++) {
                                            if (tempNumber == diffNumbers[y]) {
                                                sameFlag = true;
                                            }
                                        }
                                        if (sameFlag == false) {
                                            if (tempCount < 3) {
                                                diffNumbers[tempCount] = tempNumber;
                                            }
                                            tempCount++;
                                        }
                                    }
                                    countDiffNumbers[2] = tempCount;

                                    if (countDiffNumbers[2] == 3) {
                                        // The 3 numbers stored in diffNumbers form a naked triple in rows 1, 2, & 3
                                        totalCount = 0;
                                        number1Changes = 0;
                                        number2Changes = 0;
                                        number3Changes = 0;
                                        Arrays.fill(rowsChanged1, 0);
                                        Arrays.fill(rowsChanged2, 0);
                                        Arrays.fill(rowsChanged3, 0);
                                        description = "";

                                        // Remove number1, number2, and number3 from every cell 
                                        // in column other than row1, row2, and row4
                                        for (int i = 0; i < 9; i++) {
                                            if (game[i][j] == 0 && i != row1 && i != row2 && i != row3) {
                                                if (possible[i][j][diffNumbers[0]] == diffNumbers[0]+1) {
                                                    possible[i][j][diffNumbers[0]] = 0;
                                                    rowsChanged1[number1Changes] = i;
                                                    number1Changes++;
                                                    totalCount++;
                                                }
                                                if (possible[i][j][diffNumbers[1]] == diffNumbers[1]+1) {
                                                    possible[i][j][diffNumbers[1]] = 0;
                                                    rowsChanged2[number2Changes] = i;
                                                    number2Changes++;
                                                    totalCount++;
                                                }
                                                if (possible[i][j][diffNumbers[2]] == diffNumbers[2]+1) {
                                                    possible[i][j][diffNumbers[2]] = 0;
                                                    rowsChanged3[number3Changes] = i;
                                                    number3Changes++;
                                                    totalCount++;
                                                }
                                            }
                                        }

                                        // save data to change log
                                        if (totalCount > 0) {
                                            if (!isGuessAndCheck && !isBruteForce) {
                                                possibleChangeMethod.add("Naked Triple - Column");
                                                description = "Since the numbers " + (diffNumbers[0]+1) + ", " + (diffNumbers[1]+1) +
                                                    ", and " + (diffNumbers[2]+1) + " form a naked triple in the cells (" + (row1+1) + "," + (j+1) + "), (" +
                                                    (row2+1) + "," + (j+1) + "), and (" + (row3+1) + "," + (j+1) + 
                                                    "), the below cells were removed as possible options:";

                                                if (number1Changes > 0) {
                                                    description = description + "\nNumber " + (diffNumbers[0]+1) + ", Column " + (j+1) + ", Rows: ";
                                                    for (int s = 0; s < number1Changes; s++) {
                                                        if (s < number1Changes-1) {
                                                            description = description + (rowsChanged1[s]+1) + ", ";
                                                        } else if (s == number1Changes-1 && s != 0) {
                                                            description = description + "and " +(rowsChanged1[s]+1);
                                                        } else if (s == 0) {
                                                            description = description + (rowsChanged1[s]+1);
                                                        }
                                                        possibleChangeOrder.add(possibleChangeCount);
                                                        possibleChangeNumber.add(diffNumbers[0]+1);
                                                        possibleChangeRow.add(rowsChanged1[s]);
                                                        possibleChangeColumn.add(j);
                                                        possibleChangePossibleCount++;
                                                    }
                                                }

                                                if (number2Changes > 0) {
                                                    description = description + "\nNumber " + (diffNumbers[1]+1) + ", Column " + (j+1) + ", Rows: ";
                                                    for (int s = 0; s < number2Changes; s++) {
                                                        if (s < number2Changes-1) {
                                                            description = description + (rowsChanged2[s]+1) + ", ";
                                                        } else if (s == number2Changes-1 && s != 0) {
                                                            description = description + "and " +(rowsChanged2[s]+1);
                                                        } else if (s == 0) {
                                                            description = description + (rowsChanged2[s]+1);
                                                        }
                                                        possibleChangeOrder.add(possibleChangeCount);
                                                        possibleChangeNumber.add(diffNumbers[1]+1);
                                                        possibleChangeRow.add(rowsChanged2[s]);
                                                        possibleChangeColumn.add(j);
                                                        possibleChangePossibleCount++;
                                                    }
                                                }

                                                if (number3Changes > 0) {
                                                    description = description + "\nNumber " + (diffNumbers[2]+1) + ", Column " + (j+1) + ", Rows: ";
                                                    for (int s = 0; s < number3Changes; s++) {
                                                        if (s < number3Changes-1) {
                                                            description = description + (rowsChanged3[s]+1) + ", ";
                                                        } else if (s == number3Changes-1 && s != 0) {
                                                            description = description + "and " +(rowsChanged3[s]+1);
                                                        } else if (s == 0) {
                                                            description = description + (rowsChanged3[s]+1);
                                                        }
                                                        possibleChangeOrder.add(possibleChangeCount);
                                                        possibleChangeNumber.add(diffNumbers[2]+1);
                                                        possibleChangeRow.add(rowsChanged3[s]);
                                                        possibleChangeColumn.add(j);
                                                        possibleChangePossibleCount++;
                                                    }
                                                }

                                                possibleChangeDescription.add(description);                          
                                                totalChangeType.add("possible");
                                                levelTwoChanges++;
                                                nakedTripleColumnChanges++;
                                                possibleChangeCount++;
                                                totalChangeCount++;
                                            }
                                            tempChanges++;
                                            
                                            // Run previous methods to see if the puzzle can be solved
                                            tempChanges += levelZeroMethods(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                            if (!solved) {
                                                tempChanges += levelOneMethods(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            changes += tempChanges;
        } while (tempChanges != 0 && !solved);
            
        return changes;
    }
    
    public static int nakedTripleGroupCheck(int game[][], int possible[][][], boolean Rows[][], boolean Columns[][], boolean Groups[][], boolean isGuessAndCheck, boolean isBruteForce) {
        int changes = 0;
        int tempChanges;
        int[][] numberCount = new int[9][9];
        int[][][] numbers = new int[9][9][3];
        int[] tripleRows = new int[9];
        int[] tripleColumns = new int[9];
        int tripleCount = 0;
        int row1 = 0;
        int row2 = 0;
        int row3 = 0;
        int column1 = 0;
        int column2 = 0;
        int column3 = 0;
        int[] diffNumbers = new int[3];
        int[] countDiffNumbers = new int[3];
        int tempCount = 0;
        int tempNumber = 0;
        boolean sameFlag = false;
        int totalCount = 0;
        int number1Changes = 0;
        int number2Changes = 0;
        int number3Changes = 0;
        int[] rowsChanged1 = new int[9];
        int[] rowsChanged2 = new int[9];
        int[] rowsChanged3 = new int[9];
        int[] columnsChanged1 = new int[9];
        int[] columnsChanged2 = new int[9];
        int[] columnsChanged3 = new int[9];
        String description;
        
        do {
            tempChanges = 0;
            for (int l = 0; l < 9 && !solved; l++) { // group number
                for (int x = 0; x < 9; x++) {
                    Arrays.fill(numberCount[x], 0);
                    for (int y = 0; y < 9; y++) {
                        Arrays.fill(numbers[x][y], 0);
                    }
                }
                Arrays.fill(tripleRows, 0);
                Arrays.fill(tripleColumns, 0);
                tripleCount = 0;

                // Goes down the group and counts the number of options in each cell and stores the first three
                for (int i = ROW_START[l]; i <= ROW_END[l]; i++) { // row number
                    for (int j = COLUMN_START[l]; j <= COLUMN_END[l]; j++) { // column number
                        if (game[i][j] == 0) {
                            for (int k = 0; k < 9; k++) { // number 1-9
                                if (possible[i][j][k] == k+1) {
                                    if (numberCount[i][j] < 3) {
                                        numbers[i][j][numberCount[i][j]] = k;
                                    }
                                    numberCount[i][j]++;
                                }
                            }
                        }
                    }
                }

                // Counts number of cells with 3 or less options
                for (int i = ROW_START[l]; i <= ROW_END[l]; i++) { // row number
                    for (int j = COLUMN_START[l]; j <= COLUMN_END[l]; j++) { // column number
                        if (numberCount[i][j] == 2 || numberCount[i][j] == 3) {
                            tripleRows[tripleCount] = i;
                            tripleColumns[tripleCount] = j;
                            tripleCount++;
                        }
                    }
                }

                // Checks to see if any of the two or three option cells have the same numbers, forming a naked triple
                // Then, if a naked triple is found, it updates the possible values
                if (tripleCount > 2) {
                    // Stage 1
                    for (int a = 0; a <= tripleCount-3 && !solved; a++) {
                        Arrays.fill(diffNumbers, 0);
                        Arrays.fill(countDiffNumbers, 0);
                        row1 = tripleRows[a];
                        column1 = tripleColumns[a];
                        diffNumbers[0] = numbers[row1][column1][0];
                        diffNumbers[1] = numbers[row1][column1][1];
                        if (numberCount[row1][column1] == 2) {
                            countDiffNumbers[0] = 2;
                        }
                        if (numberCount[row1][column1] == 3) {
                            diffNumbers[2] = numbers[row1][column1][2];
                            countDiffNumbers[0] = 3;
                        } 

                        // Stage 2
                        for (int b = a+1; b <= tripleCount-2 && !solved; b++) {
                            row2 = tripleRows[b];
                            column2 = tripleColumns[b];
                            tempCount = countDiffNumbers[0];

                            for (int x = 0; x < numberCount[row2][column2]; x++) {
                                sameFlag = false;
                                tempNumber = numbers[row2][column2][x];
                                for (int y = 0; y < countDiffNumbers[0]; y++) {
                                    if (tempNumber == diffNumbers[y]) {
                                        sameFlag = true;
                                    }
                                }
                                if (sameFlag == false) {
                                    if (tempCount < 3) {
                                        diffNumbers[tempCount] = tempNumber;
                                    }
                                    tempCount++;
                                }
                            }
                            countDiffNumbers[1] = tempCount;

                            // Stage 3
                            if (countDiffNumbers[1] <= 3) { // There still may be a naked triple
                                for (int c = b+1; c <= tripleCount-1 && !solved; c++) {
                                    row3 = tripleRows[c];
                                    column3 = tripleColumns[c];
                                    tempCount = countDiffNumbers[1];

                                    for (int x = 0; x < numberCount[row3][column3]; x++) {
                                        sameFlag = false;
                                        tempNumber = numbers[row3][column3][x];
                                        for (int y = 0; y < countDiffNumbers[1]; y++) {
                                            if (tempNumber == diffNumbers[y]) {
                                                sameFlag = true;
                                            }
                                        }
                                        if (sameFlag == false) {
                                            if (tempCount < 3) {
                                                diffNumbers[tempCount] = tempNumber;
                                            }
                                            tempCount++;
                                        }
                                    }
                                    countDiffNumbers[2] = tempCount;

                                    if (countDiffNumbers[2] == 3) {
                                        // The 3 numbers stored in diffNumbers form a naked triple in cells 1, 2, & 3
                                        totalCount = 0;
                                        number1Changes = 0;
                                        number2Changes = 0;
                                        number3Changes = 0;
                                        Arrays.fill(rowsChanged1, 0);
                                        Arrays.fill(rowsChanged2, 0);
                                        Arrays.fill(rowsChanged3, 0);
                                        Arrays.fill(columnsChanged1, 0);
                                        Arrays.fill(columnsChanged2, 0);
                                        Arrays.fill(columnsChanged3, 0);
                                        description = "";

                                        // Remove number1, number2, and number3 from every cell 
                                        // in group other than cells 1, 2, and 4
                                        for (int i = ROW_START[l]; i <= ROW_END[l]; i++) {
                                            for (int j = COLUMN_START[l]; j <= COLUMN_END[l]; j++) {
                                                if (game[i][j] == 0 && !(i == row1 && j == column1) && !(i == row2 && j == column2) &&
                                                        !(i == row3 && j == column3)) {
                                                    if (possible[i][j][diffNumbers[0]] == diffNumbers[0]+1) {
                                                        possible[i][j][diffNumbers[0]] = 0;
                                                        rowsChanged1[number1Changes] = i;
                                                        columnsChanged1[number1Changes] = j;
                                                        number1Changes++;
                                                        totalCount++;
                                                    }
                                                    if (possible[i][j][diffNumbers[1]] == diffNumbers[1]+1) {
                                                        possible[i][j][diffNumbers[1]] = 0;
                                                        rowsChanged2[number2Changes] = i;
                                                        columnsChanged2[number2Changes] = j;
                                                        number2Changes++;
                                                        totalCount++;
                                                    }
                                                    if (possible[i][j][diffNumbers[2]] == diffNumbers[2]+1) {
                                                        possible[i][j][diffNumbers[2]] = 0;
                                                        rowsChanged3[number3Changes] = i;
                                                        columnsChanged3[number3Changes] = j;
                                                        number3Changes++;
                                                        totalCount++;
                                                    }
                                                }
                                            }
                                        }

                                        // save data to change log
                                        if (totalCount > 0) {
                                            if (!isGuessAndCheck && !isBruteForce) {
                                                possibleChangeMethod.add("Naked Triple - Group");
                                                description = "Since the numbers " + (diffNumbers[0]+1) + ", " + (diffNumbers[1]+1) +
                                                    ", and " + (diffNumbers[2]+1) + " form a naked triple in the cells (" + (row1+1) + "," + (column1+1) + "), (" +
                                                    (row2+1) + "," + (column2+1) + "), and (" + (row3+1) + "," + (column3+1) + 
                                                    "), the below cells were removed as possible options:";

                                                if (number1Changes > 0) {
                                                    description = description + "\nNumber " + (diffNumbers[0]+1) + ":";
                                                    for (int s = 0; s < number1Changes; s++) {
                                                        description = description + "\nRow " + (rowsChanged1[s]+1) + ", Column " + (columnsChanged1[s]+1);
                                                        possibleChangeOrder.add(possibleChangeCount);
                                                        possibleChangeNumber.add(diffNumbers[0]+1);
                                                        possibleChangeRow.add(rowsChanged1[s]);
                                                        possibleChangeColumn.add(columnsChanged1[s]);
                                                        possibleChangePossibleCount++;
                                                    }
                                                }

                                                if (number2Changes > 0) {
                                                    description = description + "\nNumber " + (diffNumbers[1]+1) + ":";
                                                    for (int s = 0; s < number2Changes; s++) {
                                                        description = description + "\nRow " + (rowsChanged2[s]+1) + ", Column " + (columnsChanged2[s]+1);
                                                        possibleChangeOrder.add(possibleChangeCount);
                                                        possibleChangeNumber.add(diffNumbers[1]+1);
                                                        possibleChangeRow.add(rowsChanged2[s]);
                                                        possibleChangeColumn.add(columnsChanged2[s]);
                                                        possibleChangePossibleCount++;
                                                    }
                                                }

                                                if (number3Changes > 0) {
                                                    description = description + "\nNumber " + (diffNumbers[2]+1) + ":";
                                                    for (int s = 0; s < number3Changes; s++) {
                                                        description = description + "\nRow " + (rowsChanged3[s]+1) + ", Column " + (columnsChanged3[s]+1);
                                                        possibleChangeOrder.add(possibleChangeCount);
                                                        possibleChangeNumber.add(diffNumbers[2]+1);
                                                        possibleChangeRow.add(rowsChanged3[s]);
                                                        possibleChangeColumn.add(columnsChanged3[s]);
                                                        possibleChangePossibleCount++;
                                                    }
                                                }

                                                possibleChangeDescription.add(description);                          
                                                totalChangeType.add("possible");
                                                levelTwoChanges++;
                                                nakedTripleGroupChanges++;
                                                possibleChangeCount++;
                                                totalChangeCount++;
                                            }
                                            tempChanges++;
                                            
                                            // Run previous methods to see if the puzzle can be solved
                                            tempChanges += levelZeroMethods(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                            if (!solved) {
                                                tempChanges += levelOneMethods(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            changes += tempChanges;
        } while (tempChanges != 0 && !solved);
            
        return changes;
    }
    
    public static int hiddenTripleChecks(int game[][], int possible[][][], boolean Rows[][], boolean Columns[][], boolean Groups[][], boolean isGuessAndCheck, boolean isBruteForce) {
        int changes;
        int tempHiddenTripleChanges = 0;
        
        do {
            changes = 0;
            changes += hiddenTripleRowCheck(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
            changes += hiddenTripleColumnCheck(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
            changes += hiddenTripleGroupCheck(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
            tempHiddenTripleChanges += changes;
        } while (changes != 0);
        
        return tempHiddenTripleChanges;
    }
    
    public static int hiddenTripleRowCheck(int game[][], int possible[][][], boolean Rows[][], boolean Columns[][], boolean Groups[][], boolean isGuessAndCheck, boolean isBruteForce) {
        int changes = 0;
        int tempChanges;
        int[][] columns = new int[9][3];
        int[] columnsCount = new int[9];
        int[] tripleNumbers = new int[9];
        int tripleCount = 0;
        int number1 = 0;
        int number2 = 0;
        int number3 = 0;
        int[] diffColumns = new int[3];
        int[] countDiffColumns = new int[3];
        int tempCount = 0;
        int tempColumn = 0;
        boolean sameFlag = false;
        int totalCount = 0;
        int column1Changes = 0;
        int column2Changes = 0;
        int column3Changes = 0;
        int[] numbersChanged1 = new int[9];
        int[] numbersChanged2 = new int[9];
        int[] numbersChanged3 = new int[9];
        String description;
        
        do {
            tempChanges = 0;
            for (int i = 0; i < 9 && !solved; i++) { // row number
                for (int z = 0; z < 9; z++) {
                    Arrays.fill(columns[z], 0);
                }
                Arrays.fill(columnsCount, 0);
                Arrays.fill(tripleNumbers, 0);
                tripleCount = 0;

                // Goes down the row, counts how many columns each number appears in, then stores the first three
                for (int k = 0; k < 9; k++) { // number 1-9
                    if (!Rows[i][k]) {
                        for (int j = 0; j < 9; j++) { // column number
                            if (game[i][j] == 0 && possible[i][j][k] == k+1) {
                                if (columnsCount[k] < 3) {
                                    columns[k][columnsCount[k]] = j;
                                }
                                columnsCount[k]++;
                            }
                        }
                    }
                }

                // Counts the number of numbers 1-9 that appear in only 2 or 3 columns
                for (int k = 0; k < 9; k++) { // number 1-9
                    if (columnsCount[k] == 2 || columnsCount[k] == 3) {
                        tripleNumbers[tripleCount] = k;
                        tripleCount++;
                    }
                }

                // Checks to see if any of the numbers match any other numbers, forming a hidden triple
                // Then, if a hidden triple is found, it updates the possible values
                if (tripleCount > 2) {
                    // Stage 1
                    for (int a = 0; a <= tripleCount-3 && !solved; a++) {
                        Arrays.fill(diffColumns, 0);
                        Arrays.fill(countDiffColumns, 0);
                        number1 = tripleNumbers[a];
                        diffColumns[0] = columns[number1][0];
                        diffColumns[1] = columns[number1][1];
                        if (columnsCount[number1] == 2) {
                            countDiffColumns[0] = 2;
                        }
                        if (columnsCount[number1] == 3) {
                            diffColumns[2] = columns[number1][2];
                            countDiffColumns[0] = 3;
                        }

                        // Stage 2
                        for (int b = a+1; b <= tripleCount-2 && !solved; b++) {
                            number2 = tripleNumbers[b];
                            tempCount = countDiffColumns[0];

                            for (int x = 0; x < columnsCount[number2]; x++) {
                                sameFlag = false;
                                tempColumn = columns[number2][x];
                                for (int y = 0; y < countDiffColumns[0]; y++) {
                                    if (tempColumn == diffColumns[y]) {
                                        sameFlag = true;
                                    }
                                }
                                if (sameFlag == false) {
                                    if (tempCount < 3) {
                                        diffColumns[tempCount] = tempColumn;
                                    }
                                    tempCount++;
                                }
                            }
                            countDiffColumns[1] = tempCount;

                            // Stage 3
                            if (countDiffColumns[1] <= 3) { // There still may be a hidden triple
                                for (int c = b+1; c <= tripleCount-1 && !solved; c++) {
                                    number3 = tripleNumbers[c];
                                    tempCount = countDiffColumns[1];

                                    for (int x = 0; x < columnsCount[number3]; x++) {
                                        sameFlag = false;
                                        tempColumn = columns[number3][x];
                                        for (int y = 0; y < countDiffColumns[1]; y++) {
                                            if (tempColumn == diffColumns[y]) {
                                                sameFlag = true;
                                            }
                                        }
                                        if (sameFlag == false) {
                                            if (tempCount < 3) {
                                                diffColumns[tempCount] = tempColumn;
                                            }
                                            tempCount++;
                                        }
                                    }
                                    countDiffColumns[2] = tempCount;

                                    if (countDiffColumns[2] == 3) {
                                        // number1, number2 and number3 form a hidden triple in column1, column2 and column3
                                        totalCount = 0;
                                        column1Changes = 0;
                                        column2Changes = 0;
                                        column3Changes = 0;
                                        Arrays.fill(numbersChanged1, 0);
                                        Arrays.fill(numbersChanged2, 0);
                                        Arrays.fill(numbersChanged3, 0);
                                        description = "";

                                        // Remove all numbers except number1, number2, number3 from 
                                        // all columns except column1, column2, and column3
                                        for (int k = 0; k < 9; k++) {
                                            if (k != number1 && k != number2 && k != number3) {
                                                if (possible[i][diffColumns[0]][k] == k+1) {
                                                    possible[i][diffColumns[0]][k] = 0;
                                                    numbersChanged1[column1Changes] = k;
                                                    column1Changes++;
                                                    totalCount++;
                                                }
                                                if (possible[i][diffColumns[1]][k] == k+1) {
                                                    possible[i][diffColumns[1]][k] = 0;
                                                    numbersChanged2[column2Changes] = k;
                                                    column2Changes++;
                                                    totalCount++;
                                                }
                                                if (possible[i][diffColumns[2]][k] == k+1) {
                                                    possible[i][diffColumns[2]][k] = 0;
                                                    numbersChanged3[column3Changes] = k;
                                                    column3Changes++;
                                                    totalCount++;
                                                }
                                            }
                                        }

                                        // Save data to change log
                                        if (totalCount > 0) {
                                            if (!isGuessAndCheck && !isBruteForce) {
                                                possibleChangeMethod.add("Hidden Triple - Row");
                                                description = "Since the numbers " + (number1+1) + ", " + (number2+1) + " and " +
                                                        (number3+1) + " form a hidden triple in the cells (" + (i+1) + "," + (diffColumns[0]+1) + "), (" +
                                                        (i+1) + "," + (diffColumns[1]+1) + "), (" + (i+1) + "," + (diffColumns[2]+1) + 
                                                        "), the below cells were removed as possible options:";

                                                if (column1Changes > 0) {
                                                    description = description + "\nRow " + (i+1) + ", Column " + (diffColumns[0]+1) + ": ";
                                                    for (int s = 0; s < column1Changes; s++) {
                                                        if (s < column1Changes-1) {
                                                            description = description + (numbersChanged1[s]+1) + ", ";
                                                        } else if (s == column1Changes-1 && s != 0) {
                                                            description = description + "and " +(numbersChanged1[s]+1);
                                                        } else if (s == 0) {
                                                            description = description + (numbersChanged1[s]+1);
                                                        }
                                                        possibleChangeOrder.add(possibleChangeCount);
                                                        possibleChangeNumber.add(numbersChanged1[s]+1);
                                                        possibleChangeRow.add(i);
                                                        possibleChangeColumn.add(diffColumns[0]);
                                                        possibleChangePossibleCount++;
                                                    }
                                                }

                                                if (column2Changes > 0) {
                                                    description = description + "\nRow " + (i+1) + ", Column " + (diffColumns[1]+1) + ": ";
                                                    for (int s = 0; s < column2Changes; s++) {
                                                        if (s < column2Changes-1) {
                                                            description = description + (numbersChanged2[s]+1) + ", ";
                                                        } else if (s == column2Changes-1 && s != 0) {
                                                            description = description + "and " +(numbersChanged2[s]+1);
                                                        } else if (s == 0) {
                                                            description = description + (numbersChanged2[s]+1);
                                                        }
                                                        possibleChangeOrder.add(possibleChangeCount);
                                                        possibleChangeNumber.add(numbersChanged2[s]+1);
                                                        possibleChangeRow.add(i);
                                                        possibleChangeColumn.add(diffColumns[1]);
                                                        possibleChangePossibleCount++;
                                                    }
                                                }

                                                if (column3Changes > 0) {
                                                    description = description + "\nRow " + (i+1) + ", Column " + (diffColumns[2]+1) + ": ";
                                                    for (int s = 0; s < column3Changes; s++) {
                                                        if (s < column3Changes-1) {
                                                            description = description + (numbersChanged3[s]+1) + ", ";
                                                        } else if (s == column3Changes-1 && s != 0) {
                                                            description = description + "and " +(numbersChanged3[s]+1);
                                                        } else if (s == 0) {
                                                            description = description + (numbersChanged3[s]+1);
                                                        }
                                                        possibleChangeOrder.add(possibleChangeCount);
                                                        possibleChangeNumber.add(numbersChanged3[s]+1);
                                                        possibleChangeRow.add(i);
                                                        possibleChangeColumn.add(diffColumns[2]);
                                                        possibleChangePossibleCount++;
                                                    }
                                                }

                                                possibleChangeDescription.add(description);                          
                                                totalChangeType.add("possible");
                                                levelTwoChanges++;
                                                hiddenTripleRowChanges++;
                                                possibleChangeCount++;
                                                totalChangeCount++;
                                            }
                                            tempChanges++;
                                            
                                            // Run previous methods to see if the puzzle can be solved
                                            tempChanges += levelZeroMethods(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                            if (!solved) {
                                                tempChanges += levelOneMethods(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            changes += tempChanges;
        } while (tempChanges != 0 && !solved);
            
        return changes;
    }
    
    public static int hiddenTripleColumnCheck(int game[][], int possible[][][], boolean Rows[][], boolean Columns[][], boolean Groups[][], boolean isGuessAndCheck, boolean isBruteForce) {
        int changes = 0;
        int tempChanges;
        int[][] rows = new int[9][3];
        int[] rowsCount = new int[9];
        int[] tripleNumbers = new int[9];
        int tripleCount = 0;
        int number1 = 0;
        int number2 = 0;
        int number3 = 0;
        int[] diffRows = new int[3];
        int[] countDiffRows = new int[3];
        int tempCount = 0;
        int tempRow = 0;
        boolean sameFlag = false;
        int totalCount = 0;
        int row1Changes = 0;
        int row2Changes = 0;
        int row3Changes = 0;
        int[] numbersChanged1 = new int[9];
        int[] numbersChanged2 = new int[9];
        int[] numbersChanged3 = new int[9];
        String description;
        
        do {
            tempChanges = 0;
            for (int j = 0; j < 9 && !solved; j++) { // column number
                for (int z = 0; z < 9; z++) {
                    Arrays.fill(rows[z], 0);
                }
                Arrays.fill(rowsCount, 0);
                Arrays.fill(tripleNumbers, 0);
                tripleCount = 0;

                // Goes down the column, counts how many rows each number appears in, then stores the first three
                for (int k = 0; k < 9; k++) { // number 1-9
                    if (!Columns[j][k]) {
                        for (int i = 0; i < 9; i++) { // row number
                            if (game[i][j] == 0 && possible[i][j][k] == k+1) {
                                if (rowsCount[k] < 3) {
                                    rows[k][rowsCount[k]] = i;
                                }
                                rowsCount[k]++;
                            }
                        }
                    }
                }

                // Counts the number of numbers 1-9 that appear in only 2 or 3 rows
                for (int k = 0; k < 9; k++) { // number 1-9
                    if (rowsCount[k] == 2 || rowsCount[k] == 3) {
                        tripleNumbers[tripleCount] = k;
                        tripleCount++;
                    }
                }

                // Checks to see if any of the numbers match any other numbers, forming a hidden triple
                // Then, if a hidden triple is found, it updates the possible values
                if (tripleCount > 2) {
                    // Stage 1
                    for (int a = 0; a <= tripleCount-3 && !solved; a++) {
                        Arrays.fill(diffRows, 0);
                        Arrays.fill(countDiffRows, 0);
                        number1 = tripleNumbers[a];
                        diffRows[0] = rows[number1][0];
                        diffRows[1] = rows[number1][1];
                        if (rowsCount[number1] == 2) {
                            countDiffRows[0] = 2;
                        }
                        if (rowsCount[number1] == 3) {
                            diffRows[2] = rows[number1][2];
                            countDiffRows[0] = 3;
                        }

                        // Stage 2
                        for (int b = a+1; b <= tripleCount-2 && !solved; b++) {
                            number2 = tripleNumbers[b];
                            tempCount = countDiffRows[0];

                            for (int x = 0; x < rowsCount[number2]; x++) {
                                sameFlag = false;
                                tempRow = rows[number2][x];
                                for (int y = 0; y < countDiffRows[0]; y++) {
                                    if (tempRow == diffRows[y]) {
                                        sameFlag = true;
                                    }
                                }
                                if (sameFlag == false) {
                                    if (tempCount < 3) {
                                        diffRows[tempCount] = tempRow;
                                    }
                                    tempCount++;
                                }
                            }
                            countDiffRows[1] = tempCount;

                            // Stage 3
                            if (countDiffRows[1] <= 3) { // There still may be a hidden triple
                                for (int c = b+1; c <= tripleCount-1 && !solved; c++) {
                                    number3 = tripleNumbers[c];
                                    tempCount = countDiffRows[1];

                                    for (int x = 0; x < rowsCount[number3]; x++) {
                                        sameFlag = false;
                                        tempRow = rows[number3][x];
                                        for (int y = 0; y < countDiffRows[1]; y++) {
                                            if (tempRow == diffRows[y]) {
                                                sameFlag = true;
                                            }
                                        }
                                        if (sameFlag == false) {
                                            if (tempCount < 3) {
                                                diffRows[tempCount] = tempRow;
                                            }
                                            tempCount++;
                                        }
                                    }
                                    countDiffRows[2] = tempCount;

                                    if (countDiffRows[2] == 3) {
                                        // number1, number2 and number3 form a hidden triple in row1, row2 and row3
                                        totalCount = 0;
                                        row1Changes = 0;
                                        row2Changes = 0;
                                        row3Changes = 0;
                                        Arrays.fill(numbersChanged1, 0);
                                        Arrays.fill(numbersChanged2, 0);
                                        Arrays.fill(numbersChanged3, 0);
                                        description = "";

                                        // Remove all numbers except number1, number2, number3 from 
                                        // all rows except row1, row2, and row3
                                        for (int k = 0; k < 9; k++) {
                                            if (k != number1 && k != number2 && k != number3) {
                                                if (possible[diffRows[0]][j][k] == k+1) {
                                                    possible[diffRows[0]][j][k] = 0;
                                                    numbersChanged1[row1Changes] = k;
                                                    row1Changes++;
                                                    totalCount++;
                                                }
                                                if (possible[diffRows[1]][j][k] == k+1) {
                                                    possible[diffRows[1]][j][k] = 0;
                                                    numbersChanged2[row2Changes] = k;
                                                    row2Changes++;
                                                    totalCount++;
                                                }
                                                if (possible[diffRows[2]][j][k] == k+1) {
                                                    possible[diffRows[2]][j][k] = 0;
                                                    numbersChanged3[row3Changes] = k;
                                                    row3Changes++;
                                                    totalCount++;
                                                }
                                            }
                                        }

                                        // Save data to change log
                                        if (totalCount > 0) {
                                            if (!isGuessAndCheck && !isBruteForce) {
                                                possibleChangeMethod.add("Hidden Triple - Column");
                                                description = "Since the numbers " + (number1+1) + ", " + (number2+1) + " and " +
                                                        (number3+1) + " form a hidden triple in the cells (" + (diffRows[0]+1) + "," + (j+1) + "), (" +
                                                        (diffRows[1]+1) + "," + (j+1) + ") and (" + (diffRows[2]+1) + "," + (j+1) + 
                                                        "), the below cells were removed as possible options:";

                                                if (row1Changes > 0) {
                                                    description = description + "\nRow " + (diffRows[0]+1) + ", Column " + (j+1) + ": ";
                                                    for (int s = 0; s < row1Changes; s++) {
                                                        if (s < row1Changes-1) {
                                                            description = description + (numbersChanged1[s]+1) + ", ";
                                                        } else if (s == row1Changes-1 && s != 0) {
                                                            description = description + "and " +(numbersChanged1[s]+1);
                                                        } else if (s == 0) {
                                                            description = description + (numbersChanged1[s]+1);
                                                        }
                                                        possibleChangeOrder.add(possibleChangeCount);
                                                        possibleChangeNumber.add(numbersChanged1[s]+1);
                                                        possibleChangeRow.add(diffRows[0]);
                                                        possibleChangeColumn.add(j);
                                                        possibleChangePossibleCount++;
                                                    }
                                                }

                                                if (row2Changes > 0) {
                                                    description = description + "\nRow " + (diffRows[1]+1) + ", Column " + (j+1) + ": ";
                                                    for (int s = 0; s < row2Changes; s++) {
                                                        if (s < row2Changes-1) {
                                                            description = description + (numbersChanged2[s]+1) + ", ";
                                                        } else if (s == row2Changes-1 && s != 0) {
                                                            description = description + "and " +(numbersChanged2[s]+1);
                                                        } else if (s == 0) {
                                                            description = description + (numbersChanged2[s]+1);
                                                        }
                                                        possibleChangeOrder.add(possibleChangeCount);
                                                        possibleChangeNumber.add(numbersChanged2[s]+1);
                                                        possibleChangeRow.add(diffRows[1]);
                                                        possibleChangeColumn.add(j);
                                                        possibleChangePossibleCount++;
                                                    }
                                                }

                                                if (row3Changes > 0) {
                                                    description = description + "\nRow " + (diffRows[2]+1) + ", Column " + (j+1) + ": ";
                                                    for (int s = 0; s < row3Changes; s++) {
                                                        if (s < row3Changes-1) {
                                                            description = description + (numbersChanged3[s]+1) + ", ";
                                                        } else if (s == row3Changes-1 && s != 0) {
                                                            description = description + "and " +(numbersChanged3[s]+1);
                                                        } else if (s == 0) {
                                                            description = description + (numbersChanged3[s]+1);
                                                        }
                                                        possibleChangeOrder.add(possibleChangeCount);
                                                        possibleChangeNumber.add(numbersChanged3[s]+1);
                                                        possibleChangeRow.add(diffRows[2]);
                                                        possibleChangeColumn.add(j);
                                                        possibleChangePossibleCount++;
                                                    }
                                                }

                                                possibleChangeDescription.add(description);                          
                                                totalChangeType.add("possible");
                                                levelTwoChanges++;
                                                hiddenTripleColumnChanges++;
                                                possibleChangeCount++;
                                                totalChangeCount++;
                                            }
                                            tempChanges++;
                                            
                                            // Run previous methods to see if the puzzle can be solved
                                            tempChanges += levelZeroMethods(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                            if (!solved) {
                                                tempChanges += levelOneMethods(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            changes += tempChanges;
        } while (tempChanges != 0 && !solved);
        
        return changes;
    }
    
    public static int hiddenTripleGroupCheck(int game[][], int possible[][][], boolean Rows[][], boolean Columns[][], boolean Groups[][], boolean isGuessAndCheck, boolean isBruteForce) {
        int changes = 0;
        int tempChanges;
        int[][] rows = new int[9][3];
        int[][] columns = new int[9][3];
        int[] cellCount = new int[9];
        int[] tripleNumbers = new int[9];
        int tripleCount = 0;
        int number1 = 0;
        int number2 = 0;
        int number3 = 0;
        int[] diffRows = new int[3];
        int[] diffColumns = new int[3];
        int[] countDiffCells = new int[3];
        int tempCount = 0;
        int tempRow = 0;
        int tempColumn = 0;
        boolean sameFlag = false;
        int totalCount = 0;
        int cell1Changes = 0;
        int cell2Changes = 0;
        int cell3Changes = 0;
        int[] numbersChanged1 = new int[9];
        int[] numbersChanged2 = new int[9];
        int[] numbersChanged3 = new int[9];
        String description;
        
        do {
            tempChanges = 0;
            for (int l = 0; l < 9 && !solved; l++) { // group number
                for (int z = 0; z < 9; z++) {
                    Arrays.fill(rows[z], 0);
                    Arrays.fill(columns[z], 0);
                }
                Arrays.fill(cellCount, 0);
                Arrays.fill(tripleNumbers, 0);
                tripleCount = 0;

                // Goes down the group, counts how many cells each number appears in, then stores the first three
                for (int k = 0; k < 9; k++) { // number 1-9
                    if (!Groups[l][k]) {
                        for (int i = ROW_START[l]; i <= ROW_END[l]; i++) { // row number
                            for (int j = COLUMN_START[l]; j <= COLUMN_END[l]; j++) { // column number
                                if (game[i][j] == 0 && possible[i][j][k] == k+1) {
                                    if (cellCount[k] < 3) {
                                        rows[k][cellCount[k]] = i;
                                        columns[k][cellCount[k]] = j;
                                    }
                                    cellCount[k]++;
                                }
                            }
                        }
                    }
                }

                // Counts the number of numbers 1-9 that appear in only 2 or 3 cells
                for (int k = 0; k < 9; k++) { // number 1-9
                    if (cellCount[k] == 2 || cellCount[k] == 3) {
                        tripleNumbers[tripleCount] = k;
                        tripleCount++;
                    }
                }

                // Checks to see if any of the numbers match any other numbers, forming a hidden triple
                // Then, if a hidden triple is found, it updates the possible values
                if (tripleCount > 2) {
                    // Stage 1
                    for (int a = 0; a <= tripleCount-3 && !solved; a++) {
                        Arrays.fill(diffRows, 0);
                        Arrays.fill(diffColumns, 0);
                        Arrays.fill(countDiffCells, 0);
                        number1 = tripleNumbers[a];
                        diffRows[0] = rows[number1][0];
                        diffColumns[0] = columns[number1][0];
                        diffRows[1] = rows[number1][1];
                        diffColumns[1] = columns[number1][1];
                        if (cellCount[number1] == 2) {
                            countDiffCells[0] = 2;
                        }
                        if (cellCount[number1] == 3) {
                            diffRows[2] = rows[number1][2];
                            diffColumns[2] = columns[number1][2];
                            countDiffCells[0] = 3;
                        }

                        // Stage 2
                        for (int b = a+1; b <= tripleCount-2 && !solved; b++) {
                            number2 = tripleNumbers[b];
                            tempCount = countDiffCells[0];

                            for (int x = 0; x < cellCount[number2]; x++) {
                                sameFlag = false;
                                tempRow = rows[number2][x];
                                tempColumn = columns[number2][x];
                                for (int y = 0; y < countDiffCells[0]; y++) {
                                    if (tempRow == diffRows[y] && tempColumn == diffColumns[y]) {
                                        sameFlag = true;
                                    }
                                }
                                if (sameFlag == false) {
                                    if (tempCount < 3) {
                                        diffRows[tempCount] = tempRow;
                                        diffColumns[tempCount] = tempColumn;
                                    }
                                    tempCount++;
                                }
                            }
                            countDiffCells[1] = tempCount;

                            // Stage 3
                            if (countDiffCells[1] <= 3) { // There still may be a hidden triple
                                for (int c = b+1; c <= tripleCount-1 && !solved; c++) {
                                    number3 = tripleNumbers[c];
                                    tempCount = countDiffCells[1];

                                    for (int x = 0; x < cellCount[number3]; x++) {
                                        sameFlag = false;
                                        tempRow = rows[number3][x];
                                        tempColumn = columns[number3][x];
                                        for (int y = 0; y < countDiffCells[1]; y++) {
                                            if (tempRow == diffRows[y] && tempColumn == diffColumns[y]) {
                                                sameFlag = true;
                                            }
                                        }
                                        if (sameFlag == false) {
                                            if (tempCount < 3) {
                                                diffRows[tempCount] = tempRow;
                                                diffColumns[tempCount] = tempColumn;
                                            }
                                            tempCount++;
                                        }
                                    }
                                    countDiffCells[2] = tempCount;

                                    if (countDiffCells[2] == 3) {
                                        // number1, number2 and number3 form a hidden triple in cells 1, 2, and 3
                                        totalCount = 0;
                                        cell1Changes = 0;
                                        cell2Changes = 0;
                                        cell3Changes = 0;
                                        Arrays.fill(numbersChanged1, 0);
                                        Arrays.fill(numbersChanged2, 0);
                                        Arrays.fill(numbersChanged3, 0);
                                        description = "";

                                        // Remove all numbers except number1, number2, number3 from 
                                        // all cells except cells 1, 2, and 3
                                        for (int k = 0; k < 9; k++) {
                                            if (k != number1 && k != number2 && k != number3) {
                                                if (possible[diffRows[0]][diffColumns[0]][k] == k+1) {
                                                    possible[diffRows[0]][diffColumns[0]][k] = 0;
                                                    numbersChanged1[cell1Changes] = k;
                                                    cell1Changes++;
                                                    totalCount++;
                                                }
                                                if (possible[diffRows[1]][diffColumns[1]][k] == k+1) {
                                                    possible[diffRows[1]][diffColumns[1]][k] = 0;
                                                    numbersChanged2[cell2Changes] = k;
                                                    cell2Changes++;
                                                    totalCount++;
                                                }
                                                if (possible[diffRows[2]][diffColumns[2]][k] == k+1) {
                                                    possible[diffRows[2]][diffColumns[2]][k] = 0;
                                                    numbersChanged3[cell3Changes] = k;
                                                    cell3Changes++;
                                                    totalCount++;
                                                }
                                            }
                                        }

                                        // Save data to change log
                                        if (totalCount > 0) {
                                            if (!isGuessAndCheck && !isBruteForce) {
                                                possibleChangeMethod.add("Hidden Triple - Group");
                                                description = "Since the numbers " + (number1+1) + ", " + (number2+1) + " and " +
                                                        (number3+1) + " form a hidden triple in the cells (" + (diffRows[0]+1) + "," + (diffColumns[0]+1) + "), (" +
                                                        (diffRows[1]+1) + "," + (diffColumns[1]+1) + ") and (" + (diffRows[2]+1) + "," + (diffColumns[2]+1) + 
                                                        "), the below cells were removed as possible options:";

                                                if (cell1Changes > 0) {
                                                    description = description + "\nRow " + (diffRows[0]+1) + ", Column " + (diffColumns[0]+1) + ": ";
                                                    for (int s = 0; s < cell1Changes; s++) {
                                                        if (s < cell1Changes-1) {
                                                            description = description + (numbersChanged1[s]+1) + ", ";
                                                        } else if (s == cell1Changes-1 && s != 0) {
                                                            description = description + "and " +(numbersChanged1[s]+1);
                                                        } else if (s == 0) {
                                                            description = description + (numbersChanged1[s]+1);
                                                        }
                                                        possibleChangeOrder.add(possibleChangeCount);
                                                        possibleChangeNumber.add(numbersChanged1[s]+1);
                                                        possibleChangeRow.add(diffRows[0]);
                                                        possibleChangeColumn.add(diffColumns[0]);
                                                        possibleChangePossibleCount++;
                                                    }
                                                }

                                                if (cell2Changes > 0) {
                                                    description = description + "\nRow " + (diffRows[1]+1) + ", Column " + (diffColumns[1]+1) + ": ";
                                                    for (int s = 0; s < cell2Changes; s++) {
                                                        if (s < cell2Changes-1) {
                                                            description = description + (numbersChanged2[s]+1) + ", ";
                                                        } else if (s == cell2Changes-1 && s != 0) {
                                                            description = description + "and " +(numbersChanged2[s]+1);
                                                        } else if (s == 0) {
                                                            description = description + (numbersChanged2[s]+1);
                                                        }
                                                        possibleChangeOrder.add(possibleChangeCount);
                                                        possibleChangeNumber.add(numbersChanged2[s]+1);
                                                        possibleChangeRow.add(diffRows[1]);
                                                        possibleChangeColumn.add(diffColumns[1]);
                                                        possibleChangePossibleCount++;
                                                    }
                                                }

                                                if (cell3Changes > 0) {
                                                    description = description + "\nRow " + (diffRows[2]+1) + ", Column " + (diffColumns[2]+1) + ": ";
                                                    for (int s = 0; s < cell3Changes; s++) {
                                                        if (s < cell3Changes-1) {
                                                            description = description + (numbersChanged3[s]+1) + ", ";
                                                        } else if (s == cell3Changes-1 && s != 0) {
                                                            description = description + "and " +(numbersChanged3[s]+1);
                                                        } else if (s == 0) {
                                                            description = description + (numbersChanged3[s]+1);
                                                        }
                                                        possibleChangeOrder.add(possibleChangeCount);
                                                        possibleChangeNumber.add(numbersChanged3[s]+1);
                                                        possibleChangeRow.add(diffRows[2]);
                                                        possibleChangeColumn.add(diffColumns[2]);
                                                        possibleChangePossibleCount++;
                                                    }
                                                }

                                                possibleChangeDescription.add(description);                          
                                                totalChangeType.add("possible");
                                                levelTwoChanges++;
                                                hiddenTripleGroupChanges++;
                                                possibleChangeCount++;
                                                totalChangeCount++;
                                            }
                                            tempChanges++;
                                            
                                            // Run previous methods to see if the puzzle can be solved
                                            tempChanges += levelZeroMethods(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                            if (!solved) {
                                                tempChanges += levelOneMethods(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            changes += tempChanges;
        } while (tempChanges != 0 && !solved);
            
        return changes;
    }
    
    public static int nakedQuadChecks(int game[][], int possible[][][], boolean Rows[][], boolean Columns[][], boolean Groups[][], boolean isGuessAndCheck, boolean isBruteForce) {
        int changes;
        int tempNakedQuadChanges = 0;
        
        do {
            changes = 0;
            changes += nakedQuadRowCheck(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce); // works
            changes += nakedQuadColumnCheck(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce); // works
            changes += nakedQuadGroupCheck(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce); // works
            tempNakedQuadChanges += changes;
        } while (changes != 0 && !solved);
        
        return tempNakedQuadChanges;
    }
    
    public static int nakedQuadRowCheck(int game[][], int possible[][][], boolean Rows[][], boolean Columns[][], boolean Groups[][], boolean isGuessAndCheck, boolean isBruteForce) {
        int changes = 0;
        int tempChanges;
        int[] numberCount = new int[9];
        int[][] numbers = new int[9][4];
        int[] quadColumns = new int[9];
        int quadCount = 0;
        int column1 = 0;
        int column2 = 0;
        int column3 = 0;
        int column4 = 0;
        int[] diffNumbers = new int[4];
        int[] countDiffNumbers = new int[4];
        int tempCount = 0;
        int tempNumber = 0;
        boolean sameFlag = false;
        int totalCount = 0;
        int number1Changes = 0;
        int number2Changes = 0;
        int number3Changes = 0;
        int number4Changes = 0;
        int[] columnsChanged1 = new int[9];
        int[] columnsChanged2 = new int[9];
        int[] columnsChanged3 = new int[9];
        int[] columnsChanged4 = new int[9];
        String description;
        
        do {
            tempChanges = 0;
            for (int i = 0; i < 9 && !solved; i++) { // row number
                for (int z = 0; z < 9; z++) {
                    Arrays.fill(numbers[z], 0);
                }
                Arrays.fill(numberCount, 0);
                Arrays.fill(quadColumns, 0);
                quadCount = 0;

                // Goes down the row and counts the number of options in each cell and stores the first four
                for (int j = 0; j < 9; j++) { // column number
                    if (game[i][j] == 0) {
                        for (int k = 0; k < 9; k++) { // number 1-9
                            if (possible[i][j][k] == k+1) {
                                if (numberCount[j] < 4) {
                                    numbers[j][numberCount[j]] = k;
                                }
                                numberCount[j]++;
                            }
                        }
                    }
                }
                
                // Counts number of cells with 4 or less options
                for (int j = 0; j < 9; j++) { // column number
                    if (numberCount[j] == 2 || numberCount[j] == 3 || numberCount[j] == 4) {
                        quadColumns[quadCount] = j;
                        quadCount++;
                    }
                }
                
                // Checks to see if any of the two, three or four option cells have the same numbers, forming a naked quad
                // Then, if a naked quad is found, it updates the possible values
                if (quadCount > 3) {
                    // Stage 1
                    for (int a = 0; a <= quadCount-4 && !solved; a++) {
                        Arrays.fill(diffNumbers, 0);
                        Arrays.fill(countDiffNumbers, 0);
                        column1 = quadColumns[a];
                        diffNumbers[0] = numbers[column1][0];
                        diffNumbers[1] = numbers[column1][1];
                        if (numberCount[column1] == 2) {
                            countDiffNumbers[0] = 2;
                        }
                        if (numberCount[column1] == 3) {
                            diffNumbers[2] = numbers[column1][2];
                            countDiffNumbers[0] = 3;
                        } 
                        if (numberCount[column1] == 4) {
                            diffNumbers[2] = numbers[column1][2];
                            diffNumbers[3] = numbers[column1][3];
                            countDiffNumbers[0] = 4;
                        } 
                        
                        // Stage 2
                        for (int b = a+1; b <= quadCount-3 && !solved; b++) {
                            column2 = quadColumns[b];
                            tempCount = countDiffNumbers[0];

                            for (int x = 0; x < numberCount[column2]; x++) {
                                sameFlag = false;
                                tempNumber = numbers[column2][x];
                                for (int y = 0; y < countDiffNumbers[0]; y++) {
                                    if (tempNumber == diffNumbers[y]) {
                                        sameFlag = true;
                                    }
                                }
                                if (sameFlag == false) {
                                    if (tempCount < 4) {
                                        diffNumbers[tempCount] = tempNumber;
                                    }
                                    tempCount++;
                                }
                            }
                            countDiffNumbers[1] = tempCount;
                            
                            // Stage 3
                            if (countDiffNumbers[1] <= 4) { // There still may be a naked quad
                                for (int c = b+1; c <= quadCount-2 && !solved; c++) {
                                    column3 = quadColumns[c];
                                    tempCount = countDiffNumbers[1];

                                    for (int x = 0; x < numberCount[column3]; x++) {
                                        sameFlag = false;
                                        tempNumber = numbers[column3][x];
                                        for (int y = 0; y < countDiffNumbers[1]; y++) {
                                            if (tempNumber == diffNumbers[y]) {
                                                sameFlag = true;
                                            }
                                        }
                                        if (sameFlag == false) {
                                            if (tempCount < 4) {
                                                diffNumbers[tempCount] = tempNumber;
                                            }
                                            tempCount++;
                                        }
                                    }
                                    countDiffNumbers[2] = tempCount;
                                    
                                    // Stage 4
                                    if (countDiffNumbers[2] == 4) { // There still may be a naked quad
                                        for (int d = c+1; d <= quadCount-1 && !solved; d++) {
                                            column4 = quadColumns[d];
                                            tempCount = countDiffNumbers[2];

                                            for (int x = 0; x < numberCount[column4]; x++) {
                                                sameFlag = false;
                                                tempNumber = numbers[column4][x];
                                                for (int y = 0; y < countDiffNumbers[2]; y++) {
                                                    if (tempNumber == diffNumbers[y]) {
                                                        sameFlag = true;
                                                    }
                                                }
                                                if (sameFlag == false) {
                                                    if (tempCount < 4) {
                                                        diffNumbers[tempCount] = tempNumber;
                                                    }
                                                    tempCount++;
                                                }
                                            }
                                            countDiffNumbers[3] = tempCount;
                                            
                                            if (countDiffNumbers[3] == 4) {
                                                // The 4 numbers stored in diffNumbers form a naked quad in columns 1, 2, 3, & 4
                                                totalCount = 0;
                                                number1Changes = 0;
                                                number2Changes = 0;
                                                number3Changes = 0;
                                                number4Changes = 0;
                                                Arrays.fill(columnsChanged1, 0);
                                                Arrays.fill(columnsChanged2, 0);
                                                Arrays.fill(columnsChanged3, 0);
                                                Arrays.fill(columnsChanged4, 0);
                                                description = "";

                                                // Remove number1, number2, number3, and number4 from every cell 
                                                // in row other than column1, column2, column3, and column4
                                                for (int j = 0; j < 9; j++) {
                                                    if (game[i][j] == 0 && j != column1 && j != column2 && j != column3 && j != column4) {
                                                        if (possible[i][j][diffNumbers[0]] == diffNumbers[0]+1) {
                                                            possible[i][j][diffNumbers[0]] = 0;
                                                            columnsChanged1[number1Changes] = j;
                                                            number1Changes++;
                                                            totalCount++;
                                                        }
                                                        if (possible[i][j][diffNumbers[1]] == diffNumbers[1]+1) {
                                                            possible[i][j][diffNumbers[1]] = 0;
                                                            columnsChanged2[number2Changes] = j;
                                                            number2Changes++;
                                                            totalCount++;
                                                        }
                                                        if (possible[i][j][diffNumbers[2]] == diffNumbers[2]+1) {
                                                            possible[i][j][diffNumbers[2]] = 0;
                                                            columnsChanged3[number3Changes] = j;
                                                            number3Changes++;
                                                            totalCount++;
                                                        }
                                                        if (possible[i][j][diffNumbers[3]] == diffNumbers[3]+1) {
                                                            possible[i][j][diffNumbers[3]] = 0;
                                                            columnsChanged4[number4Changes] = j;
                                                            number4Changes++;
                                                            totalCount++;
                                                        }
                                                    }
                                                }

                                                // save data to change log
                                                if (totalCount > 0) {
                                                    if (!isGuessAndCheck && !isBruteForce) {
                                                        possibleChangeMethod.add("Naked Quad - Row");
                                                        description = "Since the numbers " + (diffNumbers[0]+1) + ", " + (diffNumbers[1]+1) +
                                                                ", " + (diffNumbers[2]+1) + ", and " + (diffNumbers[3]+1) +
                                                                " form a naked quad in the cells (" + (i+1) + "," + (column1+1) + "), (" +
                                                                (i+1) + "," + (column2+1) + "), (" + (i+1) + "," + (column3+1) + "), and (" + (i+1) + "," + (column4+1) + 
                                                                "), the below cells were removed as possible options:";

                                                        if (number1Changes > 0) {
                                                            description = description + "\nNumber " + (diffNumbers[0]+1) + ", Row " + (i+1) + ", Columns: ";
                                                            for (int s = 0; s < number1Changes; s++) {
                                                                if (s < number1Changes-1) {
                                                                    description = description + (columnsChanged1[s]+1) + ", ";
                                                                } else if (s == number1Changes-1 && s != 0) {
                                                                    description = description + "and " +(columnsChanged1[s]+1);
                                                                } else if (s == 0) {
                                                                    description = description + (columnsChanged1[s]+1);
                                                                }
                                                                possibleChangeOrder.add(possibleChangeCount);
                                                                possibleChangeNumber.add(diffNumbers[0]+1);
                                                                possibleChangeRow.add(i);
                                                                possibleChangeColumn.add(columnsChanged1[s]);
                                                                possibleChangePossibleCount++;
                                                            }
                                                        }

                                                        if (number2Changes > 0) {
                                                            description = description + "\nNumber " + (diffNumbers[1]+1) + ", Row " + (i+1) + ", Columns: ";
                                                            for (int s = 0; s < number2Changes; s++) {
                                                                if (s < number2Changes-1) {
                                                                    description = description + (columnsChanged2[s]+1) + ", ";
                                                                } else if (s == number2Changes-1 && s != 0) {
                                                                    description = description + "and " +(columnsChanged2[s]+1);
                                                                } else if (s == 0) {
                                                                    description = description + (columnsChanged2[s]+1);
                                                                }
                                                                possibleChangeOrder.add(possibleChangeCount);
                                                                possibleChangeNumber.add(diffNumbers[1]+1);
                                                                possibleChangeRow.add(i);
                                                                possibleChangeColumn.add(columnsChanged2[s]);
                                                                possibleChangePossibleCount++;
                                                            }
                                                        }

                                                        if (number3Changes > 0) {
                                                            description = description + "\nNumber " + (diffNumbers[2]+1) + ", Row " + (i+1) + ", Columns: ";
                                                            for (int s = 0; s < number3Changes; s++) {
                                                                if (s < number3Changes-1) {
                                                                    description = description + (columnsChanged3[s]+1) + ", ";
                                                                } else if (s == number3Changes-1 && s != 0) {
                                                                    description = description + "and " +(columnsChanged3[s]+1);
                                                                } else if (s == 0) {
                                                                    description = description + (columnsChanged3[s]+1);
                                                                }
                                                                possibleChangeOrder.add(possibleChangeCount);
                                                                possibleChangeNumber.add(diffNumbers[2]+1);
                                                                possibleChangeRow.add(i);
                                                                possibleChangeColumn.add(columnsChanged3[s]);
                                                                possibleChangePossibleCount++;
                                                            }
                                                        }

                                                        if (number4Changes > 0) {
                                                            description = description + "\nNumber " + (diffNumbers[3]+1) + ", Row " + (i+1) + ", Columns: ";
                                                            for (int s = 0; s < number4Changes; s++) {
                                                                if (s < number4Changes-1) {
                                                                    description = description + (columnsChanged4[s]+1) + ", ";
                                                                } else if (s == number3Changes-1 && s != 0) {
                                                                    description = description + "and " +(columnsChanged4[s]+1);
                                                                } else if (s == 0) {
                                                                    description = description + (columnsChanged4[s]+1);
                                                                }
                                                                possibleChangeOrder.add(possibleChangeCount);
                                                                possibleChangeNumber.add(diffNumbers[3]+1);
                                                                possibleChangeRow.add(i);
                                                                possibleChangeColumn.add(columnsChanged4[s]);
                                                                possibleChangePossibleCount++;
                                                            }
                                                        }

                                                        possibleChangeDescription.add(description);                          
                                                        totalChangeType.add("possible");
                                                        levelTwoChanges++;
                                                        nakedQuadRowChanges++;
                                                        possibleChangeCount++;
                                                        totalChangeCount++;
                                                    }
                                                    tempChanges++;
                                                    
                                                    // Run previous methods to see if the puzzle can be solved
                                                    tempChanges += levelZeroMethods(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                                    if (!solved) {
                                                        tempChanges += levelOneMethods(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            changes += tempChanges;
        } while (tempChanges != 0 && !solved);
            
        return changes;
    }
    
    public static int nakedQuadColumnCheck(int game[][], int possible[][][], boolean Rows[][], boolean Columns[][], boolean Groups[][], boolean isGuessAndCheck, boolean isBruteForce) {
        int changes = 0;
        int tempChanges;
        int[] numberCount = new int[9];
        int[][] numbers = new int[9][4];
        int[] quadRows = new int[9];
        int quadCount = 0;
        int row1 = 0;
        int row2 = 0;
        int row3 = 0;
        int row4 = 0;
        int[] diffNumbers = new int[4];
        int[] countDiffNumbers = new int[4];
        int tempCount = 0;
        int tempNumber = 0;
        boolean sameFlag = false;
        int totalCount = 0;
        int number1Changes = 0;
        int number2Changes = 0;
        int number3Changes = 0;
        int number4Changes = 0;
        int[] rowsChanged1 = new int[9];
        int[] rowsChanged2 = new int[9];
        int[] rowsChanged3 = new int[9];
        int[] rowsChanged4 = new int[9];
        String description;
        
        do {
            tempChanges = 0;
            for (int j = 0; j < 9 && !solved; j++) { // column number
                for (int z = 0; z < 9; z++) {
                    Arrays.fill(numbers[z], 0);
                }
                Arrays.fill(numberCount, 0);
                Arrays.fill(quadRows, 0);
                quadCount = 0;

                // Goes down the column and counts the number of options in each cell and stores the first four
                for (int i = 0; i < 9; i++) { // row number
                    if (game[i][j] == 0) {
                        for (int k = 0; k < 9; k++) { // number 1-9
                            if (possible[i][j][k] == k+1) {
                                if (numberCount[i] < 4) {
                                    numbers[i][numberCount[i]] = k;
                                }
                                numberCount[i]++;
                            }
                        }
                    }
                }
                
                // Counts number of cells with 4 or less options
                for (int i = 0; i < 9; i++) { // row number
                    if (numberCount[i] == 2 || numberCount[i] == 3 || numberCount[i] == 4) {
                        quadRows[quadCount] = i;
                        quadCount++;
                    }
                }
                
                // Checks to see if any of the two, three or four option cells have the same numbers, forming a naked quad
                // Then, if a naked quad is found, it updates the possible values
                if (quadCount > 3) {
                    // Stage 1
                    for (int a = 0; a <= quadCount-4 && !solved; a++) {
                        Arrays.fill(diffNumbers, 0);
                        Arrays.fill(countDiffNumbers, 0);
                        row1 = quadRows[a];
                        diffNumbers[0] = numbers[row1][0];
                        diffNumbers[1] = numbers[row1][1];
                        if (numberCount[row1] == 2) {
                            countDiffNumbers[0] = 2;
                        }
                        if (numberCount[row1] == 3) {
                            diffNumbers[2] = numbers[row1][2];
                            countDiffNumbers[0] = 3;
                        } 
                        if (numberCount[row1] == 4) {
                            diffNumbers[2] = numbers[row1][2];
                            diffNumbers[3] = numbers[row1][3];
                            countDiffNumbers[0] = 4;
                        } 
                        
                        // Stage 2
                        for (int b = a+1; b <= quadCount-3 && !solved; b++) {
                            row2 = quadRows[b];
                            tempCount = countDiffNumbers[0];

                            for (int x = 0; x < numberCount[row2]; x++) {
                                sameFlag = false;
                                tempNumber = numbers[row2][x];
                                for (int y = 0; y < countDiffNumbers[0]; y++) {
                                    if (tempNumber == diffNumbers[y]) {
                                        sameFlag = true;
                                    }
                                }
                                if (sameFlag == false) {
                                    if (tempCount < 4) {
                                        diffNumbers[tempCount] = tempNumber;
                                    }
                                    tempCount++;
                                }
                            }
                            countDiffNumbers[1] = tempCount;
                            
                            // Stage 3
                            if (countDiffNumbers[1] <= 4) { // There still may be a naked quad
                                for (int c = b+1; c <= quadCount-2 && !solved; c++) {
                                    row3 = quadRows[c];
                                    tempCount = countDiffNumbers[1];

                                    for (int x = 0; x < numberCount[row3]; x++) {
                                        sameFlag = false;
                                        tempNumber = numbers[row3][x];
                                        for (int y = 0; y < countDiffNumbers[1]; y++) {
                                            if (tempNumber == diffNumbers[y]) {
                                                sameFlag = true;
                                            }
                                        }
                                        if (sameFlag == false) {
                                            if (tempCount < 4) {
                                                diffNumbers[tempCount] = tempNumber;
                                            }
                                            tempCount++;
                                        }
                                    }
                                    countDiffNumbers[2] = tempCount;
                                    
                                    // Stage 4
                                    if (countDiffNumbers[2] == 4) { // There still may be a naked quad
                                        for (int d = c+1; d <= quadCount-1 && !solved; d++) {
                                            row4 = quadRows[d];
                                            tempCount = countDiffNumbers[2];

                                            for (int x = 0; x < numberCount[row4]; x++) {
                                                sameFlag = false;
                                                tempNumber = numbers[row4][x];
                                                for (int y = 0; y < countDiffNumbers[2]; y++) {
                                                    if (tempNumber == diffNumbers[y]) {
                                                        sameFlag = true;
                                                    }
                                                }
                                                if (sameFlag == false) {
                                                    if (tempCount < 4) {
                                                        diffNumbers[tempCount] = tempNumber;
                                                    }
                                                    tempCount++;
                                                }
                                            }
                                            countDiffNumbers[3] = tempCount;
                                            
                                            if (countDiffNumbers[3] == 4) {
                                                // The 4 numbers stored in diffNumbers form a naked quad in rows 1, 2, 3, & 4
                                                totalCount = 0;
                                                number1Changes = 0;
                                                number2Changes = 0;
                                                number3Changes = 0;
                                                number4Changes = 0;
                                                Arrays.fill(rowsChanged1, 0);
                                                Arrays.fill(rowsChanged2, 0);
                                                Arrays.fill(rowsChanged3, 0);
                                                Arrays.fill(rowsChanged4, 0);
                                                description = "";

                                                // Remove number1, number2, number3, and number4 from every cell 
                                                // in column other than row1, row2, row3, and row4
                                                for (int i = 0; i < 9; i++) {
                                                    if (game[i][j] == 0 && i != row1 && i != row2 && i != row3 && i != row4) {
                                                        if (possible[i][j][diffNumbers[0]] == diffNumbers[0]+1) {
                                                            possible[i][j][diffNumbers[0]] = 0;
                                                            rowsChanged1[number1Changes] = i;
                                                            number1Changes++;
                                                            totalCount++;
                                                        }
                                                        if (possible[i][j][diffNumbers[1]] == diffNumbers[1]+1) {
                                                            possible[i][j][diffNumbers[1]] = 0;
                                                            rowsChanged2[number2Changes] = i;
                                                            number2Changes++;
                                                            totalCount++;
                                                        }
                                                        if (possible[i][j][diffNumbers[2]] == diffNumbers[2]+1) {
                                                            possible[i][j][diffNumbers[2]] = 0;
                                                            rowsChanged3[number3Changes] = i;
                                                            number3Changes++;
                                                            totalCount++;
                                                        }
                                                        if (possible[i][j][diffNumbers[3]] == diffNumbers[3]+1) {
                                                            possible[i][j][diffNumbers[3]] = 0;
                                                            rowsChanged4[number4Changes] = i;
                                                            number4Changes++;
                                                            totalCount++;
                                                        }
                                                    }
                                                }

                                                // save data to change log
                                                if (totalCount > 0) {
                                                    if (!isGuessAndCheck && !isBruteForce) {
                                                        possibleChangeMethod.add("Naked Quad - Column");
                                                        description = "Since the numbers " + (diffNumbers[0]+1) + ", " + (diffNumbers[1]+1) +
                                                                ", " + (diffNumbers[2]+1) + ", and " + (diffNumbers[3]+1) +
                                                                " form a naked quad in the cells (" + (row1+1) + "," + (j+1) + "), (" +
                                                                (row2+1) + "," + (j+1) + "), (" + (row3+1) + "," + (j+1) + "), and (" + (row4+1) + "," + (j+1) + 
                                                                "), the below cells were removed as possible options:";

                                                        if (number1Changes > 0) {
                                                            description = description + "\nNumber " + (diffNumbers[0]+1) + ", Column " + (j+1) + ", Rows: ";
                                                            for (int s = 0; s < number1Changes; s++) {
                                                                if (s < number1Changes-1) {
                                                                    description = description + (rowsChanged1[s]+1) + ", ";
                                                                } else if (s == number1Changes-1 && s != 0) {
                                                                    description = description + "and " +(rowsChanged1[s]+1);
                                                                } else if (s == 0) {
                                                                    description = description + (rowsChanged1[s]+1);
                                                                }
                                                                possibleChangeOrder.add(possibleChangeCount);
                                                                possibleChangeNumber.add(diffNumbers[0]+1);
                                                                possibleChangeRow.add(rowsChanged1[s]);
                                                                possibleChangeColumn.add(j);
                                                                possibleChangePossibleCount++;
                                                            }
                                                        }

                                                        if (number2Changes > 0) {
                                                            description = description + "\nNumber " + (diffNumbers[1]+1) + ", Column " + (j+1) + ", Rows: ";
                                                            for (int s = 0; s < number2Changes; s++) {
                                                                if (s < number2Changes-1) {
                                                                    description = description + (rowsChanged2[s]+1) + ", ";
                                                                } else if (s == number2Changes-1 && s != 0) {
                                                                    description = description + "and " +(rowsChanged2[s]+1);
                                                                } else if (s == 0) {
                                                                    description = description + (rowsChanged2[s]+1);
                                                                }
                                                                possibleChangeOrder.add(possibleChangeCount);
                                                                possibleChangeNumber.add(diffNumbers[1]+1);
                                                                possibleChangeRow.add(rowsChanged2[s]);
                                                                possibleChangeColumn.add(j);
                                                                possibleChangePossibleCount++;
                                                            }
                                                        }

                                                        if (number3Changes > 0) {
                                                            description = description + "\nNumber " + (diffNumbers[2]+1) + ", Column " + (j+1) + ", Rows: ";
                                                            for (int s = 0; s < number3Changes; s++) {
                                                                if (s < number3Changes-1) {
                                                                    description = description + (rowsChanged3[s]+1) + ", ";
                                                                } else if (s == number3Changes-1 && s != 0) {
                                                                    description = description + "and " +(rowsChanged3[s]+1);
                                                                } else if (s == 0) {
                                                                    description = description + (rowsChanged3[s]+1);
                                                                }
                                                                possibleChangeOrder.add(possibleChangeCount);
                                                                possibleChangeNumber.add(diffNumbers[2]+1);
                                                                possibleChangeRow.add(rowsChanged3[s]);
                                                                possibleChangeColumn.add(j);
                                                                possibleChangePossibleCount++;
                                                            }
                                                        }

                                                        if (number4Changes > 0) {
                                                            description = description + "\nNumber " + (diffNumbers[3]+1) + ", Column " + (j+1) + ", Rows: ";
                                                            for (int s = 0; s < number4Changes; s++) {
                                                                if (s < number4Changes-1) {
                                                                    description = description + (rowsChanged4[s]+1) + ", ";
                                                                } else if (s == number3Changes-1 && s != 0) {
                                                                    description = description + "and " +(rowsChanged4[s]+1);
                                                                } else if (s == 0) {
                                                                    description = description + (rowsChanged4[s]+1);
                                                                }
                                                                possibleChangeOrder.add(possibleChangeCount);
                                                                possibleChangeNumber.add(diffNumbers[3]+1);
                                                                possibleChangeRow.add(rowsChanged4[s]);
                                                                possibleChangeColumn.add(j);
                                                                possibleChangePossibleCount++;
                                                            }
                                                        }

                                                        possibleChangeDescription.add(description);                          
                                                        totalChangeType.add("possible");
                                                        levelTwoChanges++;
                                                        nakedQuadColumnChanges++;
                                                        possibleChangeCount++;
                                                        totalChangeCount++;
                                                    }
                                                    tempChanges++;
                                                    // Run previous methods to see if the puzzle can be solved
                                                    tempChanges += levelZeroMethods(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                                    if (!solved) {
                                                        tempChanges += levelOneMethods(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            changes += tempChanges;
        } while (tempChanges != 0 && !solved);
            
        return changes;
    }
    
    public static int nakedQuadGroupCheck(int game[][], int possible[][][], boolean Rows[][], boolean Columns[][], boolean Groups[][], boolean isGuessAndCheck, boolean isBruteForce) {
        int changes = 0;
        int tempChanges;
        int[][] numberCount = new int[9][9];
        int[][][] numbers = new int[9][9][4];
        int[] quadRows = new int[9];
        int[] quadColumns = new int[9];
        int quadCount = 0;
        int row1 = 0;
        int row2 = 0;
        int row3 = 0;
        int row4 = 0;
        int column1 = 0;
        int column2 = 0;
        int column3 = 0;
        int column4 = 0;
        int[] diffNumbers = new int[4];
        int[] countDiffNumbers = new int[4];
        int tempCount = 0;
        int tempNumber = 0;
        boolean sameFlag = false;
        int totalCount = 0;
        int number1Changes = 0;
        int number2Changes = 0;
        int number3Changes = 0;
        int number4Changes = 0;
        int[] rowsChanged1 = new int[9];
        int[] rowsChanged2 = new int[9];
        int[] rowsChanged3 = new int[9];
        int[] rowsChanged4 = new int[9];
        int[] columnsChanged1 = new int[9];
        int[] columnsChanged2 = new int[9];
        int[] columnsChanged3 = new int[9];
        int[] columnsChanged4 = new int[9];
        String description;
        
        do {
            tempChanges = 0;
            for (int l = 0; l < 9 && !solved; l++) { // group number
                for (int x = 0; x < 9; x++) {
                    Arrays.fill(numberCount[x], 0);
                    for (int y = 0; y < 9; y++) {
                        Arrays.fill(numbers[x][y], 0);
                    }
                }
                Arrays.fill(quadRows, 0);
                Arrays.fill(quadColumns, 0);
                quadCount = 0;

                // Goes down the group and counts the number of options in each cell and stores the first four
                for (int i = ROW_START[l]; i <= ROW_END[l]; i++) { // row number
                    for (int j = COLUMN_START[l]; j <= COLUMN_END[l]; j++) { // column number
                        if (game[i][j] == 0) {
                            for (int k = 0; k < 9; k++) { // number 1-9
                                if (possible[i][j][k] == k+1) {
                                    if (numberCount[i][j] < 4) {
                                        numbers[i][j][numberCount[i][j]] = k;
                                    }
                                    numberCount[i][j]++;
                                }
                            }
                        }
                    }
                }
                
                // Counts number of cells with 4 or less options
                for (int i = ROW_START[l]; i <= ROW_END[l]; i++) { // row number
                    for (int j = COLUMN_START[l]; j <= COLUMN_END[l]; j++) { // column number
                        if (numberCount[i][j] == 2 || numberCount[i][j] == 3 || numberCount[i][j] == 4) {
                            quadRows[quadCount] = i;
                            quadColumns[quadCount] = j;
                            quadCount++;
                        }
                    }
                }
                
                // Checks to see if any of the two, three or four option cells have the same numbers, forming a naked quad
                // Then, if a naked quad is found, it updates the possible values
                if (quadCount > 3) {
                    // Stage 1
                    for (int a = 0; a <= quadCount-4 && !solved; a++) {
                        Arrays.fill(diffNumbers, 0);
                        Arrays.fill(countDiffNumbers, 0);
                        row1 = quadRows[a];
                        column1 = quadColumns[a];
                        diffNumbers[0] = numbers[row1][column1][0];
                        diffNumbers[1] = numbers[row1][column1][1];
                        if (numberCount[row1][column1] == 2) {
                            countDiffNumbers[0] = 2;
                        }
                        if (numberCount[row1][column1] == 3) {
                            diffNumbers[2] = numbers[row1][column1][2];
                            countDiffNumbers[0] = 3;
                        } 
                        if (numberCount[row1][column1] == 4) {
                            diffNumbers[2] = numbers[row1][column1][2];
                            diffNumbers[3] = numbers[row1][column1][3];
                            countDiffNumbers[0] = 4;
                        } 
                        
                        // Stage 2
                        for (int b = a+1; b <= quadCount-3 && !solved; b++) {
                            row2 = quadRows[b];
                            column2 = quadColumns[b];
                            tempCount = countDiffNumbers[0];

                            for (int x = 0; x < numberCount[row2][column2]; x++) {
                                sameFlag = false;
                                tempNumber = numbers[row2][column2][x];
                                for (int y = 0; y < countDiffNumbers[0]; y++) {
                                    if (tempNumber == diffNumbers[y]) {
                                        sameFlag = true;
                                    }
                                }
                                if (sameFlag == false) {
                                    if (tempCount < 4) {
                                        diffNumbers[tempCount] = tempNumber;
                                    }
                                    tempCount++;
                                }
                            }
                            countDiffNumbers[1] = tempCount;
                            
                            // Stage 3
                            if (countDiffNumbers[1] <= 4) { // There still may be a naked quad
                                for (int c = b+1; c <= quadCount-2 && !solved; c++) {
                                    row3 = quadRows[c];
                                    column3 = quadColumns[c];
                                    tempCount = countDiffNumbers[1];

                                    for (int x = 0; x < numberCount[row3][column3]; x++) {
                                        sameFlag = false;
                                        tempNumber = numbers[row3][column3][x];
                                        for (int y = 0; y < countDiffNumbers[1]; y++) {
                                            if (tempNumber == diffNumbers[y]) {
                                                sameFlag = true;
                                            }
                                        }
                                        if (sameFlag == false) {
                                            if (tempCount < 4) {
                                                diffNumbers[tempCount] = tempNumber;
                                            }
                                            tempCount++;
                                        }
                                    }
                                    countDiffNumbers[2] = tempCount;
                                    
                                    // Stage 4
                                    if (countDiffNumbers[2] == 4) { // There still may be a naked quad
                                        for (int d = c+1; d <= quadCount-1 && !solved; d++) {
                                            row4 = quadRows[d];
                                            column4 = quadColumns[d];
                                            tempCount = countDiffNumbers[2];

                                            for (int x = 0; x < numberCount[row4][column4]; x++) {
                                                sameFlag = false;
                                                tempNumber = numbers[row4][column4][x];
                                                for (int y = 0; y < countDiffNumbers[2]; y++) {
                                                    if (tempNumber == diffNumbers[y]) {
                                                        sameFlag = true;
                                                    }
                                                }
                                                if (sameFlag == false) {
                                                    if (tempCount < 4) {
                                                        diffNumbers[tempCount] = tempNumber;
                                                    }
                                                    tempCount++;
                                                }
                                            }
                                            countDiffNumbers[3] = tempCount;
                                            
                                            if (countDiffNumbers[3] == 4) {
                                                // The 4 numbers stored in diffNumbers form a naked quad in cells 1, 2, 3, & 4
                                                totalCount = 0;
                                                number1Changes = 0;
                                                number2Changes = 0;
                                                number3Changes = 0;
                                                number4Changes = 0;
                                                Arrays.fill(rowsChanged1, 0);
                                                Arrays.fill(rowsChanged2, 0);
                                                Arrays.fill(rowsChanged3, 0);
                                                Arrays.fill(rowsChanged4, 0);
                                                Arrays.fill(columnsChanged1, 0);
                                                Arrays.fill(columnsChanged2, 0);
                                                Arrays.fill(columnsChanged3, 0);
                                                Arrays.fill(columnsChanged4, 0);
                                                description = "";

                                                // Remove number1, number2, number3, and number4 from every cell 
                                                // in group other than cells 1, 2, 3, and 4
                                                for (int i = ROW_START[l]; i <= ROW_END[l]; i++) {
                                                    for (int j = COLUMN_START[l]; j <= COLUMN_END[l]; j++) {
                                                        if (game[i][j] == 0 && !(i == row1 && j == column1) && !(i == row2 && j == column2) &&
                                                                !(i == row3 && j == column3) && !(i == row4 && j == column4)) {
                                                            if (possible[i][j][diffNumbers[0]] == diffNumbers[0]+1) {
                                                                possible[i][j][diffNumbers[0]] = 0;
                                                                rowsChanged1[number1Changes] = i;
                                                                columnsChanged1[number1Changes] = j;
                                                                number1Changes++;
                                                                totalCount++;
                                                            }
                                                            if (possible[i][j][diffNumbers[1]] == diffNumbers[1]+1) {
                                                                possible[i][j][diffNumbers[1]] = 0;
                                                                rowsChanged2[number2Changes] = i;
                                                                columnsChanged2[number2Changes] = j;
                                                                number2Changes++;
                                                                totalCount++;
                                                            }
                                                            if (possible[i][j][diffNumbers[2]] == diffNumbers[2]+1) {
                                                                possible[i][j][diffNumbers[2]] = 0;
                                                                rowsChanged3[number3Changes] = i;
                                                                columnsChanged3[number3Changes] = j;
                                                                number3Changes++;
                                                                totalCount++;
                                                            }
                                                            if (possible[i][j][diffNumbers[3]] == diffNumbers[3]+1) {
                                                                possible[i][j][diffNumbers[3]] = 0;
                                                                rowsChanged4[number4Changes] = i;
                                                                columnsChanged4[number4Changes] = j;
                                                                number4Changes++;
                                                                totalCount++;
                                                            }
                                                        }
                                                    }
                                                }

                                                // save data to change log
                                                if (totalCount > 0) {
                                                    if (!isGuessAndCheck && !isBruteForce) {
                                                        possibleChangeMethod.add("Naked Quad - Group");
                                                        description = "Since the numbers " + (diffNumbers[0]+1) + ", " + (diffNumbers[1]+1) +
                                                                ", " + (diffNumbers[2]+1) + ", and " + (diffNumbers[3]+1) +
                                                                " form a naked quad in the cells (" + (row1+1) + "," + (column1+1) + "), (" +
                                                                (row2+1) + "," + (column2+1) + "), (" + (row3+1) + "," + (column3+1) + "), and (" + 
                                                                (row4+1) + "," + (column4+1) + "), the below cells were removed as possible options:";

                                                        if (number1Changes > 0) {
                                                            description = description + "\nNumber " + (diffNumbers[0]+1) + ":";
                                                            for (int s = 0; s < number1Changes; s++) {
                                                                description = description + "\nRow " + (rowsChanged1[s]+1) + ", Column " + (columnsChanged1[s]+1);
                                                                possibleChangeOrder.add(possibleChangeCount);
                                                                possibleChangeNumber.add(diffNumbers[0]+1);
                                                                possibleChangeRow.add(rowsChanged1[s]);
                                                                possibleChangeColumn.add(columnsChanged1[s]);
                                                                possibleChangePossibleCount++;
                                                            }
                                                        }

                                                        if (number2Changes > 0) {
                                                            description = description + "\nNumber " + (diffNumbers[1]+1) + ":";
                                                            for (int s = 0; s < number2Changes; s++) {
                                                                description = description + "\nRow " + (rowsChanged2[s]+1) + ", Column " + (columnsChanged2[s]+1);
                                                                possibleChangeOrder.add(possibleChangeCount);
                                                                possibleChangeNumber.add(diffNumbers[1]+1);
                                                                possibleChangeRow.add(rowsChanged2[s]);
                                                                possibleChangeColumn.add(columnsChanged2[s]);
                                                                possibleChangePossibleCount++;
                                                            }
                                                        }

                                                        if (number3Changes > 0) {
                                                            description = description + "\nNumber " + (diffNumbers[2]+1) + ":";
                                                            for (int s = 0; s < number3Changes; s++) {
                                                                description = description + "\nRow " + (rowsChanged3[s]+1) + ", Column " + (columnsChanged3[s]+1);
                                                                possibleChangeOrder.add(possibleChangeCount);
                                                                possibleChangeNumber.add(diffNumbers[2]+1);
                                                                possibleChangeRow.add(rowsChanged3[s]);
                                                                possibleChangeColumn.add(columnsChanged3[s]);
                                                                possibleChangePossibleCount++;
                                                            }
                                                        }

                                                        if (number4Changes > 0) {
                                                            description = description + "\nNumber " + (diffNumbers[3]+1) + ":";
                                                            for (int s = 0; s < number4Changes; s++) {
                                                                description = description + "\nRow " + (rowsChanged4[s]+1) + ", Column " + (columnsChanged4[s]+1);
                                                                possibleChangeOrder.add(possibleChangeCount);
                                                                possibleChangeNumber.add(diffNumbers[3]+1);
                                                                possibleChangeRow.add(rowsChanged4[s]);
                                                                possibleChangeColumn.add(columnsChanged4[s]);
                                                                possibleChangePossibleCount++;
                                                            }
                                                        }

                                                        possibleChangeDescription.add(description);                          
                                                        totalChangeType.add("possible");
                                                        levelTwoChanges++;
                                                        nakedQuadGroupChanges++;
                                                        possibleChangeCount++;
                                                        totalChangeCount++;
                                                    }
                                                    tempChanges++;
                                                    
                                                    // Run previous methods to see if the puzzle can be solved
                                                    tempChanges += levelZeroMethods(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                                    if (!solved) {
                                                        tempChanges += levelOneMethods(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            changes += tempChanges;
        } while (tempChanges != 0 && !solved);
            
        return changes;
    }
    
    public static int xWingChecks(int game[][], int possible[][][], boolean Rows[][], boolean Columns[][], boolean Groups[][], boolean isGuessAndCheck, boolean isBruteForce) {
        int changes;
        int tempXWingChanges = 0;
        
        do {
            changes = 0;
            changes += xWingRowCheck(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
            changes += xWingColumnCheck(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
            tempXWingChanges += changes;
        } while (changes != 0 && !solved);
        
        return tempXWingChanges;
    }
    
    public static int xWingRowCheck(int game[][], int possible[][][], boolean Rows[][], boolean Columns[][], boolean Groups[][], boolean isGuessAndCheck, boolean isBruteForce) {
        int changes = 0;
        int tempChanges;
        int[] count = new int[9];
        int[][] columns = new int[9][2];
        int[] doubleRows = new int[9];
        int doubleCount = 0;
        int row1 = 0;
        int row2 = 0;
        int column1 = 0;
        int column2 = 0;
        int totalCount = 0;
        int column1Changes = 0;
        int column2Changes = 0;
        int[] rowsChanged1 = new int[9];
        int[] rowsChanged2 = new int[9];
        String description;
        
        do {
            tempChanges = 0;
            for (int k = 0; k < 9 && !solved; k++) { // number 1-9
                Arrays.fill(count, 0);
                Arrays.fill(doubleRows, 0);
                doubleCount = 0;

                // Goes down each row, counts the number of columns the number k appears in,
                // and then stores the first two columns
                for (int i = 0; i < 9; i++) { // row number
                    if (!Rows[i][k]) {
                        for (int j = 0; j < 9; j++) { // column number
                            if (game[i][j] == 0 && possible[i][j][k] == k+1) {
                                if (count[i] < 2) {
                                    columns[i][count[i]] = j;
                                }
                                count[i]++;
                            }
                        }
                    }
                }

                // Counts the number of rows the number appears twice in and stores them
                for (int i = 0; i < 9; i++) { // row number
                    if (count[i] == 2) {
                        doubleRows[doubleCount] = i;
                        doubleCount++;
                    }
                }

                if (doubleCount > 1) {
                    // Stage 1
                    for (int a = 0; a <= doubleCount-2 && !solved; a++) {
                        row1 = doubleRows[a];
                        column1 = columns[row1][0];
                        column2 = columns[row1][1];
                        // Stage 2
                        for (int b = a+1; b <= doubleCount-1 && !solved; b++) {
                            row2 = doubleRows[b];

                            if (columns[row2][0] == column1 && columns[row2][1] == column2) {
                                // There is an X Wing in row1, row2 and column1, column2
                                totalCount = 0;
                                column1Changes = 0;
                                column2Changes = 0;
                                Arrays.fill(rowsChanged1, 0);
                                Arrays.fill(rowsChanged2, 0);
                                description = "";

                                // Remove number1 and number2 from every cell 
                                // in column1 and column2 other than row1 and row2
                                for (int i = 0; i < 9; i++) { // row number
                                    if (i != row1 && i != row2) {
                                        if (game[i][column1] == 0 && possible[i][column1][k] == k+1) {
                                                possible[i][column1][k] = 0;
                                                rowsChanged1[column1Changes] = i;
                                                column1Changes++;
                                                totalCount++;
                                        }
                                        if (game[i][column2] == 0 && possible[i][column2][k] == k+1) {
                                                possible[i][column2][k] = 0;
                                                rowsChanged2[column2Changes] = i;
                                                column2Changes++;
                                                totalCount++;
                                        }
                                    }
                                }

                                // save data to change log
                                if (totalCount > 0) {
                                    if (!isGuessAndCheck && !isBruteForce) {
                                        possibleChangeMethod.add("X Wing - Row");
                                        description = "Since the number " + (k+1) + " forms an X Wing in the rows " + (row1+1) +
                                            " and " + (row2+1) + ", columns " + (column1+1) + " and " + (column2+1) + 
                                            ", it was removed from the below cells as a possible option:";

                                        if (column1Changes > 0) {
                                            description = description + "\nColumn " + (column1+1) + ", Rows: ";
                                            for (int s = 0; s < column1Changes; s++) {
                                                if (s < column1Changes-1) {
                                                    description = description + (rowsChanged1[s]+1) + ", ";
                                                } else if (s == column1Changes-1 && s != 0) {
                                                    description = description + "and " +(rowsChanged1[s]+1);
                                                } else if (s == 0) {
                                                    description = description + (rowsChanged1[s]+1);
                                                }
                                                possibleChangeOrder.add(possibleChangeCount);
                                                possibleChangeNumber.add(k+1);
                                                possibleChangeRow.add(rowsChanged1[s]);
                                                possibleChangeColumn.add(column1);
                                                possibleChangePossibleCount++;
                                            }
                                        }

                                        if (column2Changes > 0) {
                                            description = description + "\nColumn " + (column2+1) + ", Rows: ";
                                            for (int s = 0; s < column2Changes; s++) {
                                                if (s < column2Changes-1) {
                                                    description = description + (rowsChanged2[s]+1) + ", ";
                                                } else if (s == column2Changes-1 && s != 0) {
                                                    description = description + "and " +(rowsChanged2[s]+1);
                                                } else if (s == 0) {
                                                    description = description + (rowsChanged2[s]+1);
                                                }
                                                possibleChangeOrder.add(possibleChangeCount);
                                                possibleChangeNumber.add(k+1);
                                                possibleChangeRow.add(rowsChanged2[s]);
                                                possibleChangeColumn.add(column2);
                                                possibleChangePossibleCount++;
                                            }
                                        }

                                        possibleChangeDescription.add(description);                          
                                        totalChangeType.add("possible");
                                        levelTwoChanges++;
                                        xWingRowChanges++;
                                        possibleChangeCount++;
                                        totalChangeCount++;
                                    }
                                    tempChanges++;
                                    
                                    // Run previous methods to see if the puzzle can be solved
                                    tempChanges += levelZeroMethods(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                    if (!solved) {
                                        tempChanges += levelOneMethods(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            changes += tempChanges;
        } while (tempChanges != 0 && !solved);
            
        return changes;
    }
    
    public static int xWingColumnCheck(int game[][], int possible[][][], boolean Rows[][], boolean Columns[][], boolean Groups[][], boolean isGuessAndCheck, boolean isBruteForce) {
        int changes = 0;
        int tempChanges;
        int[] count = new int[9];
        int[][] rows = new int[9][2];
        int[] doubleColumns = new int[9];
        int doubleCount = 0;
        int row1 = 0;
        int row2 = 0;
        int column1 = 0;
        int column2 = 0;
        int totalCount = 0;
        int row1Changes = 0;
        int row2Changes = 0;
        int[] columnsChanged1 = new int[9];
        int[] columnsChanged2 = new int[9];
        String description;
        
        do {
            tempChanges = 0;
            for (int k = 0; k < 9 && !solved; k++) { // number 1-9
                Arrays.fill(count, 0);
                Arrays.fill(doubleColumns, 0);
                doubleCount = 0;

                // Goes down each column, counts the number of rows the number k appears in,
                // and then stores the first two rows
                for (int j = 0; j < 9; j++) { // column number
                    if (!Columns[j][k]) {
                        for (int i = 0; i < 9; i++) { // row number
                            if (game[i][j] == 0 && possible[i][j][k] == k+1) {
                                if (count[j] < 2) {
                                    rows[j][count[j]] = i;
                                }
                                count[j]++;
                            }
                        }
                    }
                }

                // Counts the number of columns the number appears twice in and stores them
                for (int j = 0; j < 9; j++) { // column number
                    if (count[j] == 2) {
                        doubleColumns[doubleCount] = j;
                        doubleCount++;
                    }
                }

                if (doubleCount > 1) {
                    // Stage 1
                    for (int a = 0; a <= doubleCount-2 && !solved; a++) {
                        column1 = doubleColumns[a];
                        row1 = rows[column1][0];
                        row2 = rows[column1][1];
                        // Stage 2
                        for (int b = a+1; b <= doubleCount-1 && !solved; b++) {
                            column2 = doubleColumns[b];

                            if (rows[column2][0] == row1 && rows[column2][1] == row2) {
                                // There is an X Wing in row1, row2 and column1, column2
                                totalCount = 0;
                                row1Changes = 0;
                                row2Changes = 0;
                                Arrays.fill(columnsChanged1, 0);
                                Arrays.fill(columnsChanged2, 0);
                                description = "";

                                // Remove number1 and number2 from every cell 
                                // in row1 and row2 other than column1 and column2
                                for (int j = 0; j < 9; j++) { // column number
                                    if (j != column1 && j != column2) {
                                        if (game[row1][j] == 0 && possible[row1][j][k] == k+1) {
                                                possible[row1][j][k] = 0;
                                                columnsChanged1[row1Changes] = j;
                                                row1Changes++;
                                                totalCount++;
                                        }
                                        if (game[row2][j] == 0 && possible[row2][j][k] == k+1) {
                                                possible[row2][j][k] = 0;
                                                columnsChanged2[row2Changes] = j;
                                                row2Changes++;
                                                totalCount++;
                                        }
                                    }
                                }

                                // save data to change log
                                if (totalCount > 0) {
                                    if (!isGuessAndCheck && !isBruteForce) {
                                        possibleChangeMethod.add("X Wing - Column");
                                        description = "Since the number " + (k+1) + " forms an X Wing in the rows " + (row1+1) +
                                            " and " + (row2+1) + ", columns " + (column1+1) + " and " + (column2+1) + 
                                            ", it was removed from the below cells as a possible option:";

                                        if (row1Changes > 0) {
                                            description = description + "\nRow " + (row1+1) + ", Columns: ";
                                            for (int s = 0; s < row1Changes; s++) {
                                                if (s < row1Changes-1) {
                                                    description = description + (columnsChanged1[s]+1) + ", ";
                                                } else if (s == row1Changes-1 && s != 0) {
                                                    description = description + "and " +(columnsChanged1[s]+1);
                                                } else if (s == 0) {
                                                    description = description + (columnsChanged1[s]+1);
                                                }
                                                possibleChangeOrder.add(possibleChangeCount);
                                                possibleChangeNumber.add(k+1);
                                                possibleChangeRow.add(row1);
                                                possibleChangeColumn.add(columnsChanged1[s]);
                                                possibleChangePossibleCount++;
                                            }
                                        }

                                        if (row2Changes > 0) {
                                            description = description + "\nRow " + (row2+1) + ", Columns: ";
                                            for (int s = 0; s < row2Changes; s++) {
                                                if (s < row2Changes-1) {
                                                    description = description + (columnsChanged2[s]+1) + ", ";
                                                } else if (s == row2Changes-1 && s != 0) {
                                                    description = description + "and " +(columnsChanged2[s]+1);
                                                } else if (s == 0) {
                                                    description = description + (columnsChanged2[s]+1);
                                                }
                                                possibleChangeOrder.add(possibleChangeCount);
                                                possibleChangeNumber.add(k+1);
                                                possibleChangeRow.add(row2);
                                                possibleChangeColumn.add(columnsChanged2[s]);
                                                possibleChangePossibleCount++;
                                            }
                                        }

                                        possibleChangeDescription.add(description);                          
                                        totalChangeType.add("possible");
                                        levelTwoChanges++;
                                        xWingColumnChanges++;
                                        possibleChangeCount++;
                                        totalChangeCount++;
                                    }
                                    tempChanges++;
                                    
                                    // Run previous methods to see if the puzzle can be solved
                                    tempChanges += levelZeroMethods(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                    if (!solved) {
                                        tempChanges += levelOneMethods(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            changes += tempChanges;
        } while (tempChanges != 0 && !solved);
            
        return changes;
    }
    
    public static int yWingChecks(int game[][], int possible[][][], boolean Rows[][], boolean Columns[][], boolean Groups[][], boolean isGuessAndCheck, boolean isBruteForce) {
        int changes = 0;
        int tempYWingChanges = 0;
        boolean[][] isTwoOption = new boolean[9][9];
        int[][][] numbers = new int[9][9][2];
        
        do {
            changes = 0;
            changes += rowColumnYWingCheck(game, possible, numbers, isTwoOption, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
            changes += rowGroupYWingCheck(game, possible, numbers, isTwoOption, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
            changes += columnGroupYWingCheck(game, possible, numbers, isTwoOption, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
        } while (changes != 0 && !solved);
        
        return tempYWingChanges;
    }
    
    public static int rowColumnYWingCheck(int game[][], int possible[][][], int numbers[][][], boolean isTwoOption[][], boolean Rows[][], boolean Columns[][], boolean Groups[][], boolean isGuessAndCheck, boolean isBruteForce) {
        int changes = 0;
        int tempChanges = 0;
        int A;
        int B;
        int C;
        int rowWingColumn;
        boolean isRowWing_AC;
        boolean isRowWing_BC;
        int columnWingRow;
        boolean yWingChangesMade;
        String description;
        
        do {
            tempChanges = 0;
            updateTwoOption(game, possible, numbers, isTwoOption);
            yWingChangesMade = false;
            
            for (int i = 0; i < 9 && !yWingChangesMade && !solved; i++) { // row number
                for (int j = 0; j < 9 && !yWingChangesMade && !solved; j++) { // column number
                    A = 0;
                    B = 0;
                    C = 0;
                                        
                    if (isTwoOption[i][j] == true) {
                        A = numbers[i][j][0];
                        B = numbers[i][j][1];
                        centerWingGroup = determineGroup(i, j);
                        
                        // go down the row to see if there is another two option cell
                        // that can be a wing cell
                        for (int q = 0; q < 9 && !yWingChangesMade && !solved; q++) { // column number
                            rowWingColumn = -1;
                            int tempGroup = determineGroup(i, q);
                            isRowWing_AC = false;
                            isRowWing_BC = false;
                                                        
                            if (isTwoOption[i][q] == true && q != j && tempGroup != centerWingGroup) {
                                if (numbers[i][q][0] == A && numbers[i][q][1] != B) {
                                    rowWingColumn = q;
                                    C = numbers[i][q][1];
                                    isRowWing_AC = true;
                                } else if (numbers[i][q][0] == B && numbers[i][q][1] != A) {
                                    rowWingColumn = q;
                                    C = numbers[i][q][1];
                                    isRowWing_BC = true;
                                } else if (numbers[i][q][0] != A && numbers[i][q][1] == B) {
                                    rowWingColumn = q;
                                    C = numbers[i][q][0];
                                    isRowWing_BC = true;
                                } else if (numbers[i][q][0] != B && numbers[i][q][1] == A) {
                                    rowWingColumn = q;
                                    C = numbers[i][q][0];
                                    isRowWing_AC = true;
                                }
                                
                                // if a row wing has been found, check for a column wing
                                if (rowWingColumn != -1) {
                                    columnWingRow = -1;
                                    
                                    for (int r = 0; r < 9 && !yWingChangesMade && !solved; r++) { // row number
                                        tempGroup = determineGroup(r, j);

                                        if (isTwoOption[r][j] == true && r != i && tempGroup != centerWingGroup) {
                                            // check to see if the column wing is equal to the opposite config of the row wing
                                            // case 1) Row Wing = AC, is Column Wing = BC?
                                            // case 2) Row Wing = BC, is Column Wing = AC?
                                                                                                
                                            if ((isRowWing_AC == true && ((numbers[r][j][0] == B && numbers[r][j][1] == C) ||
                                                    (numbers[r][j][1] == B && numbers[r][j][0] == C))) ||
                                                    (isRowWing_BC == true && ((numbers[r][j][0] == A && numbers[r][j][1] == C) ||
                                                    (numbers[r][j][1] == A && numbers[r][j][0] == C)))) {
                                                // Y Wing exists!!
                                                columnWingRow = r;
                                                description = "";
                                                
                                                // Remove C from the cell at (columnWingRow, rowWingColumn), if it's an option
                                                if (game[columnWingRow][rowWingColumn] == 0 && possible[columnWingRow][rowWingColumn][C-1] == C) {
                                                    // Remove C and record the change
                                                    possible[columnWingRow][rowWingColumn][C-1] = 0;
                                                    yWingChangesMade = true;
                                                }
                                            }
                                                    
                                            // save changes to change log
                                            if (yWingChangesMade) {
                                                if (!isGuessAndCheck && !isBruteForce) {
                                                    possibleChangeMethod.add("Y Wing - Row + Column");
                                                    description = "Since the numbers " + A + ", " + B + " and " + C +
                                                        " form a Y Wing with the center wing at Row " + (i+1) + " Column " + (j+1) +
                                                        ", the row wing at Row " + (i+1) + " Column " + (rowWingColumn+1) +  
                                                        ",\nand the column wing at Row " + (columnWingRow+1) + " Column " + (j+1) +
                                                        ", the number " + C + " was removed from the below cells as a possible option:";
                                                    description = description + "\nRow " + (columnWingRow+1) + " Column " + (rowWingColumn+1);
                                                    possibleChangeOrder.add(possibleChangeCount);
                                                    possibleChangeNumber.add(C);
                                                    possibleChangeRow.add(columnWingRow);
                                                    possibleChangeColumn.add(rowWingColumn);
                                                    possibleChangeDescription.add(description);                          
                                                    totalChangeType.add("possible");
                                                    possibleChangePossibleCount++;
                                                    levelTwoChanges++;
                                                    yWingRowColumnChanges++;
                                                    possibleChangeCount++;
                                                    totalChangeCount++;
                                                }
                                                tempChanges++;
                                                
                                                // Run previous methods to see if the puzzle can be solved
                                                tempChanges += levelZeroMethods(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                                if (!solved) {
                                                    tempChanges += levelOneMethods(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            changes += tempChanges;
        } while (tempChanges != 0 && !solved);
                
        return changes;
    }
    
    public static int rowGroupYWingCheck(int game[][], int possible[][][], int numbers[][][], boolean isTwoOption[][], boolean Rows[][], boolean Columns[][], boolean Groups[][], boolean isGuessAndCheck, boolean isBruteForce) {
        int changes = 0;
        int tempChanges = 0;
        int yWingChanges = 0;
        int A;
        int B;
        int C;
        int rowWingColumn;
        int rowWingGroup;
        boolean isRowWing_AC;
        boolean isRowWing_BC;
        int centerWingGroup;
        int groupWingColumn;
        int groupWingRow;
        boolean yWingChangesMade;
        int[] rowsChanged = new int[5];
        int[] columnsChanged = new int[5];
        String description;
        
        do {
            tempChanges = 0;
            updateTwoOption(game, possible, numbers, isTwoOption);
            yWingChangesMade = false;
            
            for (int i = 0; i < 9 && !yWingChangesMade && !solved; i++) { // row number
                for (int j = 0; j < 9 && !yWingChangesMade && !solved; j++) { // column number
                    A = 0;
                    B = 0;
                    C = 0;
                                        
                    if (isTwoOption[i][j] == true) {
                        A = numbers[i][j][0];
                        B = numbers[i][j][1];
                        centerWingGroup = determineGroup(i, j);
                        
                        // go down the row to see if there is another two option cell
                        // that can be a wing cell
                        for (int q = 0; q < 9 && !yWingChangesMade && !solved; q++) { // column number
                            rowWingColumn = -1;
                            rowWingGroup = -1;
                            int tempGroup = determineGroup(i, q);
                            isRowWing_AC = false;
                            isRowWing_BC = false;
                                                        
                            if (isTwoOption[i][q] == true && q != j && tempGroup != centerWingGroup) {
                                if (numbers[i][q][0] == A && numbers[i][q][1] != B) {
                                    rowWingColumn = q;
                                    rowWingGroup = determineGroup(i, q);
                                    C = numbers[i][q][1];
                                    isRowWing_AC = true;
                                } else if (numbers[i][q][0] == B && numbers[i][q][1] != A) {
                                    rowWingColumn = q;
                                    rowWingGroup = determineGroup(i, q);
                                    C = numbers[i][q][1];
                                    isRowWing_BC = true;
                                } else if (numbers[i][q][0] != A && numbers[i][q][1] == B) {
                                    rowWingColumn = q;
                                    rowWingGroup = determineGroup(i, q);
                                    C = numbers[i][q][0];
                                    isRowWing_BC = true;
                                } else if (numbers[i][q][0] != B && numbers[i][q][1] == A) {
                                    rowWingColumn = q;
                                    rowWingGroup = determineGroup(i, q);
                                    C = numbers[i][q][0];
                                    isRowWing_AC = true;
                                }
                                
                                // if a row wing has been found, check for a group wing
                                if (rowWingColumn != -1) {
                                    groupWingColumn = -1;
                                    groupWingRow = -1;
                                    
                                    for (int r = ROW_START[centerWingGroup]; r <= ROW_END[centerWingGroup] && !yWingChangesMade && !solved; r++) { // row number
                                        for (int s = COLUMN_START[centerWingGroup]; s <= COLUMN_END[centerWingGroup] && !yWingChangesMade && !solved; s++) { // column number
                                            if (isTwoOption[r][s] == true && r != i) {
                                                // check to see if the group wing is equal to the opposite config of the row wing
                                                // case 1) Row Wing = AC, is Group Wing = BC?
                                                // case 2) Row Wing = BC, is Group Wing = AC?
                                                                                                
                                                if ((isRowWing_AC == true && ((numbers[r][s][0] == B && numbers[r][s][1] == C) ||
                                                        (numbers[r][s][1] == B && numbers[r][s][0] == C))) ||
                                                        (isRowWing_BC == true && ((numbers[r][s][0] == A && numbers[r][s][1] == C) ||
                                                        (numbers[r][s][1] == A && numbers[r][s][0] == C)))) {
                                                    // Y Wing exists!!
                                                    groupWingRow = r;
                                                    groupWingColumn = s;
                                                    yWingChanges = 0;
                                                    Arrays.fill(rowsChanged, 0);
                                                    Arrays.fill(columnsChanged, 0);
                                                    description = "";
                                                    
                                                    // Remove C from all cells that are:
                                                    // 1) in both the Group Wing's row & the Row Wing's group OR
                                                    // 2) in the Center group & current row
                                                    for (int t = COLUMN_START[rowWingGroup]; t <= COLUMN_END[rowWingGroup]; t++) {
                                                        if (game[groupWingRow][t] == 0 && possible[groupWingRow][t][C-1] == C && t != groupWingColumn) {
                                                            // Remove C and record the change
                                                            possible[groupWingRow][t][C-1] = 0;
                                                            rowsChanged[yWingChanges] = groupWingRow;
                                                            columnsChanged[yWingChanges] = t;
                                                            yWingChangesMade = true;
                                                            yWingChanges++;
                                                        }
                                                    }
                                                    
                                                    for (int t = COLUMN_START[centerWingGroup]; t <= COLUMN_END[centerWingGroup]; t++) {
                                                        if (game[i][t] == 0 && possible[i][t][C-1] == C && t != j) {
                                                            // Remove C and record the change
                                                            possible[i][t][C-1] = 0;
                                                            rowsChanged[yWingChanges] = i;
                                                            columnsChanged[yWingChanges] = t;
                                                            yWingChangesMade = true;
                                                            yWingChanges++;
                                                        }
                                                    }
                                                    
                                                    // save changes to change log
                                                    if (yWingChangesMade) {
                                                        if (!isGuessAndCheck && !isBruteForce) {
                                                            possibleChangeMethod.add("Y Wing - Row + Group");
                                                            description = "Since the numbers " + A + ", " + B + " and " + C +
                                                                " form a Y Wing with the center wing at Row " + (i+1) + " Column " + (j+1) +
                                                                ", the row wing at Row " + (i+1) + " Column " + (rowWingColumn+1) +  
                                                                ",\nand the group wing at Row " + (groupWingRow+1) + " Column " + (groupWingColumn+1) +
                                                                ", the number " + C + " was removed from the below cells as a possible option:";


                                                            for (int u = 0; u < yWingChanges; u++) {
                                                                description = description + "\nRow " + (rowsChanged[u]+1) + " Column " + (columnsChanged[u]+1);
                                                                possibleChangeOrder.add(possibleChangeCount);
                                                                possibleChangeNumber.add(C);
                                                                possibleChangeRow.add(rowsChanged[u]);
                                                                possibleChangeColumn.add(columnsChanged[u]);
                                                                possibleChangePossibleCount++;
                                                            }

                                                            possibleChangeDescription.add(description);                          
                                                            totalChangeType.add("possible");
                                                            levelTwoChanges++;
                                                            yWingRowGroupChanges++;
                                                            possibleChangeCount++;
                                                            totalChangeCount++;
                                                        }
                                                        tempChanges++;
                                                        
                                                        // Run previous methods to see if the puzzle can be solved
                                                        tempChanges += levelZeroMethods(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                                        if (!solved) {
                                                            tempChanges += levelOneMethods(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            changes += tempChanges;
        } while (tempChanges != 0 && !solved);
                
        return changes; 
    }
    
    public static int columnGroupYWingCheck(int game[][], int possible[][][], int numbers[][][], boolean isTwoOption[][], boolean Rows[][], boolean Columns[][], boolean Groups[][], boolean isGuessAndCheck, boolean isBruteForce) {
        int changes = 0;
        int tempChanges = 0;
        int yWingChanges = 0;
        int A;
        int B;
        int C;
        int columnWingRow;
        int columnWingGroup;
        boolean isColumnWing_AC;
        boolean isColumnWing_BC;
        int centerWingGroup;
        int groupWingColumn;
        int groupWingRow;
        boolean yWingChangesMade;
        int[] rowsChanged = new int[5];
        int[] columnsChanged = new int[5];
        String description;
        
        do {
            tempChanges = 0;
            updateTwoOption(game, possible, numbers, isTwoOption);
            yWingChangesMade = false;
            
            for (int i = 0; i < 9 && !yWingChangesMade && !solved; i++) { // row number
                for (int j = 0; j < 9 && !yWingChangesMade && !solved; j++) { // column number
                    A = 0;
                    B = 0;
                    C = 0;
                                        
                    if (isTwoOption[i][j] == true) {
                        A = numbers[i][j][0];
                        B = numbers[i][j][1];
                        centerWingGroup = determineGroup(i, j);
                        
                        // go down the column to see if there is another two option cell
                        // that can be a wing cell
                        for (int q = 0; q < 9 && !yWingChangesMade && !solved; q++) { // row number
                            columnWingRow = -1;
                            columnWingGroup = -1;
                            int tempGroup = determineGroup(q, j);
                            isColumnWing_AC = false;
                            isColumnWing_BC = false;
                                                        
                            if (isTwoOption[q][j] == true && q != i && tempGroup != centerWingGroup) {
                                if (numbers[q][j][0] == A && numbers[q][j][1] != B) {
                                    columnWingRow = q;
                                    columnWingGroup = determineGroup(q, j);
                                    C = numbers[q][j][1];
                                    isColumnWing_AC = true;
                                } else if (numbers[q][j][0] == B && numbers[q][j][1] != A) {
                                    columnWingRow = q;
                                    columnWingGroup = determineGroup(q, j);
                                    C = numbers[q][j][1];
                                    isColumnWing_BC = true;
                                } else if (numbers[q][j][0] != A && numbers[q][j][1] == B) {
                                    columnWingRow = q;
                                    columnWingGroup = determineGroup(q, j);
                                    C = numbers[q][j][0];
                                    isColumnWing_BC = true;
                                } else if (numbers[q][j][0] != B && numbers[q][j][1] == A) {
                                    columnWingRow = q;
                                    columnWingGroup = determineGroup(q, j);
                                    C = numbers[q][j][0];
                                    isColumnWing_AC = true;
                                }
                                
                                // if a column wing has been found, check for a group wing
                                if (columnWingRow != -1) {
                                    groupWingColumn = -1;
                                    groupWingRow = -1;
                                    
                                    for (int r = ROW_START[centerWingGroup]; r <= ROW_END[centerWingGroup] && !yWingChangesMade && !solved; r++) { // row number
                                        for (int s = COLUMN_START[centerWingGroup]; s <= COLUMN_END[centerWingGroup] && !yWingChangesMade && !solved; s++) { // column number
                                            if (isTwoOption[r][s] == true && s != j) {
                                                // check to see if the group wing is equal to the opposite config of the column wing
                                                // case 1) Column Wing = AC, is Group Wing = BC?
                                                // case 2) Column Wing = BC, is Group Wing = AC?
                                                                                                
                                                if ((isColumnWing_AC == true && ((numbers[r][s][0] == B && numbers[r][s][1] == C) ||
                                                        (numbers[r][s][1] == B && numbers[r][s][0] == C))) ||
                                                        (isColumnWing_BC == true && ((numbers[r][s][0] == A && numbers[r][s][1] == C) ||
                                                        (numbers[r][s][1] == A && numbers[r][s][0] == C)))) {
                                                    // Y Wing exists!!
                                                    groupWingRow = r;
                                                    groupWingColumn = s;
                                                    yWingChanges = 0;
                                                    Arrays.fill(rowsChanged, 0);
                                                    Arrays.fill(columnsChanged, 0);
                                                    description = "";
                                                    
                                                    // Remove C from all cells that are:
                                                    // 1) in both the Group Wing's column & the Column Wing's group OR
                                                    // 2) in the Center's group & current column
                                                    for (int t = ROW_START[columnWingGroup]; t <= ROW_END[columnWingGroup]; t++) {
                                                        if (game[t][groupWingColumn] == 0 && possible[t][groupWingColumn][C-1] == C && t != groupWingRow) {
                                                            // Remove C and record the change
                                                            possible[t][groupWingColumn][C-1] = 0;
                                                            rowsChanged[yWingChanges] = t;
                                                            columnsChanged[yWingChanges] = groupWingColumn;
                                                            yWingChangesMade = true;
                                                            yWingChanges++;
                                                        }
                                                    }
                                                    
                                                    for (int t = ROW_START[centerWingGroup]; t <= ROW_END[centerWingGroup]; t++) {
                                                        if (game[t][j] == 0 && possible[t][j][C-1] == C && t != i) {
                                                            // Remove C and record the change
                                                            possible[t][j][C-1] = 0;
                                                            rowsChanged[yWingChanges] = t;
                                                            columnsChanged[yWingChanges] = j;
                                                            yWingChangesMade = true;
                                                            yWingChanges++;
                                                        }
                                                    }
                                                    
                                                    // save changes to change log
                                                    if (yWingChangesMade) {
                                                        if (!isGuessAndCheck && !isBruteForce) {
                                                            possibleChangeMethod.add("Y Wing - Column + Group");
                                                            description = "Since the numbers " + A + ", " + B + " and " + C +
                                                                " form a Y Wing with the center wing at Row " + (i+1) + " Column " + (j+1) +
                                                                ", the column wing at Row " + (columnWingRow+1) + " Column " + (j+1) +  
                                                                ",\nand the group wing at Row " + (groupWingRow+1) + " Column " + (groupWingColumn+1) +
                                                                ", the number " + C + " was removed from the below cells as a possible option:";


                                                            for (int u = 0; u < yWingChanges; u++) {
                                                                description = description + "\nRow " + (rowsChanged[u]+1) + " Column " + (columnsChanged[u]+1);
                                                                possibleChangeOrder.add(possibleChangeCount);
                                                                possibleChangeNumber.add(C);
                                                                possibleChangeRow.add(rowsChanged[u]);
                                                                possibleChangeColumn.add(columnsChanged[u]);
                                                                possibleChangePossibleCount++;
                                                            }

                                                            possibleChangeDescription.add(description);                          
                                                            totalChangeType.add("possible");
                                                            levelTwoChanges++;
                                                            yWingColumnGroupChanges++;
                                                            possibleChangeCount++;
                                                            totalChangeCount++;
                                                        }
                                                        tempChanges++;
                                                        
                                                        // Run previous methods to see if the puzzle can be solved
                                                        tempChanges += levelZeroMethods(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                                        if (!solved) {
                                                            tempChanges += levelOneMethods(game, possible, Rows, Columns, Groups, isGuessAndCheck, isBruteForce);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            changes += tempChanges;
        } while (tempChanges != 0 && !solved);
                
        return changes;
    }
    
    public static void updateTwoOption(int game[][], int possible[][][], int numbers[][][], boolean isTwoOption[][]) {
        int cellCount;
        
        for (int i = 0; i < 9; i++) {
            Arrays.fill(isTwoOption[i],false);
            for (int j = 0; j < 9; j++) {
                Arrays.fill(numbers[i][j], 0);
            }
        }
          
        for (int i = 0; i < 9; i++) { // row number
            for (int j = 0; j < 9; j++) { // column number
                cellCount = 0;
                if (game[i][j] == 0) {
                    for (int k = 0; k < 9; k++) { // number 1-9
                        if (possible[i][j][k] == k+1) {
                            if (cellCount == 0) {
                                numbers[i][j][0] = k+1;
                            } else if (cellCount == 1) {
                                numbers[i][j][1] = k+1;
                            }
                            cellCount++;
                        }
                    }
                }
                  
                if (cellCount == 2) {
                    isTwoOption[i][j] = true;
                }
            }
        }
    }
    
    public static int levelThreeMethods(int game[][], int possible[][][], boolean Rows[][], boolean Columns[][], boolean Groups[][]) {
        int changes;
        int tempLevelThreeChanges = 0;
        
        do {
            changes = 0;
            changes += guessAndCheck(game, possible, Rows, Columns, Groups, false);
            tempLevelThreeChanges += changes;
        } while (changes != 0 && !solved);
        
        // implement bruteForce only once if the puzzle isn't solved yet
        if (!solved) {
            // clone game, possible, Rows, Columns, and Groups here and feed them into bruteForce below
            int[][] cloneGame = new int[9][9];
            int[][][] clonePossible = new int[9][9][9];
            boolean[][] cloneRows = new boolean[9][9];
            boolean[][] cloneColumns = new boolean[9][9];
            boolean[][] cloneGroups = new boolean[9][9];
            setGameEqual(game, cloneGame);
            setPossibleEqual(possible, clonePossible);
            setBoolEqual(Rows, cloneRows);
            setBoolEqual(Columns, cloneColumns);
            setBoolEqual(Groups, cloneGroups);

            bruteForce(cloneGame, clonePossible, cloneRows, cloneColumns, cloneGroups);
            
            // update possible so the puzzle will solve by calling previous methods again
            for (int i = 0; i < 9; i++) {
                for (int j = 0; j < 9; j++) {
                    if (game[i][j] != cloneGame[i][j]) {
                        for (int k = 0; k < 9; k++) {
                            if (possible[i][j][k] != 0 && possible[i][j][k] != cloneGame[i][j]) {
                                possible[i][j][k] = 0;
                                possibleChangeOrder.add(possibleChangeCount);
                                possibleChangeNumber.add(k+1);
                                possibleChangeRow.add(i);
                                possibleChangeColumn.add(j);
                                possibleChangePossibleCount++;
                            }
                        }
                    }
                }
            }
            totalChangeType.add("possible");
            levelThreeChanges++;
            bruteForceChanges++;
            possibleChangeCount++;
            totalChangeCount++;

            // save data to change log
            possibleChangeMethod.add("Brute Force");
            String description = "Eliminating the highlighted possible options makes the puzzle solvable using previous methods";
            possibleChangeDescription.add(description);
            
            // call previous methods again to solve the puzzle
            levelZeroMethods(game, possible, Rows, Columns, Groups, false, false);
            if (!solved) {
                levelOneMethods(game, possible, Rows, Columns, Groups, false, false);
                if (!solved) {
                    levelTwoMethods(game, possible, Rows, Columns, Groups, false, false);
                    if (!solved) {
                        guessAndCheck(game, possible, Rows, Columns, Groups, false);
                    }
                }
            }
        }
        
        return tempLevelThreeChanges;
    }
    
    public static int guessAndCheck(int game[][], int possible[][][], boolean Rows[][], boolean Columns[][], boolean Groups[][], boolean isBruteForce) {
        int changes = 0;
        int tempChanges;
        int tempCount;
        int[] tempOptions = new int[9];
        int[][][] cloneGames = new int[9][9][9]; // first index: clone game number, second index: row, third index: column
        int[][][] clonePossible = new int[9][9][9];
        boolean[][] cloneRows = new boolean[9][9];
        boolean[][] cloneColumns = new boolean[9][9];
        boolean[][] cloneGroups = new boolean[9][9];
        boolean contradictionFound;
        boolean sameNumFound;
        boolean tempSolved;
        String description;
        
	do {
            tempChanges = 0;
            contradictionFound = false;
            sameNumFound = false;
            tempSolved = false;
            
            for (int optionCount = 2; optionCount < 10 && !contradictionFound && !sameNumFound && !tempSolved; optionCount++) {
                for (int i = 0; i < 9 && !contradictionFound && !sameNumFound && !tempSolved; i++) {
                    for (int j = 0; j < 9 && !contradictionFound && !sameNumFound && !tempSolved; j++) {
                        if (game[i][j] == 0) {
                            // count how many options are in this cell and store them
                            tempCount = 0;
                            for (int k = 0; k < 9; k++) {
                                if (possible[i][j][k] == k+1) {
                                    tempOptions[tempCount] = k+1;
                                    tempCount++;
                                }
                            }
                            
                            if (tempCount == optionCount) {
                                // set cloneGames to zero
                                resetCloneGames(cloneGames);
                                
                                for (int currentOption = 0; currentOption < optionCount && !contradictionFound && !tempSolved; currentOption++) {
                                    // clone the current game
                                    setGameEqual(game, cloneGames[currentOption]);
                                    setPossibleEqual(possible, clonePossible);
                                    setBoolEqual(Rows, cloneRows);
                                    setBoolEqual(Columns, cloneColumns);
                                    setBoolEqual(Groups, cloneGroups);
                                    
                                    // set this cell in clone game to the current option
                                    cloneGames[currentOption][i][j] = tempOptions[currentOption];
                                    updateShadowPossible(tempOptions[currentOption], i, j, clonePossible, cloneRows, cloneColumns, cloneGroups, true, isBruteForce);
                                    
                                    // solve the puzzle as much as possible using all previous methods
                                    levelTwoMethods(cloneGames[currentOption], clonePossible, cloneRows, cloneColumns, cloneGroups, true, isBruteForce);
                                    
                                    // check to see if this guess solved the puzzle
                                    if (isSolved(cloneGames[currentOption])) {
                                        tempSolved = true;
                                        for (int k = 0; k < 9; k++) {
                                            if (possible[i][j][k] != tempOptions[currentOption] && possible[i][j][k] != 0) {
                                                possible[i][j][k] = 0;
                                                if (!isBruteForce) {
                                                    possibleChangeOrder.add(possibleChangeCount);
                                                    possibleChangeNumber.add(k+1);
                                                    possibleChangeRow.add(i);
                                                    possibleChangeColumn.add(j);
                                                    possibleChangePossibleCount++;
                                                }
                                                tempChanges++;
                                            }
                                        }
                                        if (!isBruteForce) {
                                            totalChangeType.add("possible");
                                            levelThreeChanges++;
                                            guessAndCheckChanges++;
                                            possibleChangeCount++;
                                            totalChangeCount++;

                                            // save data to change log
                                            possibleChangeMethod.add("Guess and Check");
                                            description = "Making row " + (i+1) + ", column " + (j+1) + " the number " + tempOptions[currentOption] + " solved the puzzle." + 
                                                    "Therefore, all possible options besides " + tempOptions[currentOption] + " were removed";
                                            possibleChangeDescription.add(description);
                                        }
                                    }
                                    
                                    // check to see if there are any cells with zero options
                                    if (!tempSolved) {
                                        for (int x = 0; x < 9 && !contradictionFound; x++) {
                                            for (int y = 0; y < 9  && !contradictionFound; y++) {
                                                if (cloneGames[currentOption][x][y] == 0) {
                                                    if (countPossibleOptions(x,y,clonePossible) == 0) {
                                                        // a contradiction has occured that made a cell unfillable
                                                        // therefore, the current option is not possible and needs to be removed
                                                        contradictionFound = true;
                                                    }
                                                }
                                            }
                                        }

                                        // if a contradiction was found, remove the current option as a possible option
                                        if (contradictionFound) {
                                            possible[i][j][tempOptions[currentOption]-1] = 0;

                                            // save data to change log
                                            if (!isBruteForce) {
                                                possibleChangeMethod.add("Guess and Check");
                                                description = "Making row " + (i+1) + ", column " + (j+1) + " the number " + tempOptions[currentOption] + " leads to a contradiction, therefore, it was removed as a possible option";
                                                possibleChangeDescription.add(description); 
                                                possibleChangeOrder.add(possibleChangeCount);
                                                possibleChangeNumber.add(tempOptions[currentOption]);
                                                possibleChangeRow.add(i);
                                                possibleChangeColumn.add(j);
                                                totalChangeType.add("possible");
                                                levelThreeChanges++;
                                                guessAndCheckChanges++;
                                                possibleChangeCount++;
                                                possibleChangePossibleCount++;
                                                totalChangeCount++;
                                            }
                                            tempChanges++;
                                        }
                                    }
                                }
                                
                                // check to see if any cells resulted in the same number with all guesses
                                if (!contradictionFound && !tempSolved) {
                                    for (int x = 0; x < 9; x++) {
                                        for (int y = 0; y < 9; y++) {
                                            if (game[x][y] == 0) {
                                                int num = cloneGames[0][x][y];
                                                boolean diffFlag = false;
                                                for (int currentOption = 1; currentOption < optionCount; currentOption++) {
                                                    if (cloneGames[currentOption][x][y] != num) {
                                                        diffFlag = true;
                                                    }
                                                }
                                                if (!diffFlag && num != 0) {
                                                    // the value at row x column y must be num
                                                    // in order to let the level zero methods place the number in the grid, remove all possible options except num
                                                    sameNumFound = true;
                                                    for (int k = 0; k < 9; k++) {
                                                        if (possible[x][y][k] != num && possible[x][y][k] != 0) {
                                                            possible[x][y][k] = 0;
                                                            if (!isBruteForce) {
                                                                possibleChangeOrder.add(possibleChangeCount);
                                                                possibleChangeNumber.add(k+1);
                                                                possibleChangeRow.add(x);
                                                                possibleChangeColumn.add(y);
                                                                possibleChangePossibleCount++;
                                                            }
                                                            tempChanges++;
                                                        }
                                                    }
                                                    if (!isBruteForce) {
                                                        totalChangeType.add("possible");
                                                        levelThreeChanges++;
                                                        guessAndCheckChanges++;
                                                        possibleChangeCount++;
                                                        totalChangeCount++;

                                                        // save data to change log
                                                        possibleChangeMethod.add("Guess and Check");
                                                        description = "Making row " + (i+1) + ", column " + (j+1) + " all possible options leads to row " + (x+1) + ", column " + (y+1) + " being number " + num + " for each option." + 
                                                                "\nTherefore, all possible options besides " + num + " were removed";
                                                        possibleChangeDescription.add(description); 
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                
                            }
                        }
                    }
                }
            }
            // Run previous methods to see if the puzzle can be solved
            tempChanges += levelZeroMethods(game, possible, Rows, Columns, Groups, false, isBruteForce);
            if (!isSolved(game)) {
                tempChanges += levelOneMethods(game, possible, Rows, Columns, Groups, false, isBruteForce);
                if (!isSolved(game)) {
                    tempChanges += levelTwoMethods(game, possible, Rows, Columns, Groups, false, isBruteForce);
                }
            }
            changes += tempChanges;
        } while (tempChanges != 0 && !solved);
        
	return changes;
    }
    
    public static void bruteForce(int game[][], int possible[][][], boolean Rows[][], boolean Columns[][], boolean Groups[][]) {
        int[][] cloneGame = new int[9][9];
        int[][][] clonePossible = new int[9][9][9];
        
        for (int optionCount = 2; optionCount < 10; optionCount++) {
            for (int i = 0; i < 9; i++) {
                for (int j = 0; j < 9; j++) {
                    if (game[i][j] == 0) {
                        // count how many options are in this cell and store them
                        int tempCount = 0;
                        int[] tempOptions = new int[9];
                        for (int k = 0; k < 9; k++) {
                            if (possible[i][j][k] == k+1) {
                                tempOptions[tempCount] = k+1;
                                tempCount++;
                            }
                        }
                        if (tempCount == optionCount) {
                            for (int currentOption = 0; currentOption < optionCount; currentOption++) {
                                setGameEqual(game, cloneGame);
                                setPossibleEqual(possible, clonePossible);
                                game[i][j] = tempOptions[currentOption];
                                updateShadowPossible(tempOptions[currentOption], i, j, possible, Rows, Columns, Groups, false, true);
                                
                                guessAndCheck(game, possible, Rows, Columns, Groups, true);
                                
                                // check if the puzzle is solved
                                if (isSolved(game)) {
                                    bruteForceSolved = true;
                                    // reset the game to only have the digits needed to solve the puzzle with previous methods, and return
                                    setGameEqual(cloneGame, game);
                                    game[i][j] = tempOptions[currentOption];
                                    return; 
                                }
                                
                                // if the puzzle wasn't solved, check if it's still valid
                                if (isValid(game, possible)) {
                                    // puzzle is still valid, continue with the recursion
                                    bruteForce(game, possible, Rows, Columns, Groups);
                                    // return is the subsequent recursions have solved the puzzle
                                    if (bruteForceSolved) {
                                        return;
                                    }
                                } else {
                                    // puzzle is invalid, reset game and possible, try the next option
                                    setGameEqual(cloneGame, game);
                                    setPossibleEqual(clonePossible, possible);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    
    public static boolean isValid(int game[][], int possible[][][]) {
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                if (game[i][j] == 0) {
                    if (countPossibleOptions(i,j,possible) == 0) {
                        // a contradiction has occured that made a cell unfillable
                        return false;
                    }
                }
            }
        }
        return true;
    }
    
    public static int countPossibleOptions(int row, int column, int[][][] possible) {
        int options = 0;
        
        for (int k = 0; k < 9; k++) {
            if (possible[row][column][k] == k+1) {
                options++;
            }
        }
        
        return options;
    }
    
    public static void setGameEqual(int game[][], int newGame[][]) {
        for (int i = 0; i < 9; i++) { // row number
            for (int j = 0; j < 9; j++) { // column number
                newGame[i][j] = game[i][j];
            }
	}
    }
    
    public static void setBoolEqual(boolean bool[][], boolean newBool[][]) {
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                newBool[i][j] = bool[i][j];
            }
        }
    }
    
    public static void setPossibleEqual(int possible[][][], int newPossible[][][]) {
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
		for (int k = 0; k < 9; k++) {
                    newPossible[i][j][k] = possible[i][j][k];
		}
            }
	}
    }
    
    public static void resetCloneGames(int cloneGames[][][]) {
        for (int[][] cloneGame : cloneGames) {
            for (int[] cloneGame1 : cloneGame) {
                Arrays.fill(cloneGame1, 0);
            }
        }
    }
    
    public static void resetAll() {
        solved = false;
        levelZeroChanges = 0;
        oneInARowChanges = 0;
        oneInAColumnChanges = 0;
        oneInAGroupChanges = 0;
        oneInACellChanges = 0;
        levelOneChanges = 0;
        phantomRowChanges = 0;
        phantomColumnChanges = 0;
        phantomGroupChanges = 0;
        hiddenPairRowChanges = 0;
        hiddenPairColumnChanges = 0;
        hiddenPairGroupChanges = 0;
        nakedPairRowChanges = 0;
        nakedPairColumnChanges = 0;
        nakedPairGroupChanges = 0;
        levelTwoChanges = 0;
        nakedTripleRowChanges = 0;
        nakedTripleColumnChanges = 0;
        nakedTripleGroupChanges = 0;
        hiddenTripleRowChanges = 0;
        hiddenTripleColumnChanges = 0;
        hiddenTripleGroupChanges = 0;
        nakedQuadRowChanges = 0;
        nakedQuadColumnChanges = 0;
        nakedQuadGroupChanges = 0;
        xWingRowChanges = 0;
        xWingColumnChanges = 0;
        yWingColumnGroupChanges = 0;
        yWingRowGroupChanges = 0;
        yWingRowColumnChanges = 0;
        levelThreeChanges = 0;
        guessAndCheckChanges = 0;
        bruteForceChanges = 0;

        totalChangeCount = 0;
        totalChangeType = new ArrayList(200);
        mainChangeCount = 0;
        possibleChangeCount = 0;
        mainChangePossibleCount = 0;
        possibleChangePossibleCount = 0;

        mainChangeMethod = new ArrayList(81);
        mainChangeDescription = new ArrayList(81);
        mainChangeNumber = new ArrayList(81);
        mainChangeRow = new ArrayList(81);
        mainChangeColumn = new ArrayList(81);

        mainChangePossibleOrder = new ArrayList(729);
        mainChangePossibleNumber = new ArrayList(729);
        mainChangePossibleRow = new ArrayList(729);
        mainChangePossibleColumn = new ArrayList(729);

        possibleChangeMethod = new ArrayList(200);
        possibleChangeDescription = new ArrayList(200);
        possibleChangeOrder = new ArrayList(200);
        possibleChangeNumber = new ArrayList(200);
        possibleChangeRow = new ArrayList(200);
        possibleChangeColumn = new ArrayList(200);
    }
    
    public static void saveTotalChangeTypeToCSV() {
        String filePath = "Puzzle_3_Results/totalChangeType.csv";
        
        try {
            // Create a FileWriter and a CSVWriter
            FileWriter fileWriter = new FileWriter(filePath);
            CSVWriter csvWriter = new CSVWriter(fileWriter);
            
            // Create a list to hold the data
            List<String[]> data = new ArrayList<>();
            
            // Iterate through the ArrayList and add index and value to the data list
            for (int i = 0; i < totalChangeType.size(); i++) {
                String[] rowData = {String.valueOf(i), String.valueOf(totalChangeType.get(i))};
                data.add(rowData);
            }
            
            // Write the data to the CSV file
            csvWriter.writeAll(data);
            
            // Close the CSVWriter
            csvWriter.close();
            
            System.out.println("Data written to " + filePath);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    public static void saveMainChangeNumberToCSV() {
        String filePath = "Puzzle_3_Results/mainChangeNumber.csv";
        
        try {
            // Create a FileWriter and a CSVWriter
            FileWriter fileWriter = new FileWriter(filePath);
            CSVWriter csvWriter = new CSVWriter(fileWriter);
            
            // Create a list to hold the data
            List<String[]> data = new ArrayList<>();
            
            // Iterate through the ArrayList and add index and value to the data list
            for (int i = 0; i < mainChangeNumber.size(); i++) {
                String[] rowData = {String.valueOf(i), String.valueOf(mainChangeNumber.get(i))};
                data.add(rowData);
            }
            
            // Write the data to the CSV file
            csvWriter.writeAll(data);
            
            // Close the CSVWriter
            csvWriter.close();
            
            System.out.println("Data written to " + filePath);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    public static void saveMainChangeRowToCSV() {
        String filePath = "Puzzle_3_Results/mainChangeRow.csv";
        
        try {
            // Create a FileWriter and a CSVWriter
            FileWriter fileWriter = new FileWriter(filePath);
            CSVWriter csvWriter = new CSVWriter(fileWriter);
            
            // Create a list to hold the data
            List<String[]> data = new ArrayList<>();
            
            // Iterate through the ArrayList and add index and value to the data list
            for (int i = 0; i < mainChangeRow.size(); i++) {
                String[] rowData = {String.valueOf(i), String.valueOf(mainChangeRow.get(i))};
                data.add(rowData);
            }
            
            // Write the data to the CSV file
            csvWriter.writeAll(data);
            
            // Close the CSVWriter
            csvWriter.close();
            
            System.out.println("Data written to " + filePath);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    public static void saveMainChangeColumnToCSV() {
        String filePath = "Puzzle_3_Results/mainChangeColumn.csv";
        
        try {
            // Create a FileWriter and a CSVWriter
            FileWriter fileWriter = new FileWriter(filePath);
            CSVWriter csvWriter = new CSVWriter(fileWriter);
            
            // Create a list to hold the data
            List<String[]> data = new ArrayList<>();
            
            // Iterate through the ArrayList and add index and value to the data list
            for (int i = 0; i < mainChangeColumn.size(); i++) {
                String[] rowData = {String.valueOf(i), String.valueOf(mainChangeColumn.get(i))};
                data.add(rowData);
            }
            
            // Write the data to the CSV file
            csvWriter.writeAll(data);
            
            // Close the CSVWriter
            csvWriter.close();
            
            System.out.println("Data written to " + filePath);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    public static void saveMainChangePossibleOrderToCSV() {
        String filePath = "Puzzle_3_Results/mainChangePossibleOrder.csv";
        
        try {
            // Create a FileWriter and a CSVWriter
            FileWriter fileWriter = new FileWriter(filePath);
            CSVWriter csvWriter = new CSVWriter(fileWriter);
            
            // Create a list to hold the data
            List<String[]> data = new ArrayList<>();
            
            // Iterate through the ArrayList and add index and value to the data list
            for (int i = 0; i < mainChangePossibleOrder.size(); i++) {
                String[] rowData = {String.valueOf(i), String.valueOf(mainChangePossibleOrder.get(i))};
                data.add(rowData);
            }
            
            // Write the data to the CSV file
            csvWriter.writeAll(data);
            
            // Close the CSVWriter
            csvWriter.close();
            
            System.out.println("Data written to " + filePath);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    public static void saveMainChangePossibleNumberToCSV() {
        String filePath = "Puzzle_3_Results/mainChangePossibleNumber.csv";
        
        try {
            // Create a FileWriter and a CSVWriter
            FileWriter fileWriter = new FileWriter(filePath);
            CSVWriter csvWriter = new CSVWriter(fileWriter);
            
            // Create a list to hold the data
            List<String[]> data = new ArrayList<>();
            
            // Iterate through the ArrayList and add index and value to the data list
            for (int i = 0; i < mainChangePossibleNumber.size(); i++) {
                String[] rowData = {String.valueOf(i), String.valueOf(mainChangePossibleNumber.get(i))};
                data.add(rowData);
            }
            
            // Write the data to the CSV file
            csvWriter.writeAll(data);
            
            // Close the CSVWriter
            csvWriter.close();
            
            System.out.println("Data written to " + filePath);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    public static void saveMainChangePossibleRowToCSV() {
        String filePath = "Puzzle_3_Results/mainChangePossibleRow.csv";
        
        try {
            // Create a FileWriter and a CSVWriter
            FileWriter fileWriter = new FileWriter(filePath);
            CSVWriter csvWriter = new CSVWriter(fileWriter);
            
            // Create a list to hold the data
            List<String[]> data = new ArrayList<>();
            
            // Iterate through the ArrayList and add index and value to the data list
            for (int i = 0; i < mainChangePossibleRow.size(); i++) {
                String[] rowData = {String.valueOf(i), String.valueOf(mainChangePossibleRow.get(i))};
                data.add(rowData);
            }
            
            // Write the data to the CSV file
            csvWriter.writeAll(data);
            
            // Close the CSVWriter
            csvWriter.close();
            
            System.out.println("Data written to " + filePath);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    public static void saveMainChangePossibleColumnToCSV() {
        String filePath = "Puzzle_3_Results/mainChangePossibleColumn.csv";
        
        try {
            // Create a FileWriter and a CSVWriter
            FileWriter fileWriter = new FileWriter(filePath);
            CSVWriter csvWriter = new CSVWriter(fileWriter);
            
            // Create a list to hold the data
            List<String[]> data = new ArrayList<>();
            
            // Iterate through the ArrayList and add index and value to the data list
            for (int i = 0; i < mainChangePossibleColumn.size(); i++) {
                String[] rowData = {String.valueOf(i), String.valueOf(mainChangePossibleColumn.get(i))};
                data.add(rowData);
            }
            
            // Write the data to the CSV file
            csvWriter.writeAll(data);
            
            // Close the CSVWriter
            csvWriter.close();
            
            System.out.println("Data written to " + filePath);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    public static void savePossibleChangeOrderToCSV() {
        String filePath = "Puzzle_3_Results/possibleChangeOrder.csv";
        
        try {
            // Create a FileWriter and a CSVWriter
            FileWriter fileWriter = new FileWriter(filePath);
            CSVWriter csvWriter = new CSVWriter(fileWriter);
            
            // Create a list to hold the data
            List<String[]> data = new ArrayList<>();
            
            // Iterate through the ArrayList and add index and value to the data list
            for (int i = 0; i < possibleChangeOrder.size(); i++) {
                String[] rowData = {String.valueOf(i), String.valueOf(possibleChangeOrder.get(i))};
                data.add(rowData);
            }
            
            // Write the data to the CSV file
            csvWriter.writeAll(data);
            
            // Close the CSVWriter
            csvWriter.close();
            
            System.out.println("Data written to " + filePath);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    public static void savePossibleChangeNumberToCSV() {
        String filePath = "Puzzle_3_Results/possibleChangeNumber.csv";
        
        try {
            // Create a FileWriter and a CSVWriter
            FileWriter fileWriter = new FileWriter(filePath);
            CSVWriter csvWriter = new CSVWriter(fileWriter);
            
            // Create a list to hold the data
            List<String[]> data = new ArrayList<>();
            
            // Iterate through the ArrayList and add index and value to the data list
            for (int i = 0; i < possibleChangeNumber.size(); i++) {
                String[] rowData = {String.valueOf(i), String.valueOf(possibleChangeNumber.get(i))};
                data.add(rowData);
            }
            
            // Write the data to the CSV file
            csvWriter.writeAll(data);
            
            // Close the CSVWriter
            csvWriter.close();
            
            System.out.println("Data written to " + filePath);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    public static void savePossibleChangeRowToCSV() {
        String filePath = "Puzzle_3_Results/possibleChangeRow.csv";
        
        try {
            // Create a FileWriter and a CSVWriter
            FileWriter fileWriter = new FileWriter(filePath);
            CSVWriter csvWriter = new CSVWriter(fileWriter);
            
            // Create a list to hold the data
            List<String[]> data = new ArrayList<>();
            
            // Iterate through the ArrayList and add index and value to the data list
            for (int i = 0; i < possibleChangeRow.size(); i++) {
                String[] rowData = {String.valueOf(i), String.valueOf(possibleChangeRow.get(i))};
                data.add(rowData);
            }
            
            // Write the data to the CSV file
            csvWriter.writeAll(data);
            
            // Close the CSVWriter
            csvWriter.close();
            
            System.out.println("Data written to " + filePath);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    public static void savePossibleChangeColumnToCSV() {
        String filePath = "Puzzle_3_Results/possibleChangeColumn.csv";
        
        try {
            // Create a FileWriter and a CSVWriter
            FileWriter fileWriter = new FileWriter(filePath);
            CSVWriter csvWriter = new CSVWriter(fileWriter);
            
            // Create a list to hold the data
            List<String[]> data = new ArrayList<>();
            
            // Iterate through the ArrayList and add index and value to the data list
            for (int i = 0; i < possibleChangeNumber.size(); i++) {
                String[] rowData = {String.valueOf(i), String.valueOf(possibleChangeColumn.get(i))};
                data.add(rowData);
            }
            
            // Write the data to the CSV file
            csvWriter.writeAll(data);
            
            // Close the CSVWriter
            csvWriter.close();
            
            System.out.println("Data written to " + filePath);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    public static void saveMainChangeLogToCSV() {
        String filePath = "Puzzle_3_Results/mainChangeLog.csv";
        
        try {
            // Create a FileWriter and a CSVWriter
            FileWriter fileWriter = new FileWriter(filePath);
            CSVWriter csvWriter = new CSVWriter(fileWriter);
            
            // Create a list to hold the data
            List<String[]> data = new ArrayList<>();
            
            // Iterate through the ArrayList and add index and value to the data list
            for (int i = 0; i < mainChangeMethod.size(); i++) {
                String[] rowData = {String.valueOf(i), (String) mainChangeMethod.get(i), (String) mainChangeDescription.get(i)};
                data.add(rowData);
            }
            
            // Write the data to the CSV file
            csvWriter.writeAll(data);
            
            // Close the CSVWriter
            csvWriter.close();
            
            System.out.println("Data written to " + filePath);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    public static void savePossibleChangeLogToCSV() {
        String filePath = "Puzzle_3_Results/possibleChangeLog.csv";
        
        try {
            // Create a FileWriter and a CSVWriter
            FileWriter fileWriter = new FileWriter(filePath);
            CSVWriter csvWriter = new CSVWriter(fileWriter);
            
            // Create a list to hold the data
            List<String[]> data = new ArrayList<>();
            
            // Iterate through the ArrayList and add index and value to the data list
            for (int i = 0; i < possibleChangeMethod.size(); i++) {
                String[] rowData = {String.valueOf(i), (String) possibleChangeMethod.get(i), (String) possibleChangeDescription.get(i)};
                data.add(rowData);
            }
            
            // Write the data to the CSV file
            csvWriter.writeAll(data);
            
            // Close the CSVWriter
            csvWriter.close();
            
            System.out.println("Data written to " + filePath);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
}

