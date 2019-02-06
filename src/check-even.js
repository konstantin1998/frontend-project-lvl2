import readlineSync from 'readline-sync';
const even = () =>{
	const userName = readlineSync.question('May I have your name? ');
    console.log('Hello ' + userName + '!');
	let a = 0;
    while (a > 3){
    	let b = Math.floor(Math.random() * 100) + 1;
        console.log('Question: ' + b);
        let answer = readlineSync.question('Your answer: ');
        if( (b % 2) == 0 && answer == 'yes'){
        	a = a + 1;
            console.log('Correct');
        }
        else{
        	console.log('no is wrong answer ;(. Correct answer was 'yes'.)');
            console.log("Let's try again, " + userName)
        }
        if((b % 2) == 1 && answer == 'no'){
        	a = a + 1;
            console.log('Correct');
        }
        else{
        	console.log('yes is wrong answer ;(. Correct answer was 'no'.)');
            console.log("Let's try again, " + userName)
        }
    }
    console.log('Congratulations, ' + userName + '!');
}
export {even};
