import readlineSync from 'readline-sync';

const even = () => {
  console.log('Welcome to the Brain Games!');
  console.log('Answer "yes" if number even otherwise answer "no".');
  console.log('\n');
  const userName = readlineSync.question('May I have your name? ');
  const hello = `Hello,  ${userName}!`;
  console.log(hello);
  console.log('\n');
  let a = 0;
  const times = 3;
  while (a < times) {
    const num = Math.floor(Math.random() * 100) + 1;
    const Question = `Question: ${num}`;
    console.log(Question);
    const answer = readlineSync.question('Your answer: ');
    let trueAnswer = ' ';
    if ((num % 2) === 0) {
      trueAnswer = 'yes';
    } else {
      trueAnswer = 'no';
    }
    if (trueAnswer === answer) {
      a += 1;
      console.log('Correct');
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
export default even;
