/**
 * EmailJS 폼 전송 통합 스크립트
 * -----------------------------------------------
 * 아래 3가지 값을 EmailJS 계정에서 복사해 붙여넣으세요.
 * 설정 방법: README 또는 하단 주석 참고
 * -----------------------------------------------
 */
const EMAILJS_CONFIG = {
  publicKey:  'YOUR_PUBLIC_KEY',   // EmailJS > Account > General > Public Key
  serviceId:  'YOUR_SERVICE_ID',   // EmailJS > Email Services > Service ID
  templateId: 'YOUR_TEMPLATE_ID',  // EmailJS > Email Templates > Template ID
};

/* ─────────────────────────────────────────────
   폼 전송 처리 (페이지 로드 후 자동 실행)
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {

  // EmailJS SDK 초기화
  if (typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
  } else {
    console.warn('[EmailJS] SDK가 로드되지 않았습니다.');
    return;
  }

  // 페이지 내 폼 찾기
  const form = document.querySelector('form[novalidate]');
  if (!form) return;

  // 제출 버튼 참조
  const submitBtn = form.querySelector('[type="submit"]');
  const originalBtnText = submitBtn ? submitBtn.textContent : '제출';

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // ── 유효성 검사 ──
    const requiredFields = form.querySelectorAll('[required]');
    let valid = true;
    requiredFields.forEach(field => {
      field.classList.remove('is-error');
      if (field.type === 'checkbox') {
        if (!field.checked) { field.closest('.form-agree')?.classList.add('is-error'); valid = false; }
      } else {
        if (!field.value.trim()) { field.classList.add('is-error'); valid = false; }
      }
    });
    if (!valid) {
      showMessage(form, 'error', '필수 항목을 모두 입력해주세요.');
      return;
    }

    // ── 폼 데이터 수집 ──
    const data = new FormData(form);
    const fields = Object.fromEntries(data.entries());

    // 폼 유형 판별
    const pageTitle = document.querySelector('h2.page-hero__title')?.textContent?.trim() || '문의';

    // 추가 항목 텍스트 조합
    const extras = [];
    if (fields.company)  extras.push(`회사명: ${fields.company}`);
    if (fields.scale)    extras.push(`도입 규모: ${fields.scale}`);
    if (fields.schedule) extras.push(`설치 예정: ${fields.schedule}`);
    if (fields.product)  extras.push(`관심 제품: ${fields.product}`);
    if (fields.address)  extras.push(`설치 장소: ${fields.address}`);
    if (fields.fault)    extras.push(`장애 유형: ${fields.fault}`);
    if (fields.model)    extras.push(`모델명: ${fields.model}`);

    // EmailJS 템플릿 파라미터
    const templateParams = {
      form_type:    pageTitle,
      from_name:    fields.name   || '-',
      from_company: fields.company || '-',
      from_tel:     fields.tel    || '-',
      from_email:   fields.email  || '-',
      message:      fields.message || '-',
      extra_fields: extras.join('\n') || '-',
      reply_to:     fields.email  || 'greenups@hanmail.net',
    };

    // ── 전송 ──
    setButtonLoading(submitBtn, true);
    removeMessage(form);

    try {
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams
      );
      showMessage(form, 'success',
        '✅ 접수되었습니다! 담당자가 확인 후 빠르게 연락드리겠습니다.'
      );
      form.reset();
    } catch (err) {
      console.error('[EmailJS] 전송 실패:', err);
      showMessage(form, 'error',
        '전송 중 오류가 발생했습니다. 잠시 후 다시 시도하거나 031-768-4500으로 연락해주세요.'
      );
    } finally {
      setButtonLoading(submitBtn, false, originalBtnText);
    }
  });

  // 에러 표시 해제 (입력 시)
  form.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('input', () => el.classList.remove('is-error'));
    el.addEventListener('change', () => el.classList.remove('is-error'));
  });
});

/* ── 유틸 ── */
function setButtonLoading(btn, loading, originalText) {
  if (!btn) return;
  if (loading) {
    btn.disabled = true;
    btn.textContent = '전송 중...';
  } else {
    btn.disabled = false;
    btn.textContent = originalText;
  }
}

function showMessage(form, type, text) {
  removeMessage(form);
  const el = document.createElement('div');
  el.className = 'form-result-msg form-result-msg--' + type;
  el.textContent = text;
  form.querySelector('.form-submit-wrap')?.after(el);
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function removeMessage(form) {
  form.querySelectorAll('.form-result-msg').forEach(el => el.remove());
}

/*
 ╔══════════════════════════════════════════════════════════╗
 ║  EmailJS 설정 가이드 (5분이면 완료!)                      ║
 ╠══════════════════════════════════════════════════════════╣
 ║                                                          ║
 ║  1. https://www.emailjs.com  무료 가입                   ║
 ║                                                          ║
 ║  2. [Email Services] → [Add New Service]                 ║
 ║     → Gmail 선택 → Gmail 계정 연동                       ║
 ║     → Service ID 복사 → serviceId 에 붙여넣기           ║
 ║                                                          ║
 ║  3. [Email Templates] → [Create New Template]            ║
 ║     아래 내용을 템플릿에 복사·붙여넣기:                   ║
 ║                                                          ║
 ║  ── Subject ──                                           ║
 ║  [그린파워] {{form_type}} - {{from_name}} ({{from_tel}}) ║
 ║                                                          ║
 ║  ── Body (Text) ──                                       ║
 ║  문의 유형: {{form_type}}                                 ║
 ║  담당자명: {{from_name}}                                  ║
 ║  회사명: {{from_company}}                                 ║
 ║  연락처: {{from_tel}}                                     ║
 ║  이메일: {{from_email}}                                   ║
 ║  ─────────────────                                       ║
 ║  {{extra_fields}}                                        ║
 ║  ─────────────────                                       ║
 ║  내용:                                                    ║
 ║  {{message}}                                             ║
 ║                                                          ║
 ║     → To Email: greenups@hanmail.net                     ║
 ║     → Template ID 복사 → templateId 에 붙여넣기          ║
 ║                                                          ║
 ║  4. [Account] → [General] → Public Key 복사              ║
 ║     → publicKey 에 붙여넣기                              ║
 ║                                                          ║
 ╚══════════════════════════════════════════════════════════╝
*/
