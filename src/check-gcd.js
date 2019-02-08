import readlineSync from 'readline-sync';

const gcd = () => {
  console.log('Welcome to the Brain Games!');
  console.log('What is the result of the expression?');
  console.log('\n');
  const userName = readlineSync.question('May I have your name? ');
  const hello = `Hello,  ${userName}!`;
  console.log(hello);
  console.log('\n');
  const a = 0;
  const times = 3;
  while (a < times) {
    const num1 = Math.floor(Math.random() * 100) + 1;
    const num2 = Math.floor(Math.random() * 100) + 1;
    const Question = `Question: ${num1} ${num2}`;
    console.log(Question);
    const answer = readlineSync.question('Your answer: ');
    let min = 0;
    let max = 0;
    let trueAnswer = 0;
    if (num1 < num2) {
      min = num1;
      max = num2;
    } else {
      min = num2;
      max = num1;
    }
    if ((max % min === 0) || min === 1) {
      trueAnswer = min;
    }
    for (let i = 0; i <= min / 2; i += 1) {
      if ((max % i) === 0 && (min % i) === 0 && i > trueAnswer) {
        trueAnswer = i;
      }
    }
    if (answer === trueAnswer) {
      const word = 'Correct!';
      console.log(word);
    } else {
      const message = `${answer} is wrong answer ;(. Correct answer was ${trueAnswer}`;
      const str = `Let's try again,  ${userName}!`;
      console.log(message);
      console.log(str);
    }
  }
  const words = `Congratulations, ${userName}!`;
  console.log(words);
};
export default gcd;
