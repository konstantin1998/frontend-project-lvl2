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
  const times = 3;
  while (a < times) {
    const arg1 = Math.floor(Math.random() * 20) + 1;
    const num = Math.floor(Math.random() * 3);
    const arg2 = Math.floor(Math.random() * 20) + 1;
    let result = 0;
    let operation = ' ';
    if (num === 0) {
      result = arg1 + arg2;
      operation = '+';
    } else if (num === 1) {
      result = arg1 * arg2;
      operation = '*';
    } else {
      result = arg1 - arg2;
      operation = '-';
    }
    const corrAnswer = String(result);
    const Question = `Question: ${arg1} ${operation} ${arg2}`;
    console.log(Question);
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
  const message = `Congratulations, ${userName}!`;
  console.log(message);
};
export default brainCalc;
