# 그린파워테크놀로지 웹사이트 — 작업 가이드

## 프로젝트 개요
- **클라이언트**: (주)그린파워테크놀로지 — UPS·AVR·충전기·주파수변환기 제조·공급
- **기술 스택**: 순수 HTML / CSS / JS (빌드 시스템 없음, 파일 직접 편집)
- **저장소**: https://github.com/hwin016000180169-png/greenpower2
- **브랜치**: `main` 단일 브랜치 운영

---

## 파일 구조

```
Greenpower/
├── index.html                  # 메인 홈페이지 (가장 자주 편집)
├── styles.css                  # 전체 공통 CSS (대형 파일 ~2700줄)
├── sub-common.css              # 서브페이지 공통 CSS
│
├── company-greeting.html       # CEO 인사말
├── company-history.html        # 회사 연혁
├── company-certifications.html # 인증 현황
├── company-partners.html       # 주요 파트너
├── company-location.html       # 오시는 길
│
├── products-green.html         # GREEN UPS 제품 목록 (썸네일 img 태그 직접 편집)
├── products-battery.html       # 배터리 솔루션
├── products-eaton.html         # 유지보수 솔루션 (EATON 제거 후 유지보수 페이지로 변경됨)
├── product-ups-detail.html     # UPS 제품 상세 (JS 객체로 제품 데이터 관리)
│
├── inquiry-consulting.html     # 도입 상담
├── inquiry-quote.html          # 견적 문의
├── inquiry-service.html        # 서비스 요청
│
├── support-notice.html         # 공지사항
├── support-catalog.html        # 자료실
│
├── images/
│   ├── hero_1.png / hero_2.png / hero_3.png   # 메인 히어로 슬라이더
│   ├── left_box_img1~3.png                     # 핵심사업 패널 배경
│   ├── bot_box_img1~2.png                      # 구 슬라이더 이미지 (현재 미사용)
│   ├── slide_01~05.png                         # 파트너 슬라이더 5장
│   ├── Domestic_Manufacturing.png              # products-green 인트로 이미지
│   ├── logo_01~27.png                          # 고객사 로고 플로우 배너
│   ├── pop/                                    # 배터리 브랜드 팝업 이미지
│   └── product/                               # 제품별 이미지 (상세 설명 아래 참고)
│
└── downloads/                  # PDF 카탈로그 파일
```

---

## 핵심 CSS 변수 (styles.css :root)

```css
--accent:      #76c442   /* 라이트 그린 */
--accent-dark: #2e7d32   /* 다크 그린 */
--text:        #111714
--text-soft:   #4a5450
--bg:          #ffffff
--surface-dark:#0d1f10
--shadow-soft: 0 4px 18px rgba(17,23,20,0.07)
--shadow:      0 14px 40px rgba(17,23,20,0.13)
```

---

## 자주 수정하는 섹션 위치 (index.html 줄 번호 기준)

| 섹션 | 줄 범위 | 비고 |
|------|---------|------|
| 히어로 슬라이더 | ~108~173 | hero_1/2/3.png |
| 기업 개요 stat-card | ~345~370 | 숫자·텍스트 |
| capability-strip (01/02/03) | ~373~390 | |
| 핵심사업 패널 | ~399~436 | left_box_img1~3.png |
| 파트너 슬라이더 (5장) | ~454~480 | slide_01~05.png |
| 뉴스 카드 | ~585~605 | |

---

## 제품 이미지 구조 (product-ups-detail.html)

제품 데이터는 JS 객체로 관리됨. 각 제품마다:
- `image`: 히어로 + 썸네일 (products-green.html의 img src와 동일하게 맞춰야 함)
- `images[]`: 갤러리 배열 (보통 3장 동일 이미지 반복)

| ID | 제품명 | 히어로 | 갤러리 |
|----|--------|--------|--------|
| 07 | MR33 Series | mr33_01.png | mr33_02.png |
| 08 | MR33-H Series | Green-UK33_02.png | Green-UK33_03.png |

썸네일(products-green.html)도 같은 이미지로 **별도 수정** 필요.

---

## 디자인 방향 (클라이언트 확정)

- **톤**: 밝고 프리미엄한 느낌 (Light Premium — B안 적용 완료)
- **포인트 컬러**: `--accent` 그린 계열
- **레이아웃 변경 금지**: 구조는 유지, 디자인 디테일만 수정
- **section-label**: 그린 pill 형태 (`background: rgba(46,125,50,0.08)`)
  - 단, CTA 카드 내부에서는 배경 없음 (`.cta-card__content .section-label`)
- **stat-card**: 상단 그린 3px 보더, 호버 시 `#f6fff2` 배경

---

## 이미지 파일 네이밍 규칙

```
images/product/{제품명}_{번호}.png
  01 = 히어로·썸네일용
  02 = 히어로용 or 갤러리
  03 = 갤러리 전용

images/slide_01~05.png    ← 파트너 슬라이더
images/hero_1~3.png       ← 메인 히어로
images/left_box_img1~3.png ← 핵심사업 패널
```

---

## Git 커밋 규칙

```bash
# 커밋 메시지 형식
git commit -m "$(cat <<'EOF'
type: 한 줄 설명

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"

# type 종류
feat:   새 기능·섹션 추가
fix:    버그·레이아웃 오류 수정
style:  CSS 디자인 변경 (기능 무관)
content: 텍스트·이미지 내용 변경
assets: 이미지·파일 추가/교체
```

---

## 세션 시작 방법 (토큰 절약)

1. **이 파일(CLAUDE.md) 읽기** → 컨텍스트 파악 완료
2. 수정할 파일의 **해당 줄만 Read** (전체 X)
3. 작업 완료 후 `git add [파일] && git commit`
4. 대화가 길어지면 `/compact` 실행

### 세션 시작 시 전달할 정보 템플릿
```
이 세션에서 할 작업: [구체적 작업 내용]
수정 파일: [파일명]
참고 줄 번호: [있으면 기재]
```

---

## 현재 진행 상태 (2026-05-04 기준)

### ✅ 완료
- [x] 전체 사이트 구조 및 디자인 시스템 구축
- [x] Light Premium 디자인 B안 적용
- [x] EATON 브랜드 제거 → Green Power 자체 제조로 교체
- [x] 파트너 슬라이더 5장으로 확장
- [x] MR33 / MR33-H Series 제품 이미지 교체
- [x] stat-card 텍스트 정리
- [x] GitHub 업로드 완료

### 🔄 진행 중
- [ ] 각 제품별 이미지 교체 (사용자가 제품 하나씩 확인 후 지시 예정)
- [ ] 이미지 생성 프롬프트 기반 신규 이미지 제작 후 교체

### ⏳ 미정
- [ ] 서브페이지 디자인 디테일 개선
- [ ] 모바일 최적화 점검
