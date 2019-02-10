import readlineSync from 'readline-sync';
import { cons, car, cdr } from 'hexlet-pairs';

const times = 3;
const value = (pair) => {
  const arg1 = car(cdr(pair));
  const arg2 = cdr(cdr(pair));
  const num = car(pair);
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
  const expression = `${arg1} ${operation} ${arg2}`;
  return cons(corrAnswer, expression);
};
const brainCalc = () => {
  console.log('Welcome to the Brain Games!');
  console.log('What is the result of the expression?');
  console.log('\n');
  const userName = readlineSync.question('May I have your name? ');
  const hello = `Hello,  ${userName}!`;
  console.log(hello);
  console.log('\n');
  let success = true;
  for (let i = 0; i < times; i += 1) {
    const arg1 = Math.floor(Math.random() * 20) + 1;
    const randomNum = Math.floor(Math.random() * 3);
    const arg2 = Math.floor(Math.random() * 20) + 1;
    const argPair = cons(arg1, arg2);
    const pair = cons(randomNum, argPair);
    const corrAnswer = car(value(pair));
    const expression = cdr(value(pair));
    console.log(`Question: ${expression}`);
    const answer = readlineSync.question('Your answer: ');
    if (answer === corrAnswer) {
      console.log('Correct');
    } else {
      console.log(`${answer} is wrong answer ;(. Correct answer was ${corrAnswer}.`);
      const str = `Let's try again,  ${userName}!`;
      console.log(str);
      success = false;
      break;
    }
  }

  if (success) {
    const message = `Congratulations, ${userName}!`;
    console.log(message);
  }
};

export default brainCalc;
