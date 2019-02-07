import readlineSync from 'readline-sync';

const question = () => {
  const userName = readlineSync.question('May I have your name? ');
  const str = `Hello ${userName}!`;
  console.log(str);
};
export default question;
