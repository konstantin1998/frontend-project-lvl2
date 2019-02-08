import readlineSync from 'readline-sync';

const brainCalc = () => {
  console.log('Welcome to the Brain Games!');
  console.log('What is the result of the expression?');
  console.log('\n');
  const userName = readlineSync.question('May I have your name? ');
  const hello = `Hello,  ${userName}!`;
  console.log(hello);
  console.log('\n');
  let a = 0;
  while (a < 3) {
    const arg1 = Math.floor(Math.random() * 20) + 1;
    const oper = Math.floor(Math.random() * 3);
    const arg2 = Math.floor(Math.random() * 20) + 1;
    let result = 0;
    let operation = ' ';
    if (oper === 0) {
      result = arg1 + arg2;
      operation = '+';
    } else if (oper === 1) {
      result = arg1 * arg2;
      operation = '*';
    } else {
      result = arg1 - arg2;
      operation = '-';
    }
    const corrAnswer = String(result);
    const str1 = `Question: ${arg1} ${operation} ${arg2}`;
    console.log(str1);
    const answer = readlineSync.question('Your answer: ');
    if (answer === corrAnswer) {
      a += 1;
      console.log('Correct');
    } else {
      console.log(`${answer} is wrong answer ;(. Correct answer was ${corrAnswer}.`);
      const str = `Let's try again,  ${userName}!`;
      console.log(str);
    }
  }
  const str2 = `Congratulations, ${userName}!`;
  console.log(str2);
};
export default brainCalc;
