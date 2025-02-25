package com.sudokusolver.model;

import java.util.List;

public class SolveMetrics {
    private int levelZeroChanges;
    private int oneInARowChanges;
    private int oneInAColumnChanges;
    private int oneInAGroupChanges;
    private int oneInACellChanges;
    private int levelOneChanges;
    private int phantomRowChanges;
    private int phantomColumnChanges;
    private int phantomGroupChanges;
    private int hiddenPairRowChanges;
    private int hiddenPairColumnChanges;
    private int hiddenPairGroupChanges;
    private int nakedPairRowChanges;
    private int nakedPairColumnChanges;
    private int nakedPairGroupChanges;
    private int levelTwoChanges;
    private int nakedTripleRowChanges;
    private int nakedTripleColumnChanges;
    private int nakedTripleGroupChanges;
    private int hiddenTripleRowChanges;
    private int hiddenTripleColumnChanges;
    private int hiddenTripleGroupChanges;
    private int nakedQuadRowChanges;
    private int nakedQuadColumnChanges;
    private int nakedQuadGroupChanges;
    private int xWingRowChanges;
    private int xWingColumnChanges;
    private int yWingColumnGroupChanges;
    private int yWingRowGroupChanges;
    private int yWingRowColumnChanges; 
    private int levelThreeChanges;
    private int guessAndCheckChanges;
    private int bruteForceChanges;
    private int totalChangeCount;
    private List<String> totalChangeType;
    private int mainChangeCount;
    private int possibleChangeCount;
    private int mainChangePossibleCount;
    private int possibleChangePossibleCount;
    private List<String> mainChangeMethod;
    private List<String> mainChangeDescription;
    private List<String> mainChangeNumber;
    private List<Integer> mainChangeRow;
    private List<Integer> mainChangeColumn;
    private List<Integer> mainChangePossibleOrder;
    private List<Integer> mainChangePossibleNumber;
    private List<Integer> mainChangePossibleRow;
    private List<Integer> mainChangePossibleColumn;
    private List<String> possibleChangeMethod;
    private List<String> possibleChangeDescription;
    private List<Integer> possibleChangeOrder;
    private List<Integer> possibleChangeNumber;
    private List<Integer> possibleChangeRow;
    private List<Integer> possibleChangeColumn;

    public SolveMetrics(
            int levelZeroChanges,
            int oneInARowChanges,
            int oneInAColumnChanges,
            int oneInAGroupChanges,
            int oneInACellChanges,
            int levelOneChanges,
            int phantomRowChanges,
            int phantomColumnChanges,
            int phantomGroupChanges,
            int hiddenPairRowChanges,
            int hiddenPairColumnChanges,
            int hiddenPairGroupChanges,
            int nakedPairRowChanges,
            int nakedPairColumnChanges,
            int nakedPairGroupChanges,
            int levelTwoChanges,
            int nakedTripleRowChanges,
            int nakedTripleColumnChanges,
            int nakedTripleGroupChanges,
            int hiddenTripleRowChanges,
            int hiddenTripleColumnChanges,
            int hiddenTripleGroupChanges,
            int nakedQuadRowChanges,
            int nakedQuadColumnChanges,
            int nakedQuadGroupChanges,
            int xWingRowChanges,
            int xWingColumnChanges,
            int yWingColumnGroupChanges,
            int yWingRowGroupChanges,
            int yWingRowColumnChanges,
            int levelThreeChanges,
            int guessAndCheckChanges,
            int bruteForceChanges,
            int totalChangeCount,
            List<String> totalChangeType,
            int mainChangeCount,
            int possibleChangeCount,
            int mainChangePossibleCount,
            int possibleChangePossibleCount,
            List<String> mainChangeMethod,
            List<String> mainChangeDescription,
            List<String> mainChangeNumber,
            List<Integer> mainChangeRow,
            List<Integer> mainChangeColumn,
            List<Integer> mainChangePossibleOrder,
            List<Integer> mainChangePossibleNumber,
            List<Integer> mainChangePossibleRow,
            List<Integer> mainChangePossibleColumn,
            List<String> possibleChangeMethod,
            List<String> possibleChangeDescription,
            List<Integer> possibleChangeOrder,
            List<Integer> possibleChangeNumber,
            List<Integer> possibleChangeRow,
            List<Integer> possibleChangeColumn) {
        this.levelZeroChanges = levelZeroChanges;
        this.oneInARowChanges = oneInARowChanges;
        this.oneInAColumnChanges = oneInAColumnChanges;
        this.oneInAGroupChanges = oneInAGroupChanges;
        this.oneInACellChanges = oneInACellChanges;
        this.levelOneChanges = levelOneChanges;
        this.phantomRowChanges = phantomRowChanges;
        this.phantomColumnChanges = phantomColumnChanges;
        this.phantomGroupChanges = phantomGroupChanges;
        this.hiddenPairRowChanges = hiddenPairRowChanges;
        this.hiddenPairColumnChanges = hiddenPairColumnChanges;
        this.hiddenPairGroupChanges = hiddenPairGroupChanges;
        this.nakedPairRowChanges = nakedPairRowChanges;
        this.nakedPairColumnChanges = nakedPairColumnChanges;
        this.nakedPairGroupChanges = nakedPairGroupChanges;
        this.levelTwoChanges = levelTwoChanges;
        this.nakedTripleRowChanges = nakedTripleRowChanges;
        this.nakedTripleColumnChanges = nakedTripleColumnChanges;
        this.nakedTripleGroupChanges = nakedTripleGroupChanges;
        this.hiddenTripleRowChanges = hiddenTripleRowChanges;
        this.hiddenTripleColumnChanges = hiddenTripleColumnChanges;
        this.hiddenTripleGroupChanges = hiddenTripleGroupChanges;
        this.nakedQuadRowChanges = nakedQuadRowChanges;
        this.nakedQuadColumnChanges = nakedQuadColumnChanges;
        this.nakedQuadGroupChanges = nakedQuadGroupChanges;
        this.xWingRowChanges = xWingRowChanges;
        this.xWingColumnChanges = xWingColumnChanges;
        this.yWingColumnGroupChanges = yWingColumnGroupChanges;
        this.yWingRowGroupChanges = yWingRowGroupChanges;
        this.yWingRowColumnChanges = yWingRowColumnChanges;
        this.levelThreeChanges = levelThreeChanges;
        this.guessAndCheckChanges = guessAndCheckChanges;
        this.bruteForceChanges = bruteForceChanges;
        this.totalChangeCount = totalChangeCount;
        this.totalChangeType = totalChangeType;
        this.mainChangeCount = mainChangeCount;
        this.possibleChangeCount = possibleChangeCount;
        this.mainChangePossibleCount = mainChangePossibleCount;
        this.possibleChangePossibleCount = possibleChangePossibleCount;
        this.mainChangeMethod = mainChangeMethod;
        this.mainChangeDescription = mainChangeDescription;
        this.mainChangeNumber = mainChangeNumber;
        this.mainChangeRow = mainChangeRow;
        this.mainChangeColumn = mainChangeColumn;
        this.mainChangePossibleOrder = mainChangePossibleOrder;
        this.mainChangePossibleNumber = mainChangePossibleNumber;
        this.mainChangePossibleRow = mainChangePossibleRow;
        this.mainChangePossibleColumn = mainChangePossibleColumn;
        this.possibleChangeMethod = possibleChangeMethod;
        this.possibleChangeDescription = possibleChangeDescription;
        this.possibleChangeOrder = possibleChangeOrder;
        this.possibleChangeNumber = possibleChangeNumber;
        this.possibleChangeRow = possibleChangeRow;
        this.possibleChangeColumn = possibleChangeColumn;
    }

    // Getters
    public int getLevelZeroChanges() { return levelZeroChanges; }
    public int getOneInARowChanges() { return oneInARowChanges; }
    public int getOneInAColumnChanges() { return oneInAColumnChanges; }
    public int getOneInAGroupChanges() { return oneInAGroupChanges; }
    public int getOneInACellChanges() { return oneInACellChanges; }
    public int getLevelOneChanges() { return levelOneChanges; }
    public int getPhantomRowChanges() { return phantomRowChanges; }
    public int getPhantomColumnChanges() { return phantomColumnChanges; }
    public int getPhantomGroupChanges() { return phantomGroupChanges; }
    public int getHiddenPairRowChanges() { return hiddenPairRowChanges; }
    public int getHiddenPairColumnChanges() { return hiddenPairColumnChanges; }
    public int getHiddenPairGroupChanges() { return hiddenPairGroupChanges; }
    public int getNakedPairRowChanges() { return nakedPairRowChanges; }
    public int getNakedPairColumnChanges() { return nakedPairColumnChanges; }
    public int getNakedPairGroupChanges() { return nakedPairGroupChanges; }
    public int getLevelTwoChanges() { return levelTwoChanges; }
    public int getNakedTripleRowChanges() { return nakedTripleRowChanges; }
    public int getNakedTripleColumnChanges() { return nakedTripleColumnChanges; }
    public int getNakedTripleGroupChanges() { return nakedTripleGroupChanges; }
    public int getHiddenTripleRowChanges() { return hiddenTripleRowChanges; }
    public int getHiddenTripleColumnChanges() { return hiddenTripleColumnChanges; }
    public int getHiddenTripleGroupChanges() { return hiddenTripleGroupChanges; }
    public int getNakedQuadRowChanges() { return nakedQuadRowChanges; }
    public int getNakedQuadColumnChanges() { return nakedQuadColumnChanges; }
    public int getNakedQuadGroupChanges() { return nakedQuadGroupChanges; }
    public int getXWingRowChanges() { return xWingRowChanges; }
    public int getXWingColumnChanges() { return xWingColumnChanges; }
    public int getYWingColumnGroupChanges() { return yWingColumnGroupChanges; }
    public int getYWingRowGroupChanges() { return yWingRowGroupChanges; }
    public int getYWingRowColumnChanges() { return yWingRowColumnChanges; }
    public int getLevelThreeChanges() { return levelThreeChanges; }
    public int getGuessAndCheckChanges() { return guessAndCheckChanges; }
    public int getBruteForceChanges() { return bruteForceChanges; }
    public int getTotalChangeCount() { return totalChangeCount; }
    public List<String> getTotalChangeType() { return totalChangeType; }
    public int getMainChangeCount() { return mainChangeCount; }
    public int getPossibleChangeCount() { return possibleChangeCount; }
    public int getMainChangePossibleCount() { return mainChangePossibleCount; }
    public int getPossibleChangePossibleCount() { return possibleChangePossibleCount; }
    public List<String> getMainChangeMethod() { return mainChangeMethod; }
    public List<String> getMainChangeDescription() { return mainChangeDescription; }
    public List<String> getMainChangeNumber() { return mainChangeNumber; }
    public List<Integer> getMainChangeRow() { return mainChangeRow; }
    public List<Integer> getMainChangeColumn() { return mainChangeColumn; }
    public List<Integer> getMainChangePossibleOrder() { return mainChangePossibleOrder; }
    public List<Integer> getMainChangePossibleNumber() { return mainChangePossibleNumber; }
    public List<Integer> getMainChangePossibleRow() { return mainChangePossibleRow; }
    public List<Integer> getMainChangePossibleColumn() { return mainChangePossibleColumn; }
    public List<String> getPossibleChangeMethod() { return possibleChangeMethod; }
    public List<String> getPossibleChangeDescription() { return possibleChangeDescription; }
    public List<Integer> getPossibleChangeOrder() { return possibleChangeOrder; }
    public List<Integer> getPossibleChangeNumber() { return possibleChangeNumber; }
    public List<Integer> getPossibleChangeRow() { return possibleChangeRow; }
    public List<Integer> getPossibleChangeColumn() { return possibleChangeColumn; }
} 
