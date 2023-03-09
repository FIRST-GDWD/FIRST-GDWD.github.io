gsap.to(".box", 1, {
    scale: 0.1, 
    y: 60,
    yoyo: true, 
    repeat: -1, 
    ease: "power1.inOut",
    delay: 1,
    stagger: {
      amount: 1.5, 
      grid: "auto",
      from: "center"
    }
  });