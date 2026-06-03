'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import Image from "next/image"
import { useAudio } from './AudioProvider'

export default function Home() {
  const [stage, setStage] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const noBtnRef = useRef<HTMLButtonElement>(null)
  const { playMusic } = useAudio()

  const positions = [
    { left: '20%', top: '20%' },
    { left: '-150%', top: '50%' },
    { left: '80%', top: '60%' },
    { left: '-10%', top: '-360%' },
    { left: '-100%', top: '-290%' },
    { left: '60%', top: '-90%' },
    { left: '140%', top: '-80%' },
    { left: '-160%', top: '-330%' }
  ]
  const [index, setIndex] = useState(0)

  const moveNoButton = useCallback(() => {
    if (stage >= 5) {
      setIndex((prev) => (prev + 1) % positions.length)
    }
  }, [stage])

  const handleNoMouseEnter = useCallback(() => {
    moveNoButton()
  }, [moveNoButton])

  const handleNoClick = useCallback(() => {
    moveNoButton()
    setStage((prev) => {
      if (prev === 0) return 1
      if (prev === 1) return 3
      if (prev === 3) return 4
      if (prev === 4) return 5
      return prev
    })
  }, [moveNoButton])

  const handleYesClick = useCallback(() => {
    setShowResult(true)
    playMusic()
  }, [playMusic])

  useEffect(() => {
    if (!showResult) return

    const interval = setInterval(() => {
     let heart = document.createElement("div");
            heart.className = "heart";
            heart.innerHTML = "❤️";
            heart.style.left = Math.random() * 100 + "vw";
            heart.style.bottom = Math.random() * 50 + "vw";
            heart.style.fontSize = (Math.random() * 30 + 30) + "px";
            heart.style.animationDuration = (Math.random() * 6 + 6) + "s";
            document.body.appendChild(heart);
            setTimeout(() => { heart.remove(); }, 8000);
          }, 400);
          let totalPages = 100; // غير الرقم براحتك
    return () => clearInterval(interval)
  }, [showResult])

  const images = [
    'our-photos/sora50.jpg',
    'our-photos/sora50.jpg',
    'our-photos/eays.jpeg',
    'our-photos/1.jpeg',
    'our-photos/2.jpeg',
    'our-photos/flower 4 l 17 l 2026.jpeg',
    'our-photos/g.p.jpeg',
  ]
  const totalPages = 100;
  for (let i = 1; i <= totalPages ; i++) {
    images.push('');
    
  }

  const pagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const coverRef = useRef<HTMLDivElement>(null);

  const pages = images.slice(1).map((imgSrc, i) => (
    <div
      key={i}
      ref={(el) => { pagesRef.current[i] = el }}
      className="bor absolute  w-[100%] h-[100%] border-[10px] border-[#f4f4f4]  rounded-[10px] [transform-origin:left] transition-transform duration-[1s] [transform-style:preserve-3d]"
      style={{ zIndex: images.length - 1 - i }}
    >
      {imgSrc ? (
        <Image
          src={'/' + imgSrc}
          alt=""
          fill
          className="w-[96%]  h-[130%] rounded-[10px] block mx-auto  object-cover z-[7]"
          sizes="300px"
        />
      ) : null}
    </div>
  ))

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const handleInteraction = () => playMusic()
    document.addEventListener('click', handleInteraction)
    document.addEventListener('touchstart', handleInteraction)
    return () => {
      document.removeEventListener('click', handleInteraction)
      document.removeEventListener('touchstart', handleInteraction)
    }
  }, [playMusic])

  useEffect(() => {
    if (noBtnRef.current && stage >= 5) {
      const pos = positions[index]
      noBtnRef.current.style.left = pos.left
      noBtnRef.current.style.top = pos.top
    }
  }, [index, stage, positions])

  const handleNextPage = () => {
    if (currentPage < images.length - 1) {
      const page = pagesRef.current[currentPage];
      if (page) {
        page.style.zIndex = (images.length + currentPage + 1).toString();
        if (isMobile) {
          page.style.transform = 'rotateY(-180deg) translateX(300px)';
        } else {
          page.style.transform = 'rotateY(-180deg)';
        }
        page.style.transition = 'transform 1s ease';
      }
      setCurrentPage(prev => prev + 1);
      if (currentPage === 0) {
        coverRef.current!.style.display = 'none';
      }
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
      const page = pagesRef.current[currentPage - 1];
      if (page) {
        page.style.transform = 'rotateY(0deg)';
        page.style.zIndex = (images.length - currentPage).toString();
      }
      if (currentPage === 1) {
        coverRef.current!.style.display = 'flex';
        coverRef.current!.style.zIndex = '1000';
      }
    }
  }

  return (
    <>
      <h1 id="question" className={` text-white text-[38px] mb-[40px] transition-all duration-500 ${showResult ? 'hidden' : ''} sm:text-[32px] sm:mb-[25px]`}>
        <div className="ilo hover:top-[7px] hover:bg-black rounded-[10cm]">
          <span className="text-[#ff7c92] font-bold italic ii">I LOVE YOU 💖<br /></span>
        </div>
        <br />
        <span className="ii" style={{fontStyle: 'oblique'}}>
          And I want <span>Us</span> to be together for life
          <span className="ml-[11px] bg-[#fbfbfb] text-[#f6739a] rounded-[1cm] px-[10px] font-bold p-1">
            Agreed?
          </span>
        </span>
      </h1>

      <div id="questionGif" className={`${showResult ? 'hidden' : ''}`}>
        <Image
          src="/flower/gif.gif"
          alt="question gif"
          width={220}
          height={220}
          className="z-[1] -mt-[30px] mb-[1px] inline-block w-[220px] sm:w-full max-w-[320px] h-auto mx-auto -ml-[40px] sm:-ml-0"
          unoptimized
          priority
        />
      </div>

      <div id="buttons" className={!showResult ? 'mt-[20px] sm:mb-[-10px]' : 'hidden'}>
         <button
          id="yes"
          ref={noBtnRef}
          className={`no-border p-[15px_35px] text-[22px] rounded-[50px] cursor-pointer m-[10px] transition-all duration-[.5s] shadow-love bg-white text-love-pink font-bold font-oblique relative hover:bg-love-pink-dark hover:text-white sm:p-[14px_28px] sm:text-[20px] sm:m-[8px] sm:rounded-[25px] sm:mt-[50px] hover:text-lg hover:font-large
             ${stage === 1 ? 'scale-[2.1] ml-[10px]' : ''}
              ${stage === 3 ? 'scale-[3.6] ml-[20px]' : ''}
               ${stage === 4 ? 'scale-[4.4] ml-[30px]' : ''}
                ${stage === 5 ? 'scale-[5.3] ml-[40px] absolute' : ''}`}
        
        onClick={handleYesClick}
       
        >
          {stage === 0 && 'yes'}
          {stage === 1 && 'yes'}
          {stage === 3 && 'yes'}
          {stage === 4 && 'yes'}
          {stage === 5 && 'yes'}
       
     
        </button>
        <button
          id="no"
          ref={noBtnRef}
          className={`no-border p-[15px_35px] text-[22px] rounded-[50px] cursor-pointer m-[10px] transition-all duration-[.5s] shadow-love bg-white text-love-pink font-bold font-oblique relative hover:bg-love-pink-dark hover:text-white sm:p-[14px_28px] sm:text-[20px] sm:m-[8px] sm:rounded-[25px] sm:mt-[50px] hover:text-lg hover:font-large
             ${stage === 1 ? 'scale-[1.1] ml-[130px]' : ''}
              ${stage === 3 ? 'scale-[0.6] ml-[120px]' : ''}
               ${stage === 4 ? 'scale-[0.4] ml-[200px]' : ''}
                ${stage === 5 ? 'scale-[0.3] ml-[230px] absolute' : ''}`}
          onMouseEnter={handleNoMouseEnter}
          onClick={handleNoClick}
          onTouchMove={handleNoClick}
        >
          {stage === 0 && 'NO'}
          {stage === 1 && 'Are you sure?😔'}
          {stage === 3 && 'You dont want to reject me 😢'}
          {stage === 4 && 'Press YES please🥺'}
          {stage === 5 && 'Okay its your choice 😔'}
        </button>
      </div>

      {showResult && (
        <div className="i result text-white text-[32px] mt-[30px] z-[3] sm:text-[26px] sm:mt-[19px]" style={{fontWeight: 'bolder'}}>
          <span className='' style={{fontStyle: 'oblique'}}>
            I knew you would say{' '}
            <span className="bg-white text-love-pink-light px-[1px] rounded-[10px]">YES</span>
          </span>🥱
          <br /><br />
          <span className="text-[#f0eeee]" style={{fontWeight: 'bold'}}>
            <span className="bg-[#fbfbfb] text-[#f17b8f] rounded-[11px] p-[0px_0px_0px_5px] font-bold font-oblique font-italic px-[10px]">
              You just made me
            </span>{' '}
            the happiest person zozo
          </span>
          <hr />
          <div className="book group relative w-[240px] h-[340px] md:w-[250px] md:h-[350px] sm:w-[200px] sm:h-[260px] mt-[30px] mx-auto rounded-[10px] bg-white shadow-book [perspective:2000px] flex items-center justify-center sm:mt-[30px]">
            <Image
              src="/flower/flower.png"
              alt="flower"
              className="flower relative left-[-150px] top-[40px] w-[200px] rotate-[-45deg] translate-y-[120px] opacity-0 transition-all duration-[0.8s] ease group-hover:rotate-[-35deg] group-hover:translate-y-0 group-hover:opacity-100 z-[1] pointer-events-none rounded-[3cm_1cm_5cm_1cm] shadow-flower sm:rounded-[5.3cm_1cm_5cm_5cm]"
              width={200}
              height={200}
            />
            <div
              ref={coverRef}
              className="cover absolute top-0 w-full h-full rounded-[10px] bg-[rgb(240,240,240)] cursor-pointer transition-all duration-[0.5s] origin-left shadow-book-glow flex flex-col items-center justify-center [transform-style:preserve-3d]"
              style={{ zIndex: currentPage === 0 ? 1000 : -1, display: currentPage === 0 ? 'flex' : 'none' }}
            >
              <h5 className="ourr mt-[1px] inline-block text-white bg-[#515050] text-medium font-bold rounded-[20cm] px-[5px] z-[100]" style={{display: 'inline-block', color: '#ffffff', backgroundColor: '#515050', fontSize: 'medium', fontWeight: 'bolder'}}>
                Our Gallary
              </h5>
              <p className="text-love-pink-light p-[20px] text-center w-full font-bolder text-[20px] leading-tight z-[100] sm:text-[16px] sm:font-bold">
                "I feel like we could be really good together and I'd like us to give it a chance and get closer I hope we stay together and that you want that too and I hope we fill this book together b 2ezn el Mawla "
              </p>
            </div>
            {pages}
          </div>

          <div className="mt-[20px] text-center" id="pageButtons">
            <button
              id="prevPage"
              className="bg-[#ed3a57] hover:font-large hover:bg-white hover:text-black transition-all duration-[.5s] rounded-[10px] m-[10px] px-[20px] py-[10px] text-white font-bold sm:px-[15px] sm:py-[8px] sm:text-[14px]"
              onClick={handlePrevPage}
            >
              Prev
            </button>
            <button
              id="nextPage"
              className="bg-[#fc6a82] hover:font-large hover:bg-white hover:text-black transition-all duration-[.5s] rounded-[10px] m-[10px] px-[20px] py-[10px] text-white font-bold sm:px-[15px] sm:py-[8px] sm:text-[14px]"
              onClick={handleNextPage}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  )
}
