import readlineSync from 'readline-sync';

const times = 3;
const isEven = num => (((num % 2) === 0) ? 'yes' : 'no');
const even = () => {
  console.log('Welcome to the Brain Games!');
  console.log('Answer "yes" if number even otherwise answer "no".');
  console.log('\n');
  const userName = readlineSync.question('May I have your name? ');
  const hello = `Hello,  ${userName}!`;
  console.log(hello);
  console.log('\n');
  for (let i = 0; i < times; i += 1) {
    const question = Math.floor(Math.random() * 100) + 1;
    console.log(`Question: ${question}`);
    const answer = readlineSync.question('Your answer: ');
    const trueAnswer = isEven(question);
    if (trueAnswer === answer) {
      console.log('Correct');
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

export default even;
