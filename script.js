// Author: Deepak Chauhan
// Date: 09th November 2020
// GitHub: https://Github.com/royaleagle73
// Reddit: u/RoyalEagle73
// Linkedin: https://www.linkedin.com/in/deepakchauhan878

// How To use:
// 1) Enter the list of subreddits in main function
// 2) Copy the code in console of your browser
// 3) Sit back and enjoy, mass subscribe go brrrrrr....

//Enter the list of subreddits here, I've added some for example  
var subreddits = ["3amjokes", "AdviceAnimals"];
var subscribed = [];

function findSubreddits() {
    return new Promise((resolve,reject)=>{
        var newwindow = window.open("https://www.reddit.com/subreddits/mine");
        newwindow.onload = ()=>{
            var listOfSubreddits = newwindow.document.getElementsByClassName("fancy-toggle-button subscribe-button toggle");
            for (i = 0; i < listOfSubreddits.length; i++) {
                subscribed.push(listOfSubreddits[i].getAttribute("data-sr_name"));
            }
            newwindow.close();
            resolve();
        }
    }
    );
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function work(subreddit){
    return new Promise((resolve,reject) => {
        var newwindow = window.open("https://reddit.com/r/"+subreddit)
        newwindow.onload = async function(){
          var buttons = newwindow.document.getElementsByClassName("_3VgTjAJVNNV7jzlnwY-OFY _2ilDLNSvkCHD3Cs9duy9Q_ _2ilDLNSvkCHD3Cs9duy9Q_ _2JBsHFobuapzGwpHQjrDlD ")
          if(buttons.length>0 && buttons[0].parentElement.className == "_1Q_zPN5YtTLQVG72WhRuf3"){
              buttons[0].click();
              await sleep(100).then(()=>{newwindow.close()});
          }
        newwindow.close();
        resolve();
    }
  })
}

async function main() {
    await findSubreddits().then(()=>{
        subreddits = subreddits.filter(a => !subscribed.includes(a))
        console.log("Found " + subreddits.length + " unique subreddits which are not subscribed")
       }
    );
    for(i=0; i<subreddits.length; i++){
        await work(subreddits[i]).then(()=>{console.log("susbcribed " + subreddits[i])});
    }
    alert("Followed " + subreddits.length + " unique subreddits")
}

main();
