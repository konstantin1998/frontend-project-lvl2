import readlineSync from 'readline-sync';
const  question = () =>{
  const userName = readlineSync.question('May I have your name? ');
  console.log('Hello ' + userName + '!');
  
}
export default question;
