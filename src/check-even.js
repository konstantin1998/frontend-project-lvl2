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
  while (a < 3) {
    const b = Math.floor(Math.random() * 100) + 1;
    const str1 = `Question: ${b}`;
    console.log(str1);
    const answer = readlineSync.question('Your answer: ');
    if ((b % 2) === 0 && answer === 'yes') {
      a += 1;
      console.log('Correct');
    }
    if ((b % 2) === 1 && answer === 'no') {
      a += 1;
      console.log('Correct');
    }
    if ((b % 2) === 0 && answer === 'no') {
      console.log('no is wrong answer ;(. Correct answer was "yes".)');
      const str = `Let's try again,  ${userName}!`;
      console.log(str);
    }
    if ((b % 2) === 1 && answer === 'yes') {
      console.log('yes is wrong answer ;(. Correct answer was "no".)');
      const str = `Let's try again,  ${userName}!`;
      console.log(str);
    }
  }
  const str2 = `Congratulations, ${userName}!`;
  console.log(str2);
};
export default even;
