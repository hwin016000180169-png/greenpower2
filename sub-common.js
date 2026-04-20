// sub-common.js
document.addEventListener('DOMContentLoaded', () => {

    // Force header to opaque state on sub-pages (no hero slider present)
    const header = document.getElementById('header');
    if (header && !document.querySelector('.hero-slider')) {
        header.classList.add('is-scrolled');
        header.dataset.tone = 'dark';
    }

    // Reveal animation initial trigger
    setTimeout(() => {
        const elems = document.querySelectorAll('.anim-ele');
        elems.forEach(el => el.classList.add('is-active'));
    }, 100);

    // Form Mock Submit Logic
    const submitBtns = document.querySelectorAll('.form-wrap .btn-submit');
    submitBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('현재 온라인 접수 시스템 개선 연동 중입니다.\n전화(031-768-4500) 또는 이메일을 이용해주시기 바랍니다.');
        });
    });

    // Dynamic Data Rendering Logic for Detail Pages
    const urlParams = new URLSearchParams(window.location.search);
    const detailBody = document.getElementById('dynamic-detail-body');
    
    if(detailBody && window.GREEN_DATA) {
        const kind = detailBody.getAttribute('data-kind'); // 'product' or 'board'
        const id = urlParams.get('id');

        if(!id) {
            renderEmptyRow(detailBody, '유효하지 않은 접근입니다.');
            return;
        }

        if(kind === 'product') {
            const product = window.GREEN_DATA.products.find(p => p.id === id);
            if(product) {
                let specHtml = '';
                if(product.specs) {
                    for(let k in product.specs) {
                        specHtml += `<li><span>${k}</span> <strong>${product.specs[k]}</strong></li>`;
                    }
                }
                
                let featHtml = '';
                if(product.features) {
                    featHtml += '<ul>';
                    product.features.forEach(f => featHtml += `<li>- ${f}</li>`);
                    featHtml += '</ul>';
                }

                detailBody.innerHTML = `
                    <div class="detail-head">
                        <span class="g-cat">${product.category}</span>
                        <h3 class="detail-tit">${product.name}</h3>
                        <p class="detail-meta">${product.desc}</p>
                    </div>
                    <div class="detail-body" style="display:flex; gap: 40px; min-height: 200px;">
                        <div class="pd-img" style="width: 40%; aspect-ratio: 1; background: #eee; border-radius: 4px; display:flex; align-items:center; justify-content:center; color:#999; font-weight:700;">${product.name} IMAGE</div>
                        <div class="pd-info" style="flex:1;">
                            <h4 style="font-size: 22px; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #111;">제품 사양</h4>
                            <ul class="pd-specs" style="list-style:none; padding:0; line-height: 2;">
                                ${specHtml}
                            </ul>
                            <h4 style="font-size: 22px; margin-top:40px; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #111;">제품 특징</h4>
                            <div class="pd-features" style="line-height:2;">
                                ${featHtml}
                            </div>
                            <button class="btn-more" style="margin-top: 40px; border: 1px solid #ddd; padding: 15px 30px;" onclick="alert('매뉴얼 다운로드 준비중입니다.')">매뉴얼 다운로드 <span>↓</span></button>
                        </div>
                    </div>
                `;
            } else {
                renderEmptyRow(detailBody, '상품 정보를 찾을 수 없습니다.');
            }
        } 
        else if(kind === 'board') {
            const boardName = urlParams.get('board'); // 'notice' or 'catalog'
            let arr = [];
            if(boardName === 'notice') arr = window.GREEN_DATA.notices;
            if(boardName === 'catalog') arr = window.GREEN_DATA.catalogs;

            const post = arr.find(p => p.id === id);
            if(post) {
                detailBody.innerHTML = `
                    <div class="detail-head">
                        <h3 class="detail-tit">${post.title}</h3>
                        <div class="detail-meta">작성일: ${post.date} &nbsp;|&nbsp; 조회수: ${post.views}</div>
                    </div>
                    <div class="detail-body">
                        ${post.content || '<p style="text-align:center; color:#999; margin-top: 100px;">지원되는 파일 다운로드 링크 또는 본문 내용이 이곳에 표시됩니다.</p>'}
                        ${boardName === 'catalog' ? '<br><br><button class="btn-more" style="border: 1px solid #ddd; padding: 15px 30px;" onclick="alert(\\\'파일 다운로드 준비중입니다.\\\')">자료 다운로드 <span>↓</span></button>' : ''}
                    </div>
                `;
            } else {
                renderEmptyRow(detailBody, '게시글을 찾을 수 없습니다.');
            }
        }
    }
});

function renderEmptyRow(container, msg) {
    container.innerHTML = `<div class="empty-msg">${msg}</div>`;
}
