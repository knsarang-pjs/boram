(() => {
  const config = window.BORAM_CONFIG || {};

  const heroSlides=[...document.querySelectorAll('.hero-slide')];
  const heroDots=[...document.querySelectorAll('.hero-dots button')];
  let heroIndex=0, heroTimer;
  const showHero=(n)=>{
    if(!heroSlides.length) return;
    heroIndex=(n+heroSlides.length)%heroSlides.length;
    heroSlides.forEach((s,i)=>s.classList.toggle('is-active',i===heroIndex));
    heroDots.forEach((d,i)=>d.classList.toggle('is-active',i===heroIndex));
  };
  const startHero=()=>{ clearInterval(heroTimer); heroTimer=setInterval(()=>showHero(heroIndex+1),9000); };
  document.querySelector('.hero-arrow.prev')?.addEventListener('click',()=>{showHero(heroIndex-1);startHero()});
  document.querySelector('.hero-arrow.next')?.addEventListener('click',()=>{showHero(heroIndex+1);startHero()});
  heroDots.forEach((d,i)=>d.addEventListener('click',()=>{showHero(i);startHero()}));
  startHero();

  const pkgSlides=[...document.querySelectorAll('.package-card')];
  const pkgDots=[...document.querySelectorAll('.package-dots button')];
  const pkgTabs=[...document.querySelectorAll('.package-tabs button')];
  let pkgIndex=0, pkgTimer;
  const showPkg=(n)=>{
    if(!pkgSlides.length) return;
    pkgIndex=(n+pkgSlides.length)%pkgSlides.length;
    pkgSlides.forEach((s,i)=>s.classList.toggle('is-active',i===pkgIndex));
    pkgDots.forEach((d,i)=>d.classList.toggle('is-active',i===pkgIndex));
    pkgTabs.forEach((t,i)=>t.classList.toggle('is-active',i===pkgIndex));
  };
  const startPkg=()=>{ clearInterval(pkgTimer); pkgTimer=setInterval(()=>showPkg(pkgIndex+1),6500); };
  document.querySelector('.pkg-prev')?.addEventListener('click',()=>{showPkg(pkgIndex-1);startPkg()});
  document.querySelector('.pkg-next')?.addEventListener('click',()=>{showPkg(pkgIndex+1);startPkg()});
  pkgDots.forEach((d,i)=>d.addEventListener('click',()=>{showPkg(i);startPkg()}));
  pkgTabs.forEach((t,i)=>t.addEventListener('click',()=>{showPkg(i);startPkg()}));
  startPkg();

/* ========================================
   PRODUCT 상품안내 슬라이드
======================================== */
	document.addEventListener("DOMContentLoaded", function () {
	  // 상품안내 섹션만 선택
	  const slider = document.querySelector("#products");
	  if (!slider) return;
	  const slides = slider.querySelectorAll(".product-slide");
	  const dots = slider.querySelectorAll(".product-dots button");
	  const prevBtn = slider.querySelector(".product-arrow.prev");
	  const nextBtn = slider.querySelector(".product-arrow.next");
	  if (slides.length < 2 || !prevBtn || !nextBtn) return;
	  let current = 0;
	  let timer = null;
	  const interval = 5000; // 자동 슬라이드 간격 (5초)
	  // 슬라이드 표시
	  function showSlide(index) {

		current = (index + slides.length) % slides.length;

		slides.forEach((slide, i) => {
		  const active = i === current;

		  slide.classList.toggle("is-active", active);
		  slide.setAttribute("aria-hidden", String(!active));
		});

		dots.forEach((dot, i) => {
		  const active = i === current;

		  dot.classList.toggle("is-active", active);

		  if (active) {
			dot.setAttribute("aria-current", "true");
		  } else {
			dot.removeAttribute("aria-current");
		  }
		});
	  }
	  // 다음 슬라이드
	  function nextSlide() {showSlide(current + 1);}
	  // 이전 슬라이드
	  function prevSlide() {showSlide(current - 1);}
	  // 자동 슬라이드 시작
	  function startAuto() {
		stopAuto();
		if (document.hidden) return;
		timer = setInterval(nextSlide, interval);
	  }
	  // 자동 슬라이드 정지
	  function stopAuto() {
		if (timer !== null) {
		  clearInterval(timer);
		  timer = null;
		}
	  }
	  // 다음 버튼
	  nextBtn.addEventListener("click", function () {
		nextSlide();
		startAuto();
	  });
	  // 이전 버튼
	  prevBtn.addEventListener("click", function () {
		prevSlide();
		startAuto();
	  });
	  // 하단 페이지 버튼
	  dots.forEach((dot, index) => {
		dot.addEventListener("click", function () {
		  showSlide(index);
		  startAuto();
		});
	  });
	  // 마우스 올리면 자동 슬라이드 정지
	  slider.addEventListener("mouseenter", stopAuto);
	  // 마우스 벗어나면 다시 시작
	  slider.addEventListener("mouseleave", startAuto);
	  // 키보드 조작 중 자동 슬라이드 정지
	  slider.addEventListener("focusin", stopAuto);
	  slider.addEventListener("focusout", function (e) {if (!slider.contains(e.relatedTarget)) {startAuto();}});
	  // 브라우저 탭 비활성화 시 정지
	  document.addEventListener("visibilitychange", function () {
		if (document.hidden) {
		  stopAuto();
		} else {
		  startAuto();
		}
	  });
	  // 첫 번째 슬라이드 표시 및 자동 실행
	  showSlide(0);
	  startAuto();
	});

  // All consultation CTAs must jump to the final (bottom) consultation section.
  const scrollToBottomConsult=(e)=>{
    if(e) e.preventDefault();
    const target=document.getElementById('consult');
    if(!target) return;
    const popupEl=document.getElementById('promoPopup');
    if(popupEl && !popupEl.hidden) popupEl.hidden=true;
    const header=document.querySelector('.site-header');
    const headerH=header ? header.getBoundingClientRect().height : 0;
    const y=Math.max(0, target.getBoundingClientRect().top + window.pageYOffset - headerH - 8);
    window.scrollTo({top:y,behavior:'smooth'});
    // Re-apply after layout/animation settles so the final section is reached reliably.
    window.setTimeout(()=>{
      const y2=Math.max(0, target.getBoundingClientRect().top + window.pageYOffset - headerH - 8);
      window.scrollTo({top:y2,behavior:'smooth'});
    },420);
  };
  document.querySelectorAll('a[href="#consult"]').forEach(a=>a.addEventListener('click',scrollToBottomConsult));

  const menuBtn=document.querySelector('.menu-btn');
  const mobileNav=document.querySelector('.mobile-nav');
  menuBtn?.addEventListener('click',()=>{
    const open=mobileNav.classList.toggle('is-open');
    menuBtn.setAttribute('aria-expanded',String(open));
    menuBtn.textContent=open?'×':'☰';
  });
  mobileNav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    mobileNav.classList.remove('is-open');
    menuBtn.setAttribute('aria-expanded','false');
    menuBtn.textContent='☰';
  }));

  document.querySelectorAll('input[type="tel"]').forEach(phoneInput=>{
    phoneInput.addEventListener('input',()=>{
      const digits=phoneInput.value.replace(/\D/g,'').slice(0,11);
      let formatted=digits;
      if(digits.length>7) formatted=digits.replace(/(\d{3})(\d{4})(\d{1,4})/,'$1-$2-$3');
      else if(digits.length>3) formatted=digits.replace(/(\d{3})(\d{1,4})/,'$1-$2');
      phoneInput.value=formatted;
    });
  });

  document.querySelectorAll('.lead-form').forEach(leadForm=>{
    const formStatus=leadForm.querySelector('.form-status');
    const setStatus=(msg,type='')=>{
      if(!formStatus) return;
      formStatus.textContent=msg;
      formStatus.className='form-status'+(type?' '+type:'');
    };
    leadForm.addEventListener('submit',async(e)=>{
      e.preventDefault();
      setStatus('');
      if(!leadForm.checkValidity()){
        leadForm.reportValidity();
        return;
      }
      const phone=leadForm.elements.phone.value.replace(/\D/g,'');
      if(phone.length<10){
        setStatus('연락처를 다시 확인해 주세요.','error');
        leadForm.elements.phone.focus();
        return;
      }
      const data=Object.fromEntries(new FormData(leadForm).entries());
      data.phone=phone;
      data.page=location.href;
      data.timestamp=new Date().toISOString();
      const qs=new URLSearchParams(location.search);
      ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','n_keyword'].forEach(k=>{
        if(qs.get(k)) data[k]=qs.get(k);
      });
//
//      if(!config.submitEndpoint){
//        setStatus('입력 확인이 완료되었습니다. DB/API 주소 연결 전에는 전화 또는 카카오 1:1 상담을 이용해 주세요.','success');
//        return;
//      }
//
//      const submitBtn=leadForm.querySelector('.submit-btn');
//      submitBtn.disabled=true;
//      submitBtn.textContent='접수 중입니다...';
//      try{
//        const res=await fetch(config.submitEndpoint,{
//          method:'POST',
//          headers:{'Content-Type':'application/json'},
//          body:JSON.stringify(data)
//        });
//        if(!res.ok) throw new Error('HTTP '+res.status);
//        setStatus('상담 신청이 정상 접수되었습니다. 담당자가 확인 후 연락드리겠습니다.','success');
//        leadForm.reset();
//      }catch(err){
//        console.error(err);
//        setStatus('접수 중 오류가 발생했습니다. 전화 010-8823-0446 또는 카카오 상담을 이용해 주세요.','error');
//      }finally{
//        submitBtn.disabled=false;
//        submitBtn.textContent='무료 맞춤상담 신청하기';
//      }
    });
  });

  const termsModal=document.getElementById('termsModal');
  const openTerms=()=>{ if(termsModal) termsModal.hidden=false; };
  const closeTerms=()=>{ if(termsModal) termsModal.hidden=true; };
  document.querySelectorAll('.terms-btn').forEach(btn=>btn.addEventListener('click',openTerms));
  termsModal?.querySelector('.modal-close')?.addEventListener('click',closeTerms);
  termsModal?.querySelector('.modal-confirm')?.addEventListener('click',closeTerms);
  termsModal?.addEventListener('click',(e)=>{ if(e.target===termsModal) closeTerms(); });

  const popup=document.getElementById('promoPopup');
  const popupKey='boram_popup_hide_until';
  const hideUntil=Number(localStorage.getItem(popupKey)||0);
  if(popup && Date.now()>hideUntil) setTimeout(()=>{popup.hidden=false},800);
  document.querySelector('.popup-close')?.addEventListener('click',()=>popup.hidden=true);
  document.querySelector('.popup-go')?.addEventListener('click',()=>popup.hidden=true);
  document.querySelector('.popup-today')?.addEventListener('click',()=>{
    localStorage.setItem(popupKey,String(Date.now()+24*60*60*1000));
    popup.hidden=true;
  });

  document.addEventListener('keydown',(e)=>{
    if(e.key!=='Escape') return;
    if(popup && !popup.hidden) popup.hidden=true;
    if(termsModal && !termsModal.hidden) closeTerms();
  });
})();
