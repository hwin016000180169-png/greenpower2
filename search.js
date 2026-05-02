/* ────────────────────────────────────────────────
   Site Search — GREEN POWER TECHNOLOGY
   자료실 옆 검색 아이콘 → 풀스크린 검색 오버레이
──────────────────────────────────────────────── */
(function () {
    'use strict';

    // 정적 페이지 인덱스
    var PAGES = [
        { title: '기업소개 · CEO 인사말', desc: '그린파워테크놀로지 CEO 인사말과 기업 철학', url: 'company-greeting.html', tag: '기업소개' },
        { title: '회사 연혁', desc: '2005년부터의 그린파워테크놀로지 주요 연혁', url: 'company-history.html', tag: '기업소개' },
        { title: '인증 현황', desc: 'ISO, KS, KC 등 보유 인증서', url: 'company-certifications.html', tag: '기업소개' },
        { title: '주요 파트너', desc: 'EATON, VYCON, KEHUA 등 글로벌 파트너사 현황', url: 'company-partners.html', tag: '기업소개' },
        { title: '오시는 길', desc: '본사·공장 위치 안내', url: 'company-location.html', tag: '기업소개' },
        { title: 'GREEN UPS', desc: '자체 제조 국산 고효율 UPS 제품군 (단상·삼상)', url: 'products-green.html', tag: '사업영역' },
        { title: '유지보수 솔루션 (EATON)', desc: 'EATON POWERWARE 공식 파트너 UPS 솔루션 및 유지보수', url: 'products-eaton.html', tag: '사업영역' },
        { title: '배터리 솔루션', desc: 'CSB·세방전지 등 UPS 배터리 및 ESS', url: 'products-battery.html', tag: '사업영역' },
        { title: '도입 상담', desc: 'UPS 도입 컨설팅 문의', url: 'inquiry-consulting.html', tag: '문의' },
        { title: '견적 문의', desc: '제품 견적 요청', url: 'inquiry-quote.html', tag: '문의' },
        { title: '서비스 요청', desc: 'A/S 및 유지보수 서비스 요청', url: 'inquiry-service.html', tag: '문의' },
        { title: '공지사항', desc: '그린파워테크놀로지의 소식과 안내사항', url: 'support-notice.html', tag: '공지사항' },
        { title: '자료실', desc: '제품 카탈로그 및 기술 자료 다운로드', url: 'support-catalog.html', tag: '자료실' }
    ];

    function buildIndex() {
        var idx = [];
        PAGES.forEach(function (p) { idx.push({ title: p.title, desc: p.desc, url: p.url, tag: p.tag }); });

        if (window.GREEN_DATA) {
            (window.GREEN_DATA.products || []).forEach(function (p) {
                idx.push({
                    title: p.name,
                    desc: p.desc || '',
                    url: 'products-' + (p.category || 'green') + '.html',
                    tag: '제품'
                });
            });
            (window.GREEN_DATA.notices || []).forEach(function (n) {
                idx.push({
                    title: n.title,
                    desc: n.content || '',
                    url: 'board-detail.html?board=notice&id=' + n.id,
                    tag: '공지사항'
                });
            });
            (window.GREEN_DATA.catalogs || []).forEach(function (c) {
                idx.push({
                    title: c.title,
                    desc: '카탈로그 다운로드',
                    url: 'board-detail.html?board=catalog&id=' + c.id,
                    tag: '자료실'
                });
            });
            (window.GREEN_DATA.certifications || []).forEach(function (c) {
                idx.push({
                    title: c.title,
                    desc: '보유 인증',
                    url: 'company-certifications.html',
                    tag: '인증'
                });
            });
        }

        // ── RESOURCES (자료실) 인덱싱: 모델 + 개별 문서 ──
        if (window.RESOURCES) {
            window.RESOURCES.forEach(function (s) {
                s.models.forEach(function (m) {
                    // 모델 카드 (자료실로 이동, 전체 다운로드 가능)
                    idx.push({
                        title: m.id + ' · ' + m.kva,
                        desc: s.series + ' · ' + s.phase + ' · ' + s.type,
                        url: 'support-catalog.html?q=' + encodeURIComponent(m.id),
                        tag: '자료실',
                        modelId: m.id,
                        kva: m.kva,
                        capacityKva: m.capacityKva,
                        series: s.series,
                        docs: m.docs
                    });
                    // 개별 문서 (규격서/카탈로그/도면/매뉴얼)
                    m.docs.forEach(function (d) {
                        idx.push({
                            title: d.title,
                            desc: s.series + ' · ' + m.kva + ' · ' + d.type,
                            url: d.url,
                            file: d.file,
                            size: d.size,
                            docType: d.type,
                            tag: d.type,
                            kva: m.kva,
                            isDoc: true
                        });
                    });
                });
            });
        }
        return idx;
    }

    function escapeHtml(s) {
        return String(s).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    function highlight(text, q) {
        if (!q) return escapeHtml(text);
        var esc = escapeHtml(text);
        var re = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
        return esc.replace(re, '<mark>$1</mark>');
    }

    function search(q, index) {
        q = (q || '').trim().toLowerCase();
        if (!q) return [];
        var qNorm = q.replace(/\s+/g, '');
        var out = [];
        index.forEach(function (item) {
            var t = (item.title || '').toLowerCase();
            var d = (item.desc || '').toLowerCase();
            var g = (item.tag || '').toLowerCase();
            var k = (item.kva || '').toLowerCase();
            var m = (item.modelId || '').toLowerCase();
            var s = (item.series || '').toLowerCase();
            var score = 0;
            if (t.indexOf(q) !== -1) score += 10;
            if (k && k.replace(/\s+/g, '') === qNorm) score += 25;
            if (k && k.indexOf(q) !== -1) score += 8;
            if (m && m.indexOf(q) !== -1) score += 12;
            if (s && s.indexOf(q) !== -1) score += 6;
            if (d.indexOf(q) !== -1) score += 3;
            if (g.indexOf(q) !== -1) score += 2;
            if (score > 0) out.push({ item: item, score: score });
        });
        out.sort(function (a, b) { return b.score - a.score; });
        return out.slice(0, 30).map(function (x) { return x.item; });
    }

    // ── 오버레이 HTML 주입 ──
    function injectModal() {
        if (document.getElementById('siteSearchModal')) return;
        var wrap = document.createElement('div');
        wrap.id = 'siteSearchModal';
        wrap.className = 'site-search';
        wrap.setAttribute('aria-hidden', 'true');
        wrap.innerHTML = '' +
            '<div class="site-search__backdrop" data-search-close></div>' +
            '<div class="site-search__panel" role="dialog" aria-modal="true" aria-label="사이트 검색">' +
            '  <div class="site-search__head">' +
            '    <svg class="site-search__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>' +
            '    <input type="search" id="siteSearchInput" class="site-search__input" placeholder="제품명, 공지, 자료 검색..." autocomplete="off" spellcheck="false">' +
            '    <button type="button" class="site-search__close" data-search-close aria-label="검색 닫기">✕</button>' +
            '  </div>' +
            '  <div class="site-search__body">' +
            '    <p class="site-search__hint" id="siteSearchHint">검색어를 입력하세요. (예: UPS, 인증, 카탈로그)</p>' +
            '    <ul class="site-search__results" id="siteSearchResults"></ul>' +
            '  </div>' +
            '</div>';
        document.body.appendChild(wrap);
    }

    var index = null;
    function ensureIndex() { if (!index) index = buildIndex(); return index; }

    function open() {
        injectModal();
        ensureIndex();
        var modal = document.getElementById('siteSearchModal');
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('is-search-open');
        setTimeout(function () {
            var inp = document.getElementById('siteSearchInput');
            if (inp) inp.focus();
        }, 60);
    }
    function close() {
        var modal = document.getElementById('siteSearchModal');
        if (!modal) return;
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('is-search-open');
    }

    function render(q) {
        var list = document.getElementById('siteSearchResults');
        var hint = document.getElementById('siteSearchHint');
        if (!list || !hint) return;
        if (!q) {
            list.innerHTML = '';
            hint.textContent = '검색어를 입력하세요. (예: UPS, 인증, 카탈로그)';
            hint.style.display = '';
            return;
        }
        var results = search(q, ensureIndex());
        if (!results.length) {
            list.innerHTML = '';
            hint.textContent = '"' + q + '"에 대한 검색 결과가 없습니다.';
            hint.style.display = '';
            return;
        }
        hint.style.display = 'none';
        var html = results.map(function (r) {
            var actions = '';
            if (r.isDoc) {
                actions = '<a class="site-search__dl" href="' + escapeHtml(r.url) + '" download="' + escapeHtml(r.file || '') + '" aria-label="' + escapeHtml(r.docType || '') + ' 다운로드" data-search-download>' +
                    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>' +
                    '다운로드</a>';
            } else if (r.docs && r.docs.length) {
                actions = '<button type="button" class="site-search__dl" data-bulk-model="' + escapeHtml(r.modelId) + '">' +
                    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>' +
                    '전체 받기 (' + r.docs.length + ')</button>';
            }
            var meta = '';
            if (r.isDoc && r.size) meta = '<span class="site-search__meta">' + escapeHtml(r.file || '') + ' · ' + escapeHtml(r.size) + '</span>';
            return '<li class="site-search__item">' +
                '<a href="' + r.url + '" class="site-search__link">' +
                '  <span class="site-search__tag">' + escapeHtml(r.tag || '') + '</span>' +
                '  <span class="site-search__title">' + highlight(r.title, q) + '</span>' +
                (r.desc ? '  <span class="site-search__desc">' + highlight(r.desc, q) + '</span>' : '') +
                meta +
                '</a>' + actions + '</li>';
        }).join('');
        list.innerHTML = html;
    }

    // 전체 받기 (모델 단위 일괄 다운로드)
    function bulkDownload(modelId) {
        if (!window.RESOURCES) return;
        var model = null;
        window.RESOURCES.forEach(function (s) {
            s.models.forEach(function (m) { if (m.id === modelId) model = m; });
        });
        if (!model) return;
        model.docs.forEach(function (d, i) {
            setTimeout(function () {
                var a = document.createElement('a');
                a.href = d.url; a.download = d.file; a.rel = 'noopener';
                document.body.appendChild(a); a.click();
                setTimeout(function () { a.remove(); }, 100);
            }, i * 250);
        });
    }

    // ── 이벤트 바인딩 ──
    document.addEventListener('click', function (e) {
        var t = e.target.closest('[data-search-open]');
        if (t) { e.preventDefault(); open(); return; }
        if (e.target.closest('[data-search-close]')) { close(); return; }
        var bulk = e.target.closest('[data-bulk-model]');
        if (bulk) {
            e.preventDefault();
            e.stopPropagation();
            bulkDownload(bulk.getAttribute('data-bulk-model'));
            bulk.classList.add('is-done');
            setTimeout(function(){ bulk.classList.remove('is-done'); }, 1500);
            return;
        }
        var dl = e.target.closest('[data-search-download]');
        if (dl) { e.stopPropagation(); /* allow default download */ return; }
    });

    document.addEventListener('input', function (e) {
        if (e.target && e.target.id === 'siteSearchInput') {
            render(e.target.value);
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') close();
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            open();
        }
    });
})();
