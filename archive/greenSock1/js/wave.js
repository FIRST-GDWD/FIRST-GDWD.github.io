gsap.to(".box", 0.5, {
    scale: 0.5,
    backgroundColor: "red",
    y: 60,
    yoyo: true,
    repeat: -1,
    ease: "bounce",
    delay: 1,
    stagger: {
        amount: 1.5,
        grid: "auto",
        from: "center",
    },
});