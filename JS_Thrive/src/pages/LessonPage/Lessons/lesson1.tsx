import { useState } from 'react';
import LessonNavigator from '../../../components/LessonNavigator';
import Icon from '../../../resources/htmlUnderstanding.jpeg'
import './Lessons.css';
import ExploreIcon from '@mui/icons-material/Explore';
import JsEditor3 from '../../../components/codeEditor/JsEditor2';

const defaultCode = `alert("JS IS AWESOME")`;

// const verifyCode = (code: string) => {
//   return code === 'alert("JS IS AWESOME")';
// };

function Lesson1() {

  
  const [currentLesson, setCurrentLesson] = useState(1);
  const totalLessons = 9; 
  const handleNextLesson = () => {
    setCurrentLesson(prevLesson => prevLesson + 1);
  };

  const handlePreviousLesson = () => {
    setCurrentLesson(prevLesson => prevLesson - 1);
  };

  return (
    <div className='main-con'>

        <div className='lesson-nav'>
        <ul>
        <h2 style={{ display: 'flex', alignItems: 'center',gap:'10px' }}>Lesson Navigator {" "}<ExploreIcon sx={{color:'#32908F',fontSize:'28px'}}/></h2>
          <br />
          <li>  <a href="#JavaScript?">JavaScript?</a> </li>
          <li>  <a href="#Figure">Visual Understanding - JS</a> </li>
          <li>  <a href="#Coding Station - Alert">Runnn</a> </li>
        </ul>
      </div>
    <div className="lesson-container">
     
      <div className='inner-con'>
      <h1 className="lesson-title">Chronicles of JavaScript</h1>
      <div className="lesson-content">
        <section id="JavaScript?" className="lesson-section">
        Once upon a time, there was a magical land called the Internet. 
        In this land, there lived a friendly wizard named JavaScript. 
        Now, JavaScript was not your ordinary wizard - instead of casting spells with wands, 
        it used special words and commands to make things happen on web pages.
<br />
<br />
        Now, let's imagine JavaScript as a friendly helper who understands different types of things. 
        For example, it knows about numbers, like how many candies you have, or strings, 
        which are like words or sentences you can write. It even knows about true or false statements, 
        just like answering "yes" or "no" to questions.
<br />
<br />
        But wait, there's more! JavaScript can also gather lots of things together,
        just like collecting toys in a box. These collections are called arrays. 
        And if you want to describe something in more detail, JavaScript can create objects, 
        which are like little treasure chests holding lots of information.
<br />        
<br />        
        Now, imagine you have a special notebook where you can write down things you want to remember. 
        This notebook is like a variable in JavaScript. You can write down the number of candies you have, 
        the words to a song, or even if it's sunny outside.
        <br />
        <br />
        So, JavaScript is like a friendly wizard that helps you create amazing things on the Internet 
        by understanding different types of things, collecting them together, 
        and remembering them in special notebooks. With JavaScript by your side, you can bring 
        your ideas to life and make the Internet a more magical place!
<br />
        </section>
        <div id="Figure" className='figure'>
        <img  src={Icon} width='450px' alt="Icon" />
        <h2  className='lesson-title'>Basically, JS is like Human Brain that Controls the Whole Body (HTML) </h2>
        </div>
        <br />
        <br />
        <section id='Coding Station - Alert'>
        Now, Imagine yourself at your coding station, 
        ready to bring your ideas to life. There's a special button called "Run it" waiting for your touch. 
        Clicking it unleashes the magic of your code, making it come alive on your screen. 
        And guess what? A alert pops up to Visualize the code that you typed at your coding station! So, go ahead, 
        click <strong>Run it</strong> and witness!
        </section>
        <div className='editor-container'>
       <JsEditor3 defaultCode={defaultCode}  onExecute={(code) => {
         try {
           eval(code); 
          } catch (error) { 
            console.error('Error executing code:', error);
          }}}/>
          </div>
          <section>
          The Friendly Wizard is going to introduce fundamental programming concepts such as variables,
           data types, conditionals, loops, functions, and objects.
          </section>
      </div>
      
          <h1>Ready to Thrive?</h1>
      <LessonNavigator
        currentLesson={currentLesson}
        totalLessons={totalLessons}
        onNextLesson={handleNextLesson}
        onPreviousLesson={handlePreviousLesson}
      />
    </div>
    </div>
    </div>
  );
}

export default Lesson1;
