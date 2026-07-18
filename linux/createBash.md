How to Create and Execute Bash scripts
Script naming conventions

By naming convention, bash scripts end with .sh. However, bash scripts can run perfectly fine without the sh extension.

Adding the Shebang :- #!/bin/bash

Bash scripts start with a shebang. Shebang is a combination of bash # and bang ! followed by the bash shell path. This is the first line of the script. Shebang tells the shell to execute it via bash shell. Shebang is simply an absolute path to the bash interpreter.

Below is an example of the shebang statement.

#!/bin/bash
You can find your bash shell path (which may vary from the above) using the command:

which bash
Creating your first bash script

Our first script prompts the user to enter a path. In return, its contents will be listed.

Create a file named run_all.sh using any editor of your choice.

vim run_all.sh
Add the following commands in your file and save it:

#!/bin/bash
echo "Today is " `date`

echo -e "\nenter the path to directory"
read the_path

echo -e "\n you path has the following files and folders: "
ls $the_path
Let's take a deeper look at the script line by line. I am displaying the same script again, but this time with line numbers.

1 #!/bin/bash
2 echo "Today is " `date`
3
4 echo -e "\nenter the path to directory"
5 read the_path
6
7 echo -e "\n you path has the following files and folders: "
8 ls $the_path
Line #1: The shebang (#!/bin/bash) points toward the bash shell path.

Line #2: The echo command displays the current date and time on the terminal. Note that the date is in backticks.

Line #4: We want the user to enter a valid path.

Line #5: The read command reads the input and stores it in the variable the_path.

line #8: The ls command takes the variable with the stored path and displays the current files and folders.

Executing the bash script

To make the script executable, assign execution rights to your user using this command:

chmod u+x run_all.sh
Here,

chmod modifies the ownership of a file for the current user :u.

+x adds the execution rights to the current user. This means that the user who is the owner can now run the script.

run_all.sh is the file we wish to run.

You can run the script using any of the mentioned methods:

sh run_all.sh

bash run_all.sh

./run_all.sh

Let's see it running in action 🚀

Running a bash script

6.5. Bash Scripting Basics
Comments in bash scripting
Comments start with a # in bash scripting. This means that any line that begins with a # is a comment and will be ignored by the interpreter.

Comments are very helpful in documenting the code, and it is a good practice to add them to help others understand the code.

These are examples of comments:

# This is an example comment

# Both of these lines will be ignored by the interpreter

Variables and data types in Bash
Variables let you store data. You can use variables to read, access, and manipulate data throughout your script.

There are no data types in Bash. In Bash, a variable is capable of storing numeric values, individual characters, or strings of characters.

In Bash, you can use and set the variable values in the following ways:

Assign the value directly:
country=Netherlands 2. Assign the value based on the output obtained from a program or command, using command substitution. Note that $ is required to access an existing variable's value.

same_country=$country
This assigns the value of country to the new variable same_country.

To access the variable value, append $ to the variable name.

country=Netherlands
echo $country

# output

Netherlands
new_country=$country
echo $new_country

# output

Netherlands
Above, you can see an example of assigning and printing variable values.

Variable naming conventions
In Bash scripting, the following are the variable naming conventions:

Variable names should start with a letter or an underscore (\_).

Variable names can contain letters, numbers, and underscores (\_).

Variable names are case-sensitive.

Variable names should not contain spaces or special characters.

Use descriptive names that reflect the purpose of the variable.

Avoid using reserved keywords, such as if, then, else, fi, and so on as variable names.

Here are some examples of valid variable names in Bash:

name
count
\_var
myVar
MY_VAR
And here are some examples of invalid variable names:

# invalid variable names

2ndvar (variable name starts with a number)
my var (variable name contains a space)
my-var (variable name contains a hyphen)
Following these naming conventions helps make Bash scripts more readable and easier to maintain.

Input and output in Bash scripts
Gathering input
In this section, we'll discuss some methods to provide input to our scripts.

Reading the user input and storing it in a variable
We can read the user input using the read command.

#!/bin/bash
echo "What's your name?"
read entered_name
echo -e "\nWelcome to bash tutorial" $entered_name
Reading the name from a script

2. Reading from a file

This code reads each line from a file named input.txt and prints it to the terminal. We'll study while loops later in this section.

while read line
do
echo $line
done < input.txt 3. Command line arguments

In a bash script or function, $1 denotes the initial argument passed, $2 denotes the second argument passed, and so forth.

This script takes a name as a command-line argument and prints a personalized greeting.

#!/bin/bash
echo "Hello, $1!"
We have supplied Zaira as our argument to the script.

Output:

Providing arguments to the bash script

Displaying output
Here we'll discuss some methods to receive output from the scripts.

Printing to the terminal:
echo "Hello, World!"
This prints the text "Hello, World!" to the terminal.

2. Writing to a file:

echo "This is some text." > output.txt
This writes the text "This is some text." to a file named output.txt. Note that the > operator overwrites a file if it already has some content.

3. Appending to a file:

echo "More text." >> output.txt
This appends the text "More text." to the end of the file output.txt.

4. Redirecting output:

ls > files.txt
This lists the files in the current directory and writes the output to a file named files.txt. You can redirect output of any command to a file this way.

You'll learn about output redirection in detail in section 8.5.

Conditional statements (if/else)
Expressions that produce a boolean result, either true or false, are called conditions. There are several ways to evaluate conditions, including if, if-else, if-elif-else, and nested conditionals.

Syntax:

if [[condition]];
then
statement
elif [[condition]]; then
statement
else
do this by default
fi
Syntax of bash conditional statements
We can use logical operators such as AND -a and OR -o to make comparisons that have more significance.

if [ $a -gt 60 -a $b -lt 100 ]
This statement checks if both conditions are true: a is greater than 60 AND b is less than 100.

Let's see an example of a Bash script that uses if, if-else, and if-elif-else statements to determine if a user-inputted number is positive, negative, or zero:

#!/bin/bash

# Script to determine if a number is positive, negative, or zero

echo "Please enter a number: "
read num

if [ $num -gt 0 ]; then
echo "$num is positive"
elif [ $num -lt 0 ]; then
  echo "$num is negative"
else
echo "$num is zero"
fi
The script first prompts the user to enter a number. Then, it uses an if statement to check if the number is greater than 0. If it is, the script outputs that the number is positive. If the number is not greater than 0, the script moves on to the next statement, which is an if-elif statement.

Here, the script checks if the number is less than 0. If it is, the script outputs that the number is negative.

Finally, if the number is neither greater than 0 nor less than 0, the script uses an else statement to output that the number is zero.

Seeing it in action 🚀

Checking if a number is even or odd

Looping and branching in Bash
While loop

While loops check for a condition and loop until the condition remains true. We need to provide a counter statement that increments the counter to control loop execution.

In the example below, (( i += 1 )) is the counter statement that increments the value of i. The loop will run exactly 10 times.

#!/bin/bash
i=1
while [[$i -le 10]] ; do
echo "$i"
(( i += 1 ))
done
Looping from 1 to 10 using

For loop

The for loop, just like the while loop, allows you to execute statements a specific number of times. Each loop differs in its syntax and usage.

In the example below, the loop will iterate 5 times.

#!/bin/bash

for i in {1..5}
do
echo $i
done
Looping from 1 to 10 using

Case statements

In Bash, case statements are used to compare a given value against a list of patterns and execute a block of code based on the first pattern that matches. The syntax for a case statement in Bash is as follows:

case expression in
pattern1) # code to execute if expression matches pattern1
;;
pattern2) # code to execute if expression matches pattern2
;;
pattern3) # code to execute if expression matches pattern3
;;
\*) # code to execute if none of the above patterns match expression
;;
esac
Here, "expression" is the value that we want to compare, and "pattern1", "pattern2", "pattern3", and so on are the patterns that we want to compare it against.

The double semicolon ";;" separates each block of code to execute for each pattern. The asterisk "\*" represents the default case, which executes if none of the specified patterns match the expression.

Let's see an example:

fruit="apple"

case $fruit in
"apple")
echo "This is a red fruit."
;;
"banana")
echo "This is a yellow fruit."
;;
"orange")
echo "This is an orange fruit."
;;
\*)
echo "Unknown fruit."
;;
esac
In this example, since the value of fruit is apple, the first pattern matches, and the block of code that echoes This is a red fruit. is executed. If the value of fruit were instead banana, the second pattern would match and the block of code that echoes This is a yellow fruit. would execute, and so on.

If the value of fruit does not match any of the specified patterns, the default case is executed, which echoes Unknown fruit.
