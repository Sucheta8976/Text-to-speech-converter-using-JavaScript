const textarea = document.querySelector("textarea"),
voiceList = document.querySelector("select"),
speechBtn = document.querySelector("button");

let synth = speechSynthesis;
isspeaking = true;

voices();

function voices(){
    for(let voice of synth.getVoices()){
        //Selecting "Google US english" voice as default
        let selected = voice.name === "Google US English" ? "selected" : "";
        //Creating an option tag with passing voice name and voice language
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend", option); // Inserting option tag beforeend of select tag

    }
}

synth.addEventListener("voiceschanged",voices);

function textToSpeech(text){
    let utternance = new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()){
    //If the available device voice name is equal to the user selected voice name then set the speech voice to the user selected voice
        if(voice.name === voiceList.value){
            utternance.voice = voice;
        }
    }
    synth.speak(utternance); //speak the speech/utternance
}

speechBtn.addEventListener("click", e =>{
    e.preventDefault();
    if(textarea.value !== ""){
        if(!synth.speaking){ //If an utternance/speech is not currently in the process of speaking
            textToSpeech(textarea.value);
        }
        if(textarea.value.length > 80){
            setInterval(() =>{
                if(!synth.speaking && !isspeaking){
                    isspeaking = true;
                    speechBtn.innerText = "Convert To Speech";
                }
                else{

                }
            },500);
        //If isspeaking is true then change its value to false and resume the utternance else change its value to true and pause the speech
            if(isspeaking){
                synth.resume();
                isspeaking = false;
                speechBtn.innerText = "Pause Speech";
            }
            else{
                synth.pause();
                isspeaking = true;
                speechBtn.innerText = "Resume Speech";
            }

            //Checking is utternance/speech in speaking process or not in every 100 ms and if not then set the value of isspeaking to true and change the button text
            
        }
        else{
            speechBtn.innerText = "Convert To Speech";
        }
       
    }

});