function $(selector){
	return document.querySelector(selector);
}

function $all(selector){
	return document.querySelectorAll(selector);
}

const navToggle=$("#nav-toggle");
const siteNav=$("#site-nav");

if(navToggle&&siteNav){
	navToggle.addEventListener("click",function(){
		siteNav.classList.toggle("open");
	});
}

const watchDemoBtn=$("#watch-demo-btn");
const videoSection=$("#video-section");

if(watchDemoBtn&&videoSection){
	watchDemoBtn.addEventListener("click",function(){
		videoSection.scrollIntoView({behavior:"smooth"});
	});
}

const productStoreButtons=$all(".product-store-btn");

if(productStoreButtons.length>0){
	productStoreButtons.forEach(function(button){
		button.addEventListener("click",function(){
			window.location.href="store.html";
		});
	});
}

const forumCategoryButtons=$all(".forum-category");
const forumCards=$all(".forum-card");

if(forumCategoryButtons.length>0&&forumCards.length>0){
	forumCategoryButtons.forEach(function(button){
		button.addEventListener("click",function(){
			const category=button.getAttribute("data-forum-category");
			forumCategoryButtons.forEach(function(b){
				b.classList.remove("active");
			});
			button.classList.add("active");
			forumCards.forEach(function(card){
				const cardCategory=card.getAttribute("data-forum-category");
				if(category==="all"||category===cardCategory){
					card.style.display="grid";
				}else{
					card.style.display="none";
				}
			});
		});
	});
}

const storeToggleButtons=$all(".store-toggle-btn");
const storePanels=$all(".store-panel");

if(storeToggleButtons.length>0&&storePanels.length>0){
	storeToggleButtons.forEach(function(button){
		button.addEventListener("click",function(){
			const view=button.getAttribute("data-store-view");
			storeToggleButtons.forEach(function(b){
				b.classList.remove("store-toggle-active");
			});
			button.classList.add("store-toggle-active");
			storePanels.forEach(function(panel){
				const panelView=panel.getAttribute("data-store-view");
				if(panelView===view){
					panel.classList.remove("store-panel-hidden");
				}else{
					panel.classList.add("store-panel-hidden");
				}
			});
		});
	});
}

const awardSlides=$all(".award-slide");
const awardDots=$all(".award-dot");
const awardPrev=$(".award-prev");
const awardNext=$(".award-next");

let awardIndex=0;

function setAwardSlide(index){
	if(awardSlides.length===0){
		return;
	}
	if(index<0){
		index=awardSlides.length-1;
	}
	if(index>=awardSlides.length){
		index=0;
	}
	awardSlides.forEach(function(slide){
		slide.classList.remove("award-slide-active");
	});
	awardDots.forEach(function(dot){
		dot.classList.remove("award-dot-active");
	});
	awardSlides[index].classList.add("award-slide-active");
	if(awardDots[index]){
		awardDots[index].classList.add("award-dot-active");
	}
	awardIndex=index;
}

if(awardSlides.length>0){
	if(awardPrev){
		awardPrev.addEventListener("click",function(){
			setAwardSlide(awardIndex-1);
		});
	}
	if(awardNext){
		awardNext.addEventListener("click",function(){
			setAwardSlide(awardIndex+1);
		});
	}
	if(awardDots.length>0){
		awardDots.forEach(function(dot){
			dot.addEventListener("click",function(){
				const index=parseInt(dot.getAttribute("data-index")||"0",10);
				setAwardSlide(index);
			});
		});
	}
}

const revealElements=$all(".reveal");

if(revealElements.length>0&&"IntersectionObserver" in window){
	const observer=new IntersectionObserver(function(entries){
		entries.forEach(function(entry){
			if(entry.isIntersecting){
				entry.target.classList.add("reveal-visible");
				observer.unobserve(entry.target);
			}
		});
	},{threshold:0.15});
	revealElements.forEach(function(el){
		observer.observe(el);
	});
}else if(revealElements.length>0){
	revealElements.forEach(function(el){
		el.classList.add("reveal-visible");
	});
}

const demoVideo=$("#demo-video");
const demoPlay=$("#demo-play");
const demoBack=$("#demo-back");
const demoForward=$("#demo-forward");
const demoMute=$("#demo-mute");

if(demoVideo){
	if(demoPlay){
		demoPlay.addEventListener("click",function(){
			if(demoVideo.paused){
				demoVideo.play();
				demoPlay.innerText="❚❚";
			}else{
				demoVideo.pause();
				demoPlay.innerText="▶";
			}
		});
		demoVideo.addEventListener("play",function(){
			demoPlay.innerText="❚❚";
		});
		demoVideo.addEventListener("pause",function(){
			demoPlay.innerText="▶";
		});
	}
	if(demoBack){
		demoBack.addEventListener("click",function(){
			demoVideo.currentTime=Math.max(0,demoVideo.currentTime-10);
		});
	}
	if(demoForward){
		demoForward.addEventListener("click",function(){
			const targetTime=demoVideo.currentTime+10;
			if(demoVideo.duration){
				demoVideo.currentTime=Math.min(demoVideo.duration,targetTime);
			}else{
				demoVideo.currentTime=targetTime;
			}
		});
	}
	if(demoMute){
		demoMute.addEventListener("click",function(){
			demoVideo.muted=!demoVideo.muted;
			demoMute.innerText=demoVideo.muted?"🔈":"🔊";
		});
	}
}

const contactForm=$("#contact-form");

if(contactForm){
	const nameInput=$("#name-input");
	const emailInput=$("#email-input");
	const phoneInput=$("#phone-input");
	const topicSelect=$("#topic-select");
	const messageInput=$("#message-input");
	const termsInput=$("#terms-input");
	const nameError=$("#name-error");
	const emailError=$("#email-error");
	const phoneError=$("#phone-error");
	const topicError=$("#topic-error");
	const messageError=$("#message-error");
	const termsError=$("#terms-error");
	const contactMethodError=$("#contact-method-error");
	const successText=$("#form-success");

	contactForm.addEventListener("submit",function(e){
		e.preventDefault();
		clearError(nameInput,nameError);
		clearError(emailInput,emailError);
		clearError(phoneInput,phoneError);
		clearError(topicSelect,topicError);
		clearError(messageInput,messageError);
		if(termsError){
			termsError.innerText="";
		}
		if(contactMethodError){
			contactMethodError.innerText="";
		}
		if(successText){
			successText.innerText="";
		}
		let isValid=true;
		if(!nameInput.value||nameInput.value.trim().length===0){
			setError(nameInput,nameError,"Name cannot be empty");
			isValid=false;
		}else if(nameInput.value.trim().length<3||nameInput.value.trim().length>40){
			setError(nameInput,nameError,"Name must be between 3 and 40 characters");
			isValid=false;
		}
		if(!emailInput.value||emailInput.value.trim().length===0){
			setError(emailInput,emailError,"Email cannot be empty");
			isValid=false;
		}else if(!emailInput.value.includes("@")||!emailInput.value.includes(".")){
			setError(emailInput,emailError,"Please enter a valid email address");
			isValid=false;
		}
		const phoneValue=phoneInput.value.trim();
		if(phoneValue.length===0){
			setError(phoneInput,phoneError,"Phone number cannot be empty");
			isValid=false;
		}else{
			let onlyNumber=true;
			for(let i=0;i<phoneValue.length;i++){
				const c=phoneValue[i];
				if(c<"0"||c>"9"){
					onlyNumber=false;
					break;
				}
			}
			if(!onlyNumber){
				setError(phoneInput,phoneError,"Phone must contain digits only");
				isValid=false;
			}else if(phoneValue.length<10||phoneValue.length>15){
				setError(phoneInput,phoneError,"Phone must be between 10 and 15 digits");
				isValid=false;
			}
		}
		if(!topicSelect.value||topicSelect.value===""){
			setError(topicSelect,topicError,"Please select a topic");
			isValid=false;
		}
		const selectedContactMethod=document.querySelector("input[name='contactMethod']:checked");
		if(!selectedContactMethod){
			if(contactMethodError){
				contactMethodError.innerText="Please choose a preferred contact method";
			}
			isValid=false;
		}
		const messageValue=messageInput.value.trim();
		if(messageValue.length===0){
			setError(messageInput,messageError,"Message cannot be empty");
			isValid=false;
		}else if(messageValue.length<20){
			setError(messageInput,messageError,"Message must contain at least 20 characters");
			isValid=false;
		}
		if(!termsInput.checked){
			if(termsError){
				termsError.innerText="You must agree to the terms of service";
			}
			isValid=false;
		}
		if(!isValid){
			return;
		}
		if(successText){
			successText.innerText="Your message has been sent successfully (demo).";
		}
		contactForm.reset();
	});
}

function setError(input,errorSpan,message){
	if(input){
		input.classList.add("input-error");
	}
	if(errorSpan){
		errorSpan.innerText=message;
	}
}

function clearError(input,errorSpan){
	if(input){
		input.classList.remove("input-error");
	}
	if(errorSpan){
		errorSpan.innerText="";
	}
}

if(forumCards.length>0){
	forumCards.forEach(function(card){
		const likeButton=card.querySelector(".forum-like");
		const likeCount=card.querySelector(".forum-like-count");
		const shareButton=card.querySelector(".forum-share");
		const shareCount=card.querySelector(".forum-share-count");

		if(likeButton&&likeCount){
			likeButton.addEventListener("click",function(){
				let liked=likeButton.classList.contains("forum-liked");
				let current=parseInt(likeCount.innerText,10);
				if(!liked){
					current++;
					likeButton.classList.add("forum-liked");
				}else{
					current--;
					if(current<0){
						current=0;
					}
					likeButton.classList.remove("forum-liked");
				}
				likeCount.innerText=current;
			});
		}

		if(shareButton&&shareCount){
			let shared=false;
			shareButton.addEventListener("click",function(){
				if(!shared){
					let current=parseInt(shareCount.innerText,10);
					current++;
					shareCount.innerText=current;
					shared=true;
				}
			});
		}
	});
}

const allProductCards=document.querySelectorAll(".product-card-large");
const paginationButtons=document.querySelectorAll(".pagination-btn");
const productTypeSelect=document.getElementById("product-type-select");

if(productTypeSelect&&allProductCards.length>0&&paginationButtons.length>0){
	function showProducts(){
		const selectedType=productTypeSelect.value;
		const activePage=document.querySelector(".pagination-btn-active").dataset.page;
		allProductCards.forEach(function(card){
			const cardType=card.dataset.type;
			const cardPage=card.dataset.page;
			if((selectedType==="all"||selectedType===cardType)&&cardPage===activePage){
				card.style.display="block";
			}else{
				card.style.display="none";
			}
		});
	}

	paginationButtons.forEach(function(btn){
		btn.addEventListener("click",function(){
			paginationButtons.forEach(function(b){
				b.classList.remove("pagination-btn-active");
			});
			btn.classList.add("pagination-btn-active");
			showProducts();
		});
	});

	productTypeSelect.addEventListener("change",function(){
		paginationButtons.forEach(function(b){
			b.classList.remove("pagination-btn-active");
		});
		paginationButtons[0].classList.add("pagination-btn-active");
		showProducts();
	});

	showProducts();
}