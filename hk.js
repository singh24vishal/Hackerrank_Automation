const puppeteer=require("puppeteer");
const codeobj=require('./codes');
const loginlink='https://www.hackerrank.com/auth/login';
const email='singhvishal0024@gmail.com';
const password='123456789';
let browseropen=puppeteer.launch({
    headless:false,
    args:['--start-maximized'],
    defaultViewport:null
});
let page;
browseropen.then(function(browserobj)
{
    let browserpromise=browserobj.newPage();
    return browserpromise;
}).then(function(newtab)
{
    page=newtab;
    let hackerrankopen=newtab.goto(loginlink);
    return hackerrankopen;
}).then(function()
{
    let emailentered=page.type("input[id='input-1']",email,{delay:50});
    return emailentered;
}).then(function()
{
    let passwordentered=page.type("input[type='password']",password,{delay:50});
    return passwordentered;
}).then(function()
{
    let loginbutton=page.click('button[type="submit"]',{delay:50});
    return loginbutton;
}).then(function()
{
    let algoclick=waitandclick('.topic-card a[data-attr1="algorithms"]',page);
    return algoclick;
}).then(function()
{
    let getwarmup=waitandclick('input[value="warmup"]',page);
    return getwarmup;
}).then(function()
{
    let allchallenges=page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled',{delay:50});
    return allchallenges;
}).then(function(questions)
{
    let questionsolve=questionsolver(page,questions[0],codeobj.answers[0]);
})
function waitandclick(selector,cpage)
{
    return new Promise(function(resolve,reject){
        let waitpromise=cpage.waitForSelector(selector);
        waitpromise.then(function()
        {
            let clickmodal=cpage.click(selector);
            return clickmodal;
        }).then(function()
        {
            resolve();
        }).catch(function(err)
        {
            reject();
        });
    });
};
function questionsolver(page,question,answer)
{
    return new Promise(function(resolve,reject)
    {
        let clickques=question.click();
        clickques.then(function()
        {
            let editorpromise=waitandclick('.monaco-editor.no-user-select.vs',page);
            return editorpromise;
        }).then(function()
        {
            return waitandclick('.checkbox-input',page);
        }).then(function()
        {
            return page.waitForSelector('textarea.custominput',page);
        }).then(function()
        {
            return page.type('textarea.custominput',answer,{delay:10});
        }).then(function()
        {
            let pressctrl=page.keyboard.down('Control');
            return pressctrl;
        }).then(function()
        {
            let apress=page.keyboard.press('A',{delay:50});
            return apress;
        }).then(function()
        {
            let xpress=page.keyboard.press('X',{delay:50});
            return xpress;
        }).then(function()
        {
            let ctrlup=page.keyboard.up('Control');
            return ctrlup;
        }).then(function()
        {
            let mainedit=waitandclick('.monaco-editor.no-user-select.vs',page);
            return mainedit;
        }).then(function()
        {
            let pressctrl=page.keyboard.down('Control');
            return pressctrl;
        }).then(function()
        {
            let apress=page.keyboard.press('A',{delay:50});
            return apress;
        }).then(function()
        {
            let vpress=page.keyboard.press('V',{delay:50});
            return vpress;
        }).then(function()
        {
            let ctrlup=page.keyboard.up('Control');
            return ctrlup;
        }).then(function()
        {
            return page.click('.hr-monaco-submit',{delay:50});
        }).then(function(){
            resolve();
        }).catch(function(err)
        {
            reject();
        });
    });
};



