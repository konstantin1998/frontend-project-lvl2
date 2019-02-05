import readlineSync from 'readline-sync';
export default const ques = () =>{
  const userName = readlineSync.question('May I have your name? ');
  console.log('Hello ' + userName + '!');
  
}

