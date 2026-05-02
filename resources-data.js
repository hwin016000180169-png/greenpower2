/* ──────────────────────────────────────────
   RESOURCES — 자료실 통합 데이터
   각 모델별로 규격서/카탈로그/도면/매뉴얼 묶음
────────────────────────────────────────── */
window.RESOURCES = [
    // ── GRU11-Tower Series (단상 1~10kVA Tower형) ──
    {
        series: 'GRU11-Tower Series',
        category: 'GREEN UPS',
        phase: '단상',
        form: 'Tower',
        type: '온라인 이중변환',
        productUrl: 'product-ups-detail.html?id=01',
        thumb: 'images/product/green11_01.png',
        models: [
            { id: 'GRU-T010', kva: '1kVA',  capacityKva: 1,  docs: defaultDocs('GRU-T010', '1kVA') },
            { id: 'GRU-T020', kva: '2kVA',  capacityKva: 2,  docs: defaultDocs('GRU-T020', '2kVA') },
            { id: 'GRU-T030', kva: '3kVA',  capacityKva: 3,  docs: defaultDocs('GRU-T030', '3kVA') },
            { id: 'GRU-T060', kva: '6kVA',  capacityKva: 6,  docs: defaultDocs('GRU-T060', '6kVA') },
            { id: 'GRU-T100', kva: '10kVA', capacityKva: 10, docs: defaultDocs('GRU-T100', '10kVA') },
        ]
    },
    // ── GRU11-Rack Series (단상 1~10kVA Rack형) ──
    {
        series: 'GRU11-Rack Series',
        category: 'GREEN UPS',
        phase: '단상',
        form: 'Rack',
        type: '온라인 이중변환',
        productUrl: 'product-ups-detail.html?id=02',
        thumb: 'images/product/green11_02.png',
        models: [
            { id: 'GRU-R010', kva: '1kVA',  capacityKva: 1,  docs: defaultDocs('GRU-R010', '1kVA') },
            { id: 'GRU-R020', kva: '2kVA',  capacityKva: 2,  docs: defaultDocs('GRU-R020', '2kVA') },
            { id: 'GRU-R030', kva: '3kVA',  capacityKva: 3,  docs: defaultDocs('GRU-R030', '3kVA') },
            { id: 'GRU-R060', kva: '6kVA',  capacityKva: 6,  docs: defaultDocs('GRU-R060', '6kVA') },
            { id: 'GRU-R100', kva: '10kVA', capacityKva: 10, docs: defaultDocs('GRU-R100', '10kVA') },
        ]
    },
    // ── GRU11-Trans Series (단상 변압기 내장 UPS) ──
    {
        series: 'GRU11-Trans Series',
        category: 'GREEN UPS',
        phase: '단상',
        form: 'Tower',
        type: '변압기 내장',
        productUrl: 'product-ups-detail.html?id=03',
        thumb: 'images/product/green11_01.png',
        models: [
            { id: 'GRU-TR030', kva: '3kVA',  capacityKva: 3,  docs: defaultDocs('GRU-TR030', '3kVA') },
            { id: 'GRU-TR060', kva: '6kVA',  capacityKva: 6,  docs: defaultDocs('GRU-TR060', '6kVA') },
            { id: 'GRU-TR100', kva: '10kVA', capacityKva: 10, docs: defaultDocs('GRU-TR100', '10kVA') },
        ]
    },
    // ── GRU-Rack Series (라인 인터랙티브) ──
    {
        series: 'GRU-Rack Series',
        category: 'GREEN UPS',
        phase: '단상',
        form: 'Rack',
        type: '라인 인터랙티브',
        productUrl: 'product-ups-detail.html?id=04',
        thumb: 'images/product/green11_02.png',
        models: [
            { id: 'GRU-R01', kva: '1kVA', capacityKva: 1, docs: defaultDocs('GRU-R01', '1kVA') },
            { id: 'GRU-R02', kva: '2kVA', capacityKva: 2, docs: defaultDocs('GRU-R02', '2kVA') },
            { id: 'GRU-R03', kva: '3kVA', capacityKva: 3, docs: defaultDocs('GRU-R03', '3kVA') },
        ]
    },
    // ── GRU33-T010~040 (삼상 10~40kVA) ──
    {
        series: 'GRU33-T010~040',
        category: 'GREEN UPS',
        phase: '삼상',
        form: 'Tower',
        type: '온라인 이중변환',
        productUrl: 'product-ups-detail.html?id=05',
        thumb: 'images/product/green11_01.png',
        models: [
            { id: 'GRU33-T010', kva: '10kVA', capacityKva: 10, docs: defaultDocs('GRU33-T010', '10kVA') },
            { id: 'GRU33-T020', kva: '20kVA', capacityKva: 20, docs: defaultDocs('GRU33-T020', '20kVA') },
            { id: 'GRU33-T030', kva: '30kVA', capacityKva: 30, docs: defaultDocs('GRU33-T030', '30kVA') },
            { id: 'GRU33-T040', kva: '40kVA', capacityKva: 40, docs: defaultDocs('GRU33-T040', '40kVA') },
        ]
    },
    // ── GRU33-T060~T200 (삼상 60~200kVA 대용량) ──
    {
        series: 'GRU33-T060~T200',
        category: 'GREEN UPS',
        phase: '삼상',
        form: 'Tower',
        type: '대용량 온라인',
        productUrl: 'product-ups-detail.html?id=06',
        thumb: 'images/product/green11_01.png',
        models: [
            { id: 'GRU33-T060', kva: '60kVA',  capacityKva: 60,  docs: defaultDocs('GRU33-T060', '60kVA') },
            { id: 'GRU33-T100', kva: '100kVA', capacityKva: 100, docs: defaultDocs('GRU33-T100', '100kVA') },
            { id: 'GRU33-T150', kva: '150kVA', capacityKva: 150, docs: defaultDocs('GRU33-T150', '150kVA') },
            { id: 'GRU33-T200', kva: '200kVA', capacityKva: 200, docs: defaultDocs('GRU33-T200', '200kVA') },
        ]
    },
    // ── GRU33-UK Series (삼상 UK 시리즈) ──
    {
        series: 'GRU33-UK Series',
        category: 'GREEN UPS',
        phase: '삼상',
        form: 'Tower',
        type: '온라인 이중변환',
        productUrl: 'product-ups-detail.html?id=07',
        thumb: 'images/product/green11_01.png',
        models: [
            { id: 'GRU33-UK010', kva: '10kVA', capacityKva: 10, docs: defaultDocs('GRU33-UK010', '10kVA') },
            { id: 'GRU33-UK020', kva: '20kVA', capacityKva: 20, docs: defaultDocs('GRU33-UK020', '20kVA') },
            { id: 'GRU33-UK030', kva: '30kVA', capacityKva: 30, docs: defaultDocs('GRU33-UK030', '30kVA') },
            { id: 'GRU33-UK040', kva: '40kVA', capacityKva: 40, docs: defaultDocs('GRU33-UK040', '40kVA') },
        ]
    }
];

// 각 모델 기본 문서 세트 — 실제 PDF 연결 전에는 #으로 플레이스홀더
function defaultDocs(modelId, kva) {
    var base = 'downloads/' + modelId;
    return [
        { type: '규격서',  title: modelId + ' ' + kva + ' 규격서',   url: '#', file: base + '_spec.pdf',     size: '1.2 MB' },
        { type: '카탈로그', title: modelId + ' ' + kva + ' 카탈로그', url: '#', file: base + '_catalog.pdf',  size: '2.8 MB' },
        { type: '도면',    title: modelId + ' ' + kva + ' 외형도면', url: '#', file: base + '_drawing.pdf',  size: '0.6 MB' },
        { type: '매뉴얼',  title: modelId + ' ' + kva + ' 사용자 매뉴얼', url: '#', file: base + '_manual.pdf',   size: '3.4 MB' }
    ];
}
