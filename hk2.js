const puppeteer=require("puppeteer");
const codeobj=require('./codes');
const loginlink='https://www.hackerrank.com/auth/login';
const email='singhvishal0024@gmail.com';
const password='123456789';
(async function()
{
    try
    {
        let browserinstance=await puppeteer.launch({
            headless:false,
            args:['--start-maximized'],
            defaultViewport:null
        });
        let newtb=await browserinstance.newPage();
        await newtb.goto(loginlink);
        await newtb.type("input[id='input-1']",email,{delay:50});
        await newtb.type("input[type='password']",password,{delay:50});
        await newtb.click('button[type="submit"]',{delay:50});
        await waitandclick('.topic-card a[data-attr1="algorithms"]',newtb);
        await waitandclick('input[value="warmup"]',newtb);
        let allchallenges=await newtb.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled',{delay:50});
        console.log(allchallenges.length);
        let questionsolve=await questionsolver(newtb,allchallenges[0],codeobj.answers[0]);
    }
    catch(err)
    {
        console.log(err);
    }
})();

async function waitandclick(selector,cpage)
{
    await cpage.waitForSelector(selector);
    let selectorclick=cpage.click(selector);
    return selectorclick;
};

async function questionsolver(newtb,question,answer)
{
    let clickques=await question.click();
    await waitandclick('.monaco-editor.no-user-select.vs',newtb);
    await waitandclick('.checkbox-input',newtb);
    await newtb.waitForSelector('textarea.custominput',newtb);
    await newtb.type('textarea.custominput',answer,{delay:10});
    await newtb.keyboard.down('Control');
    await newtb.keyboard.press('A',{delay:50});
    await newtb.keyboard.press('X',{delay:50});
    await newtb.keyboard.up('Control');
    await waitandclick('.monaco-editor.no-user-select.vs',newtb);
    await newtb.keyboard.down('Control');
    await newtb.keyboard.press('A',{delay:50});
    await newtb.keyboard.press('V',{delay:50});
    await newtb.keyboard.up('Control');
    let ac=await newtb.click('.hr-monaco-submit',{delay:50});
    return ac;
}