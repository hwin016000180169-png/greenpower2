const fs = require('fs');
const path = require('path');

const dir = __dirname;

const getHeader = () => `    <header class="header sub-header" id="header">
        <div class="h-inner">
            <h1 class="logo"><a href="index.html">GREEN POWER</a></h1>
            <ul class="gnb">
                <li><a href="company-greeting.html">Company</a>
                    <div class="depth2">
                        <a href="company-greeting.html">인사말</a>
                        <a href="company-history.html">회사연혁</a>
                        <a href="company-certifications.html">인증 및 특허 현황</a>
                        <a href="company-partners.html">주요 협력사</a>
                        <a href="company-location.html">오시는 길</a>
                    </div>
                </li>
                <li><a href="products-green.html">Products</a>
                    <div class="depth2">
                        <a href="products-green.html">GREEN UPS</a>
                        <a href="products-eaton.html">EATON SOLUTIONS</a>
                        <a href="products-battery.html">INDUSTRIAL BATTERY</a>
                    </div>
                </li>
                <li><a href="inquiry-quote.html">Inquiry</a>
                    <div class="depth2">
                        <a href="inquiry-quote.html">견적문의</a>
                        <a href="inquiry-consulting.html">제품상담</a>
                        <a href="inquiry-service.html">A/S 신청</a>
                    </div>
                </li>
                <li><a href="support-notice.html">Support</a>
                    <div class="depth2">
                        <a href="support-notice.html">공지사항</a>
                        <a href="support-catalog.html">카다로그</a>
                    </div>
                </li>
            </ul>
            <div class="h-util">
                <a href="#" class="lang-toggle">KOR</a>
                <button class="hamburger" aria-label="메뉴 열기"><span></span><span></span></button>
            </div>
        </div>
    </header>
`;

const getIndexHeader = () => `    <header class="header" id="header">
        <div class="h-inner">
            <h1 class="logo"><a href="index.html">GREEN POWER</a></h1>
            <ul class="gnb">
                <li><a href="company-greeting.html">Company</a>
                    <div class="depth2">
                        <a href="company-greeting.html">인사말</a>
                        <a href="company-history.html">회사연혁</a>
                        <a href="company-certifications.html">인증 및 특허 현황</a>
                        <a href="company-partners.html">주요 협력사</a>
                        <a href="company-location.html">오시는 길</a>
                    </div>
                </li>
                <li><a href="products-green.html">Business</a>
                    <div class="depth2">
                        <a href="products-green.html">GREEN UPS</a>
                        <a href="products-eaton.html">EATON SOLUTIONS</a>
                        <a href="products-battery.html">INDUSTRIAL BATTERY</a>
                    </div>
                </li>
                <li><a href="index.html" onclick="alert('준비중입니다.');return false;">Sustainability</a></li>
                <li><a href="support-notice.html">PR Room</a>
                    <div class="depth2">
                        <a href="support-notice.html">공지사항</a>
                        <a href="support-catalog.html">카다로그</a>
                    </div>
                </li>
            </ul>
            <div class="h-util">
                <a href="#" class="lang-toggle">KOR</a>
                <button class="hamburger" aria-label="메뉴 열기"><span></span><span></span></button>
            </div>
        </div>
        <div class="gnb-bg"></div>
    </header>`;

// Process each file
const files = fs.readdirSync(dir);
files.forEach(file => {
    if(!file.endsWith('.html')) return;
    if(file === 'index.broken.backup.html') return;

    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // REPLACE HEADER
    // It's safer to use regex to replace from <header ... </header>
    if(file === 'index.html') {
        content = content.replace(/<header class="header" id="header">[\s\S]*?<\/header>/i, getIndexHeader().trim());
        // Fix index.html CSS styles link if broken? No just replace header.
    } else {
        content = content.replace(/<header class="header sub-header" id="header">[\s\S]*?<\/header>/i, getHeader().trim());
        
        // APPLY PAGE TEMPLATE TWEAKS
        
        if (file.startsWith('products-') && file !== 'product-detail.html') {
            // Type B: Full width
            let curTab = '';
            if(file.includes('green')) curTab = 'GREEN UPS';
            if(file.includes('eaton')) curTab = 'EATON SOLUTIONS';
            if(file.includes('battery')) curTab = 'INDUSTRIAL BATTERY';
            
            content = content.replace(/<section class="sub-container inner">/, '<section class="sub-container type-wide inner">');
            
            // Add Horizontal tab menu inside sub-content, hide LNB via CSS
            if(!content.includes('class="h-tabs"')) {
                const hTabs = `
                <div class="h-tabs">
                    <a href="products-green.html" class="${curTab==='GREEN UPS'?'active':''}">GREEN UPS</a>
                    <a href="products-eaton.html" class="${curTab==='EATON SOLUTIONS'?'active':''}">EATON SOLUTIONS</a>
                    <a href="products-battery.html" class="${curTab==='INDUSTRIAL BATTERY'?'active':''}">INDUSTRIAL BATTERY</a>
                </div>`;
                content = content.replace('<h3 class="contents-tit line-top">', hTabs + '\n                <h3 class="contents-tit line-top">');
            }

            // Change sub-visual to some specific style class
            content = content.replace('<div class="sub-visual">', '<div class="sub-visual vis-products">');
        } 
        else if (file === 'product-detail.html') {
            content = content.replace(/<section class="sub-container inner">/, '<section class="sub-container type-wide inner">');
            content = content.replace('<div class="sub-visual">', '<div class="sub-visual vis-products">');
        }
        else if (file.startsWith('inquiry-')) {
            // Type C: Centered light visual
            content = content.replace(/<section class="sub-container inner">/, '<section class="sub-container type-center inner">');
            content = content.replace('<div class="sub-visual">', '<div class="sub-visual light">');
            
            // Add Horizontal tab menu
            let curTab = '';
            if(file.includes('quote')) curTab = '견적문의';
            if(file.includes('consulting')) curTab = '제품상담';
            if(file.includes('service')) curTab = 'A/S 신청';
            
            if(!content.includes('class="h-tabs"')) {
                const hTabs = `
                <div class="h-tabs" style="margin-bottom:30px;">
                    <a href="inquiry-quote.html" class="${curTab==='견적문의'?'active':''}">견적문의</a>
                    <a href="inquiry-consulting.html" class="${curTab==='제품상담'?'active':''}">제품상담</a>
                    <a href="inquiry-service.html" class="${curTab==='A/S 신청'?'active':''}">A/S 신청</a>
                </div>`;
                content = content.replace('<h3 class="contents-tit line-top">', hTabs + '\n                <h3 class="contents-tit line-top" style="text-align:center;">');
                
                content = content.replace('<h3 class="contents-tit line-top">', '<h3 class="contents-tit line-top" style="text-align:center;">');
                // Change contents-tit inline style to centered since it's centered layout
                content = content.replace('<h3 class="contents-tit line-top">', '<h3 class="contents-tit line-top" style="text-align:center; width:100%;">');
            }
        }
        // Company and Support remain Type A
    }

    fs.writeFileSync(path.join(dir, file), content, 'utf8');
});

console.log('Done rewriting htmls.');
