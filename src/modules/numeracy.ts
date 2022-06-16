import axios from "axios";
//@ts-ignore
import reversemd5 from "reverse-md5";
import FormData from "form-data";
import { DFM } from "../dfm";

const getAnswer = reversemd5({
    numbers: true,
    maxLen: 3
})

async function sendAnswer(answer: string, ttaid: any, qnum: number, x: number) {
    const form = new FormData();
    form.append("answer", answer);
    form.append("ttaid", ttaid);
    form.append("qnum", qnum);
    await axios({
        method: 'POST',
        url: 'https://www.drfrostmaths.com/homework/process-incrementtimestablescore.php',
        headers:{
            'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36',
            'x-requested-with':'XMLHttpRequest',
            'origin':'https://www.drfrostmaths.com',
            'referer':'https://www.drfrostmaths.com/timestables-game.php',
            'cookie':"G_ENABLED_IDPS=google; PHPSESSID="+DFM.cookies[x],
            'content-type':'multipart/form-data; boundary=----WebKitFormBoundary5k0CTF1sp7pbHRNt',
            ...form.getHeaders()
        },
        data:form
    }).then(response => {
        //console.log(response.status)
    })
}

async function submitAnswers(ttaid: any, x: number) {
    const headers = {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36',
        'cookie':"G_ENABLED_IDPS=google; PHPSESSID="+DFM.cookies[x],
        'x-requested-with':'XMLHttpRequest',
        'origin':'https://www.drfrostmaths.com'
    }
    const requestData = { headers: headers }
    const requestURL = "https://www.drfrostmaths.com/homework/process-finishtimestables.php?ttaid="+ttaid
    axios.get(requestURL,requestData).then(response => {
        console.log(response.data.current.score)
    })
}

export default function main() {
    DFM.cookies.forEach(async(cookie, x) => {
       const answers: any = [];
       const requestData = {
        headers:{
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36',
            'cookie':"G_ENABLED_IDPS=google; PHPSESSID="+DFM.cookies[x],
            'x-requested-with':'XMLHttpRequest',
            'origin':'https://www.drfrostmaths.com'
        }
       }
       await axios.get("https://www.drfrostmaths.com/homework/process-starttimestables.php", requestData).then(async response => { 
       const ttaid = response.data.ttaid;
       const questions: any = response.data.data;
       questions.forEach((questions: any) => {
            answers.push(getAnswer(questions.a).str)
       })
       for(let i=0;i<70;i++) {
            const answer = await sendAnswer(answers[i], ttaid, i+1, x);
       }
       })
    })
}