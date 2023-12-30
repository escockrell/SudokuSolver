# SudokuSolver
An easy-to-use Java program that will solve any valid Sudoku puzzle and walk you through the steps taken to solve it

### Description
This program, once launched, accepts a Sudoku puzzle from the user. If the puzzle is valid, clicking the "Solve Puzzle" button will solve the puzzle. Once the puzzle is solved, a pop-up will show display how many level zero, one, two, and/or three methods changes were found. Each level of solve methods gets increasingly more difficult, with level zero being the easier and three being the hardest. The solved puzzle will be displayed on the main tab. A more detailed breakdown of which specific solve methods were used will be displayed on the results tab. The changes tab will walk through each change using the 'Next', 'Previou', and 'Reset' buttons. Each change had a description and will highlight the cells that were affected. Pencilmarks displaying all possible options for unsolved cells will be displayed as well.

### Installation and Usage

Follow these steps to install and use the SudokuSolver program:

1. **Download the Repository:**
   - Clone the repository to your local machine using the following command:
     ```bash
     git clone https://github.com/escockrell/SudokuSolver.git
     ```
   - Alternatively, download the repository as a ZIP file and extract it to your preferred location

2. **Navigate to the 'dist' Directory:**
   - Open a terminal or command prompt
   - Change to the `dist` directory within the project folder:
     ```bash
     cd path/to/SudokuSolver/dist
     ```

3. **Run the SudokuSolver Program:**
   - Make sure you have Java installed on your system. If you don't, refer to the [Oracle website](https://www.oracle.com/java/technologies/downloads/)
   - Execute the following command to run the SudokuSolver program:
     ```bash
     java -jar SudokuSolver.jar
     ```

4. **Provide Input:**
   - To solve a specific Sudoku puzzle, use the input options provided in the GUI to enter the initial puzzle configuration
     - To enter digits into the grid, click on a cell and use either the number keys on the keyboard or the number buttons at the bottom of the page
     - To move around the grid, you can click each cell or use WASD, the arrow keys, or tab
     - To delete digits, select the cell and press either backspace or delete. You can also press the "Reset" button to delete all digits

5. **View Results:**
   - Click the "Solve Puzzle" button to let the program solve the Sudoku puzzle
   - The solved puzzle will be displayed on the main tab
   - A detailed breakdown of which solve methods were used and how many times they were used is provided on the results tab
   - The changes tab will display the starting puzzle along with the pencilmark options that each unsolved cell can be. Pressing the "Next" button will display the next change that the program made. This includes highlighting the affected cells and providing a description of the change at the bottom of the page. Use the "Previous" button to go back to the previous change and the "Reset" button to go back to the beginning

6. **Enter a New Puzzle**
    - If you would like to solve another puzzle, press the "Restart" button on the main tab. This will reset the entire program and allow you to enter and solve a new puzzle

7. **Exit the Program:**
   - Once you are done solving your puzzle(s), close the SudokuSolver program

Now you should have the SudokuSolver program up and running on your machine, ready to solve Sudoku puzzles. If you encounter any issues or have questions, feel free to reach out to me by opening an issue on this GitHub repository
