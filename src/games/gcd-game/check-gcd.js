import readlineSync from 'readline-sync';

const gcdCount = (num1, num2) => {
  let min = 0;
  let max = 0;
  let result = 0;
  if (num1 < num2) {
    min = num1;
    max = num2;
  } else {
    min = num2;
    max = num1;
  }
  if ((max % min === 0) || min === 1) {
    result = min;
  }
  for (let i = 0; i <= min / 2; i += 1) {
    if ((max % i) === 0 && (min % i) === 0 && i > result) {
      result = i;
    }
  }
  return String(result);
};
const times = 3;
const gcd = () => {
  console.log('Welcome to the Brain Games!');
  console.log('What is the result of the expression?');
  console.log('\n');
  const userName = readlineSync.question('May I have your name? ');
  const hello = `Hello,  ${userName}!`;
  console.log(hello);
  console.log('\n');
  for (let i = 0; i < times; i += 1) {
    const randomNum1 = Math.floor(Math.random() * 100) + 1;
    const randomNum2 = Math.floor(Math.random() * 100) + 1;
    console.log(`Question: ${randomNum1} ${randomNum2}`);
    const answer = readlineSync.question('Your answer: ');
    const trueAnswer = gcdCount(randomNum1, randomNum2);
    if (answer === trueAnswer) {
      const word = 'Correct!';
      console.log(word);
    } else {
      const message = `${answer} is wrong answer ;(. Correct answer was ${trueAnswer}`;
      const str = `Let's try again,  ${userName}!`;
      console.log(message);
      console.log(str);
      return;
    }
  }
  const words = `Congratulations, ${userName}!`;
  console.log(words);
};
export default gcd;
