import readlineSync from 'readline-sync';
export default  question = () =>{
  const userName = readlineSync.question('May I have your name? ');
  console.log('Hello ' + userName + '!');
  
}

